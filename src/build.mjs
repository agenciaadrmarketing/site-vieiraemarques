// Gera as páginas estáticas a partir de src/. Sem dependências: `node src/build.mjs`.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE } from "./data/site.mjs";
import { page } from "./partials/layout.mjs";
import { ROUTES } from "./routes.mjs";
import { LEGAL_REVIEW } from "./data/legal.mjs";
import { cspHeader } from "./data/csp.mjs";
import { LANDING_PAGES } from "./data/landing-pages.mjs";

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
  }).replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="noindex">');
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [...ROUTES, ...LANDING_PAGES.map((l) => ({ path: l.path, priority: "0.6" }))].map(
    (r) => `  <url>\n    <loc>${SITE.origin}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r.priority}</priority>\n  </url>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

for (const route of ROUTES) write(outFile(route.path), route.render());
write(join(ROOT, "404.html"), notFound());

// CSP do .htaccess acompanha a configuração de medição (src/data/csp.mjs).
const htaccess = join(ROOT, ".htaccess");
const ht = readFileSync(htaccess, "utf8");
const csp = ht.replace(/Header always set Content-Security-Policy "[^"]*"/, `Header always set Content-Security-Policy "${cspHeader()}"`);
if (csp !== ht) writeFileSync(htaccess, csp);
write(join(ROOT, "sitemap.xml"), sitemap());
write(join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /src/\nDisallow: /design/\n\nSitemap: ${SITE.origin}/sitemap.xml\n`);

console.log(`Build: ${ROUTES.length} páginas + 404, sitemap.xml e robots.txt`);
if (LEGAL_REVIEW.length) {
  console.log(`Páginas legais — ${LEGAL_REVIEW.length} item(ns) para revisão do escritório (src/data/legal.mjs):`);
  for (const item of LEGAL_REVIEW) console.log(`  - ${item}`);
}
