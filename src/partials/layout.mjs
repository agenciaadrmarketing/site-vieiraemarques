import { esc, attrs, join, jsonLd, when } from "../lib/html.mjs";
import { SITE, NAV, isPending, whatsappUrl, waMessage } from "../data/site.mjs";
import { practiceAreas, areaUrl } from "../data/areas.mjs";
import { LEGAL_PATHS } from "../data/legal.mjs";
import { img, logo } from "./media.mjs";
import { icon } from "./icons.mjs";
import images from "../data/images.json" with { type: "json" };

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// Versão de cache = hash do conteúdo; muda sozinha quando CSS/JS mudam.
const ROOT_URL = new URL("../../", import.meta.url);
const ASSET_VERSION = createHash("sha256")
  .update(readFileSync(new URL("assets/css/site.css", ROOT_URL)))
  .update(readFileSync(new URL("assets/js/site.js", ROOT_URL)))
  .digest("hex")
  .slice(0, 10);
const abs = (path) => SITE.origin + path;

export const organizationSchema = () => {
  const sede = SITE.units[0];
  return {
    "@type": ["LegalService", "Organization"],
    "@id": `${SITE.origin}/#org`,
    name: SITE.name,
    url: `${SITE.origin}/`,
    logo: abs(images["logo-escuro"].src),
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
    areaServed: ["Boituva", "Sorocaba", "São Paulo", "Brasil"],
    knowsAbout: practiceAreas.map((a) => a.title),
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
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0B0B0B">
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
<link rel="icon" href="/uploads/favicon/favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" href="/uploads/favicon/favicon-32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/uploads/favicon/favicon-16.png" sizes="16x16">
<link rel="apple-touch-icon" href="/uploads/favicon/apple-touch-icon.png">
<link rel="preload" href="/uploads/fonts/lexend-deca-latin.woff2" as="font" type="font/woff2" crossorigin>
${join(preload, (p) => `<link rel="preload" as="image"${attrs(p)}>\n`)}<link rel="stylesheet" href="/assets/css/site.css?v=${ASSET_VERSION}">
${jsonLd({ "@context": "https://schema.org", "@graph": graph })}
</head>`;
}

const navLinks = (current, cls) =>
  join(NAV, (item) => `<li><a class="${cls}" href="${item.href}"${when(item.href === current, ' aria-current="page"')}>${esc(item.label)}</a></li>`);

function header(current) {
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
<div class="topbar">
  <div class="container">
    <p class="topbar__note">Sede em Boituva — SP · atendimento na região de Sorocaba e online em todo o Brasil</p>
    <div class="topbar__links">
      <a href="${SITE.phone.href}">${SITE.phone.display}</a>
      ${join(SITE.social, (s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`)}
    </div>
  </div>
</div>
<header class="site-header" data-header>
  <div class="container site-header__bar">
    <a class="site-header__logo" href="/" aria-label="${esc(SITE.name)} — página inicial">${logo("claro", 170)}</a>
    <nav class="nav" aria-label="Principal">
      <ul class="nav__list">${navLinks(current, "nav__link")}</ul>
    </nav>
    <a class="btn btn--light btn--plain site-header__cta" href="/contato/">Falar com a equipe</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-mobile" data-menu-toggle>
      <span class="menu-toggle__lines" aria-hidden="true"></span><span class="sr-only">Abrir menu</span>
    </button>
  </div>
</header>
<div class="mobile-menu" id="menu-mobile" hidden data-menu>
  <div class="container">
    <nav aria-label="Menu">
      <ul class="mobile-menu__list">
        ${join(NAV, (item, i) => `<li><a href="${item.href}"${when(item.href === current, ' aria-current="page"')}>${esc(item.label)}<span>0${i + 1}</span></a></li>`)}
      </ul>
    </nav>
    <div class="mobile-menu__foot">
      <a class="btn btn--light" href="/contato/">Falar com a equipe <span class="btn__arrow">${icon.arrow(16)}</span></a>
      <a href="${SITE.phone.href}">${SITE.phone.display}</a>
      <p>${esc(SITE.units[0].street)} — ${esc(SITE.units[0].city)}/${esc(SITE.units[0].region)}</p>
    </div>
  </div>
