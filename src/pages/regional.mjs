import { esc, join, when } from "../lib/html.mjs";
import { SITE } from "../data/site.mjs";
import { areaById } from "../data/areas.mjs";
import { serviceHref } from "../data/services/index.mjs";
import { articles } from "../data/articles.mjs";
import { guides } from "../data/guides.mjs";
import { REGIONAL, REGIONAL_GROUPS, CITIES_HUB, regionalPath } from "../data/regional.mjs";
import { teamWithProfile, profilePath } from "../data/team.mjs";
import { page } from "../partials/layout.mjs";
import { imgPreload } from "../partials/media.mjs";
import { icon } from "../partials/icons.mjs";
import { articleRow, faqSchema } from "../partials/components.mjs";
import { lpHero, lpHead, lpReach, lpAreaCards, lpStructure, lpFaq, lpCta } from "../partials/lp.mjs";

// Páginas regionais (/advogado-<cidade>/): um modelo para as 32 cidades de src/data/regional.mjs.
// Jornada: hero local → como funciona o atendimento → mapa de SP → áreas → serviços → escritório
// → conteúdos → perguntas da cidade → chamada final. O endereço exibido é sempre o da sede.

const sede = SITE.units[0];
const HUB_LABEL = "Cidades atendidas em SP";
const ALT = {
  fachada: "Fachada do escritório Vieira & Marques em Boituva",
  "equipe-reuniao": "Equipe da Vieira & Marques reunida na sala de reunião do escritório",
  "hero-home": "Mesa de trabalho com notebook exibindo a marca Vieira & Marques, no escritório em Boituva",
  equipe: "Equipe da Vieira & Marques reunida na sede, em Boituva",
  "hero-conhecimento": "Advogada da Vieira & Marques à mesa de trabalho, no escritório em Boituva",
  "escritorio-interno": "Ambiente interno do escritório em Boituva",
  "sala-reuniao": "Sala de reunião do escritório, em Boituva",
  recepcao: "Recepção do escritório, com o logotipo Vieira & Marques na parede",
  "mesa-trabalho": "Estação de trabalho do escritório, com notebook e área de espera ao fundo",
};

const label = (c) => `${c.city}/SP`;
const message = (c) => `Olá! Vim pela página de ${c.city} no site da Vieira & Marques e gostaria de orientação.`;

// Formas de atendimento: derivadas do modo da cidade, sempre com o que o escritório confirma.
function meeting(c) {
  if (c.mode === "sede") return `Presencial na sede (${sede.street}), com horário combinado, ou por vídeo.`;
  if (c.mode === "sorocaba") return "Presencial em Sorocaba, com horário combinado, na sede em Boituva ou por vídeo.";
  if (c.mode === "online") return "Por vídeo, no horário combinado. Se preferir, presencial na sede, em Boituva, com agendamento.";
  return c.near === "boituva"
    ? "Por vídeo ou presencial, com horário combinado: na sede, em Boituva, ou em Sorocaba."
    : "Por vídeo ou presencial, com horário combinado: em Sorocaba ou na sede, em Boituva.";
}
const NOTE = {
  sede: ["Sede em Boituva/SP", "Presencial com horário combinado", "Reuniões por vídeo"],
  sorocaba: ["Presencial em Sorocaba com horário combinado", "Reuniões por vídeo", "Sede em Boituva/SP"],
  regiao: ["Reuniões por vídeo", "Presencial em Sorocaba ou Boituva", "Atendimento sigiloso"],
  online: ["Atendimento online", "Assinatura eletrônica", "Sede em Boituva/SP"],
};
function reach(c) {
  if (c.mode === "sede") return { title: `A sede, <span class="grad">no mapa de São Paulo.</span>`, text: "Da sede, em Boituva, a equipe atende presencialmente os clientes da cidade e da região e, por vídeo, clientes de todo o estado de São Paulo." };
  if (c.mode === "sorocaba") return { title: `Sorocaba no mapa <span class="grad">do atendimento.</span>`, text: "Sorocaba e Boituva são os dois pontos de atendimento presencial do escritório, sempre com horário combinado. Para as demais cidades do estado, as reuniões são por vídeo." };
  if (c.mode === "online") {
    const title = c.city === "São Paulo" ? `A capital e a sede, <span class="grad">no mapa de São Paulo.</span>` : `${esc(c.city)} no mapa <span class="grad">do atendimento.</span>`;
    return { title, text: `${esc(c.city)} recebe atendimento online, com reuniões por vídeo. O mapa mostra também a sede, em Boituva, onde é possível marcar uma reunião presencial.` };
  }
  return { title: `${esc(c.city)} no mapa <span class="grad">do atendimento.</span>`, text: `${esc(c.city)} integra a Região Metropolitana de Sorocaba. O atendimento presencial acontece ${c.near === "boituva" ? "na sede, em Boituva, ou em Sorocaba" : "em Sorocaba ou na sede, em Boituva"}, com horário combinado; as demais etapas podem ser feitas por vídeo.` };
}

