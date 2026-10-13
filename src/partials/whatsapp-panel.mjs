import { esc, join, when } from "../lib/html.mjs";
import { SITE, whatsappUrl } from "../data/site.mjs";
import { LEGAL_PATHS } from "../data/legal.mjs";
import { icon } from "./icons.mjs";

// Painel de contato direto pelo WhatsApp (usado enquanto SITE.forms = false).
//   message  mensagem inicial própria da página
//   topics   o que vale informar na conversa (ex.: as perguntas do formulário do serviço)
//   choices  atalhos por assunto: [{ label, message }]
export function whatsappPanel({ id = "whatsapp", level = 2, title = "Conversar pelo WhatsApp", intro, message, topics = [], choices = [], warning }) {
  const waLink = (msg, label, cls, cta) =>
    `<a class="${cls}" href="${whatsappUrl(msg)}" target="_blank" rel="noopener" data-cta="${cta}">${label}</a>`;
  return `<div class="panel-dark wa-panel" id="${id}" data-reveal>
  <h${level} class="panel-dark__title" id="${id}-titulo">${esc(title)}</h${level}>
  ${when(intro, `<p class="muted panel-dark__intro">${intro}</p>`)}
  ${when(topics.length, `<p class="wa-panel__label">Para agilizar, conte na mensagem:</p>
  <ul class="wa-panel__topics">${join(topics, (t) => `<li>${esc(t)}</li>`)}</ul>`)}
  ${when(choices.length, `<p class="wa-panel__label">Escolha o assunto</p>
  <ul class="wa-panel__choices">${join(choices, (c) => `<li>${waLink(c.message, `${esc(c.label)} <span aria-hidden="true">↗</span>`, "wa-panel__choice", "assunto")}</li>`)}</ul>`)}
  ${when(warning, `<p class="form__warning">${esc(warning)}</p>`)}
  ${waLink(message, `${icon.whatsapp(18)} Conversar pelo WhatsApp`, "btn btn--whatsapp btn--block", "whatsapp_panel")}
  <p class="muted wa-panel__alt">Prefere telefone? <a class="text-link" href="${SITE.phone.href}">${SITE.phone.display}</a> · ${esc(SITE.hours)}</p>
  <p class="form__privacy">O WhatsApp é um serviço de terceiro, com política própria. Veja como tratamos seus dados na <a href="${LEGAL_PATHS.privacy}">Política de Privacidade</a>.</p>
</div>`;
}
