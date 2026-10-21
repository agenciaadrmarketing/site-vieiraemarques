import { esc, join } from "../lib/html.mjs";
import { SITE, waMessage } from "../data/site.mjs";
import { lpCta, lpReach, lpAreaCards } from "../partials/lp.mjs";
import { practiceAreas, areaUrl, AREAS_HUB, areaNames, areaCountTitle } from "../data/areas.mjs";
import { googleReviews, GOOGLE_REVIEWS_SCRIPT } from "../partials/google-reviews.mjs";
import { team, teamRecognitions } from "../data/team.mjs";
import { articles, featuredArticle } from "../data/articles.mjs";
import { page } from "../partials/layout.mjs";
import { img, imgPreload } from "../partials/media.mjs";
import { icon } from "../partials/icons.mjs";
import { trustBar } from "../partials/trust-bar.mjs";
import { waButton, sectionHead, linkArrow, btn, teamPanels, recognitions, articleFeature, articleRow, facts } from "../partials/components.mjs";

const HERO_SIZES = "(min-width: 1240px) 1212px, 100vw";

const SITE_SCRIPTS = SITE.googleReviews ? [GOOGLE_REVIEWS_SCRIPT] : [];

export default function home() {
  const recent = articles.filter((a) => a !== featuredArticle).slice(0, 3);

  const body = `
<section class="hero on-dark" aria-labelledby="hero-titulo">
  <div class="hero__frame">
    <div class="hero__media">${img("hero-home", { alt: "Mesa de trabalho com notebook exibindo a marca Vieira & Marques, no escritório em Boituva - SP", sizes: HERO_SIZES, priority: true })}</div>
    <p class="hero__badge">Sede em Boituva/SP · Atendimento online</p>
    <div class="hero__inner">
      <h1 class="hero__title" id="hero-titulo">
        <span>Vieira <span class="hero__amp">&amp;</span></span>
        <span>Marques</span>
        <span class="hero__sub">Sociedade de Advogados</span>
        <span class="sr-only">em Boituva - SP</span>
      </h1>
      <div class="hero__panel">
        <p class="hero__lede">Clareza jurídica antes de qualquer decisão.</p>
        <p class="hero__text">${areaNames({ familia: "Família", sucessorio: "Sucessões", trabalhista: "Trabalhista", criminal: "Criminal", saude: "Saúde", bancario: "Bancário", imobiliario: "Imobiliário", previdenciario: "Previdenciário" })}. Atendimento presencial em Boituva e Sorocaba e online em São Paulo e todo o Brasil.</p>
        <div class="btn-row">
          ${btn(AREAS_HUB, "Conheça nossas áreas", "btn--light")}
          ${waButton(waMessage(), "Falar com a equipe", { cta: "hero" })}
        </div>
      </div>
    </div>
  </div>
</section>
${trustBar()}

${lpAreaCards({
  id: "areas",
  title: `${areaCountTitle} áreas, <span class="grad">um mesmo método de análise.</span>`,
  lead: "Se você não souber onde o seu caso se encaixa, comece por qualquer uma delas — identificar o caminho aplicável faz parte da primeira conversa.",
  tone: "white",
  more: { href: AREAS_HUB, label: "Ver todas as áreas" },
})}
<section class="section section--dark on-dark" aria-labelledby="equipe-titulo">
  <div class="container">
    ${sectionHead({
      eyebrow: "Equipe",
      id: "equipe-titulo",
      title: `Quem conduz <span class="grad">o atendimento.</span>`,
      lead: "Formação, inscrição na OAB e área de atuação de cada profissional — informação verificável.",
      aside: linkArrow("/escritorio/#equipe", "Conheça a equipe"),
    })}
    ${teamPanels(team, { profileLinks: true })}
    ${recognitions(teamRecognitions)}
  </div>
</section>

<section class="section section--white" aria-labelledby="escritorio-titulo">
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
        ${btn("/escritorio/", "Conheça o escritório")}
      </div>
      <div class="mosaic" data-reveal>
        <figure class="figure figure--hover">${img("recepcao", { alt: "Recepção do escritório, com o logotipo Vieira & Marques na parede", sizes: "(min-width: 960px) 640px, 100vw" })}<figcaption>Recepção — Boituva/SP</figcaption></figure>
        <figure class="figure figure--hover">${img("sala-atendimento", { alt: "Poltrona de couro, planta e porta-retrato no escritório", sizes: "(min-width: 960px) 320px, 50vw" })}</figure>
        <figure class="figure figure--hover">${img("mesa-trabalho", { alt: "Estação de trabalho do escritório, com notebook e área de espera ao fundo", sizes: "(min-width: 960px) 320px, 50vw" })}</figure>
      </div>
    </div>
  </div>
</section>

${lpReach()}

${googleReviews()}

<section class="section section--dark on-dark" aria-labelledby="conhecimento-titulo">
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

${lpCta({ title: `Não sabe por onde começar? <span class="grad">Fale com a nossa equipe.</span>`, text: "Descreva a situação em linguagem comum. Identificar a área e o caminho aplicável faz parte da triagem inicial.", message: waMessage() })}
`;

  return page({
    visit: false,
    ogImage: "hero-home",
    ogAlt: "Mesa de trabalho com notebook exibindo a marca Vieira & Marques, no escritório em Boituva - SP",
    scripts: SITE_SCRIPTS,
    title: "Vieira & Marques Advogados | Boituva, Sorocaba e Online",
    description:
      `Advogados em Boituva e Sorocaba (SP) e online em todo o Brasil: ${areaNames({ familia: "Família", sucessorio: "Sucessões", trabalhista: "Trabalho", criminal: "Criminal", saude: "Saúde", bancario: "Bancário", imobiliario: "Imóveis", previdenciario: "INSS" })}. Fale com a equipe.`,
    path: "/",
    preload: [imgPreload("hero-home", HERO_SIZES)],
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
