import { esc, join, when } from "../lib/html.mjs";
import { SITE, waMessage } from "../data/site.mjs";
import { areaById, areaUrl } from "../data/areas.mjs";
import { articles } from "../data/articles.mjs";
import { team, profilePath, personName } from "../data/team.mjs";
import images from "../data/images.json" with { type: "json" };
import { page, breadcrumbs } from "../partials/layout.mjs";
import { img, imgPreload } from "../partials/media.mjs";
import { icon } from "../partials/icons.mjs";
import { trustBar } from "../partials/trust-bar.mjs";
import { sectionHead, articleCard, waButton, teamPanels } from "../partials/components.mjs";
import { googleReviews, GOOGLE_REVIEWS_SCRIPT } from "../partials/google-reviews.mjs";
import { profilePhrases } from "../data/float-phrases.mjs";
import { lpCta, lpHead } from "../partials/lp.mjs";

// Perfil individual do profissional (/advogados/<slug>/). Todo o conteúdo vem de
// src/data/team.mjs: seções sem dado confirmado não são exibidas.
// Jornada: pessoa (hero) → sobre → áreas → formação → conteúdos → avaliações → demais profissionais → chamada.
// Trechos entre **asteriscos** no texto "Sobre" (src/data/team.mjs) aparecem em negrito.
const bold = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
const female = (p) => p.name.startsWith("Dra.");
const title = (p) => (female(p) ? "Advogada" : "Advogado");

export function renderAdvogado(p) {
  const path = profilePath(p);
  const name = personName(p);
  const areas = p.areas.map((id) => areaById[id]).filter(Boolean);
  const crumbs = [
    { label: "Início", href: "/" },
    { label: "O Escritório", href: "/escritorio/" },
    { label: name, href: path },
  ];
  const own = articles.filter((a) => a.author === p.slug);
  const others = team.filter((o) => o.hasProfile && o.slug !== p.slug);
  const msg = waMessage(p.focus.toLowerCase());
  const entry = images[p.photo];
  const photoUrl = SITE.origin + entry.variants.at(-1).src;

  const body = `
<section class="adv-hero on-dark${p.hero ? " adv-hero--bg" : ""}" aria-labelledby="page-titulo">
  <div class="container">
    ${breadcrumbs(crumbs)}
    <div class="adv-hero__grid">
      <div class="adv-hero__in">
        <p class="lp-badge"><span class="lp-badge__dot" aria-hidden="true"></span>${esc(p.role)} · ${esc(p.oab)}</p>
        <h1 class="adv-hero__title" id="page-titulo">${esc(name)}</h1>
        <p class="adv-hero__role">${esc(title(p))} · ${esc(p.focus)}</p>
        <p class="adv-hero__text">${esc(p.summary)}</p>
        <ul class="adv-hero__areas" aria-label="Áreas de atuação">${join(areas, (a) => `<li><a href="${areaUrl(a)}">${esc(a.shortTitle)}</a></li>`)}</ul>
        <div class="adv-hero__cta">${waButton(msg, "Falar com nossa equipe", { cta: "hero", size: "lg" })}
          <a class="lp-hero__secondary" href="/escritorio/#equipe">Ver toda a equipe ${icon.arrow(14)}</a>
        </div>
      </div>
      <figure class="adv-hero__photo">${img(p.hero ?? p.photo, { alt: `${name}, ${title(p).toLowerCase()} da Vieira & Marques`, sizes: p.hero ? "(min-width: 900px) 64vw, 100vw" : "(min-width: 900px) 440px, 90vw", priority: true, style: `object-position:${p.hero ? p.heroPosition : p.position}` })}</figure>
    </div>
  </div>
</section>
${trustBar({ person: p })}

<section class="section section--white" aria-labelledby="sobre-titulo">
  <div class="container">
    <div class="split">
      <div class="stack" data-reveal>
        <p class="eyebrow">Sobre</p>
        <h2 class="h-section" id="sobre-titulo">Sobre ${esc(name.split(" ")[0])} <span class="grad">${esc(name.split(" ").slice(1).join(" "))}.</span></h2>
      </div>
      <div class="prose" data-reveal>${join(p.about, (t) => `<p>${bold(t)}</p>`)}
        <p class="muted">Integra a equipe da <a class="text-link" href="/escritorio/">Vieira &amp; Marques Sociedade de Advogados</a>, com sede em Boituva/SP, atendimento presencial em Boituva e Sorocaba e online em todo o Brasil.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--dark on-dark" aria-labelledby="areas-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Atuação", id: "areas-titulo", title: `Áreas de <span class="grad">atuação.</span>` })}
    <ul class="adv-areas" data-reveal>
      ${join(areas, (a) => `<li><a class="adv-area" href="${areaUrl(a)}">
        <h3 class="h-card">${esc(a.title)}</h3>
        <p class="muted">${esc(a.summary)}</p>
        <span class="link-arrow">Conhecer a área ${icon.arrow(14)}</span>
      </a></li>`)}
    </ul>
    ${when(p.tags?.length, `<p class="adv-tags-label">Temas em que atua</p><ul class="team-panel__tags adv-tags">${join(p.tags, (t) => `<li>${esc(t)}</li>`)}</ul>`)}
  </div>
</section>

${when(p.education?.length || p.recognitionsList?.length, `<section class="section section--white" aria-labelledby="formacao-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Formação e credenciais", id: "formacao-titulo", title: `Formação <span class="grad">e credenciais.</span>` })}
    <div class="adv-cred" data-reveal>
      ${when(p.education?.length, `<div class="adv-cred__col">
        <h3 class="adv-cred__label">Formação acadêmica</h3>
        <ol class="adv-edu">${join(p.education, (e) => `<li class="adv-edu__item">
          <span class="adv-edu__icon" aria-hidden="true">${icon.doc(18)}</span>
          <span class="adv-edu__body"><span class="adv-edu__level">${esc(e.level)}</span><strong class="adv-edu__course">${esc(e.course)}</strong>${when(e.institution, `<span class="adv-edu__inst">${esc(e.institution)}</span>`)}</span>
        </li>`)}</ol>
      </div>`)}
      <div class="adv-cred__col">
        <h3 class="adv-cred__label">Inscrição profissional</h3>
        <div class="adv-oab on-dark">
          <span class="adv-oab__icon" aria-hidden="true">${icon.shield(20)}</span>
          <span class="adv-oab__body"><span class="adv-oab__label">Ordem dos Advogados do Brasil · Seção São Paulo</span><span class="adv-oab__num">${esc(p.oab)}</span></span>
        </div>
        ${when(p.recognitionsList?.length, `<h3 class="adv-cred__label">Atuação institucional e reconhecimentos</h3>
        <ul class="adv-rec">${join(p.recognitionsList, (r) => `<li><span class="adv-rec__icon" aria-hidden="true">${icon.check(16)}</span><span>${esc(r)}</span></li>`)}</ul>`)}
      </div>
    </div>
  </div>
