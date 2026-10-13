import { esc, join, when } from "../lib/html.mjs";
import { team, teamRecognitions } from "../data/team.mjs";
import { areaById, areaUrl, AREAS_HUB } from "../data/areas.mjs";
import { page, breadcrumbs } from "../partials/layout.mjs";
import { img } from "../partials/media.mjs";
import { icon } from "../partials/icons.mjs";
import { sectionHead, facts, teamPanels, recognitions } from "../partials/components.mjs";

const PATH = "/escritorio/";
const CRUMBS = [
  { label: "Início", href: "/" },
  { label: "O Escritório", href: PATH },
];

const METHOD = [
  { title: "Atenção individualizada", text: "Cada caso é tratado a partir dos próprios fatos e documentos. Ouvir com cuidado vem antes de qualquer orientação." },
  { title: "Clareza antes da decisão", text: "Prazos, etapas e riscos são explicados em linguagem direta, para que a decisão sobre o próximo passo seja de quem nos procura." },
  { title: "Caminho proporcional ao caso", text: "Aconselhamento preventivo, acordo extrajudicial ou representação judicial — a via é escolhida conforme o que a situação exige." },
  { title: "Responsabilidade por área", text: "Advogados inscritos na OAB/SP respondem diretamente pelas áreas em que atuam, do primeiro contato ao acompanhamento do caso." },
];

// Conteúdo essencial de Visão, Missão e Valores do site anterior, preservado.
const PRINCIPLES = [
  { label: "Visão", title: "A advocacia como instrumento para assegurar direitos.", text: "O trabalho do escritório parte da ideia de que conhecer o próprio direito — e saber como exercê-lo — é o que permite decidir com segurança.", source: "“Vemos a atividade da advocacia como um instrumento para assegurar os seus Direitos.”" },
  { label: "Missão", title: "Defender direitos com afinco, sem aceitar desigualdades.", text: "Proteger os direitos de quem nos procura e ajudar a encontrar soluções jurídicas seguras e sustentáveis, no âmbito extrajudicial ou judicial.", source: "“Defender os seus direitos com afinco, não aceitando desigualdades.”" },
  { label: "Valores", title: "Responsabilidade, fidelidade e honestidade.", text: "No trato com cada cliente e no respeito aos princípios éticos da advocacia — o que inclui informar com franqueza e nunca prometer resultado.", source: "“Responsabilidade, fidelidade e honestidade no trato com os nossos clientes é o nosso lema.”" },
];

function profile(p) {
  const areaLinks = p.areas.map((id) => areaById[id]).filter(Boolean);
  // A foto aparece nos painéis acima; aqui fica a formação completa.
  return `<article class="profile" id="${p.id}" data-reveal>
  <div class="profile__body">
    <p class="person__meta"><span>${esc(p.role)} · ${esc(p.oab)}</span></p>
    <h4 class="profile__name">${esc(p.name)}</h4>
    <p class="muted">${esc(p.bio)}</p>
    <ul class="profile__list">${join(p.credentials, (c) => `<li>${esc(c)}</li>`)}</ul>
    ${when(areaLinks.length, `<p class="muted">Áreas: ${areaLinks.map((a) => `<a class="text-link" href="${areaUrl(a)}">${esc(a.title)}</a>`).join(", ")}</p>`)}
  </div>
</article>`;
}

