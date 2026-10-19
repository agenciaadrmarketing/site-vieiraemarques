import { esc } from "../lib/html.mjs";
import { SITE } from "../data/site.mjs";
import { AREA_LP } from "../data/area-lp.mjs";
import { SERVICE_PHRASES, GENERAL_PHRASES } from "../data/float-phrases.mjs";
import { team } from "../data/team.mjs";
import { page } from "../partials/layout.mjs";
import { imgPreload } from "../partials/media.mjs";
import { googleReviews, GOOGLE_REVIEWS_SCRIPT } from "../partials/google-reviews.mjs";
import { faqSchema } from "../partials/components.mjs";
import { lpHero, lpServices, lpSteps, lpProof, lpAbout, lpStructure, lpCta, lpSignals, lpReach, lpFaq, lpChecklist } from "../partials/lp.mjs";

// Landing page de campanha (HTML estático, sem React/Babel). Mesma jornada das páginas de área:
// hero → perfil/pontos de atenção → serviços → como funciona → perguntas → equipe → avaliações → onde atendemos → chamada.
const CRUMB = {
  "divorcio": "Divórcio",
  "divorcio-boituva": "Divórcio em Boituva",
  "divorcio-sao-paulo": "Divórcio em São Paulo",
  "divorcio-sem-filhos-sem-bens": "Divórcio sem filhos e sem bens",
  "juros-abusivos": "Juros abusivos",
  "golpe-do-pix": "Golpe do Pix",
};

export function renderLanding(c) {
  const msg = c.whatsapp;
  const crumbs = [{ label: "Início", href: "/" }, { label: CRUMB[c.slug], href: c.path }];
  const person = c.about?.person ? team.find((p) => p.id === c.about.person) : null;
  const signals = c.signals ?? (c.area === "familia" ? AREA_LP.familia.signals : null);
  const faqTitle = c.faqTitle ?? `Perguntas que <span class="grad">quase todo cliente faz.</span>`;
  const serviceItems = c.services.map((s) => ({ id: `${c.slug}-${s.id}`, icon: s.icon, title: s.title, text: s.text, message: msg, linkLabel: "Falar sobre isso" }));

  const body = `
${lpHero({
  crumbs,
  badge: c.badge,
  title: c.h1,
  text: esc(c.text),
  message: msg,
  cta: c.cta,
  secondary: { href: "#servicos", label: "Ver como podemos ajudar" },
  note: c.note,
  image: c.image,
  alt: c.imageAlt,
  position: "50% 40%",
  positionMobile: "50% 50%",
})}

${c.checklist ? lpChecklist({ ...c.checklist, message: msg }) : signals ? lpSignals({ title: c.signalsTitle, items: signals }) : ""}

${lpServices({
  eyebrow: "Como podemos ajudar",
  title: c.servicesTitle,
  lead: c.servicesLead,
  items: serviceItems,
  cta: { ...c.servicesCta, message: msg },
  tone: "dark",
})}

${lpSteps({ title: c.stepsTitle, lead: c.stepsLead, steps: c.steps, tone: "white" })}

${c.scenario ? lpProof({
  id: "cenario",
  eyebrow: c.scenario.eyebrow,
  title: c.scenario.title,
  text: `${esc(c.scenario.text).replace(/&lt;br&gt;/g, "<br>")}<br><br><strong>${esc(c.scenario.pointsLabel)}</strong>`,
  points: c.scenario.points,
  message: msg,
  cta: "Falar com a equipe",
  image: "recepcao",
  alt: "Recepção do escritório Vieira & Marques, com o logotipo na parede",
}) : ""}

${lpFaq({ title: faqTitle, lead: c.faqLead, items: c.faq, message: msg, ctaLabel: "Falar com o escritório" })}

${lpAbout({ person, areaTitle: c.about.areaTitle, people: [...(person ? [person] : []), ...team.filter((p) => p !== person)], ...(c.aboutPoints ? { points: c.aboutPoints } : {}) })}

${lpStructure({ text: c.structureText })}

${googleReviews()}

${lpReach(c.reach)}

${lpCta({ title: c.ctaTitle, text: c.ctaText, message: msg })}`;

  return page({
    ogImage: c.image,
    ogAlt: c.imageAlt,
    // Página de campanha: Google Tag Manager depois do aceite no aviso de cookies.
    tagManager: true,
    scripts: SITE.googleReviews ? [GOOGLE_REVIEWS_SCRIPT] : [],
    title: c.seoTitle,
    description: c.description,
    path: c.path,
    crumbs,
    preload: [imgPreload(c.image, "100vw")],
    whatsappMessage: msg,
    floatPhrases: SERVICE_PHRASES[c.phrasesKey] ?? GENERAL_PHRASES,
    schema: [
      {
        "@type": "Service",
        name: c.seoTitle.split(" | ")[0],
        serviceType: c.seoTitle.split(" | ")[0],
        description: c.description,
        url: SITE.origin + c.path,
        provider: { "@id": `${SITE.origin}/#org` },
        areaServed: ["Boituva", "Sorocaba", "São Paulo"],
      },
      faqSchema(c.faq),
    ],
    body,
  });
}