</section>`)}

${when(own.length, `<section class="section section--white" aria-labelledby="conteudos-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Conteúdos", id: "conteudos-titulo", title: `Conteúdos de <span class="grad">${esc(name.split(" ")[0])}.</span>` })}
    <ul class="cards-grid mt-lg">${join(own, (a) => articleCard(a))}</ul>
  </div>
</section>`)}

${googleReviews()}

<section class="lp-sec lp-sec--dark lp-team on-dark" aria-labelledby="equipe-titulo">
  <div class="container">
    ${lpHead({ eyebrow: "Equipe", title: `Conheça também <span class="grad">os demais profissionais.</span>`, id: "equipe-titulo" })}
    ${teamPanels(team.filter((o) => o.slug !== p.slug), { profileLinks: true, headingLevel: 3 })}
  </div>
</section>

${lpCta({ title: `Quer conversar sobre o seu caso? <span class="grad">Fale com a nossa equipe.</span>`, text: "A equipe de atendimento faz a triagem inicial e, quando aplicável, encaminha o caso ao profissional responsável pela área.", message: msg })}`;

  const desc = `${name}, ${title(p).toLowerCase()} da Vieira & Marques: atuação em ${areas.map((a) => a.title).join(" e ")}. Formação, áreas de atuação e contato com a equipe.`;
  return page({
    ogImage: p.hero ?? p.photo,
    ogAlt: `${name}, ${title(p).toLowerCase()} da Vieira & Marques`,
    scripts: SITE.googleReviews ? [GOOGLE_REVIEWS_SCRIPT] : [],
    title: `${name} | ${title(p)} | Vieira & Marques`,
    description: desc.length <= 160 ? desc : `${name}, ${title(p).toLowerCase()} da Vieira & Marques, em ${areas.map((a) => a.title).join(" e ")}. Formação e áreas de atuação.`,
    path,
    crumbs,
    preload: [imgPreload(p.photo, "(min-width: 900px) 440px, 90vw")],
    whatsappMessage: msg,
    floatPhrases: profilePhrases(p),
    schema: [
      {
        "@type": "ProfilePage",
        "@id": `${SITE.origin}${path}#pagina`,
        url: SITE.origin + path,
        mainEntity: { "@id": `${SITE.origin}${path}#pessoa` },
      },
      {
        "@type": "Person",
        "@id": `${SITE.origin}${path}#pessoa`,
        name,
        jobTitle: `${p.role}`,
        url: SITE.origin + path,
        image: photoUrl,
        description: p.summary,
        // Inscrição, formação e entidade de classe estruturadas: o Google e as IAs ligam a pessoa
        // ao registro na OAB e às instituições de ensino (mesmos dados exibidos na página).
        identifier: { "@type": "PropertyValue", propertyID: "OAB/SP", value: p.oab.replace(/^OAB\/SP\s*/, "") },
        memberOf: { "@type": "Organization", name: "Ordem dos Advogados do Brasil — Seção São Paulo (OAB/SP)" },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Inscrição profissional",
            name: p.oab,
            recognizedBy: { "@type": "Organization", name: "Ordem dos Advogados do Brasil — Seção São Paulo" },
          },
          ...(p.education ?? []).filter((e) => !/andamento/i.test(e.level)).map((e) => ({
            "@type": "EducationalOccupationalCredential",
            credentialCategory: e.level,
            name: e.course,
            ...(e.institution ? { recognizedBy: { "@type": "CollegeOrUniversity", name: e.institution } } : {}),
          })),
        ],
        alumniOf: (p.education ?? []).filter((e) => e.institution && !/andamento/i.test(e.level)).map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
        knowsAbout: [...areas.map((a) => a.title), ...(p.tags ?? [])],
        worksFor: { "@id": `${SITE.origin}/#org` },
      },
    ],
    body,
  });
}
