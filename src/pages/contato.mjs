import { esc, join, when } from "../lib/html.mjs";
import { SITE, isPending, whatsappUrl } from "../data/site.mjs";
import { practiceAreas } from "../data/areas.mjs";
import { faqAtendimento } from "../data/faq.mjs";
import { page, breadcrumbs } from "../partials/layout.mjs";
import { icon } from "../partials/icons.mjs";
import { leadForm } from "../partials/lead-form.mjs";
import { sectionHead, faqList, faqSchema, steps } from "../partials/components.mjs";

const PATH = "/contato/";
const CRUMBS = [
  { label: "Início", href: "/" },
  { label: "Contato", href: PATH },
];

const contactItem = (ic, label, value, note = "") => `<li class="contact-item">
  <span class="contact-item__icon">${ic}</span>
  <div><p class="contact-item__label">${esc(label)}</p><p class="contact-item__value">${value}</p>${when(note, `<p class="contact-item__note">${note}</p>`)}</div>
</li>`;

export default function contato() {
  const sede = SITE.units[0];
  const sorocaba = SITE.units[1];
  const sorocabaValue = isPending(sorocaba.street)
    ? "Sorocaba — SP"
    : `${esc(sorocaba.street)} — ${esc(sorocaba.district)}, ${esc(sorocaba.city)}/${esc(sorocaba.region)}`;

  const body = `
<section class="page-hero on-dark" aria-labelledby="page-titulo">
  <div class="container">
    ${breadcrumbs(CRUMBS)}
    <div class="page-hero__grid">
      <div class="stack">
        <p class="eyebrow">Contato</p>
        <h1 class="page-hero__title" id="page-titulo">Fale com <span class="grad">a equipe.</span></h1>
      </div>
      <div class="page-hero__aside">
        <p class="lead">Descreva a sua situação em linguagem comum. Um advogado da área correspondente lê a mensagem e retorna com os próximos passos aplicáveis ao seu caso.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--dark section--flush-top" aria-labelledby="formulario-titulo">
  <div class="container">
    <div class="split">
      <div class="stack" data-reveal>
        <h2 class="h-card">Canais e unidades</h2>
        <ul class="contact-list">
          ${contactItem(icon.pin(18), sede.label, `${esc(sede.street)} — ${esc(sede.district)}<br>${esc(sede.city)}/${esc(sede.region)}, ${esc(sede.postalCode)}`, `<a class="text-link" href="${esc(sede.mapsUrl)}" target="_blank" rel="noopener">Abrir no Google Maps</a>`)}
          ${contactItem(icon.phone(18), "Telefone", `<a href="${SITE.phone.href}">${SITE.phone.display}</a>`)}
          ${contactItem(icon.whatsapp(18), "WhatsApp", `<a href="${whatsappUrl("Olá, vim pelo site da Vieira & Marques e gostaria de orientação.")}" target="_blank" rel="noopener">${SITE.whatsapp.display}</a>`)}
          ${contactItem(icon.building(18), sorocaba.label, sorocabaValue, isPending(sorocaba.street) ? "Atendimento presencial na região de Sorocaba." : "")}
          ${contactItem(icon.video(18), "Atendimento online", "Todo o Brasil", "Reuniões por vídeo e envio digital de documentos.")}
          ${when(!isPending(SITE.email), contactItem(icon.mail(18), "E-mail", `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`))}
          ${when(!isPending(SITE.hours), contactItem(icon.clock(18), "Horário", esc(SITE.hours)))}
        </ul>
      </div>
      ${leadForm({
        id: "formulario",
        title: "Envie sua mensagem",
        intro: "Campos obrigatórios: nome, WhatsApp, assunto e mensagem.",
        questions: [
          {
            id: "area",
            type: "select",
            label: "Assunto principal",
            required: true,
            options: [...practiceAreas.map((a) => ({ value: a.id, label: a.shortTitle })), { value: "outro", label: "Outro" }],
          },
        ],
        serviceMap: true,
      })}
    </div>
  </div>
</section>

<section class="section section--white" aria-labelledby="faq-titulo">
  <div class="container container--narrow">
    ${sectionHead({ eyebrow: "Atendimento", id: "faq-titulo", title: `Dúvidas sobre <span class="grad">o primeiro contato.</span>` })}
    ${faqList(faqAtendimento)}
  </div>
</section>

<section class="section section--dark" aria-labelledby="etapas-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Depois do envio", id: "etapas-titulo", title: `O que acontece <span class="grad">a seguir.</span>` })}
    ${steps()}
  </div>
</section>`;

  return page({
    title: "Contato | Vieira & Marques Sociedade de Advogados",
    description:
      "Fale com a Vieira & Marques: sede em Boituva, unidade em Sorocaba e atendimento online em todo o Brasil. Telefone e WhatsApp (15) 3347-0189.",
    path: PATH,
    crumbs: CRUMBS,
    schema: [{ "@type": "ContactPage", name: "Contato", about: { "@id": "https://vieiraemarquesadvogados.com/#org" } }, faqSchema(faqAtendimento)],
    body,
  });
}
