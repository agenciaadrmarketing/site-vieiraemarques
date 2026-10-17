// Gera as páginas estáticas a partir de src/. Sem dependências: `node src/build.mjs`.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE } from "./data/site.mjs";
import { page } from "./partials/layout.mjs";
import { ROUTES } from "./routes.mjs";
import { LEGAL_REVIEW } from "./data/legal.mjs";
import { cspHeader } from "./data/csp.mjs";
import { LANDING_PAGES } from "./data/landing-pages.mjs";
import { LANDINGS } from "./data/landings.mjs";
import { buildBundle, usedTokens } from "./tools/css-bundle.mjs";
import { llmsTxt, robotsTxt, robotsStagingTxt } from "./tools/llms.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const outFile = (path) => join(ROOT, path === "/" ? "index.html" : join(path, "index.html"));

function write(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

function notFound() {
  return page({
    title: "Página não encontrada | Vieira & Marques",
    description: "O endereço acessado não existe ou foi movido. Veja as páginas principais da Vieira & Marques Sociedade de Advogados.",
    path: "/404.html",
    body: `<section class="page-hero on-dark" aria-labelledby="page-titulo"><div class="container">
  <div class="page-hero__grid"><div class="stack">
    <p class="eyebrow">Erro 404</p>
    <h1 class="page-hero__title" id="page-titulo">Esta página <span class="grad">não foi encontrada.</span></h1>
  </div><div class="page-hero__aside">
    <p class="lead">O endereço pode ter mudado com a nova versão do site. Use os atalhos abaixo para continuar.</p>
    <div class="btn-row"><a class="btn btn--light" href="/">Página inicial</a><a class="btn btn--ghost-light" href="/areas-de-atuacao/">Áreas de atuação</a><a class="btn btn--ghost-light" href="/contato/">Contato</a></div>
  </div></div>
</div></section>`,
  }).replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex">');
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [...ROUTES, ...LANDING_PAGES.map((l) => ({ path: l.path, priority: "0.6" }))].map(
    (r) => `  <url>\n    <loc>${SITE.origin}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r.priority}</priority>\n  </url>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// Páginas geradas em memória; depois cada grupo recebe um CSS só com o que usa (src/tools/css-bundle.mjs).
const rendered = ROUTES.map((r) => ({ file: outFile(r.path), path: r.path, html: r.render() }));
rendered.push({ file: join(ROOT, "404.html"), path: "/404.html", html: notFound() });
const LANDING_PATHS = new Set(LANDINGS.map((l) => l.path));
const groupOf = (p) =>
  p === "/" ? "home" : p === "/404.html" ? "erro" : p === "/escritorio/" ? "escritorio" : p === "/areas-de-atuacao/" ? "hub" :
  p === "/conhecimento/" ? "conhecimento" : p === "/contato/" ? "contato" : p.startsWith("/advogados/") ? "advogado" : LANDING_PATHS.has(p) ? "landing" :
  p.startsWith("/areas/") ? (p.split("/").filter(Boolean).length === 2 ? "area" : "servico") : "legal";
const jsTokens = ["site.js", "reviews.js", "gate.js"].map((f) => readFileSync(join(ROOT, "assets/js", f), "utf8"));
const groups = {};
for (const p of rendered) (groups[groupOf(p.path)] ??= []).push(p);
for (const [name, pages] of Object.entries(groups)) {
  const size = buildBundle(join(ROOT, "assets/css/site.css"), join(ROOT, `assets/css/${name}.css`), usedTokens(pages.map((p) => p.html), jsTokens));
  // CSS embutido no <head> em vez de <link>: sem requisição bloqueando a renderização, a primeira
  // pintura sai junto com o HTML. Com o CSS externo, o Chrome gerava quadros vazios enquanto o arquivo
  // carregava e passava a limitar a página a 1 quadro/s (PageSpeed: primeira pintura em ~2,4 s).
  const css = readFileSync(join(ROOT, `assets/css/${name}.css`), "utf8");
  for (const p of pages) p.html = p.html.replace(/<link rel="stylesheet" href="\/assets\/css\/site\.css\?v=\w+">/, () => `<style>${css}</style>`);
  process.stdout.write(`css ${name}: ${(size / 1024).toFixed(1)} KB\n`);
}
for (const p of rendered) write(p.file, p.html);

// CSP do .htaccess acompanha a configuração de medição (src/data/csp.mjs).
const htaccess = join(ROOT, ".htaccess");
const ht = readFileSync(htaccess, "utf8");
const csp = ht.replace(/Header always set Content-Security-Policy "[^"]*"/, `Header always set Content-Security-Policy "${cspHeader()}"`);
if (csp !== ht) writeFileSync(htaccess, csp);
write(join(ROOT, "sitemap.xml"), sitemap());
write(join(ROOT, "robots.txt"), robotsTxt());
write(join(ROOT, "robots-staging.txt"), robotsStagingTxt());
write(join(ROOT, "llms.txt"), llmsTxt());

console.log(`Build: ${ROUTES.length} páginas + 404, sitemap.xml e robots.txt`);
if (LEGAL_REVIEW.length) {
  console.log(`Páginas legais — ${LEGAL_REVIEW.length} item(ns) para revisão do escritório (src/data/legal.mjs):`);
  for (const item of LEGAL_REVIEW) console.log(`  - ${item}`);
}
