import { esc, attrs, join, jsonLd, when } from "../lib/html.mjs";
import { SITE, NAV, isPending, whatsappUrl, waMessage } from "../data/site.mjs";
import { practiceAreas, areaUrl } from "../data/areas.mjs";
import { teamWithProfile, profilePath } from "../data/team.mjs";
import { LEGAL_PATHS } from "../data/legal.mjs";
import { MENUS } from "../data/menu.mjs";
import { img, logo } from "./media.mjs";
import { GATE_JS } from "../data/gate.mjs";
import { icon } from "./icons.mjs";
import { waButton } from "./components.mjs";
import { DEFAULT_PHRASES } from "../data/area-lp.mjs";
import images from "../data/images.json" with { type: "json" };

import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";

// Versão de cache = hash do conteúdo; muda sozinha quando CSS/JS mudam.
const ROOT_URL = new URL("../../", import.meta.url);
const ASSET_VERSION = createHash("sha256")
  .update(readFileSync(new URL("assets/css/site.css", ROOT_URL)))
  .update(readFileSync(new URL("assets/js/site.js", ROOT_URL)))
  .update(readFileSync(new URL("assets/js/reviews.js", ROOT_URL)))
  .update(existsSync(new URL("assets/js/site.min.js", ROOT_URL)) ? readFileSync(new URL("assets/js/site.min.js", ROOT_URL)) : "")
  .digest("hex")
  .slice(0, 10);
const abs = (path) => SITE.origin + path;
// Usa o .min.js (npm run minify) quando existir; senão, o arquivo legível.
const jsFile = (name) => (existsSync(new URL(`assets/js/${name}.min.js`, ROOT_URL)) ? `${name}.min.js` : `${name}.js`);

export const organizationSchema = () => {
  const sede = SITE.units[0];
  return {
    "@type": ["LegalService", "Organization"],
    "@id": `${SITE.origin}/#org`,
    name: SITE.name,
    url: `${SITE.origin}/`,
    logo: abs(images["logo-escuro"].variants.at(-1).src),
    image: abs(images.og.src),
    telephone: SITE.phone.e164,
    email: SITE.email,
    taxID: SITE.cnpj,
    address: {
      "@type": "PostalAddress",
      streetAddress: sede.street,
      addressLocality: sede.city,
      addressRegion: sede.region,
      postalCode: sede.postalCode,
      addressCountry: "BR",
    },
    geo: { "@type": "GeoCoordinates", latitude: sede.geo.latitude, longitude: sede.geo.longitude },
    hasMap: sede.mapsUrl,
    ...(isPending(SITE.hours) ? {} : { openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: SITE.hoursSpec.days, opens: SITE.hoursSpec.opens, closes: SITE.hoursSpec.closes } }),
    areaServed: ["Boituva", "Sorocaba", "São Paulo", "Brasil"],
    knowsAbout: practiceAreas.map((a) => a.title),
    employee: teamWithProfile.map((p) => ({ "@id": `${SITE.origin}${profilePath(p)}#pessoa` })),
    sameAs: SITE.social.map((s) => s.url),
  };
};

const breadcrumbSchema = (crumbs) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: abs(c.href) })),
});

