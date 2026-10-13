import { esc, join, when } from "../lib/html.mjs";
import { SITE, isPending, whatsappUrl } from "../data/site.mjs";
import { practiceAreas, areaUrl } from "../data/areas.mjs";
import { img } from "./media.mjs";
import { icon } from "./icons.mjs";
import { breadcrumbs } from "./layout.mjs";
import { teamPanels, faqList, waButton } from "./components.mjs";
import images from "../data/images.json" with { type: "json" };
import mapa from "../data/mapa-sp.json" with { type: "json" };

export { waButton };

// Seções no padrão das landing pages publicadas (Verbas Rescisórias, Juros Abusivos,
// Golpe do Pix, Divórcio e Boituva), recriadas como componentes do site: as páginas de
// área, de serviço e as institucionais montam o mesmo desenho a partir dos mesmos blocos.
// As LPs eram React + estilos inline; aqui é HTML gerado no build + site.css + site.js.

const pad = (n) => String(n).padStart(2, "0");

// Cabeçalho de seção das LPs: sobretítulo em caixa alta, título com degradê e apoio.
export function lpHead({ eyebrow, title, lead, id, align = "center" }) {
  return `<header class="lp-head${align === "center" ? " lp-head--center" : ""}" data-reveal>
  ${when(eyebrow, `<p class="lp-eyebrow">${esc(eyebrow)}</p>`)}
  <h2 class="lp-h2" id="${id}">${title}</h2>
  ${when(lead, `<p class="lp-lead">${lead}</p>`)}
</header>`;
}

// Foto em baixíssima opacidade ao fundo da seção (textura das LPs). Decorativa.
const texture = (name, position = "center") =>
  `<div class="lp-texture" aria-hidden="true">${img(name, { alt: "", sizes: "640px", style: `object-position:${position}` })}</div>`;

const dots = (items) =>
  `<ul class="lp-dots">${join(items, (t) => `<li><span class="lp-dots__dot" aria-hidden="true"></span><span>${t}</span></li>`)}</ul>`;

/* ---------- Hero ---------- */
// Foto em tela cheia com véu escuro, selo, título com degradê, texto e CTA verde.
// aside: conteúdo opcional à direita (ex.: resumo e índice das páginas de serviço).
// imageMobile: versão vertical para telas estreitas (enquadramento próprio, via <picture>).
export const HERO_MOBILE = "(max-width: 720px)";
export function lpHero({ crumbs, badge, title, text, message, cta = "Falar no WhatsApp", secondary, note = [], image, alt, position = "60% 40%", imageMobile, positionMobile = "50% 50%", aside }) {
  const mobile = imageMobile ? images[imageMobile] : null;
  const bg = img(image, { alt, sizes: "100vw", priority: true, className: "lp-hero__bg", style: `object-position:${position};--pos-m:${positionMobile}` });
  return `<section class="lp-hero on-dark" aria-labelledby="page-titulo">
  <div class="lp-hero__media" aria-hidden="true">${mobile
    ? `<picture><source media="${HERO_MOBILE}" srcset="${mobile.variants.map((v) => `${v.src} ${v.w}w`).join(", ")}" sizes="100vw" width="${mobile.variants.at(-1).w}" height="${mobile.variants.at(-1).h}">${bg}</picture>`
    : bg}</div>
  <div class="lp-hero__veil" aria-hidden="true"></div>
  <div class="container lp-hero__container">
    ${crumbs ? breadcrumbs(crumbs) : ""}
    <div class="lp-hero__grid${aside ? " lp-hero__grid--aside" : ""}">
      <div class="lp-hero__in">
        <p class="lp-badge"><span class="lp-badge__dot" aria-hidden="true"></span>${esc(badge)}</p>
        <h1 class="lp-hero__title" id="page-titulo">${title}</h1>
        <p class="lp-hero__text">${text}</p>
        <div class="lp-hero__cta">
          ${waButton(message, cta, { cta: "hero", size: "lg" })}
          ${secondary ? `<a class="lp-hero__secondary" href="${secondary.href}">${esc(secondary.label)} ${icon.arrow(14)}</a>` : ""}
        </div>
        ${when(note.length, `<ul class="lp-hero__note">${join(note, (n) => `<li>${esc(n)}</li>`)}</ul>`)}
      </div>
      ${when(aside, `<div class="lp-hero__aside">${aside}</div>`)}
    </div>
  </div>
</section>`;
}

