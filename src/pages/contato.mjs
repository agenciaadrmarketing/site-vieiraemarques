import { imgPreload } from "../partials/media.mjs";
import { lpSteps, lpCta, lpReach, lpHero } from "../partials/lp.mjs";
import { esc, join, when } from "../lib/html.mjs";
import { SITE, isPending, whatsappUrl, waMessage } from "../data/site.mjs";
import { practiceAreas } from "../data/areas.mjs";
import { faqAtendimento } from "../data/faq.mjs";
import { page, breadcrumbs } from "../partials/layout.mjs";
import { icon } from "../partials/icons.mjs";
import { leadForm } from "../partials/lead-form.mjs";
import { whatsappPanel } from "../partials/whatsapp-panel.mjs";
import { sectionHead, faqList, faqSchema } from "../partials/components.mjs";

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

  const body = `
${lpHero({
  crumbs: CRUMBS,
  badge: "Contato · Sede em Boituva/SP",
  title: `Fale com <span class="grad">a nossa equipe.</span>`,
  text: "Descreva a sua situação em linguagem comum. A equipe de atendimento faz a triagem inicial e, quando aplicável, encaminha o caso ao advogado responsável pela área.",
  message: waMessage(),
  cta: "Falar com a equipe",
  note: ["Atendimento sigiloso", "Presencial em Boituva e Sorocaba", "Online em São Paulo e todo o Brasil"],
  image: "fachada",
  alt: "Fachada do escritório Vieira & Marques em Boituva",
  position: "55% 45%",
})}

<section class="section section--white" aria-labelledby="${SITE.forms ? "formulario" : "whatsapp"}-titulo">
  <div class="container">
    <div class="split contact-split">
      <div class="stack" data-reveal>
        <h2 class="h-card">Canais e endereço</h2>
        <ul class="contact-list">
          ${contactItem(icon.pin(18), sede.label, `${esc(sede.street)} — ${esc(sede.district)}<br>${esc(sede.city)}/${esc(sede.region)}, ${esc(sede.postalCode)}`, `<a class="text-link" href="${esc(sede.mapsUrl)}" target="_blank" rel="noopener">Abrir no Google Maps</a>`)}
          ${contactItem(icon.phone(18), "Telefone", `<a href="${SITE.phone.href}">${SITE.phone.display}</a>`)}
          ${contactItem(icon.whatsapp(18), "WhatsApp", `<a href="${whatsappUrl(waMessage())}" target="_blank" rel="noopener">${SITE.whatsapp.display}</a>`)}
          ${contactItem(icon.building(18), "Atendimento presencial", "Boituva e Sorocaba", "Reuniões presenciais com horário combinado pelo WhatsApp ou telefone.")}
          ${contactItem(icon.video(18), "Atendimento online", "São Paulo e todo o Brasil", "Reuniões por vídeo e envio digital de documentos.")}
          ${when(!isPending(SITE.email), contactItem(icon.mail(18), "E-mail", `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`))}
          ${when(!isPending(SITE.hours), contactItem(icon.clock(18), "Horário", esc(SITE.hours)))}
        </ul>
      </div>
      ${SITE.forms ? leadForm({
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
      }) : whatsappPanel({
        intro: "Toque no assunto para abrir a conversa com uma mensagem inicial já direcionada, ou fale direto com a equipe. Você pode editar a mensagem antes de enviar.",
        message: waMessage(),
        choices: practiceAreas.map((a) => ({ label: a.title, message: waMessage(a.title) })),
      })}
    </div>
  </div>
</section>

${lpSteps({ eyebrow: "Depois do contato", title: `O que acontece <span class="grad">a seguir.</span>`, tone: "dark" })}

<section class="section section--white lp-faq-plain" aria-labelledby="faq-titulo">
  <div class="container container--narrow">
    ${sectionHead({ eyebrow: "Atendimento", id: "faq-titulo", title: `Dúvidas sobre <span class="grad">o primeiro contato.</span>` })}
    ${faqList(faqAtendimento)}
  </div>
</section>

${lpReach()}`;

  return page({
    title: "Contato | Vieira & Marques Sociedade de Advogados",
    description:
      "Fale com a Vieira & Marques: presencial em Boituva e Sorocaba e online em todo o Brasil. Telefone e WhatsApp (15) 3347-0189.",
    path: PATH,
    preload: [imgPreload("fachada", "100vw")],
    crumbs: CRUMBS,
    schema: [{ "@type": "ContactPage", name: "Contato", about: { "@id": "https://vieiraemarquesadvogados.com/#org" } }, faqSchema(faqAtendimento)],
    body,
  });
}
