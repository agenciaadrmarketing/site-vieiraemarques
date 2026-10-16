// Gera os CSS finais por tipo de página a partir de assets/css/site.css (a fonte, legível):
//  - mantém só as regras cujas classes/ids aparecem nas páginas do grupo (ou em strings dos JS);
//  - remove comentários e espaços. Nada é apagado da fonte; só os arquivos publicados ficam menores.
import { readFileSync, writeFileSync } from "node:fs";

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

// Divide em itens de topo, respeitando chaves, aspas e url().
function splitTop(css) {
  const out = [];
  let depth = 0, start = 0, str = null;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (str) { if (c === "\\") i++; else if (c === str) str = null; continue; }
    if (c === '"' || c === "'") { str = c; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { out.push(css.slice(start, i + 1).trim()); start = i + 1; } }
    else if (c === ";" && depth === 0) { out.push(css.slice(start, i + 1).trim()); start = i + 1; }
  }
  return out.filter(Boolean);
}

function splitSelectors(sel) {
  const parts = []; let depth = 0, cur = "";
  for (const ch of sel) {
    if (ch === "(" || ch === "[") depth++;
    if (ch === ")" || ch === "]") depth--;
    if (ch === "," && depth === 0) { parts.push(cur.trim()); cur = ""; } else cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

function needed(selector) {
  // :not(), :is(), :where(), :has() não exigem os tokens de dentro (mantém a regra por segurança).
  let s = selector.replace(/:(not|is|where|has|matches)\(([^()]|\([^()]*\))*\)/g, "");
  s = s.replace(/\[[^\]]*\]/g, "");
  return [...s.matchAll(/\.(-?[_a-zA-Z][\w-]*)|#(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1] || m[2]);
}

function filterRules(items, used, keepNames) {
  const out = [];
  for (const it of items) {
    if (it.startsWith("@")) {
      const head = it.slice(0, it.indexOf("{") === -1 ? it.length : it.indexOf("{")).trim();
      if (/^@(media|supports|layer)\b/.test(head) && it.includes("{")) {
        const inner = it.slice(it.indexOf("{") + 1, it.lastIndexOf("}"));
        const kept = filterRules(splitTop(inner), used, keepNames);
        if (kept.length) out.push(`${head}{${kept.join("")}}`);
      } else out.push(it); // @font-face, @keyframes, @property, @import...
      continue;
    }
    const b = it.indexOf("{");
    if (b === -1) continue;
    const sels = splitSelectors(it.slice(0, b));
    const keep = sels.filter((s) => needed(s).every((t) => used.has(t)));
    if (keep.length) out.push(`${keep.join(",")}${it.slice(b)}`);
  }
  return out;
}

const minify = (css) =>
  css
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .replace(/\(\s+/g, "(").replace(/\s+\)/g, ")")
    .trim();

export function usedTokens(htmls, jsSources) {
  const used = new Set();
  for (const h of htmls) {
    for (const m of h.matchAll(/\b(?:class|id)="([^"]*)"/g)) for (const t of m[1].split(/\s+/)) if (t) used.add(t);
    for (const m of h.matchAll(/data-[\w-]+="[^"]*"/g)) used.add(m[0]);
  }
  for (const js of jsSources) for (const m of js.matchAll(/[A-Za-z_][\w-]*/g)) used.add(m[0]);
  return used;
}

export function buildBundle(cssPath, outPath, used) {
  const items = splitTop(stripComments(readFileSync(cssPath, "utf8")));
  let kept = filterRules(items, used);
  // @keyframes só ficam se algum trecho mantido usa o nome.
  const body = kept.filter((x) => !x.startsWith("@keyframes")).join("");
  kept = kept.filter((x) => !x.startsWith("@keyframes") || body.includes(x.slice(10, x.indexOf("{")).trim()));
  const css = minify(kept.join(""));
  writeFileSync(outPath, css);
  return css.length;
}
