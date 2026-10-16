import { imgPreload } from "../partials/media.mjs";
import { lpSteps, lpCta, lpReach, lpStructure, lpHero } from "../partials/lp.mjs";
import { esc, join, when } from "../lib/html.mjs";
import { SITE, waMessage } from "../data/site.mjs";
import { team, personName, profilePath } from "../data/team.mjs";
import { areaById, areaUrl, AREAS_HUB } from "../data/areas.mjs";
import { googleReviews, GOOGLE_REVIEWS_SCRIPT } from "../partials/google-reviews.mjs";
import { page, breadcrumbs } from "../partials/layout.mjs";
import { img } from "../partials/media.mjs";
import { icon } from "../partials/icons.mjs";
import { guides as pdfGuides } from "../data/guides.mjs";
import { sectionHead, facts, teamPanels } from "../partials/components.mjs";

const PATH = "/escritorio/";
const CRUMBS = [
  { label: "Início", href: "/" },
  { label: "O Escritório", href: PATH },
];

const METHOD = [
  { title: "Atenção individualizada", text: "Cada caso é tratado a partir dos próprios fatos e documentos. Ouvir com cuidado vem antes de qualquer orientação." },
  { title: "Clareza antes da decisão", text: "Prazos, etapas e riscos são explicados em linguagem direta, para que a decisão sobre o próximo passo seja de quem nos procura." },
  { title: "Caminho proporcional ao caso", text: "Aconselhamento preventivo, acordo extrajudicial ou representação judicial — a via é escolhida conforme o que a situação exige." },
  { title: "Responsabilidade por área", text: "Advogados inscritos na OAB/SP respondem pelas áreas em que atuam. O primeiro contato passa pela equipe de atendimento, que encaminha cada caso ao profissional responsável." },
];

// Conteúdo essencial de Visão, Missão e Valores do site anterior, preservado.
const PRINCIPLES = [
  { label: "Visão", title: "A advocacia como instrumento para assegurar direitos.", text: "O trabalho do escritório parte da ideia de que conhecer o próprio direito — e saber como exercê-lo — é o que permite decidir com segurança.", source: "“Vemos a atividade da advocacia como um instrumento para assegurar os seus Direitos.”" },
  { label: "Missão", title: "Defender direitos com afinco, sem aceitar desigualdades.", text: "Proteger os direitos de quem nos procura e ajudar a encontrar soluções jurídicas seguras e sustentáveis, no âmbito extrajudicial ou judicial.", source: "“Defender os seus direitos com afinco, não aceitando desigualdades.”" },
  { label: "Valores", title: "Responsabilidade, fidelidade e honestidade.", text: "No trato com cada cliente e no respeito aos princípios éticos da advocacia — o que inclui informar com franqueza e nunca prometer resultado.", source: "“Responsabilidade, fidelidade e honestidade no trato com os nossos clientes é o nosso lema.”" },
];

const SITE_SCRIPTS = SITE.googleReviews ? [GOOGLE_REVIEWS_SCRIPT] : [];

