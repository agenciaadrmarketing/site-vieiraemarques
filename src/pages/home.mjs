import { esc, join } from "../lib/html.mjs";
import { SITE } from "../data/site.mjs";
import { practiceAreas, areaUrl, AREAS_HUB } from "../data/areas.mjs";
import { team } from "../data/team.mjs";
import { articles, featuredArticle } from "../data/articles.mjs";
import { page } from "../partials/layout.mjs";
import { img, imgPreload } from "../partials/media.mjs";
import { icon } from "../partials/icons.mjs";
import { sectionHead, linkArrow, btn, personCard, articleFeature, articleRow, facts, steps } from "../partials/components.mjs";

const HERO_SIZES = "(min-width: 1240px) 1212px, 100vw";

export default function home() {
  const recent = articles.filter((a) => a !== featuredArticle).slice(0, 3);

  const body = `
<section class="hero on-dark" aria-labelledby="hero-titulo">
  <div class="hero__frame">
    <div class="hero__media">${img("fachada", { alt: "Fachada do escritório Vieira & Marques em Boituva - SP", sizes: HERO_SIZES, priority: true })}</div>
    <p class="hero__badge">Sociedade de Advogados · OAB/SP</p>
    <div class="hero__inner">
      <h1 class="hero__title" id="hero-titulo">
        <span>Vieira <span class="hero__amp">&amp;</span></span>
        <span>Marques</span>
        <span class="sr-only">Sociedade de Advogados em Boituva - SP</span>
      </h1>
      <div class="hero__panel">
        <p class="hero__lede">Clareza jurídica antes de qualquer decisão.</p>
        <p class="hero__text">Família, Sucessões, Trabalhista, Criminal, Saúde, Bancário, Imobiliário e Previdenciário. Sede em Boituva, atendimento na região de Sorocaba e online em todo o Brasil.</p>
        <div class="btn-row">
          ${btn(AREAS_HUB, "Conheça nossas áreas", "btn--light")}
          <a class="btn btn--ghost-light" href="/contato/">Falar com a equipe</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--white" aria-labelledby="intro-titulo">
  <div class="container">
    <div class="split split--center">
      <div class="stack" data-reveal>
        <p class="eyebrow">Vieira &amp; Marques Sociedade de Advogados</p>
        <h2 class="h-section" id="intro-titulo">A orientação vem antes da estratégia — <span class="grad">e a estratégia, antes do processo.</span></h2>
        <p class="lead">Um escritório organizado por áreas, com advogados inscritos na OAB/SP respondendo diretamente por cada uma delas. Sede em Boituva, atendimento na região de Sorocaba e online para clientes de todo o Brasil.</p>
      </div>
      <div data-reveal>
        ${facts([
          { label: "Sede", value: "Boituva — SP", text: "Rua Benedita Sanson Labronici, 180 — Chácara Labronici." },
          { label: "Região", value: "Sorocaba e região", text: "Atendimento a clientes de Sorocaba e cidades vizinhas." },
          { label: "Alcance", value: "Todo o Brasil", text: "Reuniões por vídeo e envio digital de documentos." },
          { label: "Corpo profissional", value: `${team.length} advogados`, text: "Inscrição ativa na OAB/SP e áreas definidas de atuação." },
        ])}
      </div>
    </div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="areas-titulo">
  <div class="container">
    ${sectionHead({
      eyebrow: "Áreas de atuação",
      id: "areas-titulo",
      title: `Oito áreas, <span class="grad">um mesmo método de análise.</span>`,
      lead: "Se você não souber onde o seu caso se encaixa, comece por qualquer uma delas — identificar o caminho aplicável faz parte da primeira conversa.",
      aside: linkArrow(AREAS_HUB, "Ver todas as áreas"),
    })}
    <ol class="area-index" data-reveal>
      ${join(practiceAreas, (a) => `<li class="area-index__item"><a href="${areaUrl(a)}">
        <span class="area-index__num">${a.number}</span>
        <h3 class="area-index__title">${esc(a.title)}</h3>
        <p class="area-index__text">${esc(a.summary)}</p>
        <span class="area-index__arrow">${icon.arrow(20)}</span>
      </a></li>`)}
    </ol>
  </div>
</section>

<section class="section section--dark" aria-labelledby="escritorio-titulo">
  <div class="container">
    <div class="split split--reverse split--center">
      <div class="stack" data-reveal>
        <p class="eyebrow">O escritório</p>
        <h2 class="h-section" id="escritorio-titulo">A maior parte das dúvidas jurídicas não começa em um processo. <span class="grad">Começa em uma conversa.</span></h2>
        <div class="prose">
          <p>Divórcios, inventários, acusações criminais, demissões e pedidos negados pelo INSS chegam ao escritório cercados de urgência e informação desencontrada. O trabalho começa por organizar o cenário: o que a lei prevê, quais caminhos existem e quais consequências cada um carrega.</p>
        </div>
        <ul class="checklist">
          <li>${icon.check(18)}<span>Escuta antes de estratégia: todo atendimento começa pelos fatos e documentos existentes.</span></li>
          <li>${icon.check(18)}<span>Prazos, etapas e riscos explicados em linguagem direta.</span></li>
          <li>${icon.check(18)}<span>Atuação preventiva, extrajudicial ou judicial, conforme o que o caso exige.</span></li>
        </ul>
        ${btn("/escritorio/", "Conheça o escritório", "btn--light")}
      </div>
      <div class="mosaic" data-reveal>
        <figure class="figure figure--hover">${img("recepcao", { alt: "Recepção do escritório, com diplomas e certificados na parede", sizes: "(min-width: 960px) 640px, 100vw" })}<figcaption>Recepção — Boituva/SP</figcaption></figure>
        <figure class="figure figure--hover">${img("sala-atendimento", { alt: "Sala de atendimento do escritório", sizes: "(min-width: 960px) 320px, 50vw" })}</figure>
        <figure class="figure figure--hover">${img("estacao-trabalho", { alt: "Estação de trabalho com a identidade Vieira & Marques", sizes: "(min-width: 960px) 320px, 50vw" })}</figure>
      </div>
    </div>
  </div>
</section>

<section class="section section--white" aria-labelledby="equipe-titulo">
  <div class="container">
    ${sectionHead({
      eyebrow: "Equipe",
      id: "equipe-titulo",
      title: `Quem conduz <span class="grad">o atendimento.</span>`,
      lead: "Formação, inscrição na OAB e área de atuação de cada profissional — informação verificável.",
      aside: linkArrow("/escritorio/#equipe", "Conheça a equipe"),
    })}
    <ul class="people">${join(team, (p) => personCard(p))}</ul>
  </div>
</section>

<section class="section section--muted" aria-labelledby="conhecimento-titulo">
  <div class="container">
    ${sectionHead({
      eyebrow: "Base de conhecimento",
      id: "conhecimento-titulo",
      title: `Informação jurídica <span class="grad">sobre dúvidas concretas.</span>`,
      aside: linkArrow("/conhecimento/", "Explorar conteúdos"),
    })}
    <div class="articles articles--home">
      ${articleFeature(featuredArticle)}
      <ul class="article-list" data-reveal>${join(recent, (a) => articleRow(a))}</ul>
    </div>
  </div>
</section>

<section class="section section--dark" aria-labelledby="atendimento-titulo">
  <div class="container">
    ${sectionHead({
      eyebrow: "Atendimento",
      id: "atendimento-titulo",
      title: `Como funciona <span class="grad">o primeiro contato.</span>`,
      lead: "Nenhuma etapa exige que você já saiba nomear o seu problema jurídico. O envio da mensagem não constitui contratação: condições são combinadas por escrito depois da análise.",
    })}
    ${steps()}
  </div>
</section>`;

  return page({
    title: "Vieira & Marques Advogados | Boituva - SP e região de Sorocaba",
    description:
      "Advogados em Boituva (SP) e região de Sorocaba: Família, Sucessões, Trabalhista, Criminal, Saúde, Bancário, Imobiliário e Previdenciário. Atendimento online.",
    path: "/",
    preload: [imgPreload("fachada", HERO_SIZES)],
    schema: [
      {
        "@type": "WebSite",
        "@id": `${SITE.origin}/#website`,
        url: `${SITE.origin}/`,
        name: SITE.name,
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE.origin}/#org` },
      },
    ],
    body,
  });
}
