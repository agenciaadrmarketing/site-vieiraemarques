import { esc, join, when } from "../lib/html.mjs";
import { img } from "./media.mjs";
import { icon } from "./icons.mjs";
import { areaById, areaUrl } from "../data/areas.mjs";
import { formatDate } from "../data/articles.mjs";

export function sectionHead({ eyebrow, title, id, lead, align, aside }) {
  const cls = ["section-head", align === "center" && "section-head--center", aside && "section-head--row"].filter(Boolean).join(" ");
  return `<div class="${cls}" data-reveal>
  <div class="stack-sm">
    ${when(eyebrow, `<p class="eyebrow">${esc(eyebrow)}</p>`)}
    <h2 class="h-section"${id ? ` id="${id}"` : ""}>${title}</h2>
    ${when(lead, `<p class="lead">${lead}</p>`)}
  </div>
  ${aside ?? ""}
</div>`;
}

export const linkArrow = (href, label, external = false) =>
  `<a class="link-arrow" href="${href}"${external ? ' target="_blank" rel="noopener"' : ""}>${esc(label)} ${icon.arrow(14)}</a>`;

export const btn = (href, label, variant = "", arrow = true) =>
  `<a class="btn ${variant}" href="${href}">${esc(label)}${arrow ? ` <span class="btn__arrow">${icon.arrow(16)}</span>` : ""}</a>`;

const meta = (a) => {
  const area = areaById[a.area];
  return `<p class="meta"><span>${esc(area ? area.shortTitle : "")}</span><time datetime="${a.date}">${formatDate(a.date)}</time>${a.type === "guia" ? "<span>Guia</span>" : ""}</p>`;
};

export function articleFeature(a, headingLevel = 3) {
  const h = `h${headingLevel}`;
  return `<a class="article-feature" href="${esc(a.url)}" data-reveal data-area="${a.area}">
  ${meta(a)}
  <${h} class="article-feature__title">${esc(a.title)}</${h}>
  ${when(a.excerpt, `<p class="article-feature__excerpt">${esc(a.excerpt)}</p>`)}
  <span class="link-arrow">Ler o artigo ${icon.arrow(14)}</span>
</a>`;
}

export function articleRow(a, headingLevel = 3) {
  const h = `h${headingLevel}`;
  return `<li class="article-row" data-area="${a.area}"><a href="${esc(a.url)}">
  ${meta(a)}
  <${h} class="article-row__title">${esc(a.title)}</${h}>
</a></li>`;
}

export function articleCard(a, headingLevel = 3) {
  const h = `h${headingLevel}`;
  return `<li data-area="${a.area}" data-type="${a.type}"><a class="article-card" href="${esc(a.url)}">
  ${meta(a)}
  <${h} class="article-card__title">${esc(a.title)}</${h}>
  ${when(a.excerpt, `<p class="muted">${esc(a.excerpt)}</p>`)}
  <span class="link-arrow">Ler ${icon.arrow(14)}</span>
</a></li>`;
}

export function faqList(items, { id } = {}) {
  return `<div class="faq"${id ? ` id="${id}"` : ""}>
  ${join(items, ([q, a]) => `<details class="faq__item">
    <summary class="faq__q">${esc(q)}<span class="faq__icon" aria-hidden="true">${icon.plus(14)}</span></summary>
    <p class="faq__a">${esc(a)}</p>
  </details>`)}
</div>`;
}

export const faqSchema = (items) => ({
  "@type": "FAQPage",
  mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

export function facts(list, cls = "") {
  return `<dl class="facts ${cls}">
  ${join(list, (f) => `<div class="fact"><dt class="fact__label">${esc(f.label)}</dt><dd class="fact__value">${esc(f.value)}</dd>${when(f.text, `<dd class="fact__text">${esc(f.text)}</dd>`)}</div>`)}
</dl>`;
}

export const STEPS = [
  { title: "Você descreve a situação", text: "Pelo WhatsApp ou por telefone, em linguagem comum. Não é preciso saber nomear a área do Direito." },
  { title: "Um advogado analisa", text: "A mensagem é lida por um profissional da área correspondente, que verifica o que já é possível avaliar com o que foi enviado." },
  { title: "Reunião presencial ou por vídeo", text: "Na sede, em Boituva, ou por videochamada. Nessa conversa são apresentados os caminhos aplicáveis e os documentos necessários." },
  { title: "Definição do caminho", text: "Orientação preventiva, tentativa de acordo ou atuação judicial — com etapas e condições combinadas por escrito." },
];

export function steps(list = STEPS) {
  return `<ol class="steps">
  ${join(list, (s, i) => `<li class="step" data-reveal>
    <span class="step__num">${String(i + 1).padStart(2, "0")}</span>
    <h3 class="step__title">${esc(s.title)}</h3>
    <p class="step__text">${esc(s.text)}</p>
  </li>`)}
</ol>`;
}

export const areaLink = (id) => {
  const a = areaById[id];
  return a ? `<a class="text-link" href="${areaUrl(a)}">${esc(a.title)}</a>` : "";
};

// Equipe em painéis expansíveis (componente da Home, reutilizado no Escritório).
// Desktop: painéis lado a lado; o ativo se expande e mostra cargo, OAB, atuação e temas.
// Mobile: cartões com rolagem lateral. Sem JS, o primeiro painel fica aberto.
export function teamPanels(people, { profileLinks = false, headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  return `<div class="team-panels" data-team-panels data-reveal>
  ${join(people, (p, i) => `<article class="team-panel${i === 0 ? " is-active" : ""}" tabindex="0" aria-labelledby="painel-${p.id}">
    <div class="team-panel__photo">${img(p.photo, { alt: `${p.name}, ${p.role.toLowerCase()} da Vieira & Marques`, sizes: "(min-width: 900px) 520px, 80vw", style: `--pos:${p.position};--pos-active:${p.positionActive ?? p.position}` })}</div>
    <span class="team-panel__vertical" aria-hidden="true">${esc(p.name)}</span>
    <div class="team-panel__info">
      <p class="team-panel__meta">${esc(p.role)} · ${esc(p.oab)}</p>
      <${h} class="team-panel__name" id="painel-${p.id}">${esc(p.name)}</${h}>
      <p class="team-panel__bio">${esc(p.bio)}</p>
      ${when(p.tags?.length, `<ul class="team-panel__tags" aria-label="Temas">${join(p.tags ?? [], (t) => `<li>${esc(t)}</li>`)}</ul>`)}
      ${when(profileLinks, `<a class="team-panel__link" href="/escritorio/#${p.id}">Formação completa <span aria-hidden="true">→</span></a>`)}
    </div>
  </article>`)}
</div>
<p class="team-panels__hint"><span class="team-panels__hint-desktop">Passe o mouse ou use o teclado sobre cada profissional para ver formação e áreas de atuação.</span><span class="team-panels__hint-mobile">Deslize para conhecer a equipe →</span></p>`;
}

export const recognitions = (items) => `<ul class="recognitions" data-reveal>${join(items, (t) => `<li>${esc(t)}</li>`)}</ul>`;