export default function escritorio() {
  const body = `
${lpHero({
  crumbs: CRUMBS,
  badge: "O Escritório · Boituva/SP",
  title: `Orientar antes de agir. <span class="grad">Agir com responsabilidade.</span>`,
  text: "A Vieira &amp; Marques Sociedade de Advogados nasceu com o propósito de oferecer atendimento jurídico ético, eficiente e acolhedor — com sede em Boituva, atendimento presencial em Boituva e Sorocaba e online em São Paulo e todo o Brasil.",
  message: waMessage(),
  cta: "Falar com a equipe",
  secondary: { href: "#equipe", label: "Conheça a equipe" },
  note: ["Atendimento sigiloso", "Presencial em Boituva e Sorocaba", "Online em São Paulo e todo o Brasil"],
  image: "equipe",
  alt: "Equipe de advogados da Vieira & Marques no escritório de Boituva",
  position: "50% 30%",
})}

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
          { label: "Presencial", value: "Boituva e Sorocaba" },
          { label: "Online", value: "São Paulo e todo o Brasil" },
          { label: "Equipe", value: `${team.length} advogados` },
        ])}
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

<section class="section section--white" aria-labelledby="metodo-titulo">
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

${lpStructure({
  eyebrow: "Estrutura",
  title: `O escritório <span class="grad">por dentro.</span>`,
  text: "Sede em Boituva, com salas de atendimento e de reunião. Atendimento presencial também em Sorocaba e, para as demais cidades, reuniões por vídeo.",
  items: [
    { image: "escritorio-interno", title: "Sede — Boituva/SP", caption: "Rua Benedita Sanson Labronici, 180 — Chácara Labronici", alt: "Ambiente interno do escritório em Boituva", wide: true, position: "50% 55%" },
    { image: "sala-reuniao", title: "Sala de reunião", caption: "Reuniões presenciais ou por vídeo", alt: "Sala de reunião do escritório" },
    { image: "letreiro", title: "Identidade no escritório", caption: "Vieira & Marques Sociedade de Advogados", alt: "Letreiro com a marca Vieira & Marques na parede do escritório" },
    { image: "mesa-trabalho", title: "Área de trabalho da equipe", caption: "Cada caso analisado a partir dos documentos", alt: "Mesas de trabalho da equipe no escritório", wide: true },
  ],
})}

<section class="section section--white" id="equipe" aria-labelledby="equipe-titulo">
  <div class="container">
    ${sectionHead({
      eyebrow: "Equipe",
      id: "equipe-titulo",
      title: `Advogados com <span class="grad">áreas de atuação definidas.</span>`,
      lead: "Conheça cada profissional e abra o perfil completo para ver formação, áreas e contato.",
    })}
    ${teamPanels(team, { headingLevel: 3, profileLinks: true })}
  </div>
</section>

${lpReach()}

${googleReviews({ muted: false })}

<section class="section section--white" aria-labelledby="conteudos-titulo">
  <div class="container">
    ${sectionHead({
      eyebrow: "Base de conhecimento",
      id: "conteudos-titulo",
      title: `Informação para decidir <span class="grad">com mais clareza.</span>`,
      lead: "Guias em PDF e artigos escritos pela equipe, em linguagem direta.",
      aside: `<a class="link-arrow" href="/conhecimento/">Explorar conteúdos ${icon.arrow(14)}</a>`,
    })}
    <ul class="hub-guides mt-lg">
      ${join(pdfGuides.slice(0, 3), (g) => `<li><a class="hub-guide" href="${esc(g.url)}" target="_blank" rel="noopener noreferrer">
        <span class="hub-guide__code">${g.n} · ${esc(g.label.toUpperCase())}</span>
        <span class="hub-guide__word" aria-hidden="true">${esc(g.word)}</span>
        <span class="hub-guide__title">${esc(g.title)}</span>
        <span class="hub-guide__desc">${esc(g.desc)}</span>
        <span class="hub-guide__go">Abrir guia em PDF <span aria-hidden="true">↗</span></span>
      </a></li>`)}
    </ul>
  </div>
</section>

${lpCta({ title: `Quer conversar sobre o seu caso? <span class="grad">Fale com a nossa equipe.</span>`, text: "A equipe de atendimento faz a triagem inicial e, quando aplicável, encaminha o caso ao advogado responsável pela área.", message: waMessage() })}`;

  return page({
    scripts: SITE_SCRIPTS,
    title: "Escritório de Advocacia em Boituva/SP | Vieira & Marques",
    description:
      "História, forma de atuação e equipe da Vieira & Marques Sociedade de Advogados: presencial em Boituva e Sorocaba e online em todo o Brasil.",
    path: PATH,
    preload: [imgPreload("equipe", "100vw")],
    crumbs: CRUMBS,
    whatsappMessage: "Olá! Vim pelo site da Vieira & Marques, conheci o escritório e gostaria de orientação.",
    schema: [
      { "@type": "AboutPage", "@id": `https://vieiraemarquesadvogados.com${PATH}#pagina`, name: "O Escritório", about: { "@id": "https://vieiraemarquesadvogados.com/#org" } },
      ...team.map((p) => ({ "@type": "Person", ...(p.hasProfile ? { "@id": `https://vieiraemarquesadvogados.com${profilePath(p)}#pessoa`, url: `https://vieiraemarquesadvogados.com${profilePath(p)}` } : {}), name: personName(p), jobTitle: p.role, worksFor: { "@id": "https://vieiraemarquesadvogados.com/#org" } })),
    ],
    body,
  });
}
