import { lpCta, lpReach } from "../partials/lp.mjs";
import { esc, join, when } from "../lib/html.mjs";
import { SITE, waMessage } from "../data/site.mjs";
import { practiceAreas, areaById, areaFaqUrl } from "../data/areas.mjs";
import { articles, featuredArticle } from "../data/articles.mjs";
import { faqByArea } from "../data/faq.mjs";
import { page, breadcrumbs } from "../partials/layout.mjs";
import { icon } from "../partials/icons.mjs";
import { sectionHead, articleFeature, articleCard } from "../partials/components.mjs";

const PATH = "/conhecimento/";
const CRUMBS = [
  { label: "Início", href: "/" },
  { label: "Base de Conhecimento", href: PATH },
];

export default function conhecimento() {
  const count = (id) =>
    articles.filter((a) => a.area === id).length + ((faqByArea[id] ?? []).length ? 1 : 0);
  const rest = articles.filter((a) => a !== featuredArticle);
  const guides = articles.filter((a) => a.type === "guia");
  const faqAreas = practiceAreas.filter((a) => (faqByArea[a.id] ?? []).length);

  const chip = (id, label, n, pressed = false) =>
    `<button class="chip" type="button" data-filter="${id}" aria-pressed="${pressed}">${esc(label)} <span class="chip__count">${n}</span></button>`;

  const body = `
<section class="page-hero on-dark" aria-labelledby="page-titulo">
  <div class="container">
    ${breadcrumbs(CRUMBS)}
    <div class="page-hero__grid">
      <div class="stack">
        <p class="eyebrow">Base de conhecimento</p>
        <h1 class="page-hero__title" id="page-titulo">Informação jurídica para <span class="grad">decisões mais conscientes.</span></h1>
      </div>
      <div class="page-hero__aside">
        <p class="lead">Artigos, perguntas frequentes e orientações escritas pela equipe do escritório, em linguagem direta. Conteúdo de caráter informativo: a avaliação de cada caso depende dos documentos e das circunstâncias concretas.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--white" aria-labelledby="conteudos-titulo" data-filter-scope>
  <div class="container">
    <h2 class="sr-only" id="conteudos-titulo">Conteúdos por área</h2>
    <div class="chips" role="group" aria-label="Filtrar por área" data-filter-chips>
      ${chip("todos", "Todos", articles.length + faqAreas.length, true)}
      ${join(practiceAreas, (a) => chip(a.id, a.shortTitle, count(a.id)))}
    </div>
    <p class="sr-only" role="status" aria-live="polite" data-filter-status></p>

    <div class="mt-lg stack">
      <div data-filter-block>
        <p class="eyebrow">Em destaque</p>
        <div class="mt-lg" data-filter-item data-area="${featuredArticle.area}">${articleFeature(featuredArticle)}</div>
      </div>

      <div class="mt-lg" data-filter-block>
        <p class="eyebrow">Publicados recentemente</p>
        <ul class="cards-grid mt-lg">${join(rest, (a) => articleCard(a).replace("<li ", "<li data-filter-item "))}</ul>
      </div>

      ${when(guides.length, `<div class="mt-lg" data-filter-block>
        <p class="eyebrow">Guias</p>
        <ul class="cards-grid mt-lg">${join(guides, (a) => articleCard(a).replace("<li ", "<li data-filter-item "))}</ul>
      </div>`)}

      <div class="mt-lg" data-filter-block>
        <p class="eyebrow">Perguntas frequentes por área</p>
        <ul class="cards-grid mt-lg">
          ${join(faqAreas, (a) => `<li data-filter-item data-area="${a.id}"><a class="article-card" href="${areaFaqUrl(a)}">
            <p class="meta"><span>${esc(a.shortTitle)}</span><span>${faqByArea[a.id].length} perguntas</span></p>
            <h3 class="article-card__title">${esc(faqByArea[a.id][0][0])}</h3>
            <p class="muted">E outras dúvidas frequentes sobre ${esc(a.title)}.</p>
            <span class="link-arrow">Ver respostas ${icon.arrow(14)}</span>
          </a></li>`)}
        </ul>
      </div>

      <div class="empty-state" hidden data-filter-empty>
        <p class="h-card">Ainda não há conteúdos publicados nesta área.</p>
        <p class="muted">Veja os serviços da área ou envie sua dúvida diretamente para a equipe.</p>
        <div class="btn-row">
          <a class="btn btn--ghost" href="/areas-de-atuacao/" data-filter-area-link>Ver a área</a>
          <a class="btn btn--ghost" href="/contato/">Falar com a equipe</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="blog-titulo">
  <div class="container">
    ${sectionHead({
      eyebrow: "Blog do escritório",
      id: "blog-titulo",
      title: `Todos os artigos <span class="grad">em um só lugar.</span>`,
      lead: "Os artigos completos estão publicados no blog do escritório, organizados por área e atualizados pela equipe.",
      aside: `<a class="btn" href="${SITE.blogBase}/blog/" target="_blank" rel="noopener">Abrir o blog <span class="btn__arrow">${icon.arrowUpRight(16)}</span></a>`,
    })}
  </div>
</section>

${lpCta({ title: `Leu sobre o seu caso e ficou com dúvida? <span class="grad">Fale com a nossa equipe.</span>`, text: "Os conteúdos são informativos e não substituem a análise do caso concreto. Envie as informações para uma análise inicial.", message: waMessage() })}

${lpReach()}`;

  return page({
    title: "Base de Conhecimento Jurídico | Vieira & Marques",
    description:
      "Artigos e perguntas frequentes sobre Família, Sucessões, Trabalhista, Criminal, Saúde, Bancário, Imobiliário e Previdenciário, pela equipe da Vieira & Marques.",
    path: PATH,
    crumbs: CRUMBS,
    whatsappMessage: "Olá! Vim pela Base de Conhecimento do site da Vieira & Marques e gostaria de orientação sobre o meu caso.",
    schema: [
      {
        "@type": "CollectionPage",
        name: "Base de Conhecimento",
        hasPart: articles.map((a) => ({
          "@type": "Article",
          headline: a.title,
          url: a.url,
          datePublished: a.date,
          about: areaById[a.area]?.title,
          publisher: { "@id": "https://vieiraemarquesadvogados.com/#org" },
        })),
      },
    ],
    body,
  });
}