function attendance(c) {
  const facts = [
    [icon.whatsapp(18), "Primeiro contato", `Pelo WhatsApp ou telefone ${SITE.phone.display}, com a equipe de atendimento, que faz a triagem inicial.`],
    [icon.pin(18), "Reunião", meeting(c)],
    [icon.doc(18), "Documentos", c.mode === "sede" ? "Podem ser levados à sede ou enviados em formato digital antes da reunião." : "Enviados em formato digital; contratos e procurações podem ser assinados eletronicamente."],
    [icon.shield(18), "Acompanhamento", "Processos eletrônicos acompanhados à distância, com atualizações da equipe."],
  ];
  return `<section class="lp-sec lp-sec--white" id="atendimento" aria-labelledby="atendimento-titulo">
  <div class="container">
    <div class="reg-intro">
      <div>
        ${lpHead({ eyebrow: "Como funciona o atendimento", title: c.intro.title, id: "atendimento-titulo", align: "left" })}
        <div class="prose reg-intro__text" data-reveal>${join(c.intro.text, (t) => `<p>${esc(t)}</p>`)}</div>
      </div>
      <ul class="reg-modes" data-reveal aria-label="Formas de atendimento para ${esc(label(c))}">
        ${join(facts, ([ic, k, v]) => `<li><span class="reg-modes__icon" aria-hidden="true">${ic}</span><span class="reg-modes__label">${esc(k)}</span><span class="reg-modes__text">${esc(v)}</span></li>`)}
      </ul>
    </div>
  </div>
</section>`;
}

function services(c) {
  const items = c.services.map(([areaId, serviceId]) => {
    const area = areaById[areaId];
    const s = area.services.find((x) => x.id === serviceId);
    if (!s) throw new Error(`Serviço inexistente em ${c.slug}: ${areaId}/${serviceId}`);
    return { href: serviceHref(areaId, serviceId), title: s.title, area: area.title, areaId, serviceId };
  });
  return `<section class="lp-sec lp-sec--white" id="servicos" aria-labelledby="servicos-titulo">
  <div class="container">
    ${lpHead({ eyebrow: "Serviços relacionados", title: `Temas com página própria <span class="grad">para clientes de ${esc(c.city)}.</span>`, lead: esc(c.servicesLead), id: "servicos-titulo" })}
    <ul class="svc-related__list reg-services" data-reveal>${join(items, (s) => `<li><a href="${s.href}" data-track="regional_service_click" data-area="${s.areaId}" data-servico="${s.serviceId}"><span class="svc-related__area">${esc(s.area)}</span><span class="svc-related__title">${esc(s.title)}</span>${icon.arrow(16)}</a></li>`)}</ul>
    <p class="reg-more" data-reveal><a class="link-arrow" href="/areas-de-atuacao/">Ver todas as áreas e serviços ${icon.arrow(14)}</a></p>
  </div>
</section>`;
}

// Artigos e guias das áreas da cidade, intercalados na ordem de c.content (sem repetir).
function knowledge(c) {
  const pools = c.content.map((id) => articles.filter((a) => a.area === id));
  const picked = [];
  for (let i = 0; picked.length < 3 && pools.some((p) => p[i]); i++) for (const p of pools) if (p[i] && picked.length < 3) picked.push(p[i]);
  const gs = guides.filter((g) => c.content.includes(g.area)).slice(0, 2);
  if (!picked.length && !gs.length) return "";
  const first = c.content[0];
  return `<section class="lp-sec lp-sec--muted" id="conteudos" aria-labelledby="conteudos-titulo">
  <div class="container">
    ${lpHead({ eyebrow: "Base de conhecimento", title: `Para ler antes <span class="grad">da primeira conversa.</span>`, lead: "Conteúdos informativos escritos pela equipe sobre os temas desta página.", id: "conteudos-titulo" })}
    <div class="svc-related reg-knowledge">
      ${when(picked.length, `<div class="stack-sm" data-reveal>
        <p class="eyebrow">Artigos</p>
        <ul class="article-list">${join(picked, (a) => articleRow(a).replace("<a href", '<a data-track="related_content_click" href'))}</ul>
      </div>`)}
      <div class="stack-sm" data-reveal>
        ${when(gs.length, `<p class="eyebrow">Guias em PDF</p>
        <ul class="svc-related__list">${join(gs, (g) => `<li><a href="${esc(g.url)}" target="_blank" rel="noopener" data-track="related_content_click"><span class="svc-related__area">${esc(g.label)}</span><span class="svc-related__title">${esc(g.title)}</span>${icon.arrow(16)}</a></li>`)}</ul>`)}
        <a class="link-arrow svc-related__more" href="/conhecimento/?area=${first}" data-track="related_content_click">Mais conteúdos na Base de Conhecimento ${icon.arrow(14)}</a>
      </div>
    </div>
  </div>
</section>`;
}