export default function escritorio() {
  const body = `
<section class="page-hero on-dark" aria-labelledby="page-titulo">
  <div class="container">
    ${breadcrumbs(CRUMBS)}
    <div class="page-hero__grid">
      <div class="stack">
        <p class="eyebrow">O Escritório</p>
        <h1 class="page-hero__title" id="page-titulo">Orientar antes de agir. <span class="grad">Agir com responsabilidade.</span></h1>
      </div>
      <div class="page-hero__aside">
        <p class="lead">A Vieira &amp; Marques Sociedade de Advogados nasceu com o propósito de oferecer atendimento jurídico ético, eficiente e acolhedor — com sede em Boituva, atendimento na região de Sorocaba e online em todo o Brasil.</p>
      </div>
    </div>
    <figure class="page-hero__media">${img("equipe", { alt: "Equipe de advogados da Vieira & Marques no escritório de Boituva", sizes: "(min-width: 1240px) 1180px, 100vw", priority: true, style: "object-position:50% 30%" })}</figure>
  </div>
</section>

<section class="section section--white" aria-labelledby="historia-titulo">
  <div class="container">
    <div class="split">
      <div class="stack" data-reveal>
        <p class="eyebrow">Quem somos</p>
        <h2 class="h-section" id="historia-titulo">Um escritório construído em torno de <span class="grad">pessoas e de decisões importantes.</span></h2>
      </div>
      <div class="stack" data-reveal>
        <div class="prose">
          <p>O escritório atua em oito áreas: Família, Sucessões, Trabalhista, Criminal, Médico e da Saúde, Bancário, Imobiliário e Previdenciário. Em todas, o compromisso é o mesmo: verdade, segurança e respeito aos direitos de quem nos procura.</p>
          <p>Acreditamos que cada caso merece atenção individualizada. Por isso, ouvimos com cuidado, orientamos com clareza e atuamos com firmeza — sempre dentro dos princípios éticos da advocacia. A solução pode estar em um aconselhamento preventivo, em um acordo extrajudicial ou na representação judicial.</p>
          <p>A equipe reúne advogados com formação e áreas de atuação definidas, que unem conhecimento técnico e sensibilidade para lidar desde situações delicadas do dia a dia até disputas complexas.</p>
        </div>
        ${facts([
          { label: "Sede", value: "Boituva — SP" },
          { label: "Região", value: "Sorocaba e região" },
          { label: "Alcance", value: "Todo o Brasil, online" },
          { label: "Equipe", value: `${team.length} advogados` },
        ])}
      </div>
    </div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="metodo-titulo">
  <div class="container">
    <div class="split split--center">
      <figure class="figure figure--portrait" data-reveal>${img("atendimento-mesa", { alt: "Advogada do escritório trabalhando em sua estação", sizes: "(min-width: 960px) 460px, 100vw", style: "object-position:40% 50%" })}</figure>
      <div>
        ${sectionHead({ eyebrow: "Forma de atuação", id: "metodo-titulo", title: `Como o escritório <span class="grad">conduz cada caso.</span>` })}
        <ol class="principles principles--light">
          ${join(METHOD, (m, i) => `<li class="principle principle--compact" data-reveal>
            <span class="principle__num">${String(i + 1).padStart(2, "0")}</span>
            <div class="stack-sm"><h3 class="h-card">${esc(m.title)}</h3><p class="muted">${esc(m.text)}</p></div>
          </li>`)}
        </ol>
      </div>
    </div>
  </div>
</section>

<section class="section section--dark" aria-labelledby="principios-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Princípios", id: "principios-titulo", title: `O que orienta <span class="grad">o trabalho do escritório.</span>` })}
    <ol class="principles">
      ${join(PRINCIPLES, (p, i) => `<li class="principle" data-reveal>
        <span class="principle__num">${String(i + 1).padStart(2, "0")} · ${esc(p.label)}</span>
        <h3 class="principle__title">${esc(p.title)}</h3>
        <p class="principle__text">${esc(p.text)}<span class="principle__source">${esc(p.source)}</span></p>
      </li>`)}
    </ol>
  </div>
</section>

<section class="section section--white" id="equipe" aria-labelledby="equipe-titulo">
  <div class="container">
    ${sectionHead({
      eyebrow: "Equipe",
      id: "equipe-titulo",
      title: `Advogados com <span class="grad">áreas de atuação definidas.</span>`,
      lead: "Formação, inscrição na OAB e áreas de atuação de cada profissional, conforme informado pelo escritório.",
    })}
    ${teamPanels(team, { headingLevel: 3 })}
    ${recognitions(teamRecognitions)}
    <h3 class="eyebrow profiles__title">Formação de cada profissional</h3>
    <div class="profiles">${join(team, profile)}</div>
  </div>
</section>

<section class="section section--dark" aria-labelledby="estrutura-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Estrutura", id: "estrutura-titulo", title: `O escritório <span class="grad">por dentro.</span>`, lead: "Sede em Boituva, com salas de atendimento e de reunião. Para quem está em outra cidade, as reuniões acontecem por vídeo." })}
    <div class="gallery" data-reveal>
      <figure class="figure figure--hover gallery__wide">${img("escritorio-interno", { alt: "Ambiente interno do escritório em Boituva", sizes: "(min-width: 1240px) 1180px, 100vw", style: "object-position:50% 55%" })}<figcaption>Sede — Boituva/SP</figcaption></figure>
      <figure class="figure figure--hover">${img("sala-reuniao", { alt: "Sala de reunião do escritório", sizes: "(min-width: 960px) 390px, 100vw" })}<figcaption>Sala de reunião</figcaption></figure>
      <figure class="figure figure--hover">${img("letreiro", { alt: "Letreiro com a marca Vieira & Marques na parede do escritório", sizes: "(min-width: 960px) 390px, 100vw" })}<figcaption>Identidade no escritório</figcaption></figure>
      <figure class="figure figure--hover">${img("mesa-trabalho", { alt: "Mesas de trabalho da equipe no escritório", sizes: "(min-width: 960px) 390px, 100vw" })}<figcaption>Área de trabalho da equipe</figcaption></figure>
    </div>
  </div>
</section>`;

  return page({
    title: "O Escritório | Vieira & Marques",
    description:
      "História, forma de atuação, princípios e equipe da Vieira & Marques Sociedade de Advogados, com sede em Boituva, atendimento na região de Sorocaba e online.",
    path: PATH,
    crumbs: CRUMBS,
    whatsappMessage: "Olá! Vim pelo site da Vieira & Marques, conheci o escritório e gostaria de orientação.",
    schema: [
      { "@type": "AboutPage", "@id": `https://vieiraemarquesadvogados.com${PATH}#pagina`, name: "O Escritório", about: { "@id": "https://vieiraemarquesadvogados.com/#org" } },
      ...team.map((p) => ({ "@type": "Person", name: p.name.replace(/^Dra?\. /, ""), jobTitle: `${p.role} — ${p.focus}`, identifier: p.oab, worksFor: { "@id": "https://vieiraemarquesadvogados.com/#org" } })),
    ],
    body,
  });
}
