import { esc, join, when } from "../lib/html.mjs";
import { SITE, whatsappUrl } from "../data/site.mjs";
import { practiceAreas } from "../data/areas.mjs";
import { LEGAL_PATHS } from "../data/legal.mjs";

// Usado no /contato/?servico=<id>: identifica serviço e área a partir do link de origem.
const SERVICE_MAP = JSON.stringify(
  Object.fromEntries(practiceAreas.flatMap((a) => a.services.filter((s) => s.slug).map((s) => [s.id, { a: a.id, at: a.title, t: s.title }])))
);
import { icon } from "./icons.mjs";

// Formulário de lead único do site. Cada página informa:
//   context   { area, service }       -> gravados como practice_area / service
//   questions [...]                   -> perguntas próprias do assunto
//   message   { label, placeholder, required }
// Tipos de pergunta: choice (botões de opção), select, text. showIf: { <id>: "<valor>" }.
const LIMIT = { nome: 120, whatsapp: 30, email: 160, cidade: 80, mensagem: 2000, text: 80 };

const fieldWrap = (q, inner, labelFor = true) => `<div class="field"${q.showIf ? ` data-show-if="${esc(JSON.stringify(q.showIf))}" hidden` : ""}>
  ${labelFor ? `<label class="field__label" for="lead-${q.id}">${esc(q.label)}${q.required ? "" : " <small>(opcional)</small>"}</label>` : ""}
  ${inner}
  ${when(q.hint, `<p class="form__note">${esc(q.hint)}</p>`)}
  <p class="field__error" id="lead-${q.id}-erro" aria-live="polite"></p>
</div>`;

function question(q) {
  const req = q.required ? " required" : "";
  if (q.type === "choice") {
    return `<fieldset class="field choice"${q.showIf ? ` data-show-if="${esc(JSON.stringify(q.showIf))}" hidden` : ""} data-question="${q.id}"${q.required ? " data-required" : ""}>
  <legend class="field__label">${esc(q.label)}${q.required ? "" : " <small>(opcional)</small>"}</legend>
  <div class="choice__options">
    ${join(q.options, (o, i) => `<label class="choice__option"><input type="radio" name="${q.id}" value="${esc(o)}" id="lead-${q.id}-${i}"><span>${esc(o)}</span></label>`)}
  </div>
  ${when(q.hint, `<p class="form__note form__hint" data-hint>${esc(q.hint)}</p>`)}
  <p class="field__error" id="lead-${q.id}-erro" aria-live="polite"></p>
</fieldset>`;
  }
  if (q.type === "select") {
    return fieldWrap(q, `<select class="field__control" id="lead-${q.id}" name="${q.id}" data-question="${q.id}"${req}>
    <option value="">Selecione</option>
    ${join(q.options, (o) => (typeof o === "string" ? `<option>${esc(o)}</option>` : `<option value="${esc(o.value)}">${esc(o.label)}</option>`))}
  </select>`);
  }
  return fieldWrap(q, `<input class="field__control" id="lead-${q.id}" name="${q.id}" type="text" data-question="${q.id}" maxlength="${q.maxlength ?? LIMIT.text}"${q.placeholder ? ` placeholder="${esc(q.placeholder)}"` : ""}${req}>`);
}