export function renderRegional(c) {
  const path = regionalPath(c);
  const crumbs = [
    { label: "Início", href: "/" },
    { label: HUB_LABEL, href: CITIES_HUB },
    { label: label(c), href: path },
  ];
  const msg = message(c);
  const title = c.title ?? `Advogado em ${label(c)} | Vieira & Marques`;
  const alt = ALT[c.image];
  // Profissionais das áreas destacadas na página (mesma relação área → advogado das páginas-pilar).
  const areas = new Set([...c.services.map(([a]) => a), ...c.content]);
  const pros = teamWithProfile.filter((p) => p.areas.some((a) => areas.has(a)));
  const prosText = pros.length ? ` Profissionais das áreas desta página: ${pros.map((p) => `<a class="text-link" href="${profilePath(p)}">${esc(p.name)}</a>`).join(", ")}.` : "";
  const structure = c.mode === "sede"
    ? { text: `Sede em Boituva/SP, com recepção e salas de reunião. <a class="text-link" href="/escritorio/">Conheça o escritório</a>.${prosText}` }
    : {
        title: `Quem atende os clientes <span class="grad">de ${esc(c.city)}.</span>`,
        text: `A Vieira &amp; Marques Sociedade de Advogados tem sede em Boituva/SP e advogados inscritos na OAB/SP, com atuação dividida por áreas. <a class="text-link" href="/escritorio/">Conheça o escritório</a>.${prosText}`,
      };
  // Cidades vizinhas (as 3 mais próximas no mapa): navegação entre regionais sem depender só do índice.
  const near = REGIONAL.filter((o) => o !== c).map((o) => [Math.hypot(o.coords[0] - c.coords[0], o.coords[1] - c.coords[1]), o]).sort((a, b) => a[0] - b[0]).slice(0, 3).map(([, o]) => o);

  const body = `
<div hidden data-city-page="${esc(c.city)}"></div>
${lpHero({
  crumbs,
  badge: `Atendimento jurídico · ${label(c)}`,
  title: `Advogado em ${esc(label(c))}<span class="sr-only">:</span><br><span class="grad">${esc(c.grad)}</span>`,
  text: esc(c.lead),
  message: msg,
  cta: "Falar com nossa equipe",
  secondary: { href: "#atendimento", label: "Como funciona o atendimento" },
  note: NOTE[c.mode],
  image: c.image,
  alt,
  position: c.position ?? "50% 45%",
}).replace('class="lp-hero on-dark"', 'class="lp-hero reg-hero on-dark"')}

${attendance(c)}

${lpReach({ scope: "sp", city: { name: c.city, coords: c.coords, label: c.label }, points: [], ...reach(c) })}

${lpAreaCards({ title: `Áreas de atuação para <span class="grad">clientes de ${esc(c.city)}.</span>`, lead: "Cada área tem página própria, com os temas, os documentos úteis e a forma de atuação do escritório." })}

${services(c)}

${lpStructure(structure)}

${knowledge(c)}

${lpFaq({ title: `Perguntas frequentes <span class="grad">— ${esc(c.city)}.</span>`, lead: "Respostas gerais e informativas. Cada caso depende da análise dos fatos e dos documentos.", items: c.faq, message: msg, ctaLabel: "Entrar em contato" })}

${lpCta({ title: c.cta.title, text: esc(c.cta.text), message: msg, label: "Solicitar atendimento" })}

<nav class="reg-near" aria-label="Cidades próximas">
  <div class="container"><p><span class="reg-near__label">Cidades próximas:</span> ${near.map((o) => `<a class="text-link" href="${regionalPath(o)}">${esc(o.city)}</a>`).join(" · ")} · <a class="text-link" href="${CITIES_HUB}">todas as cidades atendidas</a></p></div>
</nav>`;

  return page({
    visit: false,
    title,
    description: c.description,
    path,
    crumbs,
    ogImage: c.image,
    ogAlt: alt,
    preload: [imgPreload(c.image, "100vw")],
    whatsappMessage: msg,
    schema: [
      {
        "@type": "WebPage",
        "@id": `${SITE.origin}${path}#pagina`,
        url: SITE.origin + path,
        name: title,
        description: c.description,
        about: { "@id": `${SITE.origin}${path}#servico` },
        inLanguage: "pt-BR",
      },
      {
        "@type": "Service",
        "@id": `${SITE.origin}${path}#servico`,
        name: `Atendimento jurídico para clientes de ${label(c)}`,
        serviceType: "Serviços advocatícios",
        provider: { "@id": `${SITE.origin}/#org` },
        areaServed: { "@type": "City", name: c.city, containedInPlace: { "@type": "State", name: "São Paulo" } },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: SITE.origin + path,
          servicePhone: { "@type": "ContactPoint", telephone: SITE.phone.e164, contactType: "customer service", areaServed: "BR", availableLanguage: "Portuguese" },
        },
      },
      faqSchema(c.faq),
    ],
    body,
  });
}

