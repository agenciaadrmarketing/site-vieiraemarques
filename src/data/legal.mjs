// Configuração central das páginas legais (Política de Privacidade e Termos de Uso).
// Reaproveita os dados institucionais de site.mjs; aqui ficam só os itens próprios
// dos documentos legais. Valores PENDING nunca são exibidos: o texto público se
// adapta e a pendência é listada no build (LEGAL_REVIEW) para revisão do escritório.
import { SITE, PENDING, isPending } from "./site.mjs";

export const LEGAL = {
  // Data exibida como "Última atualização" nas duas páginas. Atualizar a cada revisão.
  lastUpdated: "2026-10-13",
  // Encarregado pelo tratamento de dados: [ENCARREGADO NÃO DEFINIDO / VALIDAR COM O ESCRITÓRIO].
  // Não há nome confirmado; a Política não indica encarregado enquanto for null.
  dpo: null,
  // E-mail público (SITE.email) aprovado pelo escritório como canal de privacidade (LGPD).
  privacyChannelApproved: true,
  // Provedor de hospedagem confirmado pelo escritório.
  hostingProvider: "Hostinger",
  // Texto provisório; não definir foro exclusivo sem validação do escritório.
  lawAndForum:
    "Estes Termos são regidos pelas leis da República Federativa do Brasil. Eventuais controvérsias serão submetidas ao foro competente, observadas as normas legais aplicáveis.",
};

// Recursos do site que mudam o texto da Política. Mantê-los coerentes com o código:
// se uma ferramenta de medição ou publicidade for adicionada, atualizar aqui e na Política.
export const DATA_FLOWS = {
  forms: SITE.forms,
  // Com formulário ativo e endpoint configurado, os dados vão para planilha (Google Apps Script).
  leadSheet: SITE.forms && !isPending(SITE.leadEndpoint),
  analytics: [],
  advertising: [],
};

// Pendências para a revisão jurídica interna. Impressas pelo build; não vão para o HTML.
export const LEGAL_REVIEW = [
  !LEGAL.dpo && "[ENCARREGADO NÃO DEFINIDO / VALIDAR COM O ESCRITÓRIO] Se o escritório for agente de pequeno porte e não indicar encarregado, manter canal para titulares e ANPD (Política, seção 12)",
  !LEGAL.privacyChannelApproved && `Aprovar ${SITE.email} como canal de privacidade (LEGAL.privacyChannelApproved) (Política, seção 12)`,
  isPending(LEGAL.hostingProvider)
    ? "[CONFIRMAR PROVEDOR DE HOSPEDAGEM] e cookies técnicos definidos pelo servidor em produção (Política, seções 2, 7, 8 e 9)"
    : `Confirmar no painel da ${LEGAL.hostingProvider} a região do servidor (data center) e se o servidor define cookies técnicos (Política, seções 7 e 9)`,
  "Bases legais por finalidade, em especial para dados sensíveis enviados espontaneamente (Política, seção 6) [REVISÃO JURÍDICA NECESSÁRIA]",
  "Aplicabilidade do art. 15 do Marco Civil (guarda de registros de acesso) ao escritório (Política, seção 6) [REVISÃO JURÍDICA NECESSÁRIA]",
  "Foro: texto provisório sem foro exclusivo (Termos, seção 15) [VALIDAR FORO COM O ESCRITÓRIO]",
  DATA_FLOWS.leadSheet && "Formulário grava em planilha Google: confirmar contrato/termos do Google Workspace e região dos dados (Política, seções 4, 8 e 9)",
].filter(Boolean);

const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
export const formatDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
};

export const LEGAL_PATHS = { privacy: "/politica-de-privacidade/", terms: "/termos-de-uso/" };
