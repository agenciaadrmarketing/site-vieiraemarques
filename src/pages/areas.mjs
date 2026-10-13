import { esc, join, when } from "../lib/html.mjs";
import { practiceAreas, areaUrl } from "../data/areas.mjs";
import { hasPage, serviceHref } from "../data/services/index.mjs";
import { teamByArea } from "../data/team.mjs";
import { articles } from "../data/articles.mjs";
import { faqByArea } from "../data/faq.mjs";
import { page, breadcrumbs } from "../partials/layout.mjs";
import { icon } from "../partials/icons.mjs";
import { faqList, faqSchema, linkArrow } from "../partials/components.mjs";

const PATH = "/areas-de-atuacao/";
const CRUMBS = [
  { label: "Início", href: "/" },
  { label: "Áreas de Atuação", href: PATH },
];

function service(area, s) {
  return `<li class="service" id="${area.id}-${s.id}">
  <h4 class="service__title">${esc(s.title)}</h4>
  <p class="service__text">${esc(s.text)}</p>
  ${when(s.items.length, `<ul class="service__items" aria-label="Situações em ${esc(s.title)}">${join(s.items, (i) => `<li>${esc(i)}</li>`)}</ul>`)}
  ${when(hasPage(area.id, s.id), `<a class="service__link" href="${serviceHref(area.id, s.id)}">Ver ${esc(s.title.toLowerCase())} ${icon.arrow(14)}</a>`)}
</li>`;
}

function areaBlock(area) {
  const people = teamByArea(area.id);
  const related = articles.filter((a) => a.area === area.id);
  const faqs = faqByArea[area.id] ?? [];
  return `<section class="area-block" id="${area.id}" aria-labelledby="${area.id}-titulo" data-hub-section>
  <header class="area-block__head" data-reveal>
    <p class="area-block__num">${area.number} / ${String(practiceAreas.length).padStart(2, "0")}</p>
    <h2 class="area-block__title" id="${area.id}-titulo">${esc(area.title)}</h2>
    <p class="lead">${esc(area.description)}</p>
  </header>
  <h3 class="sr-only">Serviços em ${esc(area.title)}</h3>
  <ul class="services" data-reveal>${join(area.services, (s) => service(area, s))}</ul>
  <div class="area-block__foot">
    ${when(faqs.length, `<div class="stack-sm" id="${area.id}-faq">
      <h3 class="eyebrow">Perguntas frequentes</h3>
      ${faqList(faqs)}
    </div>`)}
    <div class="stack">
      ${when(people.length, `<div class="stack-sm">
        <h3 class="eyebrow">Profissionais da área</h3>
        <p class="area-block__team">${people.map((p) => `<a href="/escritorio/#${p.id}">${esc(p.name)}</a>`).join("")}</p>
      </div>`)}
      ${when(related.length, `<div class="stack-sm">
        <h3 class="eyebrow">Conteúdos relacionados</h3>
        <ul class="checklist">${join(related, (a) => `<li>${icon.arrowUpRight(16)}<a class="text-link" href="${esc(a.url)}">${esc(a.title)}</a></li>`)}</ul>
      </div>`)}
      <div class="btn-row">
        <a class="btn" href="/contato/?area=${area.id}">Falar sobre ${esc(area.shortTitle === "Médico e Saúde" ? "Saúde" : area.shortTitle)} <span class="btn__arrow">${icon.arrow(16)}</span></a>
      </div>
    </div>
  </div>
</section>`;
}

export default function areas() {
  const allFaqs = practiceAreas.flatMap((a) => faqByArea[a.id] ?? []);
  const body = `
<section class="page-hero on-dark" aria-labelledby="page-titulo">
  <div class="container">
    ${breadcrumbs(CRUMBS)}
    <div class="page-hero__grid">
      <div class="stack">
        <p class="eyebrow">Áreas de atuação</p>
        <h1 class="page-hero__title" id="page-titulo">Oito áreas do Direito, <span class="grad">organizadas pelo que você precisa resolver.</span></h1>
      </div>
      <div class="page-hero__aside">
        <p class="lead">Cada área reúne as situações concretas que o escritório atende. Não sabe em qual delas o seu caso se encaixa? Descreva o que aconteceu — identificar o caminho faz parte da primeira análise.</p>
        ${linkArrow("/contato/", "Falar com a equipe")}
      </div>
    </div>
  </div>
</section>

<div class="section section--white">
  <div class="container hub">
    <nav class="hub__index" aria-label="Áreas de atuação nesta página">
      <p class="eyebrow hub__index-title">Índice</p>
      <div class="hub__index-inner" data-hub-nav>
        ${join(practiceAreas, (a) => `<a class="hub__link" href="${areaUrl(a)}" data-hub-link="${a.id}"><span>${a.number}</span>${esc(a.title)}</a>`)}
      </div>
    </nav>
    <div class="hub__content">
      ${join(practiceAreas, areaBlock)}
    </div>
  </div>
</div>`;

  return page({
    title: "Áreas de Atuação | Vieira & Marques",
    description:
      "Família, Sucessório, Trabalhista, Criminal, Médico e Saúde, Bancário, Imobiliário e Previdenciário: as áreas e os serviços da Vieira & Marques Advogados.",
    path: PATH,
    crumbs: CRUMBS,
    schema: [
      {
        "@type": "CollectionPage",
        name: "Áreas de Atuação",
        hasPart: practiceAreas.map((a) => ({ "@type": "Service", name: a.title, provider: { "@id": "https://vieiraemarquesadvogados.com/#org" }, url: `https://vieiraemarquesadvogados.com${areaUrl(a)}` })),
      },
      faqSchema(allFaqs),
    ],
    body,
  });
}
