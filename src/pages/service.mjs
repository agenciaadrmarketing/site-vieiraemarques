import { esc, join, when } from "../lib/html.mjs";
import { SITE, isPending, waMessage, whatsappUrl } from "../data/site.mjs";
import { areaUrl, areaFaqUrl, AREAS_HUB, areaById } from "../data/areas.mjs";
import { articles } from "../data/articles.mjs";
import { faqByArea } from "../data/faq.mjs";
import { team, teamByArea } from "../data/team.mjs";
import { AREA_LP } from "../data/area-lp.mjs";
import { lpHero, lpCta, lpTeam, lpStructure, lpReach } from "../partials/lp.mjs";
import { imgPreload } from "../partials/media.mjs";
import { serviceHref } from "../data/services/index.mjs";
import { page, breadcrumbs } from "../partials/layout.mjs";
import { icon } from "../partials/icons.mjs";
import { faqSchema, articleRow } from "../partials/components.mjs";
import { renderBlock } from "../partials/service-blocks.mjs";
import { leadForm } from "../partials/lead-form.mjs";
import { whatsappPanel } from "../partials/whatsapp-panel.mjs";

const waMsg = (p) => p.whatsapp?.message ?? waMessage(p.serviceData.title.toLowerCase());
// Destino do contato: formulário (SITE.forms) ou WhatsApp direto com a mensagem da página.
const contactCta = (p, cta, cls, label) =>
  SITE.forms
    ? `<a class="${cls}" href="#formulario" data-cta="${cta}">${esc(p.hero.cta ?? "Entender meu caso")} ${label}</a>`
    : `<a class="${cls}" href="${whatsappUrl(waMsg(p))}" target="_blank" rel="noopener" data-cta="${cta}">${icon.whatsapp(18)} Conversar pelo WhatsApp</a>`;

// Índice: lista aberta no desktop e acordeão no mobile, decididos só por CSS
// (abrir o <details> via JS depois do carregamento deslocava o conteúdo).
function tocNav(toc) {
  const items = `<ol>${join(toc, (b) => `<li><a href="#${b.id}">${esc(b.toc)}</a></li>`)}<li><a href="#${SITE.forms ? "formulario" : "contato"}">${SITE.forms ? "Enviar informações" : "Falar com a equipe"}</a></li></ol>`;
  return `<nav class="svc-toc svc-toc--desktop" aria-label="Nesta página"><p class="svc-toc__title">Nesta página</p>${items}</nav>
        <details class="svc-toc svc-toc--mobile"><summary class="svc-toc__title">Nesta página</summary>${items}</details>`;
}

function hero(p, crumbs) {
  const toc = p.blocks.filter((b) => b.toc);
  const lp = AREA_LP[p.area];
  const aside = `${when(p.hero.facts, `<dl class="svc-facts">${join(p.hero.facts ?? [], (f) => `<div><dt>${esc(f.label)}</dt><dd>${f.text}</dd></div>`)}</dl>`)}
        ${when(toc.length, tocNav(toc))}`;
  return lpHero({
    crumbs,
    badge: `${p.areaData.title} · ${p.serviceData.title}`,
    title: `${esc(p.hero.h1)}${p.hero.grad ? ` <span class="grad">${esc(p.hero.grad)}</span>` : ""}`,
    text: p.hero.lede,
    message: waMsg(p),
    cta: SITE.forms ? (p.hero.cta ?? "Entender meu caso") : "Falar com a equipe",
    secondary: p.hero.secondary,
    note: ["Atendimento sigiloso", "Presencial em Boituva", "Online em todo o Brasil"],
    image: p.hero.image ?? lp.image,
    alt: p.hero.imageAlt ?? lp.alt,
    position: lp.position,
    aside: p.hero.facts || toc.length ? aside : "",
  }).replace('class="lp-hero on-dark"', 'class="lp-hero svc-hero on-dark"');
}

function related(p) {
  const services = (p.related?.services ?? []).map(([areaId, serviceId]) => {
    const area = areaById[areaId];
    const s = area.services.find((x) => x.id === serviceId);
    return { href: serviceHref(areaId, serviceId), title: s.title, area: area.title };
  });
  const knowledge = articles.filter((a) => (p.related?.articleAreas ?? [p.area]).includes(a.area));
  const faqArea = p.related?.faqArea ?? p.area;
  const hasFaq = (faqByArea[faqArea] ?? []).length > 0;
  if (!services.length && !knowledge.length && !hasFaq) return "";
  return `<section class="section section--muted" aria-labelledby="relacionados-titulo">
  <div class="container">
    <h2 class="sr-only" id="relacionados-titulo">Relacionados</h2>
    <div class="svc-related">
      ${when(services.length, `<div class="stack-sm" data-reveal>
        <p class="eyebrow">Serviços relacionados</p>
        <ul class="svc-related__list">${join(services, (s) => `<li><a href="${s.href}" data-track="related_service_click"><span class="svc-related__area">${esc(s.area)}</span><span class="svc-related__title">${esc(s.title)}</span>${icon.arrow(16)}</a></li>`)}</ul>
      </div>`)}
      ${when(knowledge.length || hasFaq, `<div class="stack-sm" data-reveal>
        <p class="eyebrow">Base de conhecimento</p>
        ${when(knowledge.length, `<ul class="article-list">${join(knowledge, (a) => articleRow(a).replace("<a href", '<a data-track="related_content_click" href'))}</ul>`)}
        ${when(hasFaq, `<a class="link-arrow svc-related__more" href="${areaFaqUrl(areaById[faqArea])}" data-track="related_content_click">Perguntas frequentes sobre ${esc(areaById[faqArea].title)} ${icon.arrow(14)}</a>`)}
        ${when(knowledge.length, `<a class="link-arrow svc-related__more" href="/conhecimento/?area=${p.area}" data-track="related_content_click">Conteúdos de ${esc(areaById[p.area].shortTitle)} ${icon.arrow(14)}</a>`)}
      </div>`)}
    </div>
  </div>
</section>`;
}

