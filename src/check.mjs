// Validação do HTML gerado: `node src/check.mjs`. Sai com código 1 se houver erro.
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES } from "./routes.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const fileFor = (path) => join(ROOT, path === "/" ? "index.html" : join(path, "index.html"));

const pages = Object.fromEntries(
  [...ROUTES.map((r) => r.path), "/404.html"].map((p) => [p, readFileSync(p === "/404.html" ? join(ROOT, "404.html") : fileFor(p), "utf8")])
);
const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

for (const [path, html] of Object.entries(pages)) {
  const err = (msg) => errors.push(`${path}: ${msg}`);
  const warn = (msg) => warnings.push(`${path}: ${msg}`);

  const h1 = (html.match(/<h1\b/g) || []).length;
  if (h1 !== 1) err(`${h1} <h1> (esperado 1)`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) err("sem <title>");
  else if (title.replace(/&amp;/g, "&").length > 66) warn(`title com ${title.length} caracteres`);

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) err("sem meta description");
  else {
    const len = desc.replace(/&amp;/g, "&").length;
    if (len > 165) warn(`description com ${len} caracteres`);
    if (len < 70) warn(`description curta (${len})`);
  }
  if (path !== "/404.html" && !/<link rel="canonical"/.test(html)) err("sem canonical");

  for (const tag of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt="/.test(tag)) err(`img sem alt: ${tag.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) err(`img sem width/height: ${tag.slice(0, 80)}`);
  }

  // Hierarquia: não pular de h2 para h4 sem h3.
  let prev = 1;
  for (const m of html.matchAll(/<h([1-6])\b/g)) {
    const lvl = Number(m[1]);
    if (lvl > prev + 1) warn(`salto de h${prev} para h${lvl}`);
    prev = lvl;
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { err(`JSON-LD inválido: ${e.message}`); }
  }

  if (/\[INFORMAÇÃO PENDENTE\]/.test(html)) err("placeholder [INFORMAÇÃO PENDENTE] exposto");
  const visible = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "").replace(/<style>[\s\S]*?<\/style>/g, "").replace(/\sdata-[a-z-]+="[^"]*"/g, "");
  if (/\{\{|\}\}/.test(visible)) err("resto de template {{ }}");
  if (/lorem ipsum/i.test(html)) err("lorem ipsum");
  if (/\bundefined\b|\bNaN\b|\[object Object\]/.test(html)) err("valor indefinido renderizado");

  // Links internos e âncoras
  const ownIds = idsOf(html);
  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    if (href.startsWith("#")) {
      if (href.length > 1 && !ownIds.has(href.slice(1))) err(`âncora inexistente ${href}`);
      continue;
    }
    if (!href.startsWith("/")) { err(`link relativo ${href}`); continue; }
    const [rawPath, hash] = href.split("#");
    const pathOnly = rawPath.split("?")[0];
    if (pages[pathOnly]) {
      if (hash && !idsOf(pages[pathOnly]).has(hash)) err(`âncora inexistente ${href}`);
      continue;
    }
    const filePath = join(ROOT, decodeURIComponent(pathOnly));
    if (!existsSync(filePath) || (statSync(filePath).isDirectory() && !existsSync(join(filePath, "index.html")))) err(`link quebrado ${href}`);
  }
}

// Assets referenciados por src/srcset
for (const [path, html] of Object.entries(pages)) {
  const refs = [...html.matchAll(/\s(?:src|srcset|imagesrcset)="([^"]+)"/g)].flatMap((m) => m[1].split(",").map((s) => s.trim().split(" ")[0]));
  for (const ref of refs) {
    if (!ref.startsWith("/")) continue;
    if (!existsSync(join(ROOT, ref.split("?")[0]))) errors.push(`${path}: asset ausente ${ref}`);
  }
}

// Scripts inline precisam estar autorizados pelo hash da CSP no .htaccess.
const htaccess = readFileSync(join(ROOT, ".htaccess"), "utf8");
for (const [path, html] of Object.entries(pages)) {
  for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    const hash = createHash("sha256").update(m[1]).digest("base64");
    if (!htaccess.includes(`'sha256-${hash}'`)) errors.push(`${path}: script inline sem hash na CSP (sha256-${hash})`);
  }
}

// JS/CSS sem resíduos de depuração
const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));
for (const file of [...walk(join(ROOT, "assets/js")), ...walk(join(ROOT, "assets/css")), ...walk(join(ROOT, "src")).filter((f) => f.endsWith(".mjs") && !f.endsWith("check.mjs"))]) {
  const text = readFileSync(file, "utf8");
  const rel = file.replace(ROOT + "/", "");
  if (/console\.log\(/.test(text) && !/src\/(build|check)\.mjs$/.test(file)) errors.push(`${rel}: console.log`);
  if (/\b(TODO|FIXME|XXX)\b/.test(text)) errors.push(`${rel}: TODO/FIXME`);
  if (/debugger;/.test(text)) errors.push(`${rel}: debugger`);
}

for (const w of warnings) console.warn(`aviso  ${w}`);
for (const e of errors) console.error(`erro   ${e}`);
console.log(`Check: ${Object.keys(pages).length} páginas, ${errors.length} erro(s), ${warnings.length} aviso(s)`);
process.exit(errors.length ? 1 : 0);