function head({ title, description, path, ogType = "website", schema = [], crumbs, preload = [] }) {
  const url = abs(path);
  const graph = [organizationSchema(), ...schema];
  if (crumbs && crumbs.length > 1) graph.push(breadcrumbSchema(crumbs));
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0B0B0B">
${SITE.measurement.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(SITE.measurement.googleSiteVerification)}">\n` : ""}
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="${SITE.locale}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(abs(images.og.src))}">
<meta property="og:image:width" content="${images.og.w}">
<meta property="og:image:height" content="${images.og.h}">
<meta property="og:image:alt" content="Fachada do escritório Vieira &amp; Marques em Boituva - SP">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(abs(images.og.src))}">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" href="/assets/icons/favicon-32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/assets/icons/favicon-16.png" sizes="16x16">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<script>${GATE_JS}</script>
<link rel="preload" href="/assets/fonts/lexend-deca-latin.woff2" as="font" type="font/woff2" crossorigin>
${join(preload, (p) => `<link rel="preload" as="image"${attrs(p)}>\n`)}<link rel="stylesheet" href="/assets/css/site.css?v=${ASSET_VERSION}">
<noscript><style>.vm-loader{display:none}</style></noscript>
${jsonLd({ "@context": "https://schema.org", "@graph": graph })}
</head>`;
}

// Menu principal com submenus (inspirado no "morphing island navbar"): no desktop,
// um único fundo flutuante se ajusta ao painel ativo e uma pílula acompanha o item
// sob o mouse. Item = link (navega) + botão (abre o submenu), padrão "disclosure".
const ext = (it) => (it.external ? ' target="_blank" rel="noopener"' : "");
const menuPanel = (m) => `<div class="nav__panel${m.wide ? " nav__panel--wide" : ""}" id="submenu-${m.id}" data-nav-panel>
  <div class="nav__panel-main">
    <p class="nav__panel-heading">${esc(m.heading)}</p>
    ${when(m.sub, `<p class="nav__panel-sub">${esc(m.sub)}</p>`)}
    <ul class="nav__panel-list">${join(m.items, (it) => `<li><a class="nav__panel-link" href="${esc(it.href)}"${ext(it)}>${when(it.num, `<span class="nav__panel-num">${it.num}</span>`)}<span class="nav__panel-text"><span class="nav__panel-title">${esc(it.title)}${it.external ? ' <span aria-hidden="true">↗</span>' : ` ${icon.arrow(12)}`}</span><span class="nav__panel-desc">${esc(it.desc)}</span></span></a></li>`)}</ul>
  </div>
  ${m.aside ? `<div class="nav__panel-aside">
    <p class="nav__panel-heading">${esc(m.aside.heading)}</p>
    <ul class="nav__panel-list">${join(m.aside.items, (it) => `<li><a class="nav__panel-link nav__panel-link--compact" href="${esc(it.href)}"><span class="nav__panel-text"><span class="nav__panel-title">${esc(it.title)} ${icon.arrow(12)}</span><span class="nav__panel-desc">${esc(it.desc)}</span></span></a></li>`)}</ul>
  </div>` : ""}
  ${m.footer ? `<div class="nav__panel-foot"><span>${esc(m.footer.text)}</span><a href="${esc(m.footer.href)}"${ext(m.footer)}>${esc(m.footer.label)} <span aria-hidden="true">${m.footer.external ? "↗" : "→"}</span></a></div>` : ""}
