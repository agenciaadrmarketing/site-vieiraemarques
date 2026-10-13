import { esc, join, when } from "../lib/html.mjs";
import { SITE, waMessage, whatsappUrl } from "../data/site.mjs";
import { practiceAreas, areaUrl, AREAS_HUB } from "../data/areas.mjs";
import { hasPage, serviceHref } from "../data/services/index.mjs";
import { teamByArea, teamRecognitions } from "../data/team.mjs";
import { articles } from "../data/articles.mjs";
import { faqByArea } from "../data/faq.mjs";
import { page, breadcrumbs } from "../partials/layout.mjs";
import { img } from "../partials/media.mjs";
import { icon } from "../partials/icons.mjs";
import { sectionHead, faqList, faqSchema, articleRow, teamPanels } from "../partials/components.mjs";
import { whatsappPanel } from "../partials/whatsapp-panel.mjs";

// Página própria de cada área (página-pilar): apresenta a área, lista os serviços
// (com link para os guias publicados), a equipe responsável, as perguntas frequentes
// e os conteúdos da Base de Conhecimento. Mãe das páginas /areas/<área>/<serviço>/.

const description = (area) => {
  const base = `${area.summary.replace(/\s+—\s+/, ": ")} Atendimento em Boituva (SP), na região de Sorocaba e online.`;
  return base.length <= 160 ? base : `${area.summary} Atendimento em Boituva (SP) e online.`;
};

function serviceCard(area, s) {
  const published = hasPage(area.id, s.id);
  return `<li class="service${published ? " service--guide" : ""}" id="${area.id}-${s.id}">
  <h3 class="service__title">${esc(s.title)}</h3>
  <p class="service__text">${esc(s.text)}</p>
  ${when(s.items.length, `<ul class="service__items" aria-label="Situações em ${esc(s.title)}">${join(s.items, (i) => `<li>${esc(i)}</li>`)}</ul>`)}
  ${published
    ? `<a class="service__link" href="${serviceHref(area.id, s.id)}">Guia completo: ${esc(s.title.toLowerCase())} ${icon.arrow(14)}</a>`
    : `<a class="service__link service__link--wa" href="${whatsappUrl(waMessage(s.title.toLowerCase()))}" target="_blank" rel="noopener">${icon.whatsapp(14)} Falar sobre ${esc(s.title.toLowerCase())}</a>`}
</li>`;
}

// Com 1 ou 2 profissionais, os painéis expansíveis cortariam a foto: cartão de perfil.
const teamCards = (people) => `<ul class="team-cards">${join(people, (p) => `<li class="team-card" data-reveal>
  <figure class="team-card__photo">${img(p.photo, { alt: `${p.name}, ${p.role.toLowerCase()} da Vieira & Marques`, sizes: "(min-width: 760px) 240px, 100vw", style: `object-position:${p.position}` })}</figure>
  <div class="team-card__body">
    <p class="team-card__meta">${esc(p.role)} · ${esc(p.oab)}</p>
    <h3 class="team-card__name">${esc(p.name)}</h3>
    <p class="team-card__bio">${esc(p.bio)}</p>
    ${when(p.tags?.length, `<ul class="team-panel__tags team-card__tags" aria-label="Temas">${join(p.tags ?? [], (t) => `<li>${esc(t)}</li>`)}</ul>`)}
    <a class="link-arrow" href="/escritorio/#${p.id}">Formação completa ${icon.arrow(14)}</a>
  </div>
</li>`)}</ul>`;

export function renderArea(area) {
  const path = areaUrl(area);
  const crumbs = [
    { label: "Início", href: "/" },
    { label: "Áreas de Atuação", href: AREAS_HUB },
    { label: area.title, href: path },
  ];
  const services = area.services;
  const guides = services.filter((s) => hasPage(area.id, s.id));
  const people = teamByArea(area.id);
  const faqs = faqByArea[area.id] ?? [];
  const related = articles.filter((a) => a.area === area.id);
  const msg = waMessage(area.title);
  const others = practiceAreas.filter((a) => a.id !== area.id);

  const body = `
<section class="page-hero area-hero on-dark" aria-labelledby="page-titulo">
  <div class="container">
    ${breadcrumbs(crumbs)}
    <div class="page-hero__grid">
      <div class="stack">
        <p class="eyebrow">Área de atuação · ${area.number}</p>
        <h1 class="page-hero__title" id="page-titulo">${esc(area.title)}</h1>
        <p class="lead">${esc(area.description)}</p>
        <div class="btn-row">
          <a class="btn btn--whatsapp" href="${whatsappUrl(msg)}" target="_blank" rel="noopener" data-cta="hero">${icon.whatsapp(18)} Conversar pelo WhatsApp</a>
          <a class="btn btn--ghost-light" href="#servicos">Ver serviços</a>
        </div>
      </div>
      <aside class="page-hero__aside" aria-label="Resumo da área">
        <dl class="svc-facts">
          <div><dt>Serviços</dt><dd>${services.length} situações atendidas${guides.length ? `, ${guides.length} com guia completo` : ""}.</dd></div>
          <div><dt>Profissionais</dt><dd>${people.length ? esc(people.map((p) => p.name).join(", ")) : "Equipe do escritório, com análise individual de cada caso."}</dd></div>
          <div><dt>Atendimento</dt><dd>Presencial em Boituva, na região de Sorocaba e por vídeo em todo o Brasil.</dd></div>
        </dl>
      </aside>
    </div>
  </div>
</section>

<section class="section section--white" id="servicos" aria-labelledby="servicos-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Serviços", id: "servicos-titulo", title: `O que o escritório atende em <span class="grad">${esc(area.title)}.</span>`, lead: guides.length ? "Os serviços com guia completo explicam o tema, os documentos e as dúvidas mais comuns. Nos demais, fale direto com a equipe." : "Fale com a equipe sobre a sua situação: a análise começa pelos fatos e documentos." })}
    <ul class="services area-services">${join(services, (s) => serviceCard(area, s))}</ul>
  </div>
</section>

${people.length ? `<section class="section section--muted" aria-labelledby="equipe-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Equipe", id: "equipe-titulo", title: `Quem atua <span class="grad">nesta área.</span>`, lead: "Inscrição na OAB, formação e áreas de atuação de cada profissional." })}
    ${people.length >= 3 ? teamPanels(people, { profileLinks: true }) : teamCards(people)}
  </div>
