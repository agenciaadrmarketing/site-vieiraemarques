import { esc } from "../lib/html.mjs";
import { SITE, isPending } from "../data/site.mjs";
import { page, breadcrumbs } from "../partials/layout.mjs";

const PATH = "/privacidade/";
const CRUMBS = [
  { label: "Início", href: "/" },
  { label: "Privacidade e termos de uso", href: PATH },
];

// Texto-base descrevendo o tratamento de dados que o site efetivamente realiza.
// Deve ser revisado pelo escritório antes da publicação no domínio principal.
export default function privacidade() {
  const sede = SITE.units[0];
  const canal = isPending(SITE.email)
    ? `pelo telefone <a class="text-link" href="${SITE.phone.href}">${SITE.phone.display}</a> ou pelo formulário de <a class="text-link" href="/contato/">contato</a>`
    : `pelo e-mail <a class="text-link" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`;

  const body = `
<section class="page-hero on-dark" aria-labelledby="page-titulo">
  <div class="container">
    ${breadcrumbs(CRUMBS)}
    <div class="page-hero__grid">
      <div class="stack">
        <p class="eyebrow">Privacidade</p>
        <h1 class="page-hero__title" id="page-titulo">Privacidade e <span class="grad">termos de uso.</span></h1>
      </div>
      <div class="page-hero__aside"><p class="lead">Como este site trata os dados enviados pelo formulário de contato e as condições de uso do conteúdo publicado.</p></div>
    </div>
  </div>
</section>

<section class="section section--white">
  <div class="container container--narrow prose stack">
    <h2 class="h-card" id="privacidade">Política de privacidade</h2>
    <p><strong>Controlador.</strong> ${esc(SITE.name)}, com sede na ${esc(sede.street)}, ${esc(sede.district)}, ${esc(sede.city)}/${esc(sede.region)}, CEP ${esc(sede.postalCode)}.</p>
    <p><strong>Dados coletados.</strong> Pelo formulário de contato: nome, número de WhatsApp, e-mail (opcional), cidade/estado (opcional), assunto e a mensagem escrita por você. Junto com o envio são registrados a página de origem, a data e hora e, quando existirem, os parâmetros de campanha presentes no endereço da página (como utm_source).</p>
    <p><strong>Finalidade.</strong> Os dados são usados exclusivamente para responder à sua mensagem e, se for o caso, agendar o atendimento. A base legal é o seu consentimento, manifestado no envio do formulário, e o procedimento preliminar a pedido do titular.</p>
    <p><strong>Compartilhamento.</strong> As mensagens podem ser armazenadas em ferramentas de planilha e comunicação usadas pelo escritório para organizar o atendimento, e o contato pode continuar pelo WhatsApp. Os dados não são vendidos nem cedidos a terceiros para fins de publicidade.</p>
    <p><strong>Retenção.</strong> Os dados são mantidos pelo tempo necessário ao atendimento e às obrigações legais e profissionais aplicáveis.</p>
    <p><strong>Seus direitos.</strong> Você pode solicitar confirmação, acesso, correção ou exclusão dos seus dados, ou revogar o consentimento, ${canal}.</p>
    <p><strong>Cookies.</strong> Este site não utiliza cookies de publicidade. Informações de campanha são guardadas apenas durante a sessão do navegador para identificar a origem do contato.</p>

    <hr class="rule">

    <h2 class="h-card" id="termos">Termos de uso</h2>
    <p>O conteúdo deste site tem caráter exclusivamente informativo e não constitui consulta, parecer ou orientação jurídica para casos concretos. A avaliação de cada situação depende da análise dos documentos e das circunstâncias específicas.</p>
    <p>O envio de mensagem pelo site não constitui contratação de serviços nem estabelece, por si só, relação advogado-cliente.</p>
    <p>${esc(SITE.oabNotice)}</p>
    <p>Textos, imagens e a marca Vieira &amp; Marques não podem ser reproduzidos sem autorização.</p>
  </div>
</section>`;

  return page({
    title: "Privacidade e termos de uso | Vieira & Marques",
    description: "Como o site da Vieira & Marques Sociedade de Advogados trata os dados enviados pelo formulário de contato e as condições de uso do conteúdo.",
    path: PATH,
    crumbs: CRUMBS,
    body,
  });
}