/* ---------- Serviços ---------- */
// Cartões com ícone e número; o último é o cartão escuro com CTA.
// items: [{ id, icon, title, text, items?, href?, linkLabel?, message? }]
export function lpServices({ id = "servicos", eyebrow = "Serviços", title, lead, items, cta, texture: tex = "escritorio-interno" }) {
  const total = items.length + (cta ? 1 : 0);
  // O cartão de CTA ocupa as colunas que sobrarem na última linha (3 no desktop, 2 no tablet).
  const span = cta ? ` lp-card--lg-${3 - ((total - 1) % 3)} lp-card--md-${2 - ((total - 1) % 2)}` : "";
  return `<section class="lp-sec lp-sec--muted lp-services" id="${id}" aria-labelledby="${id}-titulo">
  ${texture(tex)}
  <div class="container">
    ${lpHead({ eyebrow, title, lead, id: `${id}-titulo` })}
    <ul class="lp-cards" data-reveal>
      ${join(items, (s, i) => `<li class="lp-card"${s.id ? ` id="${s.id}"` : ""}>
        <div class="lp-card__top"><span class="lp-card__icon">${(icon[s.icon] ?? icon.doc)(20)}</span><span class="lp-card__num">${pad(i + 1)}</span></div>
        <h3 class="lp-card__title">${esc(s.title)}</h3>
        <p class="lp-card__text">${esc(s.text)}</p>
        ${when(s.items?.length, `<ul class="lp-card__items" aria-label="Situações em ${esc(s.title)}">${join(s.items ?? [], (t) => `<li>${esc(t)}</li>`)}</ul>`)}
        ${s.href
          ? `<a class="lp-card__link" href="${s.href}">${esc(s.linkLabel ?? "Saiba mais")} ${icon.arrow(14)}</a>`
          : s.message ? `<a class="lp-card__link lp-card__link--wa" href="${whatsappUrl(s.message)}" target="_blank" rel="noopener" data-cta="servico">${icon.whatsapp(14)} ${esc(s.linkLabel ?? "Falar sobre isso")}</a>` : ""}
      </li>`)}
      ${cta ? `<li class="lp-card lp-card--cta${span}">
        <p class="lp-card--cta__text">${esc(cta.text)}</p>
        ${waButton(cta.message, cta.label, { cta: "servicos" })}
      </li>` : ""}
    </ul>
  </div>
</section>`;
}

/* ---------- Como funciona ---------- */
// Cartões "presos" em zigue-zague, ligados por uma linha tracejada animada.
export const LP_STEPS = [
  { title: "Você entra em contato", text: "Pelo WhatsApp ou por telefone, do jeito que conseguir. Se tiver documentos, envie; se não tiver, a conversa começa mesmo assim." },
  { title: "Triagem com a equipe de atendimento", text: "A equipe registra as informações iniciais, identifica a área do caso e indica quais documentos são úteis para a análise." },
  { title: "Encaminhamento interno", text: "Quando aplicável, o caso é encaminhado ao advogado ou profissional responsável pela área." },
  { title: "Reunião e análise", text: "Na sede, em Boituva, ou por videochamada: você conhece os caminhos possíveis, os riscos e os documentos necessários." },
  { title: "Definição do caminho", text: "Orientação preventiva, tentativa de acordo ou atuação judicial, com etapas e condições combinadas por escrito." },
];

const PIN = `<svg class="lp-pin__icon" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z"/></svg>`;