export function leadForm({
  id = "formulario",
  title = "Envie sua mensagem",
  intro = "Campos obrigatórios: nome e WhatsApp.",
  context = {},
  questions = [],
  message = { label: "Mensagem", placeholder: "Conte brevemente o que aconteceu e o que você precisa decidir.", required: true },
  warning,
  formId = "site_contato",
  serviceMap = false,
}) {
  const ctxAttrs = `data-practice-area="${esc(context.area?.title ?? "")}" data-service="${esc(context.service?.title ?? "")}" data-area-id="${esc(context.area?.id ?? "")}" data-service-id="${esc(context.service?.id ?? "")}"`;
  return `<div class="panel-dark lead-panel" id="${id}" data-reveal>
  <h2 class="panel-dark__title" id="${id}-titulo">${esc(title)}</h2>
  <p class="muted panel-dark__intro">${esc(intro)}</p>
  <form class="form" novalidate data-lead-form data-form-id="${esc(formId)}" data-endpoint="${esc(SITE.leadEndpoint)}" data-whatsapp="${SITE.whatsapp.number}" ${ctxAttrs}${serviceMap ? ` data-service-map="${esc(SERVICE_MAP)}"` : ""} aria-labelledby="${id}-titulo">
    <div class="hp" aria-hidden="true">
      <label for="${id}-website">Não preencha este campo</label>
      <input id="${id}-website" name="website" type="text" tabindex="-1" autocomplete="off">
    </div>
    <div class="field">
      <label class="field__label" for="lead-nome">Nome</label>
      <input class="field__control" id="lead-nome" name="nome" type="text" required autocomplete="name" maxlength="${LIMIT.nome}">
      <p class="field__error" id="lead-nome-erro" aria-live="polite"></p>
    </div>
    <div class="form__row form__row--2">
      <div class="field">
        <label class="field__label" for="lead-whatsapp">WhatsApp</label>
        <input class="field__control" id="lead-whatsapp" name="whatsapp" type="tel" required autocomplete="tel" inputmode="tel" maxlength="${LIMIT.whatsapp}" placeholder="(15) 99999-9999">
        <p class="field__error" id="lead-whatsapp-erro" aria-live="polite"></p>
      </div>
      <div class="field">
        <label class="field__label" for="lead-email">E-mail <small>(opcional)</small></label>
        <input class="field__control" id="lead-email" name="email" type="email" autocomplete="email" maxlength="${LIMIT.email}">
        <p class="field__error" id="lead-email-erro" aria-live="polite"></p>
      </div>
    </div>
    ${join(questions, question)}
    <div class="field">
      <label class="field__label" for="lead-cidade">Cidade / Estado <small>(opcional)</small></label>
      <input class="field__control" id="lead-cidade" name="cidade" type="text" autocomplete="address-level2" maxlength="${LIMIT.cidade}" placeholder="Ex.: Sorocaba/SP">
    </div>
    <div class="field">
      <label class="field__label" for="lead-mensagem">${esc(message.label)}${message.required ? "" : " <small>(opcional)</small>"}</label>
      <textarea class="field__control" id="lead-mensagem" name="mensagem" maxlength="${LIMIT.mensagem}" rows="4" placeholder="${esc(message.placeholder ?? "")}"${message.required ? " required" : ""}></textarea>
      <p class="field__error" id="lead-mensagem-erro" aria-live="polite"></p>
    </div>
    ${when(warning, `<p class="form__warning">${esc(warning)}</p>`)}
    <button class="btn btn--light btn--block" type="submit" data-submit>Enviar informações <span class="btn__arrow">${icon.arrow(16)}</span></button>
    <p class="form__status" role="status" aria-live="polite" data-status></p>
    <p class="form__privacy">Ao enviar suas informações, você declara estar ciente do tratamento de dados conforme nossa <a href="${LEGAL_PATHS.privacy}">Política de Privacidade</a>.</p>
    <p class="form__note">O envio não constitui contratação de serviços nem estabelece, por si só, relação advogado-cliente.</p>
  </form>
  <div class="form-success" hidden tabindex="-1" data-success>
    <p class="eyebrow">Mensagem registrada</p>
    <p class="h-card" data-success-title>Obrigado.</p>
    <p class="muted" data-success-text></p>
    <div class="btn-row">
      <a class="btn btn--whatsapp" href="${whatsappUrl()}" target="_blank" rel="noopener" data-success-whatsapp>${icon.whatsapp(18)} Continuar pelo WhatsApp</a>
      <button class="btn btn--ghost-light" type="button" data-reset>Enviar outra mensagem</button>
    </div>
  </div>
</div>`;
}
