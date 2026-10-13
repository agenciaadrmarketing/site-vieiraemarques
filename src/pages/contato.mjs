import { esc, join, when } from "../lib/html.mjs";
import { SITE, isPending, whatsappUrl } from "../data/site.mjs";
import { practiceAreas } from "../data/areas.mjs";
import { faqAtendimento } from "../data/faq.mjs";
import { page, breadcrumbs } from "../partials/layout.mjs";
import { icon } from "../partials/icons.mjs";
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

function field({ id, label, hint, type = "text", required = false, attrs = "", control }) {
  return `<div class="field">
  <label class="field__label" for="${id}">${esc(label)}${required ? "" : " <small>(opcional)</small>"}</label>
  ${control ?? `<input class="field__control" id="${id}" name="${id.replace("lead-", "")}" type="${type}"${required ? " required" : ""} ${attrs}>`}
  ${when(hint, `<p class="form__note" id="${id}-dica">${esc(hint)}</p>`)}
  <p class="field__error" id="${id}-erro" aria-live="polite"></p>
</div>`;
}

function leadForm() {
  return `<form class="form" novalidate data-lead-form data-endpoint="${esc(SITE.leadEndpoint)}" data-whatsapp="${SITE.whatsapp.number}" aria-describedby="lead-aviso">
  <div class="hp" aria-hidden="true">
    <label for="lead-website">Não preencha este campo</label>
    <input id="lead-website" name="website" type="text" tabindex="-1" autocomplete="off">
  </div>
  ${field({ id: "lead-nome", label: "Nome", required: true, attrs: 'autocomplete="name" maxlength="120"' })}
  <div class="form__row form__row--2">
    ${field({ id: "lead-whatsapp", label: "WhatsApp", type: "tel", required: true, attrs: 'autocomplete="tel" inputmode="tel" maxlength="30" placeholder="(15) 99999-9999"' })}
    ${field({ id: "lead-email", label: "E-mail", type: "email", attrs: 'autocomplete="email" maxlength="160"' })}
  </div>
  <div class="form__row form__row--2">
    ${field({
      id: "lead-area",
      label: "Assunto principal",
      required: true,
      control: `<select class="field__control" id="lead-area" name="area" required>
        <option value="">Selecione</option>
        ${join(practiceAreas, (a) => `<option value="${a.id}">${esc(a.shortTitle)}</option>`)}
        <option value="outro">Outro</option>
      </select>`,
    })}
    ${field({ id: "lead-cidade", label: "Cidade / Estado", attrs: 'autocomplete="address-level2" maxlength="80" placeholder="Ex.: Sorocaba/SP"' })}
  </div>
  ${field({
    id: "lead-mensagem",
    label: "Mensagem",
    required: true,
    control: `<textarea class="field__control" id="lead-mensagem" name="mensagem" required maxlength="2000" rows="5" placeholder="Conte brevemente o que aconteceu e o que você precisa decidir."></textarea>`,
  })}
  <label class="consent"><input type="checkbox" name="consentimento" required data-consent><span>Autorizo o contato do escritório e o tratamento dos meus dados para responder a esta mensagem, conforme a <a href="/privacidade/">política de privacidade</a>.</span></label>
  <p class="field__error" data-consent-error aria-live="polite"></p>
  <button class="btn btn--light btn--block" type="submit" data-submit>Enviar mensagem <span class="btn__arrow">${icon.arrow(16)}</span></button>
  <p class="form__status" role="status" aria-live="polite" data-status></p>
  <p class="form__note" id="lead-aviso">O envio não constitui contratação de serviços nem estabelece, por si só, relação advogado-cliente. Não inclua dados sensíveis desnecessários, como números de documentos ou senhas.</p>
</form>
<div class="form-success" hidden tabindex="-1" data-success>
  <p class="eyebrow">Mensagem registrada</p>
  <p class="h-card" data-success-title>Obrigado.</p>
  <p class="muted" data-success-text></p>
  <div class="btn-row">
    <a class="btn btn--whatsapp" href="${whatsappUrl()}" target="_blank" rel="noopener" data-success-whatsapp>${icon.whatsapp(18)} Continuar pelo WhatsApp</a>
    <button class="btn btn--ghost-light" type="button" data-reset>Enviar outra mensagem</button>
  </div>
</div>`;
}

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

<section class="section section--dark section--flush-top" aria-labelledby="form-titulo">
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
      <div class="panel-dark" data-reveal>
        <h2 class="panel-dark__title" id="form-titulo">Envie sua mensagem</h2>
        <p class="muted panel-dark__intro">Campos obrigatórios: nome, WhatsApp, assunto e mensagem.</p>
        ${leadForm()}
      </div>
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