export function lpSteps({ id = "como-funciona", eyebrow = "Como funciona", title = `O caminho do <span class="grad">primeiro contato à definição do caso.</span>`, lead = "O primeiro contato é feito com a equipe de atendimento, que organiza as informações e encaminha o caso. O envio da mensagem não constitui contratação.", steps = LP_STEPS, tone = "muted", tex = "sala-reuniao" } = {}) {
  return `<section class="lp-sec lp-sec--${tone} lp-steps" id="${id}" aria-labelledby="${id}-titulo">
  ${tone === "muted" ? texture(tex) : ""}
  <div class="container">
    ${lpHead({ eyebrow, title, lead, id: `${id}-titulo` })}
    <div class="lp-pins">
      <svg class="lp-pins__path" viewBox="0 0 1000 1060" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M290 150 C500 150, 550 270, 710 270 C850 270, 500 350, 290 450 C290 600, 550 720, 750 720 C950 720, 500 800, 290 850"/></svg>
      <ol class="lp-pins__list">
        ${join(steps.slice(0, 5), (s, i) => `<li class="lp-pin lp-pin--${i + 1}" data-reveal>
          <div class="lp-pin__card">
            ${PIN}
            <div class="lp-pin__body">
              <span class="lp-pin__num" aria-hidden="true">${pad(i + 1)}</span>
              <h3 class="lp-pin__title">${esc(s.title)}</h3>
              <p class="lp-pin__text">${esc(s.text)}</p>
            </div>
          </div>
        </li>`)}
      </ol>
    </div>
  </div>
</section>`;
}

/* ---------- Documentos (a "principal prova" das LPs) ---------- */
// Texto, lista e CTA à esquerda; à direita, a imagem em destaque (livro 3D para a CTPS).
export function lpProof({ id = "documentos", eyebrow = "Antes da primeira conversa", title, text, points, message, cta = "Enviar documentos para análise inicial", image, alt, book = false, tall = false, tex }) {
  return `<section class="lp-sec lp-sec--dark lp-proof on-dark" id="${id}" aria-labelledby="${id}-titulo">
  ${tex ? texture(tex) : ""}
  <div class="container">
    <div class="lp-split lp-split--proof">
      <div>
        ${lpHead({ eyebrow, title, lead: text, id: `${id}-titulo`, align: "left" })}
        <div data-reveal>
          ${dots(points.map(esc))}
          <div class="lp-proof__cta">${waButton(message, cta, { cta: "documentos" })}</div>
        </div>
      </div>
      <div class="lp-proof__visual" data-reveal>
        ${book
          ? `<div class="lp-book"><div class="lp-book__inner"><div class="lp-book__cover">${img(image, { alt, sizes: "300px" })}</div><div class="lp-book__pages" aria-hidden="true"></div></div></div>`
          : `<figure class="lp-proof__frame${tall ? " lp-proof__frame--tall" : ""}">${img(image, { alt, sizes: tall ? "(min-width: 940px) 400px, 80vw" : "(min-width: 940px) 520px, 100vw" })}</figure>`}
      </div>
    </div>
  </div>
</section>`;
}

/* ---------- Sobre (advogado responsável) ---------- */
// Foto grande de quem responde pela área, como na seção "Sobre" das LPs, seguida dos
// painéis com toda a equipe. Sem profissional definido, mostra a foto da equipe.
export function lpAbout({ id = "equipe", person, areaTitle, people, points = ["Atendimento humanizado, ético e sigiloso.", "Análise dos documentos antes de qualquer medida judicial.", "Prazos, etapas e riscos explicados em linguagem direta."] }) {
  const title = person
    ? `${esc(person.name)} — <span class="grad">${esc(areaTitle)}</span>`
    : `Advogados inscritos na OAB/SP, <span class="grad">com área de atuação definida.</span>`;
  const text = person
    ? `${esc(person.role)} · ${esc(person.oab)}. ${esc(person.bio)} O primeiro contato é feito com a equipe de atendimento, que encaminha o caso ao profissional responsável.`
    : "Cada área tem profissionais que respondem por ela. O primeiro contato é feito com a equipe de atendimento, que organiza as informações e encaminha o caso ao advogado responsável.";
  return `<section class="lp-sec lp-sec--dark lp-about lp-team on-dark" id="${id}" aria-labelledby="${id}-titulo">
  <div class="container">
    <div class="lp-split lp-split--about">
      <figure class="lp-about__photo" data-reveal>${person
        ? img(person.photo, { alt: `${person.name}, ${person.role.toLowerCase()} da Vieira & Marques`, sizes: "(min-width: 940px) 448px, 90vw", style: `object-position:${person.positionActive ?? "50% 25%"}` })
        : img("equipe", { alt: "Equipe da Vieira & Marques reunida na sede, em Boituva", sizes: "(min-width: 940px) 448px, 90vw", style: "object-position:50% 35%" })}</figure>
      <div>
        ${lpHead({ eyebrow: "Segurança e experiência jurídica", title, lead: text, id: `${id}-titulo`, align: "left" })}
        <div data-reveal>${dots(points.map(esc))}</div>
      </div>
    </div>
    <h3 class="lp-about__team">Conheça toda a equipe</h3>
    ${teamPanels(people, { profileLinks: true, headingLevel: 4 })}
  </div>
</section>`;
}