</div>`;

const navLinks = (current) =>
  join(NAV, (item) => {
    const m = MENUS[item.href];
    const cur = when(item.href === current, ' aria-current="page"');
    if (!m) return `<li class="nav__item" data-nav-item><a class="nav__link" href="${item.href}"${cur}>${esc(item.label)}</a></li>`;
    return `<li class="nav__item nav__item--menu" data-nav-item>
      <a class="nav__link" href="${item.href}"${cur}>${esc(item.label)}</a><button class="nav__toggle" type="button" aria-expanded="false" aria-controls="submenu-${m.id}" data-nav-toggle><span class="sr-only">Submenu de ${esc(item.label)}</span>${icon.chevronDown(14)}</button>
      ${menuPanel(m)}
    </li>`;
  });

const mobileLinks = (current) =>
  join(NAV, (item, i) => {
    const m = MENUS[item.href];
    const cur = when(item.href === current, ' aria-current="page"');
    const link = `<a href="${item.href}"${cur}>${esc(item.label)}<span>0${i + 1}</span></a>`;
    if (!m) return `<li>${link}</li>`;
    const li = (it) => `<li><a href="${esc(it.href)}"${ext(it)}>${esc(it.title)}</a></li>`;
    return `<li class="mobile-menu__item">
      <div class="mobile-menu__row">${link}<button class="mobile-menu__toggle" type="button" aria-expanded="false" aria-controls="mm-${m.id}" data-mm-toggle><span class="sr-only">Submenu de ${esc(item.label)}</span>${icon.plus(18)}</button></div>
      <ul class="mobile-menu__sub" id="mm-${m.id}" hidden>${join(m.items, li)}${m.aside ? `<li class="mobile-menu__sub-label" aria-hidden="true">${esc(m.aside.heading)}</li>${join(m.aside.items, li)}` : ""}</ul>
    </li>`;
  });

// Redes sociais com ícones (barra superior, menu mobile e rodapé); o WhatsApp entra junto.
const SOCIAL_ICONS = { Instagram: icon.instagram, Facebook: icon.facebook };
const socialLinks = (whatsappMessage, cls, size) => `<ul class="social ${cls}" aria-label="Redes sociais">
        ${join(SITE.social, (s) => `<li><a class="social__link" href="${esc(s.url)}" target="_blank" rel="noopener" title="${esc(s.label)}">${(SOCIAL_ICONS[s.label] ?? icon.arrowUpRight)(size)}<span class="sr-only">${esc(s.label)} (abre em nova aba)</span></a></li>`)}
        <li><a class="social__link social__link--wa" href="${esc(whatsappUrl(whatsappMessage))}" target="_blank" rel="noopener" title="WhatsApp">${icon.whatsapp(size)}<span class="sr-only">WhatsApp (abre em nova aba)</span></a></li>
      </ul>`;

function header(current, whatsappMessage) {
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
<aside class="topbar" aria-label="Atendimento e contato">
  <div class="container">
    <p class="topbar__note"><span class="topbar__note-full">Presencial em Boituva e Sorocaba · online em São Paulo e todo o Brasil</span><span class="topbar__note-short">Boituva, Sorocaba e online</span></p>
    <div class="topbar__links">
      <a class="topbar__phone" href="${SITE.phone.href}">${icon.phone(14)} ${SITE.phone.display}</a>
      ${socialLinks(whatsappMessage, "social--topbar", 15)}
    </div>
  </div>
</aside>
<header class="site-header" data-header>
  <div class="container site-header__bar">
    <a class="site-header__logo" href="/" aria-label="${esc(SITE.name)} — página inicial">${logo("claro", 170)}</a>
    <nav class="nav" aria-label="Principal" data-nav>
      <span class="nav__pill" aria-hidden="true" data-nav-pill></span>
      <span class="nav__surface" aria-hidden="true" data-nav-surface></span>
      <ul class="nav__list">${navLinks(current)}</ul>
    </nav>
    <div class="site-header__cta">${waButton(whatsappMessage, "Falar no WhatsApp", { cta: "topo", size: "sm" })}</div>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-mobile" data-menu-toggle>
      <span class="menu-toggle__lines" aria-hidden="true"></span><span class="sr-only">Abrir menu</span>
    </button>
  </div>
</header>
<div class="mobile-menu" id="menu-mobile" hidden data-menu>
  <div class="container">
    <nav aria-label="Menu">
      <ul class="mobile-menu__list">
        ${mobileLinks(current)}
      </ul>
    </nav>
    <div class="mobile-menu__foot">
      ${waButton(whatsappMessage, "Falar no WhatsApp", { cta: "menu", block: true })}
      <a href="/contato/">Outras formas de contato</a>
      <a href="${SITE.phone.href}">${SITE.phone.display}</a>
      <p>${esc(SITE.units[0].street)} — ${esc(SITE.units[0].city)}/${esc(SITE.units[0].region)}</p>
      ${socialLinks(whatsappMessage, "social--menu", 18)}
    </div>
  </div>
</div>`;
}

