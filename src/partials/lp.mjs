import { trustBar } from "./trust-bar.mjs";
import { esc, join, when } from "../lib/html.mjs";
import { SITE, isPending, whatsappUrl } from "../data/site.mjs";
import { practiceAreas, areaUrl } from "../data/areas.mjs";
import { img } from "./media.mjs";
import { icon } from "./icons.mjs";
import { breadcrumbs } from "./layout.mjs";
import { teamPanels, faqList, waButton } from "./components.mjs";
import images from "../data/images.json" with { type: "json" };
import mapa from "../data/mapa-sp.json" with { type: "json" };
import mapaBr from "../data/mapa-brasil.json" with { type: "json" };
import { CITIES_HUB } from "../data/regional.mjs";

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
export function lpHero({ crumbs, badge, title, text, message, cta = "Falar no WhatsApp", secondary, note = [], image, alt, position = "60% 40%", imageMobile, positionMobile = "50% 50%", aside, photo = false }) {
  const mobile = imageMobile ? images[imageMobile] : null;
  const bg = img(image, { alt, sizes: "100vw", priority: true, className: "lp-hero__bg", style: `object-position:${position};--pos-m:${positionMobile}` });
  return `<section class="lp-hero${photo ? " lp-hero--photo" : ""} on-dark" aria-labelledby="page-titulo">
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
</section>
${trustBar()}`;
}

