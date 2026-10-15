import { esc, join, when } from "../lib/html.mjs";
import { SITE, waMessage } from "../data/site.mjs";
import { areaById, areaUrl } from "../data/areas.mjs";
import { articles } from "../data/articles.mjs";
import { team, profilePath, personName } from "../data/team.mjs";
import images from "../data/images.json" with { type: "json" };
import { page, breadcrumbs } from "../partials/layout.mjs";
import { img, imgPreload } from "../partials/media.mjs";
import { icon } from "../partials/icons.mjs";
import { sectionHead, articleCard, waButton } from "../partials/components.mjs";
import { lpCta } from "../partials/lp.mjs";

// Perfil individual do profissional (/advogados/<slug>/). Todo o conteúdo vem de
// src/data/team.mjs: seções sem dado confirmado não são exibidas.
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
<section class="adv-hero on-dark" aria-labelledby="page-titulo">
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
      <figure class="adv-hero__photo">${img(p.photo, { alt: `${name}, ${title(p).toLowerCase()} da Vieira & Marques`, sizes: "(min-width: 900px) 440px, 90vw", priority: true, style: `object-position:${p.position}` })}</figure>
    </div>
  </div>
</section>

<section class="section section--white" aria-labelledby="sobre-titulo">
  <div class="container">
    <div class="split">
      <div class="stack" data-reveal>
        <p class="eyebrow">Sobre</p>
        <h2 class="h-section" id="sobre-titulo">Sobre ${esc(name.split(" ")[0])} <span class="grad">${esc(name.split(" ").slice(1).join(" "))}.</span></h2>
      </div>
      <div class="prose" data-reveal>${join(p.about, (t) => `<p>${esc(t)}</p>`)}
        <p class="muted">Integra a equipe da <a class="text-link" href="/escritorio/">Vieira &amp; Marques Sociedade de Advogados</a>, com sede em Boituva/SP, atendimento presencial em Boituva e Sorocaba e online em todo o Brasil.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="areas-titulo">
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
        <ol class="adv-timeline">${join(p.education, (e) => `<li><span class="adv-timeline__level">${esc(e.level)}</span><strong>${esc(e.course)}</strong>${when(e.institution, `<span class="muted">${esc(e.institution)}</span>`)}</li>`)}</ol>
      </div>`)}
      <div class="adv-cred__col">
        <h3 class="adv-cred__label">Inscrição profissional</h3>
        <p class="adv-cred__oab">${esc(p.oab)}</p>
        ${when(p.recognitionsList?.length, `<h3 class="adv-cred__label">Atuação institucional e reconhecimentos</h3>
        <ul class="adv-list">${join(p.recognitionsList, (r) => `<li>${esc(r)}</li>`)}</ul>`)}
      </div>
    </div>
  </div>
</section>`)}

${when(own.length, `<section class="section section--muted" aria-labelledby="conteudos-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Conteúdos", id: "conteudos-titulo", title: `Conteúdos de <span class="grad">${esc(name.split(" ")[0])}.</span>` })}
    <ul class="cards-grid mt-lg">${join(own, (a) => articleCard(a))}</ul>
  </div>
</section>`)}

${lpCta({ title: `Quer conversar sobre o seu caso? <span class="grad">Fale com a nossa equipe.</span>`, text: "A equipe de atendimento faz a triagem inicial e, quando aplicável, encaminha o caso ao profissional responsável pela área.", message: msg })}

${when(others.length, `<section class="section section--white" aria-labelledby="equipe-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Equipe", id: "equipe-titulo", title: `Conheça também <span class="grad">outros profissionais.</span>` })}
    <ul class="adv-others" data-reveal>${join(others, (o) => `<li><a class="adv-other" href="${profilePath(o)}">
      <span class="adv-other__photo">${img(o.photo, { alt: "", sizes: "72px", style: `object-position:${o.position}` })}</span>
      <span><strong>${esc(o.name)}</strong><span class="muted">${esc(o.focus)}</span></span>
      <span aria-hidden="true">${icon.arrow(14)}</span>
    </a></li>`)}</ul>
  </div>
</section>`)}`;

  const desc = `${name}, ${title(p).toLowerCase()} da Vieira & Marques: atuação em ${areas.map((a) => a.shortTitle).join(" e ")}. Formação, áreas de atuação e contato com a equipe.`;
  return page({
    title: `${name} | ${title(p)} | Vieira & Marques`,
    description: desc.length <= 160 ? desc : `${name}, ${title(p).toLowerCase()} da Vieira & Marques, em ${areas.map((a) => a.shortTitle).join(" e ")}. Formação e áreas de atuação.`,
    path,
    crumbs,
    preload: [imgPreload(p.photo, "(min-width: 900px) 440px, 90vw")],
    whatsappMessage: msg,
    floatPhrases: [{ t: `Quer falar sobre ${p.focus.toLowerCase()}?`, s: "Fale com nossa equipe de atendimento pelo WhatsApp." }],
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
        identifier: p.oab,
        knowsAbout: areas.map((a) => a.title),
        worksFor: { "@id": `${SITE.origin}/#org` },
      },
    ],
    body,
  });
}