// Letreiro do rodapé em SVG: textLength garante que caiba exatamente na largura,
// em qualquer tela e mesmo antes de a fonte carregar (antes era cortado nas bordas).
const giantWordmark = () => {
  // Cada SVG tem o próprio gradiente: o Chrome não pinta gradientes de um SVG oculto.
  const defs = (id) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".015"/></linearGradient></defs>`;
  const text = (id, x, y, len, t) => `<text x="${x}" y="${y}" fill="url(#${id})" text-anchor="middle" textLength="${len}" lengthAdjust="spacing">${t}</text>`;
  return `<div class="site-footer__giant" aria-hidden="true" data-footer-giant>
      <svg class="site-footer__giant-wide" viewBox="0 0 960 92" focusable="false">${defs("giant-w")}${text("giant-w", 480, 76, 948, "VIEIRA &amp; MARQUES")}</svg>
      <svg class="site-footer__giant-stack" viewBox="0 0 480 180" focusable="false">${defs("giant-s")}${text("giant-s", 240, 76, 446, "VIEIRA &amp;")}${text("giant-s", 240, 164, 476, "MARQUES")}</svg>
    </div>`;
};

// Rodapé global: fechamento editorial (frase + um CTA), colunas de navegação,
// letreiro "VIEIRA & MARQUES" em baixo contraste e barra final com "voltar ao topo".
// Movimento só por CSS + IntersectionObserver (site.js), respeitando prefers-reduced-motion.
export function footer(whatsappMessage = waMessage()) {
  const sede = SITE.units[0];
  const col = (title, inner, extra = "") => `<div class="site-footer__col${extra}" data-reveal>
        <h2 class="site-footer__title">${title}</h2>
        ${inner}
      </div>`;
  const link = (href, label) => `<a class="site-footer__link" href="${href}">${esc(label)}</a>`;
  return `<footer class="site-footer on-dark" data-footer>
  <div class="site-footer__backdrop" aria-hidden="true"></div>
  <div class="container site-footer__inner">
    <div class="site-footer__close">
      <p class="eyebrow" data-reveal>${esc(SITE.shortName)}</p>
      <p class="site-footer__headline" data-reveal>Clareza para entender.<br><span class="grad">Estratégia para seguir.</span></p>
      <div data-reveal><a class="site-footer__cta" href="/contato/" data-track="footer_cta_click">Falar com a equipe <span class="site-footer__cta-arrow" aria-hidden="true">${icon.arrow(20)}</span></a></div>
    </div>

    <div class="site-footer__cols">
      ${col("Navegação", `<nav aria-label="Rodapé"><ul class="site-footer__list">${join(NAV, (i) => `<li>${link(i.href, i.label)}</li>`)}</ul></nav>`)}
      ${col("Áreas", `<ul class="site-footer__list site-footer__list--2">${join(practiceAreas, (a) => `<li>${link(areaUrl(a), a.title)}</li>`)}</ul>`, " site-footer__col--areas")}
      ${col("Contato", `<ul class="site-footer__list">
          <li class="site-footer__address site-footer__ic">${icon.pin(16)}<span>${esc(sede.street)}<br>${esc(sede.city)}/${esc(sede.region)}</span></li>
          <li class="site-footer__ic">${icon.phone(16)}<a class="site-footer__link" href="${SITE.phone.href}">${SITE.phone.display}</a></li>
          ${when(!isPending(SITE.email), `<li class="site-footer__ic">${icon.mail(16)}<a class="site-footer__link site-footer__email" href="mailto:${esc(SITE.email)}">${esc(SITE.email).replace("@", "<wbr>@")}</a></li>`)}
        </ul>
        ${socialLinks(whatsappMessage, "social--footer", 18)}`, " site-footer__col--contact")}
      ${col("Legal", `<ul class="site-footer__list">
          <li>${link(LEGAL_PATHS.privacy, "Política de Privacidade")}</li>
          <li>${link(LEGAL_PATHS.terms, "Termos de Uso")}</li>
          ${SITE.measurement.ga4 || SITE.measurement.metaPixel ? `<li><button class="site-footer__link site-footer__prefs" type="button" data-consent-open>Preferências de cookies</button></li>` : ""}
        </ul>`)}
    </div>

    <div class="site-footer__bottom">
      <p>© ${new Date().getFullYear()} ${esc(SITE.name)}.<br>CNPJ ${esc(SITE.cnpj)}</p>
      <p class="site-footer__notice">${esc(SITE.oabNotice)}</p>
      <button class="site-footer__top" type="button" data-back-to-top aria-label="Voltar ao topo">Topo <span aria-hidden="true">${icon.arrow(14)}</span></button>
    </div>
    ${giantWordmark()}
  </div>
</footer>`;
}

// Tela de carregamento: anéis concêntricos pulsando em sequência (inspirada no
// "ripple pulse loader") e o monograma VM alternando entre cinza e branco.
// Cobre a página até o carregamento e reaparece nas trocas de página (site.js).
// Sem JS, some sozinha (CSS) — e <noscript> a esconde de imediato.
const loader = () => `<div class="vm-loader" role="status" aria-label="Carregando" data-loader>
  <div class="vm-ripple" aria-hidden="true" style="--mark:url('${images["monograma-mascara"].src}')">
    <span class="vm-ripple__ring"></span><span class="vm-ripple__ring"></span><span class="vm-ripple__ring"></span><span class="vm-ripple__ring"></span><span class="vm-ripple__ring"></span>
    <span class="vm-ripple__mark"></span>
  </div>
</div>`;


// "Como chegar": cartão com endereço e rotas. O mapa interativo do Google só é inserido (iframe)
// quando o visitante clica em "Carregar mapa", então nada de terceiros carrega junto com a página.
const mapSection = () => {
  if (!SITE.mapEmbed) return "";
  const u = SITE.units[0];
  const { latitude: lat, longitude: lng } = u.geo;
  const embed = `https://maps.google.com/maps?q=${lat},${lng}&z=16&hl=pt-BR&output=embed`;
  const route = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  return `<section class="section section--white visit" aria-labelledby="como-chegar-titulo" data-visit>
  <div class="container">
    <div class="visit__grid">
      <div class="stack" data-reveal>
        <p class="eyebrow">Como chegar</p>
        <h2 class="h-section" id="como-chegar-titulo">Sede em <span class="grad">Boituva/SP.</span></h2>
        <address class="visit__address">${esc(u.street)}<br>${esc(u.district)} — ${esc(u.city)}/${esc(u.region)}<br>CEP ${esc(u.postalCode)}</address>
        ${isPending(SITE.hours) ? "" : `<p class="muted">${esc(SITE.hours)}</p>`}
        <p class="muted">Atendimento presencial também em Sorocaba, com horário combinado. Para as demais cidades, reuniões por vídeo.</p>
        ${SITE.googleReviewsCount ? `<p class="visit__rating"><a class="text-link" href="${esc(u.mapsUrl)}" target="_blank" rel="noopener noreferrer" data-track="google_review_click">${SITE.googleReviewsCount} avaliações no Google</a></p>` : ""}
        <div class="btn-row">
          <a class="btn" href="${esc(u.mapsUrl)}" target="_blank" rel="noopener noreferrer">Abrir no Google Maps <span class="btn__arrow">${icon.arrowUpRight(16)}</span></a>
          <a class="btn btn--ghost" href="${route}" target="_blank" rel="noopener noreferrer" data-track="map_route_click">Traçar rota</a>
        </div>
      </div>
      <div class="visit__map" data-reveal>
        <div class="visit__facade" data-visit-facade>
          <span class="visit__pin" aria-hidden="true">${icon.pin(30)}</span>
          <p class="visit__facade-title">Vieira &amp; Marques</p>
          <p class="visit__facade-text">${esc(u.street)}, ${esc(u.city)}/${esc(u.region)}</p>
          <button class="btn btn--light visit__load" type="button" data-visit-load data-embed="${esc(embed)}">Carregar mapa interativo</button>
          <p class="visit__note">Ao carregar, o mapa é fornecido pelo Google.</p>
        </div>
      </div>
    </div>
  </div>
</section>`;
};