/* ---------- Serviços ---------- */
// Cartões com ícone e número; o último é o cartão escuro com CTA.
// items: [{ id, icon, title, text, items?, href?, linkLabel?, message? }]
export function lpServices({ id = "servicos", eyebrow = "Serviços", title, lead, items, cta, texture: tex = "escritorio-interno", tone = "white" }) {
  const total = items.length + (cta ? 1 : 0);
  // O cartão de CTA ocupa as colunas que sobrarem na última linha (3 no desktop, 2 no tablet).
  const span = cta ? ` lp-card--lg-${3 - ((total - 1) % 3)} lp-card--md-${2 - ((total - 1) % 2)}` : "";
  return `<section class="lp-sec lp-sec--${tone} lp-services${tone === "dark" ? " on-dark" : ""}" id="${id}" aria-labelledby="${id}-titulo">
  ${tone === "muted" ? texture(tex) : ""}
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
  { title: "Reunião e análise", text: "Presencial, em Boituva ou Sorocaba, ou por videochamada: você conhece os caminhos possíveis, os riscos e os documentos necessários." },
  { title: "Definição do caminho", text: "Orientação preventiva, tentativa de acordo ou atuação judicial, com etapas e condições combinadas por escrito." },
];

const PIN = `<svg class="lp-pin__icon" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z"/></svg>`;

export function lpSteps({ id = "como-funciona", eyebrow = "Como funciona", title = `O caminho do <span class="grad">primeiro contato à definição do caso.</span>`, lead = "O primeiro contato é feito com a equipe de atendimento, que organiza as informações e encaminha o caso. O envio da mensagem não constitui contratação.", steps = LP_STEPS, tone = "white", tex = "sala-reuniao" } = {}) {
  return `<section class="lp-sec lp-sec--${tone} lp-steps${tone === "dark" ? " on-dark" : ""}" id="${id}" aria-labelledby="${id}-titulo">
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
  { image: "recepcao", title: "Recepção em Boituva/SP", caption: `${sede.street} — ${sede.district}`, alt: "Recepção do escritório Vieira & Marques, com o logotipo na parede", wide: true },
  { image: "equipe", title: "A equipe", caption: "Profissionais que acompanham cada caso", alt: "Equipe da Vieira & Marques reunida na sede, em Boituva", position: "50% 35%" },
  { image: "sala-atendimento", title: "Sala de atendimento", caption: "Atendimento presencial ou online", alt: "Poltrona de couro, planta e porta-retrato no escritório, em Boituva" },
  { image: "atendimento-mesa", title: "Como trabalhamos", caption: "Cada caso analisado a partir dos documentos", alt: "Mesa de recepção do escritório, na sede em Boituva", wide: true, position: "50% 40%" },
];

export function lpStructure({ id = "estrutura", eyebrow = "O escritório", title = `Estrutura real, <span class="grad">equipe que você pode visitar.</span>`, text = "Sede em Boituva/SP, atendimento presencial também em Sorocaba e reuniões por vídeo para clientes de todo o Brasil.", items = STRUCTURE } = {}) {
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

/* ---------- Onde atendemos: mapa de SP (páginas locais e nichadas) ---------- */
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

// city (páginas regionais): { name, coords: [lon, lat], label: "up"|"down" } destaca a cidade da página.
// Boituva (sede) e São Paulo (capital) já têm marcador próprio; nas demais, a cidade ganha um ponto
// com rótulo, e o rótulo da sede muda de lado quando a cidade fica ao sul, para não se sobreporem.
function cityMarker(city, [sx, sy]) {
  const [x, y] = project(city.coords);
  const south = city.label ? city.label === "down" : city.coords[1] < SEDE[1] - 0.12;
  const dir = south ? 1 : -1;
  const ly = y + dir * 40;
  return `<g class="lp-map__dest lp-map__dest--city">
      <circle class="lp-map__pulse" cx="${x}" cy="${y}" r="5" fill="#FFF"/>
      <circle cx="${x}" cy="${y}" r="5" fill="#FFF" stroke="#1EA94F" stroke-width="2.5"><title>${esc(city.name)}</title></circle>
      <line x1="${x}" y1="${y + dir * 7}" x2="${x}" y2="${ly - dir * (south ? 14 : 4)}" stroke="rgba(255,255,255,.5)"/>
      <text x="${x}" y="${south ? ly + 4 : ly - 22}" class="lp-map__label2" text-anchor="middle">Atendimento</text>
      <text x="${x}" y="${south ? ly + 22 : ly - 4}" class="lp-map__label" text-anchor="middle">${esc(city.name)}</text>
    </g>`;
}

// legend: legenda em HTML sob o mapa (páginas regionais): no celular, os rótulos do SVG ficam pequenos.
function mapLegend(city) {
  const own = city?.name;
  const items = [
    own && !["Boituva", "São Paulo"].includes(own) && ["city", `${own} — cidade desta página`],
    ["sede", own === "Boituva" ? "Boituva — sede do escritório e cidade desta página" : "Boituva — sede do escritório"],
    ["cap", own === "São Paulo" ? "São Paulo — capital e cidade desta página, atendimento online" : "São Paulo — capital, atendimento online"],
  ].filter(Boolean);
  return `<figcaption class="lp-map__legend"><ul>${join(items, ([k, t]) => `<li><span class="lp-map__key lp-map__key--${k}" aria-hidden="true"></span>${esc(t)}</li>`)}</ul></figcaption>`;
}

function mapSp(city, legend = false) {
  const [cx, cy] = project(CAPITAL);
  const [sx, sy] = project(SEDE);
  const marked = city && !["Boituva", "São Paulo"].includes(city.name);
  const sedeUp = marked && (city.label ? city.label === "down" : city.coords[1] < SEDE[1] - 0.12);
  // Cidade logo abaixo e à direita da capital (ex.: Santos): o rótulo da capital sobe para não cruzar o marcador.
  const [mx, my] = marked ? project(city.coords) : [0, 0];
  const capUp = marked && mx > cx - 10 && mx < cx + 120 && my > cy && my < cy + 100;
  const cities = join(CITIES, ([name, lon, lat], i) => {
    const [x, y] = project([lon, lat]);
    return `<circle cx="${x}" cy="${y}" r="2.2" style="--d:${(1.5 + (i % 20) * 0.05).toFixed(2)}s"><title>${esc(name)}</title></circle>`;
  });
  return `<figure class="lp-map${legend ? " lp-map--legend" : ""}" data-map data-reveal>
  <div class="lp-map__halo" aria-hidden="true"></div>
  <svg viewBox="0 0 ${mapa.width} ${mapa.height}" role="img" aria-labelledby="mapa-sp-titulo mapa-sp-desc" focusable="false">
    <title id="mapa-sp-titulo">Mapa do estado de São Paulo</title>
    <desc id="mapa-sp-desc">${marked ? `${esc(city.name)}, cidade atendida, e a sede do escritório em Boituva` : "Sede do escritório em Boituva"}; atendimento online em todo o estado, com destaque para a capital.</desc>
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
    ${marked ? cityMarker(city, [sx, sy]) : ""}
    <g class="lp-map__dest">
      <circle class="lp-map__pulse" cx="${cx}" cy="${cy}" r="6" fill="#1EA94F"/>
      <circle cx="${cx}" cy="${cy}" r="6.5" fill="#1EA94F" stroke="#0B0B0B" stroke-width="1.5"><title>São Paulo — capital</title></circle>
      ${capUp
        ? `<line x1="${cx + 8}" y1="${cy - 8}" x2="${cx + 40}" y2="${cy - 48}" stroke="rgba(255,255,255,.5)"/>
      <text x="${cx + 46}" y="${cy - 70}" class="lp-map__label2">Atendimento online</text>
      <text x="${cx + 46}" y="${cy - 51}" class="lp-map__label">São Paulo · capital</text>`
        : `<line x1="${cx + 8}" y1="${cy + 8}" x2="${cx + 46}" y2="${cy + 62}" stroke="rgba(255,255,255,.5)"/>
      <text x="${cx + 52}" y="${cy + 66}" class="lp-map__label2">Atendimento online</text>
      <text x="${cx + 52}" y="${cy + 85}" class="lp-map__label">São Paulo · capital</text>`}
    </g>
    <g class="lp-map__dest">
      <circle cx="${sx}" cy="${sy}" r="4.5" fill="#FFF" stroke="#0B0B0B" stroke-width="1.5"><title>Boituva — sede do escritório</title></circle>
      ${sedeUp
        ? `<line x1="${sx - 7}" y1="${sy - 7}" x2="${sx - 30}" y2="${sy - 40}" stroke="rgba(255,255,255,.4)"/>
      <text x="${sx - 34}" y="${sy - 62}" class="lp-map__label2" text-anchor="end">Sede</text>
      <text x="${sx - 34}" y="${sy - 45}" class="lp-map__label lp-map__label--sm" text-anchor="end">Boituva</text>`
        : `<line x1="${sx - 7}" y1="${sy + 7}" x2="${sx - 30}" y2="${sy + 40}" stroke="rgba(255,255,255,.4)"/>
      <text x="${sx - 34}" y="${sy + 56}" class="lp-map__label2" text-anchor="end">Sede</text>
      <text x="${sx - 34}" y="${sy + 73}" class="lp-map__label lp-map__label--sm" text-anchor="end">Boituva</text>`}
    </g>
  </svg>
  ${legend ? mapLegend(city) : ""}
</figure>`;
}

/* ---------- Mapa do Brasil (páginas institucionais e principais) ---------- */
// Mesmo desenho do <mapa-brasil> das LPs: contorno, divisas estaduais (imagem carregada
// perto da tela), capitais e Brasília em destaque — mais a sede, em Boituva.
const projectBr = ([lon, lat]) => {
  const { k: kb, tx: txb, ty: tyb } = mapaBr.projection;
  const y = Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
  return [+(kb * ((lon * Math.PI) / 180) + txb).toFixed(1), +(tyb - kb * y).toFixed(1)];
};
const CAPITAIS = [
  ["Manaus", -60.02, -3.1], ["Belém", -48.5, -1.46], ["Fortaleza", -38.52, -3.73], ["Recife", -34.88, -8.05],
  ["Salvador", -38.51, -12.97], ["Brasília", -47.88, -15.79], ["Cuiabá", -56.1, -15.6], ["Goiânia", -49.25, -16.68],
  ["Belo Horizonte", -43.94, -19.92], ["Rio de Janeiro", -43.17, -22.91], ["São Paulo", -46.63, -23.55], ["Curitiba", -49.27, -25.43],
  ["Florianópolis", -48.55, -27.59], ["Porto Alegre", -51.23, -30.03], ["Campo Grande", -54.65, -20.44], ["Rio Branco", -67.81, -9.97],
  ["São Luís", -44.3, -2.53], ["Natal", -35.21, -5.79], ["João Pessoa", -34.88, -7.11], ["Maceió", -35.73, -9.66],
  ["Aracaju", -37.07, -10.91], ["Teresina", -42.8, -5.09], ["Palmas", -48.33, -10.18], ["Boa Vista", -60.67, 2.82],
  ["Macapá", -51.07, 0.03], ["Porto Velho", -63.9, -8.76], ["Vitória", -40.34, -20.32],
];
const CIDADES_BR = [
  [-47.06, -22.91], [-46.33, -23.96], [-45.89, -23.18], [-47.81, -21.18], [-47.46, -23.5], [-49.06, -22.31], [-51.39, -22.13], [-49.38, -20.82],
  [-48.28, -18.91], [-47.93, -19.75], [-43.35, -21.76], [-43.86, -16.73], [-41.95, -18.85], [-42.54, -19.47], [-41.3, -21.75], [-44.1, -22.52],
  [-39.03, -14.79], [-38.97, -12.27], [-40.84, -14.87], [-40.5, -9.42], [-35.98, -8.28], [-35.88, -7.23], [-37.34, -5.19], [-40.35, -3.69],
  [-39.32, -7.21], [-38.22, -9.4], [-47.49, -5.53], [-49.13, -5.37], [-54.71, -2.44], [-52.21, -3.2], [-56.74, -2.63], [-64.72, -3.35],
  [-69.94, -4.25], [-63.03, -7.51], [-61.95, -10.88], [-60.14, -12.74], [-55.51, -11.86], [-54.64, -16.47], [-52.26, -15.89], [-54.81, -22.22],
  [-51.7, -20.79], [-48.95, -16.33], [-50.93, -17.79], [-48.21, -7.19], [-49.07, -11.73], [-44.99, -12.15], [-43.42, -13.26], [-41.47, -7.08],
  [-44.79, -4.23], [-51.16, -23.31], [-51.94, -23.42], [-53.46, -24.96], [-54.59, -25.55], [-50.16, -25.09], [-48.85, -26.3], [-49.07, -26.92],
  [-52.62, -27.1], [-49.37, -28.68], [-51.18, -29.17], [-53.81, -29.68], [-52.34, -31.77], [-57.09, -29.76], [-52.41, -28.26],
];

function mapBrasil() {
  const [sx, sy] = projectBr(SEDE);
  const cidades = join(CIDADES_BR, (c, i) => {
    const [x, y] = projectBr(c);
    return `<circle cx="${x}" cy="${y}" r="1.8" style="--d:${(1.6 + (i % 20) * 0.05).toFixed(2)}s"/>`;
  });
  const capitais = join(CAPITAIS, ([nome, lon, lat], i) => {
    const [x, y] = projectBr([lon, lat]);
    const df = nome === "Brasília";
    return `<g class="lp-map__cap" style="--d:${(1.5 + i * 0.045).toFixed(2)}s">${df ? `<circle class="lp-map__pulse" cx="${x}" cy="${y}" r="4" fill="#FFF"/>` : ""}<circle cx="${x}" cy="${y}" r="${df ? 4.4 : 3.2}" fill="#FFF" stroke="rgba(11,11,11,.6)"><title>${esc(nome)}</title></circle></g>`;
  });
  return `<figure class="lp-map lp-map--brasil" data-map data-reveal>
  <div class="lp-map__halo" aria-hidden="true"></div>
  <svg viewBox="0 0 ${mapaBr.width} ${mapaBr.height}" role="img" aria-labelledby="mapa-br-titulo mapa-br-desc" focusable="false">
    <title id="mapa-br-titulo">Mapa do Brasil</title>
    <desc id="mapa-br-desc">Atendimento online em todo o Brasil, com as 27 capitais em destaque, e sede do escritório em Boituva, no estado de São Paulo.</desc>
    <defs>
      <linearGradient id="mapa-br-grad" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#4A4A4A"/><stop offset=".55" stop-color="#232323"/><stop offset="1" stop-color="#0B0B0B"/></linearGradient>
      <filter id="mapa-br-sombra" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000" flood-opacity=".65"/></filter>
      <path id="mapa-br-pais" d="${mapaBr.outline}" pathLength="1000"/>
      <clipPath id="mapa-br-clip"><use href="#mapa-br-pais"/></clipPath>
    </defs>
    <use class="lp-map__mass" href="#mapa-br-pais" fill="url(#mapa-br-grad)" filter="url(#mapa-br-sombra)"/>
    <image class="lp-map__mun" data-map-mesh="/assets/img/mapa-brasil-estados.svg" x="0" y="0" width="${mapaBr.width}" height="${mapaBr.height}" clip-path="url(#mapa-br-clip)"/>
    <use class="lp-map__outline" href="#mapa-br-pais"/>
    <g class="lp-map__cities" fill="rgba(255,255,255,.55)">${cidades}</g>
    <g>${capitais}</g>
    <g class="lp-map__dest">
      <circle class="lp-map__pulse" cx="${sx}" cy="${sy}" r="5" fill="#1EA94F"/>
      <circle cx="${sx}" cy="${sy}" r="5.5" fill="#1EA94F" stroke="#0B0B0B" stroke-width="1.5"><title>Boituva/SP — sede do escritório</title></circle>
      <line x1="${sx + 7}" y1="${sy + 6}" x2="${sx + 46}" y2="${sy + 58}" stroke="rgba(255,255,255,.45)"/>
      <text x="${sx + 50}" y="${sy + 70}" class="lp-map__label2">Sede</text>
      <text x="${sx + 50}" y="${sy + 89}" class="lp-map__label">Boituva/SP</text>
    </g>
  </svg>
</figure>`;
}

// Páginas institucionais e principais: alcance nacional (mapa do Brasil).
export const REACH_NATIONAL = {
  title: `Atendimento <span class="grad">em todo o Brasil.</span>`,
  text: "Clientes de qualquer estado são atendidos de forma online, com reuniões por vídeo e documentos assinados digitalmente. O atendimento presencial acontece onde o escritório tem estrutura: na sede, em Boituva, e em Sorocaba, no interior de São Paulo.",
  points: [
    "Atendimento online para clientes de todo o Brasil.",
    "Reuniões por vídeo, sem necessidade de deslocamento.",
    "Assinatura de documentos e acompanhamento processual à distância.",
    "Atendimento presencial em Boituva e Sorocaba (SP).",
  ],
};
// Páginas locais, regionais e nichadas: foco em São Paulo (mapa de SP).
export const REACH_REGIONAL = {
  title: `Atendimento em todo o <span class="grad">estado de São Paulo.</span>`,
  text: "Atendimento presencial na sede, em Boituva, e em Sorocaba. Para clientes da capital, do interior e do litoral — de Campinas, Santos e Ribeirão Preto a qualquer cidade do estado —, o atendimento é online.",
  points: [
    "Atendimento presencial em Boituva e Sorocaba.",
    "Reuniões por vídeo, sem necessidade de deslocamento.",
    "Assinatura de documentos por meio digital.",
    "Acompanhamento processual à distância, com atualizações claras.",
  ],
};
export const REACH_POINTS = REACH_REGIONAL.points;

// scope: "brasil" (padrão: institucionais, áreas e serviços) ou "sp" (páginas locais/nichadas).
// city: cidade destacada no mapa de SP (páginas regionais). hub: link para a lista de cidades atendidas.
export function lpReach({ id = "onde-atendemos", eyebrow = "Onde atendemos", scope = "brasil", title, text, points, city, hub = true, legend = Boolean(city) } = {}) {
  const copy = scope === "sp" ? REACH_REGIONAL : REACH_NATIONAL;
  return `<section class="lp-sec lp-sec--dark lp-reach on-dark" id="${id}" aria-labelledby="${id}-titulo">
  <div class="lp-flag" aria-hidden="true">${img("bandeira", { alt: "", sizes: "100vw", style: "object-position:50% 40%" })}</div>
  <div class="container">
    <div class="lp-split lp-split--reach">
      <div>
        ${lpHead({ eyebrow, title: title ?? copy.title, lead: text ?? copy.text, id: `${id}-titulo`, align: "left" })}
        <div data-reveal>
          ${(points ?? copy.points).length ? dots((points ?? copy.points).map(esc)) : ""}
          <div class="lp-reach__card">
            <p class="lp-reach__card-title">${icon.pin(16)} Sede — ${esc(sede.city)}/${esc(sede.region)}</p>
            <address>${esc(sede.street)} — ${esc(sede.district)}<br>${esc(sede.city)}/${esc(sede.region)} · CEP ${esc(sede.postalCode)}</address>
            ${when(!isPending(SITE.hours), `<p class="lp-reach__hours">${icon.clock(14)} ${esc(SITE.hours)}</p>`)}
            <a class="lp-reach__route" href="${esc(sede.mapsUrl)}" target="_blank" rel="noopener">Como chegar <span aria-hidden="true">↗</span><span class="sr-only"> (abre o Google Maps em nova aba)</span></a>
          </div>
          ${hub ? `<a class="link-arrow lp-reach__hub" href="${CITIES_HUB}" data-track="regional_hub_click">Ver as cidades atendidas em São Paulo ${icon.arrow(14)}</a>` : ""}
        </div>
      </div>
      ${scope === "sp" ? mapSp(city, legend) : mapBrasil()}
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

/* ---------- Cartões das áreas (preto, 3 colunas) ---------- */
const AREA_ICON = { familia: "users", sucessorio: "home", trabalhista: "briefcase", criminal: "scale", saude: "pulse", bancario: "bank", imobiliario: "building", previdenciario: "shield" };
export function lpAreaCards({ id = "areas-cards", eyebrow = "Áreas de atuação", title, lead, tone = "muted", currentId = null } = {}) {
  return `<section class="lp-sec lp-sec--${tone} lp-areas" id="${id}" aria-labelledby="${id}-titulo">
  <div class="container">
    ${lpHead({ eyebrow, title, lead, id: `${id}-titulo` })}
    <ul class="lp-areas__grid" data-reveal>
      ${join(practiceAreas.filter((a) => a.id !== currentId), (a) => `<li class="lp-areas__card">
        <span class="lp-areas__glow" aria-hidden="true"><i></i></span>
        <div class="lp-areas__top"><span class="lp-areas__icon">${(icon[AREA_ICON[a.id]] ?? icon.doc)(22)}</span><span class="lp-areas__num">${a.number}</span></div>
        <h3 class="lp-areas__title"><a href="${areaUrl(a)}">${esc(a.title)}</a></h3>
        <p class="lp-areas__text">${esc(a.summary)}</p>
        <ul class="lp-areas__chips" aria-label="Serviços em ${esc(a.title)}">${join(a.services.slice(0, 4), (sv) => `<li>${esc(sv.title)}</li>`)}</ul>
        <span class="lp-areas__go">Conheça a área ${icon.arrow(14)}</span>
      </li>`)}
    </ul>
  </div>
</section>`;
}

/* ---------- Perfil atendido (lista de verificação) ---------- */
export function lpChecklist({ id = "para-quem", eyebrow = "Identifique o seu caso", title, lead, points, note, message, cta = "Falar com a equipe", tone = "white" }) {
  return `<section class="lp-sec lp-sec--${tone} lp-check${tone === "dark" ? " on-dark" : ""}" id="${id}" aria-labelledby="${id}-titulo">
  <div class="container container--narrow">
    ${lpHead({ eyebrow, title, lead, id: `${id}-titulo` })}
    <ul class="lp-check__list" data-reveal>${join(points, (t) => `<li><span class="lp-check__tick" aria-hidden="true">${icon.check(18)}</span><span>${esc(t)}</span></li>`)}</ul>
    <p class="lp-check__note" data-reveal>${esc(note)}</p>
    <div class="lp-check__cta" data-reveal>${waButton(message, cta, { cta: "perfil" })}</div>
  </div>
</section>`;
}

/* ---------- Outras áreas ---------- */
export function lpOtherAreas(currentId, { tone = "muted", title = `Outras áreas <span class="grad">de atuação.</span>` } = {}) {
  return lpAreaCards({ id: "outras-areas", eyebrow: "Continue explorando", title, tone, currentId });
}