function formSection(p) {
  const f = p.form;
  return `<section class="section section--dark svc-form-section" aria-labelledby="formulario-titulo">
  <div class="container">
    <div class="split">
      <div class="stack" data-reveal>
        <p class="eyebrow">Contato</p>
        <h2 class="h-section">${f.heading}</h2>
        <p class="lead">${f.lead}</p>
        <ul class="checklist">${join(f.points, (pt) => `<li>${icon.check(18)}<span>${pt}</span></li>`)}</ul>
        <p class="muted svc-form__alt">Prefere telefone? <a class="text-link" href="${SITE.phone.href}">${SITE.phone.display}</a>${isPending(SITE.hours) ? "" : ` · ${esc(SITE.hours)}`}</p>
      </div>
      ${leadForm({
        title: f.title ?? `Enviar informações sobre ${p.serviceData.title.toLowerCase()}`,
        intro: "Campos obrigatórios: nome e WhatsApp. As demais respostas ajudam a direcionar a análise.",
        context: { area: p.areaData, service: p.serviceData },
        questions: f.questions,
        message: f.message,
        warning: f.warning,
        formId: `servico_${p.service}`,
      })}
    </div>
  </div>
</section>`;
}

function whatsappSection(p) {
  const f = p.form;
  return `<section class="section section--dark svc-form-section" id="contato" aria-labelledby="contato-titulo">
  <div class="container">
    <div class="split">
      <div class="stack" data-reveal>
        <p class="eyebrow">Contato</p>
        <h2 class="h-section" id="contato-titulo">${f.heading}</h2>
        <p class="lead">${f.lead}</p>
        <ul class="checklist">${join(f.points, (pt) => `<li>${icon.check(18)}<span>${pt}</span></li>`)}</ul>
      </div>
      ${whatsappPanel({
        id: "whatsapp",
        level: 3,
        intro: `A conversa abre com uma mensagem sobre ${esc(p.serviceData.title.toLowerCase())}. Você pode editá-la antes de enviar.`,
        message: waMsg(p),
        topics: f.questions.filter((q) => !q.showIf).map((q) => q.label),
        warning: f.warning,
      })}
    </div>
  </div>
</section>`;
}

export function renderService(p) {
  const crumbs = [
    { label: "Início", href: "/" },
    { label: "Áreas de Atuação", href: AREAS_HUB },
    { label: p.areaData.title, href: areaUrl(p.areaData) },
    { label: p.serviceData.title, href: p.path },
  ];
  const faqBlock = p.blocks.find((b) => b.type === "faq");
  const lp = AREA_LP[p.area];
  const people = teamByArea(p.area);
  const body = `<div data-service-page data-practice-area="${esc(p.areaData.title)}" data-service="${esc(p.serviceData.title)}">
${hero(p, crumbs)}
${join(p.blocks, renderBlock)}
${lpCta({ title: lp.band.title, text: lp.band.text, message: waMsg(p) })}
${lpTeam({ people: [...people, ...team.filter((t) => !people.includes(t))] })}
${lpStructure()}
${lpReach()}
${related(p)}
${SITE.forms ? formSection(p) : whatsappSection(p)}
${contactCta(p, "sticky", "svc-sticky-cta", SITE.forms ? icon.arrow(16) : "").replace("<a ", '<a data-sticky-cta data-hidden="true" hidden ')}
</div>`;

  const url = SITE.origin + p.path;
  return page({
    title: p.seo.title,
    description: p.seo.description,
    path: p.path,
    crumbs,
    floatingWhatsapp: false,
    preload: [imgPreload(p.hero.image ?? AREA_LP[p.area].image, "100vw")],
    whatsappMessage: waMsg(p),
    schema: [
      {
        "@type": "Service",
        name: p.serviceData.title,
        serviceType: p.serviceData.title,
        category: p.areaData.title,
        description: p.seo.description,
        url,
        provider: { "@id": `${SITE.origin}/#org` },
      },
      ...(faqBlock ? [faqSchema(faqBlock.items)] : []),
    ],
    body,
  });
}
