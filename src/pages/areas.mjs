import { imgPreload } from "../partials/media.mjs";
import { lpCta, lpReach, lpHero, lpSteps } from "../partials/lp.mjs";
import { esc, join, when } from "../lib/html.mjs";
import { SITE, waMessage, whatsappUrl } from "../data/site.mjs";
import { profilePath } from "../data/team.mjs";
import { practiceAreas, areaUrl, areaHubAnchor } from "../data/areas.mjs";
import { hasPage, serviceHref } from "../data/services/index.mjs";
import { teamByArea } from "../data/team.mjs";
import { articles } from "../data/articles.mjs";
import { faqByArea } from "../data/faq.mjs";
import { page, breadcrumbs } from "../partials/layout.mjs";
import { icon } from "../partials/icons.mjs";
import { sectionHead } from "../partials/components.mjs";

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
    ${linkArrow(areaUrl(area), `Página de ${area.title}`)}
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
        <p class="area-block__team">${people.map((p) => `<a href="${p.hasProfile ? profilePath(p) : `/escritorio/#${p.id}`}">${esc(p.name)}</a>`).join("")}</p>
      </div>`)}
      ${when(related.length, `<div class="stack-sm">
        <h3 class="eyebrow">Conteúdos relacionados</h3>
        <ul class="checklist">${join(related, (a) => `<li>${icon.arrowUpRight(16)}<a class="text-link" href="${esc(a.url)}">${esc(a.title)}</a></li>`)}</ul>
      </div>`)}
      <div class="btn-row">
        <a class="btn" href="${areaUrl(area)}">Conhecer a área<span class="sr-only"> ${esc(area.title)}</span> <span class="btn__arrow">${icon.arrow(16)}</span></a>
      </div>
    </div>
  </div>
</section>`;
}

export default function areas() {
  const allFaqs = practiceAreas.flatMap((a) => faqByArea[a.id] ?? []);
  const body = `
${lpHero({
  crumbs: CRUMBS,
  badge: "Áreas de atuação · 8 áreas",
  title: `Oito áreas do Direito, <span class="grad">organizadas pelo que você precisa resolver.</span>`,
  text: "Cada área reúne as situações concretas que o escritório atende. Não sabe em qual delas o seu caso se encaixa? Descreva o que aconteceu — identificar o caminho faz parte da triagem inicial.",
  message: waMessage(),
  cta: "Falar com a equipe",
  note: ["Atendimento sigiloso", "Presencial em Boituva e Sorocaba", "Online em São Paulo e todo o Brasil"],
  image: "equipe-reuniao",
  alt: "Equipe da Vieira & Marques reunida na sala de reunião do escritório",
  position: "68% 45%",
  positionMobile: "46% 50%",
  photo: true,
})}

<section class="section section--white" aria-labelledby="diretorio-titulo">
  <div class="container">
    ${sectionHead({
      eyebrow: "Diretório",
      id: "diretorio-titulo",
      title: `Encontre a área <span class="grad">pelo assunto.</span>`,
      lead: "Cada área tem uma página própria, com os serviços, os profissionais e as dúvidas mais comuns. Escolha a que mais se aproxima da sua situação.",
    })}
    <ul class="hub-areas" data-reveal>
      ${join(practiceAreas, (area) => `<li class="hub-area" id="${area.id}">
        <p class="hub-area__num">${area.number}</p>
        <h3 class="hub-area__title"><a href="${areaUrl(area)}">${esc(area.title)}</a></h3>
        <p class="hub-area__text">${esc(area.summary)}</p>
        <ul class="hub-area__services" aria-label="Serviços em ${esc(area.title)}">${join(area.services.slice(0, 6), (sv) => `<li>${hasPage(area.id, sv.id) ? `<a href="${serviceHref(area.id, sv.id)}">${esc(sv.title)}</a>` : esc(sv.title)}</li>`)}</ul>
        <a class="link-arrow" href="${areaUrl(area)}">Conhecer a área<span class="sr-only"> ${esc(area.title)}</span> ${icon.arrow(14)}</a>
      </li>`)}
    </ul>
  </div>
</section>

${lpReach()}

${lpSteps({ eyebrow: "Como encontrar a área", title: `Do primeiro contato <span class="grad">à área certa.</span>` })}

${lpCta({ title: `Não sabe em qual área seu caso se encaixa? <span class="grad">Fale com a nossa equipe.</span>`, text: "Descreva a situação em linguagem comum. A equipe de atendimento faz a triagem e encaminha o caso à área adequada.", message: waMessage() })}`;

  return page({
    title: "Áreas de Atuação | Vieira & Marques",
    description:
      "Família, Sucessório, Trabalhista, Criminal, Médico e Saúde, Bancário, Imobiliário e Previdenciário: as áreas e os serviços da Vieira & Marques Advogados.",
    path: PATH,
    preload: [imgPreload("equipe-reuniao", "100vw")],
    crumbs: CRUMBS,
    schema: [
      {
        "@type": "CollectionPage",
        name: "Áreas de Atuação",
        hasPart: practiceAreas.map((a) => ({ "@type": "Service", name: a.title, provider: { "@id": "https://vieiraemarquesadvogados.com/#org" }, url: `https://vieiraemarquesadvogados.com${areaUrl(a)}` })),
      },
    ],
    body,
  });
}