/* ---------- Equipe ---------- */
export function lpTeam({ id = "equipe", eyebrow = "Equipe", title = `Advogados inscritos na OAB/SP, <span class="grad">com área de atuação definida.</span>`, text = "Cada área tem profissionais que respondem diretamente por ela. Formação, inscrição na OAB e temas de atuação ficam à vista — informação verificável.", points = ["Atendimento humanizado, ético e sigiloso.", "Análise dos documentos antes de qualquer medida judicial.", "Prazos, etapas e riscos explicados em linguagem direta."], people, profileLinks = true } = {}) {
  return `<section class="lp-sec lp-sec--dark lp-team on-dark" id="${id}" aria-labelledby="${id}-titulo">
  <div class="container">
    <div class="lp-split lp-split--head">
      ${lpHead({ eyebrow, title, id: `${id}-titulo`, align: "left" })}
      <div data-reveal>
        <p class="lp-text">${text}</p>
        ${dots(points.map(esc))}
      </div>
    </div>
    ${teamPanels(people, { profileLinks })}
  </div>
</section>`;
}

/* ---------- Estrutura ---------- */
// Galeria da sede com legenda sobre a foto; clique abre a foto ampliada (site.js).
const sede = SITE.units[0];
export const STRUCTURE = [
  { image: "recepcao", title: "Recepção em Boituva/SP", caption: `${sede.street} — ${sede.district}`, alt: "Recepção do escritório Vieira & Marques, com diplomas e certificados na parede", wide: true },
  { image: "equipe", title: "A equipe", caption: "Profissionais que acompanham cada caso", alt: "Equipe da Vieira & Marques reunida na sede, em Boituva", position: "50% 35%" },
  { image: "sala-atendimento", title: "Sala de atendimento", caption: "Atendimento presencial ou por vídeo", alt: "Sala de atendimento do escritório, com mesa e cadeiras" },
  { image: "atendimento-mesa", title: "Como trabalhamos", caption: "Cada caso analisado a partir dos documentos", alt: "Advogada trabalhando no computador, na sede do escritório", wide: true, position: "50% 40%" },
];

export function lpStructure({ id = "estrutura", eyebrow = "O escritório", title = `Estrutura real, <span class="grad">equipe que você pode visitar.</span>`, text = "Sede em Boituva/SP, com atendimento presencial e reuniões por vídeo para clientes das demais cidades.", items = STRUCTURE } = {}) {
  return `<section class="lp-sec lp-sec--dark lp-structure on-dark" id="${id}" aria-labelledby="${id}-titulo">
  <div class="container">
    ${lpHead({ eyebrow, title, lead: text, id: `${id}-titulo`, align: "left" })}
    <ul class="lp-tiles" data-reveal>
      ${join(items, (t) => {
        const large = images[t.image].variants.at(-1).src;
        return `<li class="lp-tile${t.wide ? " lp-tile--wide" : ""}">
        <a href="${large}" data-lightbox data-title="${esc(t.title)}" data-caption="${esc(t.caption)}" aria-label="Ampliar foto: ${esc(t.title)}">
          ${img(t.image, { alt: t.alt, sizes: t.wide ? "(min-width: 960px) 780px, 100vw" : "(min-width: 960px) 390px, 100vw", style: t.position ? `object-position:${t.position}` : undefined })}
          <span class="lp-tile__caption"><span class="lp-tile__title">${esc(t.title)}</span><span class="lp-tile__text">${esc(t.caption)}</span></span>
        </a>
      </li>`;
      })}
    </ul>
  </div>
</section>`;
}