// Índice das cidades atendidas (/cidades-atendidas/): nível intermediário da trilha de navegação.
export function renderRegionalHub() {
  const crumbs = [
    { label: "Início", href: "/" },
    { label: HUB_LABEL, href: CITIES_HUB },
  ];
  const msg = "Olá! Vim pela página de cidades atendidas no site da Vieira & Marques e gostaria de orientação.";
  const body = `
${lpHero({
  crumbs,
  badge: "Atendimento no estado de São Paulo",
  title: `Cidades atendidas <span class="grad">em São Paulo.</span>`,
  text: "A Vieira &amp; Marques tem sede em Boituva e atende presencialmente também em Sorocaba, com horário combinado. Clientes das demais cidades — da Região Metropolitana de Sorocaba à capital — são atendidos por videochamada.",
  message: msg,
  cta: "Falar com nossa equipe",
  secondary: { href: "#cidades", label: "Ver as cidades" },
  note: ["Sede em Boituva/SP", "Presencial em Boituva e Sorocaba", "Online em todo o estado"],
  image: "equipe-reuniao",
  alt: ALT["equipe-reuniao"],
  position: "50% 45%",
}).replace('class="lp-hero on-dark"', 'class="lp-hero reg-hero on-dark"')}

<section class="lp-sec lp-sec--white" id="cidades" aria-labelledby="cidades-titulo">
  <div class="container">
    ${lpHead({ eyebrow: "Páginas por cidade", title: `${REGIONAL.length} cidades, <span class="grad">três formas de atendimento.</span>`, lead: "Cada página explica como funciona o atendimento para a cidade, os temas com conteúdo próprio e as perguntas mais comuns. O endereço do escritório é um só: a sede, em Boituva.", id: "cidades-titulo" })}
    <div class="reg-groups">
      ${join(REGIONAL_GROUPS, (g) => {
        const list = REGIONAL.filter(g.match);
        return `<div class="reg-group" data-reveal>
        <h3 class="reg-group__title">${esc(g.title)}</h3>
        <p class="reg-group__text">${esc(g.text)}</p>
        <ul class="reg-cities">${join(list, (c) => `<li><a href="${regionalPath(c)}">${esc(c.city)} ${icon.arrow(12)}</a></li>`)}</ul>
      </div>`;
      })}
    </div>
  </div>
</section>

${lpReach({ scope: "sp", hub: false, legend: true, title: `Sede em Boituva, <span class="grad">atendimento em todo o estado.</span>`, text: "Atendimento presencial na sede, em Boituva, e em Sorocaba, sempre com horário combinado. Para a capital, o interior e o litoral, as reuniões são por vídeo, com documentos digitais e assinatura eletrônica." })}

${lpAreaCards({ title: `Oito áreas de atuação, <span class="grad">em todas as cidades.</span>` })}

${lpCta({ title: `Não encontrou a sua cidade? <span class="grad">Fale com nossa equipe.</span>`, text: "O atendimento online alcança qualquer cidade do estado e do país. A equipe de atendimento faz a triagem e indica o formato de reunião.", message: msg, label: "Solicitar atendimento" })}`;

  return page({
    visit: false,
    title: "Cidades Atendidas em São Paulo | Vieira & Marques",
    description: "Cidades atendidas pela Vieira & Marques no estado de São Paulo: sede em Boituva, presencial em Sorocaba e online na capital, em Campinas, Santos e região.",
    path: CITIES_HUB,
    crumbs,
    ogImage: "equipe-reuniao",
    ogAlt: ALT["equipe-reuniao"],
    preload: [imgPreload("equipe-reuniao", "100vw")],
    whatsappMessage: msg,
    schema: [
      {
        "@type": "CollectionPage",
        "@id": `${SITE.origin}${CITIES_HUB}#pagina`,
        url: SITE.origin + CITIES_HUB,
        name: "Cidades atendidas em São Paulo",
        about: { "@id": `${SITE.origin}/#org` },
        hasPart: REGIONAL.map((c) => ({ "@type": "WebPage", name: `Advogado em ${label(c)}`, url: SITE.origin + regionalPath(c) })),
      },
    ],
    body,
  });
}
