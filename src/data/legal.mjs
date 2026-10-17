// Configuração central das páginas legais (Política de Privacidade e Termos de Uso).
// Reaproveita os dados institucionais de site.mjs; aqui ficam só os itens próprios
// dos documentos legais. Valores PENDING nunca são exibidos: o texto público se
// adapta e a pendência é listada no build (LEGAL_REVIEW) para revisão do escritório.
import { SITE, PENDING, isPending } from "./site.mjs";

export const LEGAL = {
  // Data exibida como "Última atualização" nas duas páginas. Atualizar a cada revisão.
  lastUpdated: "2026-10-17",
  // Encarregado pelo tratamento de dados: [ENCARREGADO NÃO DEFINIDO / VALIDAR COM O ESCRITÓRIO].
  // Não há nome confirmado; a Política não indica encarregado enquanto for null.
  dpo: null,
  // E-mail público (SITE.email) aprovado pelo escritório como canal de privacidade (LGPD).
  privacyChannelApproved: true,
  // Provedor de hospedagem confirmado pelo escritório.
  hostingProvider: "Hostinger",
  // Foro de São Paulo/SP indicado pelo escritório; a ressalva do consumidor segue o CDC.
  lawAndForum:
    "Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo/SP para dirimir eventuais controvérsias, ressalvadas as hipóteses em que a lei estabeleça foro diverso, como o do domicílio do consumidor.",
};

// Recursos do site que mudam o texto da Política. Mantê-los coerentes com o código:
// se uma ferramenta de medição ou publicidade for adicionada, atualizar aqui e na Política.
export const DATA_FLOWS = {
  forms: SITE.forms,
  // Com formulário ativo e endpoint configurado, os dados vão para planilha (Google Apps Script).
  leadSheet: SITE.forms && !isPending(SITE.leadEndpoint),
  analytics: SITE.measurement.ga4 ? ["Google Analytics 4"] : [],
  advertising: [
    ...(SITE.measurement.metaPixel ? ["Pixel da Meta"] : []),
    // GTM só nas landing pages de campanha (src/pages/landing.mjs).
    ...(SITE.measurement.gtm ? ["Google Tag Manager e Google Ads (somente nas páginas de campanha)"] : []),
  ],
};

// Pendências para a revisão jurídica interna. Impressas pelo build; não vão para o HTML.
export const LEGAL_REVIEW = [
  !LEGAL.dpo && "[ENCARREGADO NÃO DEFINIDO / VALIDAR COM O ESCRITÓRIO] Se o escritório for agente de pequeno porte e não indicar encarregado, manter canal para titulares e ANPD (Política, seção 12)",
  !LEGAL.privacyChannelApproved && `Aprovar ${SITE.email} como canal de privacidade (LEGAL.privacyChannelApproved) (Política, seção 12)`,
  isPending(LEGAL.hostingProvider)
    ? "[CONFIRMAR PROVEDOR DE HOSPEDAGEM] e cookies técnicos definidos pelo servidor em produção (Política, seções 2, 7, 8 e 9)"
    : `Região do servidor confirmada no painel da ${LEGAL.hostingProvider} (EUA, Arizona; backups em Boston): confirmar se o servidor define cookies técnicos (Política, seções 7 e 9)`,
  "Bases legais por finalidade, em especial para dados sensíveis enviados espontaneamente (Política, seção 6) [REVISÃO JURÍDICA NECESSÁRIA]",
  "Aplicabilidade do art. 15 do Marco Civil (guarda de registros de acesso) ao escritório (Política, seção 6) [REVISÃO JURÍDICA NECESSÁRIA]",
  "Retenção: base de dados vitalícia (resposta do escritório) pode conflitar com os arts. 15 e 16 da LGPD; revisar o texto da seção 10 [REVISÃO JURÍDICA NECESSÁRIA]",
  SITE.googleReviews && "Avaliações do Google: confirmar com o escritório a compatibilidade com o Provimento 205/2021 da OAB e registrar na Política o carregamento das fotos de perfil (lh3.googleusercontent.com)",
  "Foro de São Paulo/SP indicado pelo escritório (Termos, seção 15): confirmar se é a Comarca da capital [REVISÃO JURÍDICA]",
  isPending(SITE.hours) && "[CONFIRMAR COM O ESCRITÓRIO] Horário de atendimento (oculto no site, na Política e no rodapé enquanto pendente)",
  (DATA_FLOWS.analytics.length || DATA_FLOWS.advertising.length) && "Ferramentas de medição ativas: revisar a Política (cookies, finalidades, compartilhamento e transferência internacional) e o texto do aviso de consentimento",
  DATA_FLOWS.leadSheet && "Formulário grava em planilha Google: confirmar contrato/termos do Google Workspace e região dos dados (Política, seções 4, 8 e 9)",
].filter(Boolean);

const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
export const formatDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
};

export const LEGAL_PATHS = { privacy: "/politica-de-privacidade/", terms: "/termos-de-uso/" };