/* ---------- Faixa de chamada ---------- */
export function lpCta({ id = "chamada", title, text, message, label = "Falar com a equipe pelo WhatsApp", image = "equipe-reuniao", position = "center 45%" }) {
  return `<section class="lp-cta on-dark" aria-labelledby="${id}-titulo">
  <div class="lp-cta__media" aria-hidden="true">${img(image, { alt: "", sizes: "100vw", style: `object-position:${position}` })}</div>
  <div class="container lp-cta__inner" data-reveal>
    <h2 class="lp-cta__title" id="${id}-titulo">${title}</h2>
    <p class="lp-cta__text">${text}</p>
    ${waButton(message, label, { cta: "faixa", size: "lg" })}
  </div>
</section>`;
}

/* ---------- Pontos de atenção (carrossel) ---------- */
// Sem JS, os itens aparecem empilhados; com JS, um por vez, com setas e indicadores.
export function lpSignals({ id = "pontos-de-atencao", eyebrow = "Vale a pena saber", title, items, label = "Pontos de atenção" }) {
  const n = pad(items.length);
  return `<section class="lp-sec lp-sec--white lp-signals" id="${id}" aria-labelledby="${id}-titulo">
  <div class="container">
    ${lpHead({ eyebrow, title, id: `${id}-titulo` })}
    <div class="lp-signals__panel on-dark" data-signals data-reveal role="region" aria-roledescription="carrossel" aria-label="${esc(label)}">
      <span class="lp-signals__big" aria-hidden="true" data-signals-big>01</span>
      <div class="lp-signals__grid">
        <div class="lp-signals__rail" aria-hidden="true">
          <span class="lp-signals__label">${esc(label)}</span>
          <span class="lp-signals__bar"><span data-signals-progress style="height:${100 / items.length}%"></span></span>
        </div>
        <div class="lp-signals__main">
          <div class="lp-signals__slides" aria-live="polite">
            ${join(items, (it, i) => `<article class="lp-signal${i === 0 ? " is-active" : ""}" data-signal aria-roledescription="item" aria-label="${i + 1} de ${items.length}">
              <p class="lp-signal__pill"><span aria-hidden="true"></span>Item ${pad(i + 1)} de ${n}</p>
              <h3 class="lp-signal__title">${esc(it.title)}</h3>
              <p class="lp-signal__text">${esc(it.text)}</p>
            </article>`)}
          </div>
          <div class="lp-signals__controls" data-signals-controls hidden>
            <div class="lp-signals__dots">${join(items, (it, i) => `<button type="button" class="lp-signals__dot" data-signals-dot="${i}" aria-label="Ir para o item ${i + 1}"${i === 0 ? ' aria-current="true"' : ""}></button>`)}</div>
            <div class="lp-signals__arrows">
              <button type="button" class="lp-round" data-signals-prev aria-label="Item anterior">${icon.arrow(16)}</button>
              <button type="button" class="lp-round" data-signals-next aria-label="Próximo item">${icon.arrow(16)}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* ---------- Onde atendemos (mapa de SP) ---------- */
// Mapa gerado no build (src/tools/mapa-sp.mjs, malha do IBGE): sem d3, sem chamada à
// API do IBGE no navegador. As animações (contorno, cidades, sede e capital) são CSS.
const { k, tx, ty } = mapa.projection;
const project = ([lon, lat]) => {
  const y = Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
  return [+(k * ((lon * Math.PI) / 180) + tx).toFixed(1), +(ty - k * y).toFixed(1)];
};
const CAPITAL = [-46.63, -23.55];
const SEDE = [-47.67, -23.28];
const CITIES = [
  ["Campinas", -47.06, -22.91], ["Santos", -46.33, -23.96], ["São José dos Campos", -45.89, -23.18],
  ["Ribeirão Preto", -47.81, -21.18], ["Sorocaba", -47.46, -23.5], ["Bauru", -49.06, -22.31],
  ["Presidente Prudente", -51.39, -22.13], ["São José do Rio Preto", -49.38, -20.82], ["Araçatuba", -50.44, -21.21],
  ["Marília", -49.95, -22.21], ["Franca", -47.4, -20.54], ["Piracicaba", -47.65, -22.73],
  ["Jundiaí", -46.88, -23.19], ["Guarulhos", -46.53, -23.46], ["Osasco", -46.79, -23.53],
  ["Santo André", -46.54, -23.66], ["São Bernardo do Campo", -46.56, -23.69], ["Mogi das Cruzes", -46.19, -23.52],
  ["Taubaté", -45.56, -23.03], ["Registro", -47.84, -24.49], ["Itapetininga", -48.05, -23.59],
  ["Botucatu", -48.44, -22.89], ["Araraquara", -48.18, -21.79], ["São Carlos", -47.89, -22.01],
  ["Limeira", -47.4, -22.56], ["Barretos", -48.57, -20.56], ["Ourinhos", -49.87, -22.98],
  ["Assis", -50.41, -22.66], ["Avaré", -48.93, -23.1], ["Tatuí", -47.86, -23.36],
  ["Itu", -47.3, -23.26], ["Caraguatatuba", -45.41, -23.62], ["Guaratinguetá", -45.19, -22.82],
  ["Bragança Paulista", -46.54, -22.95], ["Americana", -47.33, -22.74], ["Rio Claro", -47.56, -22.41],
  ["Catanduva", -48.97, -21.14], ["Votuporanga", -49.97, -20.42], ["Andradina", -51.38, -20.9],
  ["Dracena", -51.53, -21.48], ["Lins", -49.74, -21.68], ["Jaú", -48.56, -22.3],
];

function mapSp() {
  const [cx, cy] = project(CAPITAL);
  const [sx, sy] = project(SEDE);
  const cities = join(CITIES, ([name, lon, lat], i) => {
    const [x, y] = project([lon, lat]);
    return `<circle cx="${x}" cy="${y}" r="2.2" style="--d:${(1.5 + (i % 20) * 0.05).toFixed(2)}s"><title>${esc(name)}</title></circle>`;
  });
  return `<figure class="lp-map" data-map data-reveal>
  <div class="lp-map__halo" aria-hidden="true"></div>
  <svg viewBox="0 0 ${mapa.width} ${mapa.height}" role="img" aria-labelledby="mapa-sp-titulo mapa-sp-desc" focusable="false">
    <title id="mapa-sp-titulo">Mapa do estado de São Paulo</title>
    <desc id="mapa-sp-desc">Sede do escritório em Boituva e atendimento online em todo o estado, com destaque para a capital.</desc>
    <defs>
      <linearGradient id="mapa-sp-grad" x1="0" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="#4A4A4A"/><stop offset=".55" stop-color="#232323"/><stop offset="1" stop-color="#0B0B0B"/></linearGradient>
      <filter id="mapa-sp-sombra" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000" flood-opacity=".65"/></filter>
      <path id="mapa-sp-uf" d="${mapa.outline}" pathLength="1000"/>
      <clipPath id="mapa-sp-clip"><use href="#mapa-sp-uf"/></clipPath>
    </defs>
    <use class="lp-map__mass" href="#mapa-sp-uf" fill="url(#mapa-sp-grad)" filter="url(#mapa-sp-sombra)"/>
    <image class="lp-map__mun" data-map-mesh="/assets/img/mapa-sp-municipios.svg" x="0" y="0" width="${mapa.width}" height="${mapa.height}" clip-path="url(#mapa-sp-clip)"/>
    <use class="lp-map__outline" href="#mapa-sp-uf"/>
    <g class="lp-map__cities" fill="rgba(255,255,255,.45)">${cities}</g>
    <g class="lp-map__dest">
      <circle class="lp-map__pulse" cx="${cx}" cy="${cy}" r="6" fill="#1EA94F"/>
      <circle cx="${cx}" cy="${cy}" r="6.5" fill="#1EA94F" stroke="#0B0B0B" stroke-width="1.5"><title>São Paulo — capital</title></circle>
      <line x1="${cx + 8}" y1="${cy + 8}" x2="${cx + 46}" y2="${cy + 62}" stroke="rgba(255,255,255,.5)"/>
      <text x="${cx + 52}" y="${cy + 66}" class="lp-map__label2">Atendimento online</text>
      <text x="${cx + 52}" y="${cy + 85}" class="lp-map__label">São Paulo · capital</text>
    </g>
    <g class="lp-map__dest">
      <circle cx="${sx}" cy="${sy}" r="4.5" fill="#FFF" stroke="#0B0B0B" stroke-width="1.5"><title>Boituva — sede do escritório</title></circle>
      <line x1="${sx - 7}" y1="${sy + 7}" x2="${sx - 30}" y2="${sy + 40}" stroke="rgba(255,255,255,.4)"/>
      <text x="${sx - 34}" y="${sy + 56}" class="lp-map__label2" text-anchor="end">Sede</text>
      <text x="${sx - 34}" y="${sy + 73}" class="lp-map__label lp-map__label--sm" text-anchor="end">Boituva</text>
    </g>
  </svg>
</figure>`;
}

export const REACH_POINTS = [
  "Reuniões por vídeo, sem necessidade de deslocamento.",
  "Assinatura de documentos por meio digital.",
  "Acompanhamento processual à distância, com atualizações claras.",
];

export function lpReach({ id = "onde-atendemos", eyebrow = "Onde atendemos", title = `Atendimento em todo o <span class="grad">estado de São Paulo.</span>`, text = "Da capital ao interior e ao litoral: além da sede em Boituva e da região de Sorocaba, atendemos clientes de Campinas, Santos, Ribeirão Preto, São José dos Campos, ABC, Guarulhos e das demais cidades do estado por reunião online. Clientes de outros estados também são atendidos a distância.", points = REACH_POINTS } = {}) {
  return `<section class="lp-sec lp-sec--dark lp-reach on-dark" id="${id}" aria-labelledby="${id}-titulo">
  <div class="container">
    <div class="lp-split lp-split--reach">
      <div>
        ${lpHead({ eyebrow, title, lead: text, id: `${id}-titulo`, align: "left" })}
        <div data-reveal>
          ${dots(points.map(esc))}
          <div class="lp-reach__card">
            <p class="lp-reach__card-title">${icon.pin(16)} Sede — ${esc(sede.city)}/${esc(sede.region)}</p>
            <address>${esc(sede.street)} — ${esc(sede.district)}<br>${esc(sede.city)}/${esc(sede.region)} · CEP ${esc(sede.postalCode)}</address>
            ${when(!isPending(SITE.hours), `<p class="lp-reach__hours">${icon.clock(14)} ${esc(SITE.hours)}</p>`)}
            <a class="lp-reach__route" href="${esc(sede.mapsUrl)}" target="_blank" rel="noopener">Como chegar <span aria-hidden="true">↗</span><span class="sr-only"> (abre o Google Maps em nova aba)</span></a>
          </div>
        </div>
      </div>
      ${mapSp()}
    </div>
  </div>
</section>`;
}

/* ---------- Perguntas frequentes ---------- */
export function lpFaq({ id = "perguntas", title, lead, items, message, ctaText = "Ainda com dúvida? Conte o que está acontecendo em uma mensagem.", ctaLabel = "Falar com o escritório", tex = "recepcao" }) {
  return `<section class="lp-sec lp-sec--white lp-faq" id="${id}" aria-labelledby="${id}-titulo">
  ${texture(tex)}
  <div class="container container--narrow">
    <div class="lp-faq__pill" aria-hidden="true"><span>FAQ</span><span class="lp-faq__meter"></span><span class="lp-faq__tick"></span></div>
    ${lpHead({ title, lead, id: `${id}-titulo` })}
    ${faqList(items)}
    <div class="lp-faq__cta on-dark" data-reveal>
      <p>${esc(ctaText)}</p>
      ${waButton(message, ctaLabel, { cta: "faq" })}
    </div>
  </div>
</section>`;
}

/* ---------- Outras áreas ---------- */
export function lpOtherAreas(currentId) {
  return `<nav class="lp-sec lp-sec--muted lp-others" aria-labelledby="outras-areas-titulo">
  <div class="container">
    <h2 class="lp-eyebrow" id="outras-areas-titulo">Outras áreas de atuação</h2>
    <ul class="lp-others__list" data-reveal>${join(practiceAreas.filter((a) => a.id !== currentId), (a) => `<li><a href="${areaUrl(a)}"><span class="lp-others__num">${a.number}</span>${esc(a.title)} ${icon.arrow(14)}</a></li>`)}</ul>
  </div>
</nav>`;
}
