import { esc, join, when } from "../lib/html.mjs";
import { img } from "./media.mjs";
import { icon } from "./icons.mjs";
import { faqList } from "./components.mjs";
import { areaById } from "../data/areas.mjs";
import { serviceHref } from "../data/services/index.mjs";

const serviceLink = ([areaId, serviceId]) => ({
  href: serviceHref(areaId, serviceId),
  label: areaById[areaId].services.find((s) => s.id === serviceId).title,
});

// Blocos editoriais das páginas de serviço. Cada página escolhe os blocos, a ordem e o tom.
// Campos de texto aceitam HTML simples já escapado na fonte (ênfases e links internos).
const TONES = { white: "section--white", muted: "section--muted", dark: "section--dark" };
const section = (b, inner) =>
  `<section class="section ${TONES[b.tone ?? "white"]} svc-block svc-block--${b.type}" id="${b.id}" aria-labelledby="${b.id}-titulo">
  <div class="container">${inner}</div>
</section>`;

const head = (b, extraClass = "") => `<header class="svc-head ${extraClass}" data-reveal>
  ${when(b.eyebrow, `<p class="eyebrow">${esc(b.eyebrow)}</p>`)}
  <h2 class="h-section" id="${b.id}-titulo">${b.title}</h2>
  ${when(b.intro, `<p class="lead">${b.intro}</p>`)}
</header>`;

const paragraphs = (ps = []) => join(ps, (p) => `<p>${p}</p>`);

