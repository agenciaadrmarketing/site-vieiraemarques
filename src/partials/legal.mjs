import { esc, join, when } from "../lib/html.mjs";
import { SITE } from "../data/site.mjs";
import { LEGAL, formatDate } from "../data/legal.mjs";
import { page, breadcrumbs } from "./layout.mjs";

// Componentes compartilhados pelas páginas legais: hero, índice, seções e avisos.
// Cada seção: { id, title, body } — body é HTML montado com os helpers abaixo.

export const p = (...paragraphs) => join(paragraphs, (t) => `<p>${t}</p>`);
export const h3 = (t) => `<h3>${t}</h3>`;
export const list = (items) => `<ul class="legal-list">${join(items, (t) => `<li>${t}</li>`)}</ul>`;
export const steps = (items) => `<ol class="legal-steps">${join(items, (t) => `<li>${t}</li>`)}</ol>`;
export const callout = (title, html) => `<aside class="legal-callout"><p class="legal-callout__title">${title}</p>${html}</aside>`;
// Tabela de duas colunas; vira lista de pares no mobile (td::before com o rótulo).
export const table = ({ caption, head, rows }) => `<div class="legal-table"><table>
  <caption class="sr-only">${esc(caption)}</caption>
  <thead><tr>${join(head, (h) => `<th scope="col">${esc(h)}</th>`)}</tr></thead>
  <tbody>${join(rows, (r) => `<tr>${join(r, (c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td data-label="${esc(head[i])}">${c}</td>`))}</tr>`)}</tbody>
</table></div>`;

const updated = () => `<p class="legal-updated">Última atualização: <time datetime="${LEGAL.lastUpdated}">${formatDate(LEGAL.lastUpdated)}</time></p>`;

export function legalPage({ path, label, title, description, eyebrow, h1, intro, sections, related }) {
  const crumbs = [
    { label: "Início", href: "/" },
    { label, href: path },
  ];
  const body = `
<section class="page-hero legal-hero on-dark" aria-labelledby="page-titulo">
  <div class="container">
    ${breadcrumbs(crumbs)}
    <div class="page-hero__grid">
      <div class="stack">
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h1 class="page-hero__title" id="page-titulo">${h1}</h1>
      </div>
      <div class="page-hero__aside">
        <p class="lead">${intro}</p>
        ${updated()}
      </div>
    </div>
  </div>
</section>

<section class="section section--white legal">
  <div class="container legal__grid">
    <aside class="legal__aside">
      <details class="legal-toc" data-toc>
        <summary class="legal-toc__title">Nesta página</summary>
        <ol>${join(sections, (s) => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`)}</ol>
      </details>
    </aside>
    <article class="legal__body">
      ${join(sections, (s, i) => `<section class="legal-section" id="${s.id}" aria-labelledby="${s.id}-titulo">
        <h2 class="legal-section__title" id="${s.id}-titulo"><span class="legal-section__num">${String(i + 1).padStart(2, "0")}</span>${esc(s.title)}</h2>
        ${s.body}
      </section>`)}
      <footer class="legal__foot">
        ${updated()}
        ${when(related, `<p>${related}</p>`)}
      </footer>
    </article>
  </div>
</section>`;

  return page({
    title,
    description,
    path,
    crumbs,
    schema: [{ "@type": "WebPage", name: label, url: `${SITE.origin}${path}`, dateModified: LEGAL.lastUpdated, inLanguage: "pt-BR" }],
    body,
  });
}