// WhatsApp flutuante no padrão das LPs: botão verde e balão com frases da página
// (alternam a cada poucos segundos; o "×" fecha o balão nesta página). site.js controla.
export const waFloat = (message, phrases = DEFAULT_PHRASES) => {
  const [first] = phrases;
  return `<div class="wa-float" data-wa-float data-hidden="true">
  <div class="wa-float__bubble" data-wa-bubble data-phrases="${esc(JSON.stringify(phrases))}" hidden>
    <button class="wa-float__close" type="button" data-wa-bubble-close aria-label="Fechar mensagem">×</button>
    <p class="wa-float__title" data-wa-bubble-title>${esc(first.t)}</p>
    <p class="wa-float__text" data-wa-bubble-text>${esc(first.s)}</p>
  </div>
  <a class="wa-float__avatar" href="${whatsappUrl(message)}" target="_blank" rel="noopener" data-cta="flutuante" aria-label="Falar pelo WhatsApp com a equipe de atendimento">
    <span class="wa-float__ring" aria-hidden="true"></span><span class="wa-float__ring wa-float__ring--2" aria-hidden="true"></span>
    ${img("atendente", { alt: "", sizes: "72px" })}
    <span class="wa-float__dot" aria-hidden="true"></span>
  </a>
</div>`;
};