const BLOCKS = {
  // Texto corrido com coluna lateral de destaques.
  prose: (b) =>
    section(b, `<div class="split">
  <div class="stack" data-reveal>
    ${when(b.eyebrow, `<p class="eyebrow">${esc(b.eyebrow)}</p>`)}
    <h2 class="h-section" id="${b.id}-titulo">${b.title}</h2>
  </div>
  <div class="stack" data-reveal>
    <div class="prose">${paragraphs(b.paragraphs)}</div>
    ${when(b.points, `<ul class="checklist">${join(b.points ?? [], (p) => `<li>${icon.check(18)}<span>${p}</span></li>`)}</ul>`)}
  </div>
</div>`),

  // Subtipos lado a lado, separados por fios (sem cards).
  types: (b) =>
    section(b, `${head(b)}
<div class="svc-columns" style="--cols:${b.items.length}" data-reveal>
  ${join(b.items, (it, i) => `<article class="svc-column" id="${it.id ?? `${b.id}-${i + 1}`}">
    <p class="svc-column__num">${String(i + 1).padStart(2, "0")}</p>
    <h3 class="h-card">${esc(it.title)}</h3>
    <div class="prose prose--sm">${paragraphs(it.paragraphs)}</div>
    ${when(it.points, `<ul class="svc-points">${join(it.points ?? [], (p) => `<li>${p}</li>`)}</ul>`)}
  </article>`)}
</div>`),

  // Tabela acessível. No mobile: até 3 colunas vira cartões; 4 ou mais rolam na
  // horizontal com a primeira coluna fixa (cartões ficavam longos demais).
  table: (b) =>
    section(b, `${head(b)}
${when(b.columns.length > 3, `<p class="svc-table-hint" aria-hidden="true">Deslize para ver todas as colunas →</p>`)}
<div class="svc-table-wrap${b.columns.length > 3 ? " svc-table-wrap--wide" : ""}" data-reveal role="region" aria-label="Tabela comparativa (rolável)" tabindex="0">
  <table class="svc-table">
    ${when(b.caption, `<caption class="sr-only">${esc(b.caption)}</caption>`)}
    <thead><tr>${join(b.columns, (c, i) => `<th scope="col"${i === 0 ? ' class="svc-table__rowhead"' : ""}>${c ? esc(c) : '<span class="sr-only">Critério</span>'}</th>`)}</tr></thead>
    <tbody>${join(b.rows, (r) => `<tr><th scope="row" class="svc-table__rowhead">${esc(r[0])}</th>${join(r.slice(1), (c, i) => `<td data-label="${esc(b.columns[i + 1])}">${c}</td>`)}</tr>`)}</tbody>
  </table>
</div>
${when(b.note, `<p class="svc-note" data-reveal>${b.note}</p>`)}`),

  // Lista editorial numerada (linhas) — situações, pontos de atenção, tipos.
  list: (b) => {
    b.items.forEach((it) => { if (it.service) it.link = serviceLink(it.service); });
    return section(b, `<div class="${b.layout === "side" ? "split" : ""}">
  ${head(b)}
  <ol class="svc-list${b.columns ? " svc-list--2" : ""}" data-reveal>
    ${join(b.items, (it, i) => `<li class="svc-list__item"${it.id ? ` id="${it.id}"` : ""}>
      <span class="svc-list__num">${String(i + 1).padStart(2, "0")}</span>
      <div><h3 class="svc-list__title">${esc(it.title)}</h3><p class="svc-list__text">${it.text}</p>${it.link ?`<a class="svc-list__link" href="${it.link.href}" data-track="related_service_click">${esc(it.link.label)} ${icon.arrow(14)}</a>` : ""}</div>
    </li>`)}
  </ol>
</div>`);
  },

  // Linha do tempo com uma ou duas trilhas (ex.: com acordo / sem acordo).
  timeline: (b) => {
    const h = b.tracks.some((t) => t.title) ? "h4" : "h3";
    return section(b, `${head(b)}
<div class="svc-tracks svc-tracks--${b.tracks.length}" data-reveal>
  ${join(b.tracks, (t) => `<div class="svc-track">
    ${when(t.title, `<h3 class="svc-track__title">${esc(t.title)}</h3>`)}
    <ol class="svc-timeline">${join(t.steps, (s, i) => `<li class="svc-timeline__step">
      <span class="svc-timeline__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
      <div><${h} class="svc-timeline__title">${esc(s.title)}</${h}><p class="svc-timeline__text">${s.text}</p></div>
    </li>`)}</ol>
  </div>`)}
</div>
${when(b.note, `<p class="svc-note" data-reveal>${b.note}</p>`)}`);
  },

  // Documentos agrupados, com imagem opcional.
  documents: (b) =>
    section(b, `<div class="split${b.image ? " split--center" : ""}">
  <div class="stack">
    ${head(b)}
    ${b.image ? `<figure class="svc-doc-figure" data-reveal>${img(b.image.name, { alt: b.image.alt, sizes: "(min-width: 960px) 360px, 70vw" })}</figure>` : ""}
  </div>
  <div class="stack" data-reveal>
    ${join(b.groups, (g) => `<div class="svc-docs">
      <h3 class="svc-docs__title">${esc(g.title)}</h3>
      ${when(g.text, `<p class="svc-docs__text">${g.text}</p>`)}
      <ul class="svc-docs__list">${join(g.items, (it) => `<li>${icon.check(16)}<span>${it}</span></li>`)}</ul>
    </div>`)}
    ${when(b.note, `<p class="svc-note">${b.note}</p>`)}
    ${when(b.warning, `<p class="svc-warning">${b.warning}</p>`)}
  </div>
</div>`),

  // Informação importante destacada.
  callout: (b) => {
    const link = b.service ? serviceLink(b.service) : b.link;
    return section(b, `<div class="svc-callout svc-callout--${b.variant ?? "info"}${b.variant === "warning" ? " on-dark" : ""}" data-reveal>
  <p class="eyebrow">${esc(b.eyebrow ?? "Importante")}</p>
  <h2 class="svc-callout__title" id="${b.id}-titulo">${b.title}</h2>
  <div class="prose">${paragraphs(b.paragraphs)}</div>
  ${link ? `<a class="link-arrow" href="${link.href}" data-track="related_service_click">${esc(link.label)} ${icon.arrow(14)}</a>` : ""}
</div>`);
  },

  // Duas colunas de fatores (ex.: o que pesa a favor / o que pode afastar).
  compare: (b) =>
    section(b, `${head(b)}
${when(b.paragraphs, `<div class="prose svc-compare__prose" data-reveal>${paragraphs(b.paragraphs)}</div>`)}
<div class="svc-compare" data-reveal>
  ${join(b.columns, (c) => `<div class="svc-compare__col">
    <h3 class="svc-compare__title">${esc(c.title)}</h3>
    <ul class="svc-points">${join(c.items, (it) => `<li>${it}</li>`)}</ul>
  </div>`)}
</div>`),

  faq: (b) =>
    section(b, `<div class="container--narrow svc-faq">
  ${head(b)}
  ${faqList(b.items)}
  ${b.more ? `<p class="svc-note">${b.more}</p>` : ""}
</div>`),
};

export function renderBlock(b) {
  const fn = BLOCKS[b.type];
  if (!fn) throw new Error(`Bloco desconhecido: ${b.type}`);
  if (!b.id) throw new Error(`Bloco ${b.type} sem id`);
  return fn(b);
}