</div>`;
}

// Rodapé global: fechamento editorial (frase + um CTA), colunas de navegação,
// letreiro "VIEIRA & MARQUES" em baixo contraste e barra final com "voltar ao topo".
// Movimento só por CSS + IntersectionObserver (site.js), respeitando prefers-reduced-motion.
export function footer(whatsappMessage = waMessage()) {
  const sede = SITE.units[0];
  const col = (title, inner, extra = "") => `<div class="site-footer__col${extra}" data-reveal>
        <h2 class="site-footer__title">${title}</h2>
        ${inner}
      </div>`;
  const ext = (href, label) => `<a class="site-footer__link" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)} <span class="site-footer__ext" aria-hidden="true">↗</span><span class="sr-only"> (abre em nova aba)</span></a>`;
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
          <li class="site-footer__address">${esc(sede.street)}<br>${esc(sede.city)}/${esc(sede.region)}</li>
          <li><a class="site-footer__link" href="${SITE.phone.href}">${SITE.phone.display}</a></li>
          <li>${ext(whatsappUrl(whatsappMessage), "WhatsApp")}</li>
          ${when(!isPending(SITE.email), `<li><a class="site-footer__link site-footer__email" href="mailto:${esc(SITE.email)}">${esc(SITE.email).replace("@", "<wbr>@")}</a></li>`)}
        </ul>`, " site-footer__col--contact")}
      ${col("Legal", `<ul class="site-footer__list">
          <li>${link(LEGAL_PATHS.privacy, "Política de Privacidade")}</li>
          <li>${link(LEGAL_PATHS.terms, "Termos de Uso")}</li>
        </ul>
        <ul class="site-footer__list site-footer__social" aria-label="Redes sociais">${join(SITE.social, (s) => `<li>${ext(s.url, s.label)}</li>`)}</ul>`)}
    </div>

    <div class="site-footer__bottom">
      <p>© ${new Date().getFullYear()} ${esc(SITE.name)}.<br>CNPJ ${esc(SITE.cnpj)}</p>
      <p class="site-footer__notice">${esc(SITE.oabNotice)}</p>
      <button class="site-footer__top" type="button" data-back-to-top aria-label="Voltar ao topo">Topo <span aria-hidden="true">${icon.arrow(14)}</span></button>
    </div>
  </div>
  <p class="site-footer__giant" aria-hidden="true"><span data-footer-giant><span>Vieira &amp;</span> <span>Marques</span></span></p>
</footer>`;
}

export const waFloat = (message) =>
  `<a class="wa-float" href="${whatsappUrl(message)}" target="_blank" rel="noopener" data-wa-float data-hidden="true" aria-label="Conversar pelo WhatsApp">${icon.whatsapp(20)}<span>WhatsApp</span></a>`;

export function breadcrumbs(crumbs) {
  return `<nav class="breadcrumbs" aria-label="Você está em">
  <ol>${join(crumbs, (c, i) => (i === crumbs.length - 1 ? `<li><span aria-current="page">${esc(c.label)}</span></li>` : `<li><a href="${c.href}">${esc(c.label)}</a></li>`))}</ol>
</nav>`;
}

export function page({ title, description, path, crumbs, schema, preload, body, scripts = [], floatingWhatsapp = true, whatsappMessage = waMessage() }) {
  return `<!DOCTYPE html>
<html lang="${SITE.lang}">
${head({ title, description, path, schema, crumbs, preload })}
<body${SITE.forms ? " data-forms" : ""}>
${header(path)}
<main id="conteudo" tabindex="-1">
${body}
</main>
${footer(whatsappMessage)}
${floatingWhatsapp ? waFloat(whatsappMessage) : ""}
<script src="/assets/js/site.js?v=${ASSET_VERSION}" defer></script>
${join(scripts, (s) => `<script src="${s}?v=${ASSET_VERSION}" defer></script>\n`)}</body>
</html>
`;
}

export { img };