export function breadcrumbs(crumbs) {
  return `<nav class="breadcrumbs" aria-label="Você está em">
  <ol>${join(crumbs, (c, i) => (i === crumbs.length - 1 ? `<li><span aria-current="page">${esc(c.label)}</span></li>` : `<li><a href="${c.href}">${esc(c.label)}</a></li>`))}</ol>
</nav>`;
}

// Aviso de consentimento: só existe com ferramentas de medição configuradas.
const MEASURING = Boolean(SITE.measurement.ga4 || SITE.measurement.metaPixel);
const consentBanner = () => {
  const tools = [SITE.measurement.ga4 && "Google Analytics", SITE.measurement.metaPixel && "Pixel da Meta"].filter(Boolean).join(" e ");
  return `<div class="consent on-dark" data-consent hidden role="region" aria-label="Preferências de cookies">
  <p class="consent__text">Com a sua autorização, usamos ferramentas de medição (${esc(tools)}) para entender como o site é usado. <a class="text-link" href="${LEGAL_PATHS.privacy}#cookies">Saiba mais</a></p>
  <div class="consent__actions">
    <button class="btn btn--ghost-light btn--plain" type="button" data-consent-choice="recusado">Recusar</button>
    <button class="btn btn--light btn--plain" type="button" data-consent-choice="aceito">Aceitar</button>
  </div>
</div>`;
};
const bodyAttrs = () =>
  (SITE.forms ? " data-forms" : "") +
  (SITE.measurement.ga4 ? ` data-ga4="${esc(SITE.measurement.ga4)}"` : "") +
  (SITE.measurement.metaPixel ? ` data-pixel="${esc(SITE.measurement.metaPixel)}"` : "");

export function page({ title, description, path, crumbs, schema, preload, body, scripts = [], floatingWhatsapp = true, whatsappMessage = waMessage(), floatPhrases }) {
  return `<!DOCTYPE html>
<html lang="${SITE.lang}">
${head({ title, description, path, schema, crumbs, preload })}
<body${bodyAttrs()}>
${loader()}
${header(path, whatsappMessage)}
<main id="conteudo" tabindex="-1">
${body}
</main>
${mapSection()}
${footer(whatsappMessage)}
${floatingWhatsapp ? waFloat(whatsappMessage, floatPhrases) : ""}
${MEASURING ? consentBanner() : ""}
<script src="/assets/js/${jsFile("site")}?v=${ASSET_VERSION}" defer></script>
${join(scripts, (s) => `<script src="${s.replace(/\/(\w+)\.js$/, (m, n) => `/${jsFile(n)}`)}?v=${ASSET_VERSION}" defer></script>\n`)}</body>
</html>
`;
}

export { img };
