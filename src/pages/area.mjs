import { esc, join } from "../lib/html.mjs";
import { SITE, waMessage } from "../data/site.mjs";
import { areaUrl, AREAS_HUB } from "../data/areas.mjs";
import { AREA_LP } from "../data/area-lp.mjs";
import { hasPage, serviceHref } from "../data/services/index.mjs";
import { team, teamByArea, profilePath } from "../data/team.mjs";
import { articles } from "../data/articles.mjs";
import { faqByArea } from "../data/faq.mjs";
import { page } from "../partials/layout.mjs";
import { imgPreload } from "../partials/media.mjs";
import { googleReviews, GOOGLE_REVIEWS_SCRIPT } from "../partials/google-reviews.mjs";
import { icon } from "../partials/icons.mjs";
import { faqSchema, articleRow, sectionHead } from "../partials/components.mjs";
import { img } from "../partials/media.mjs";
import { HERO_MOBILE, lpHero, lpServices, lpSteps, lpProof, lpAbout, lpStructure, lpCta, lpSignals, lpReach, lpFaq, lpHead, lpOtherAreas } from "../partials/lp.mjs";

// Página própria de cada área (página-pilar), no mesmo desenho das landing pages
// publicadas: hero com a pergunta do cliente, serviços, como funciona, equipe,
// estrutura, faixa de chamada, pontos de atenção, onde atendemos e perguntas.
// Mãe das páginas /areas/<área>/<serviço>/.

const description = (area) => {
  const base = `${area.summary.replace(/\s+—\s+/, ": ")} Presencial em Boituva e Sorocaba; online em todo o Brasil.`;
  const out = base.length <= 160 ? base : `${area.summary} Presencial em Boituva e Sorocaba e online.`;
  const more = " Orientação inicial pela equipe de atendimento.";
  return out.length < 135 && out.length + more.length <= 160 ? out + more : out;
};

const faqTitle = (area) => `Perguntas sobre <span class="grad">${esc(area.shortTitle === "Médico e Saúde" ? "Direito Médico e da Saúde" : area.title)}</span>`;

export function renderArea(area) {
  const lp = AREA_LP[area.id];
  const path = areaUrl(area);
  const crumbs = [
    { label: "Início", href: "/" },
    { label: "Áreas de Atuação", href: AREAS_HUB },
    { label: area.title, href: path },
  ];
  const people = teamByArea(area.id);
  const faqs = faqByArea[area.id] ?? [];
  const related = articles.filter((a) => a.area === area.id);
  const msg = waMessage(area.title);
  const guides = area.services.filter((s) => hasPage(area.id, s.id));

  const services = area.services.map((s) => ({
    id: `${area.id}-${s.id}`,
    icon: lp.icons[s.id] ?? "doc",
    title: s.title,
    text: s.text,
    items: s.items,
    ...(hasPage(area.id, s.id)
      ? { href: serviceHref(area.id, s.id), linkLabel: "Ver o guia completo" }
      : { message: waMessage(s.title.toLowerCase()), linkLabel: "Falar sobre isso" }),
  }));

  const body = `
${lpHero({
  crumbs,
  badge: lp.badge,
  title: lp.title,
  text: esc(lp.text),
  message: msg,
  cta: lp.cta,
  secondary: { href: "#servicos", label: "Ver serviços da área" },
  note: ["Atendimento sigiloso", "Presencial em Boituva e Sorocaba", "Online em São Paulo e todo o Brasil"],
  image: lp.image,
  alt: lp.alt,
  position: lp.position,
  imageMobile: lp.imageMobile,
  positionMobile: lp.positionMobile,
})}

${lpSignals({ title: lp.signalsTitle, items: lp.signals })}

${lpServices({
  eyebrow: `Área de atuação · ${area.number}`,
  title: lp.servicesTitle,
  lead: guides.length
    ? "Os serviços com guia completo explicam o tema, os documentos e as dúvidas mais comuns. Nos demais, fale direto com a equipe."
    : "Fale com a equipe sobre a sua situação: a análise começa pelos fatos e documentos.",
  items: services,
  cta: { ...lp.servicesCta, message: msg },
  tone: "dark",
  ...(lp.tex ? { texture: lp.tex } : {}),
})}

${lpSteps(lp.stepsTex ? { tex: lp.stepsTex } : {})}

${lpProof({ ...lp.proof, message: waMessage(`${area.title} e quero enviar documentos para análise inicial`), tex: lp.tex })}

${faqs.length ? lpFaq({ title: faqTitle(area), lead: lp.faqLead, items: faqs, message: waMessage(`uma dúvida sobre ${area.title}`) }) : ""}

${lpAbout({ person: people[0], areaTitle: area.title, people: [...people, ...team.filter((p) => !people.includes(p))] })}

${googleReviews()}

${related.length ? `<section class="lp-sec lp-sec--white" aria-labelledby="conteudos-titulo">
  <div class="container container--narrow">
    ${lpHead({ eyebrow: "Base de conhecimento", title: `Conteúdos sobre <span class="grad">${esc(area.shortTitle)}.</span>`, id: "conteudos-titulo" })}
    <ul class="article-list">${join(related, (a) => articleRow(a))}</ul>
    <p class="mt-lg center"><a class="link-arrow" href="/conhecimento/?area=${area.id}">Todos os conteúdos de ${esc(area.shortTitle)} ${icon.arrow(14)}</a></p>
  </div>
</section>` : ""}

${related.length ? "" : lpOtherAreas(area.id)}

${lpReach()}

${related.length ? lpOtherAreas(area.id) : ""}

${lpCta({ title: lp.band.title, text: lp.band.text, message: msg, ...(lp.bandImage ? { image: lp.bandImage, position: "center 55%" } : {}) })}`;

  return page({
    scripts: SITE.googleReviews ? [GOOGLE_REVIEWS_SCRIPT] : [],
    title: `${area.title} em Boituva/SP | Vieira & Marques`,
    description: description(area),
    path,
    crumbs,
    preload: [
      { ...imgPreload(lp.image, "100vw"), media: "(min-width: 721px)" },
      { ...imgPreload(lp.imageMobile, "100vw"), media: HERO_MOBILE },
    ],
    whatsappMessage: msg,
    floatPhrases: lp.phrases,
    schema: [
      {
        "@type": "Service",
        name: area.title,
        serviceType: area.title,
        description: area.description,
        url: SITE.origin + path,
        provider: { "@id": `${SITE.origin}/#org` },
        areaServed: ["Boituva", "Sorocaba", "São Paulo", "Brasil"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Serviços em ${area.title}`,
          itemListElement: area.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.text } })),
        },
      },
      ...(faqs.length ? [faqSchema(faqs)] : []),
    ],
    body,
  });
}