</section>` : `<section class="section section--dark svc-trust-section" aria-labelledby="escritorio-titulo">
  <div class="container">
    <div class="svc-trust" data-reveal>
      <figure class="svc-trust__media">${img("equipe-reuniao", { alt: "Equipe da Vieira & Marques reunida no escritório em Boituva", sizes: "(min-width: 960px) 460px, 100vw" })}</figure>
      <div class="stack">
        <p class="eyebrow">Vieira &amp; Marques</p>
        <h2 class="h-card" id="escritorio-titulo">Análise individual de cada situação, com advogados que respondem pela área.</h2>
        <p class="muted">${esc(teamRecognitions[1])}</p>
        <a class="link-arrow" href="/escritorio/#equipe">Conheça a equipe ${icon.arrow(14)}</a>
      </div>
    </div>
  </div>
</section>`}

${faqs.length ? `<section class="section section--white" id="perguntas" aria-labelledby="perguntas-titulo">
  <div class="container container--narrow">
    ${sectionHead({ eyebrow: "Perguntas frequentes", id: "perguntas-titulo", title: `Dúvidas comuns sobre <span class="grad">${esc(area.shortTitle === "Médico e Saúde" ? "Direito Médico e da Saúde" : area.title)}.</span>` })}
    ${faqList(faqs)}
  </div>
</section>` : ""}

${related.length ? `<section class="section section--muted" aria-labelledby="conteudos-titulo">
  <div class="container container--narrow">
    ${sectionHead({ eyebrow: "Base de conhecimento", id: "conteudos-titulo", title: `Conteúdos sobre <span class="grad">${esc(area.shortTitle)}.</span>` })}
    <ul class="article-list">${join(related, (a) => articleRow(a))}</ul>
    <p class="mt-lg"><a class="link-arrow" href="/conhecimento/?area=${area.id}">Todos os conteúdos de ${esc(area.shortTitle)} ${icon.arrow(14)}</a></p>
  </div>
</section>` : ""}

<section class="section section--dark svc-form-section" id="contato" aria-labelledby="contato-titulo">
  <div class="container">
    <div class="split">
      <div class="stack" data-reveal>
        <p class="eyebrow">Contato</p>
        <h2 class="h-section" id="contato-titulo">Conte o que aconteceu. <span class="grad">A análise começa pelos fatos.</span></h2>
        <p class="lead">Um advogado da área lê a mensagem e indica os próximos passos e os documentos necessários.</p>
        <nav class="area-others" aria-label="Outras áreas de atuação">
          <p class="eyebrow">Outras áreas</p>
          <ul>${join(others, (a) => `<li><a href="${areaUrl(a)}">${esc(a.title)}</a></li>`)}</ul>
        </nav>
      </div>
      ${whatsappPanel({
        id: "whatsapp",
        level: 3,
        intro: `A conversa abre com uma mensagem sobre ${esc(area.title)}. Você pode editá-la antes de enviar.`,
        message: msg,
        topics: ["O que aconteceu e quando", "Quem está envolvido", "Quais documentos você já tem"],
      })}
    </div>
  </div>
</section>`;

  return page({
    title: `${area.title} | Vieira & Marques`,
    description: description(area),
    path,
    crumbs,
    whatsappMessage: msg,
    schema: [
      {
        "@type": "Service",
        name: area.title,
        serviceType: area.title,
        description: area.description,
        url: SITE.origin + path,
        provider: { "@id": `${SITE.origin}/#org` },
        areaServed: ["Boituva", "Sorocaba", "São Paulo", "Brasil"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Serviços em ${area.title}`,
          itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.text } })),
        },
      },
      ...(faqs.length ? [faqSchema(faqs)] : []),
    ],
    body,
  });
}
