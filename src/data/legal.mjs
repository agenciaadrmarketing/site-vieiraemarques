// Configuração central das páginas legais (Política de Privacidade e Termos de Uso).
// Reaproveita os dados institucionais de site.mjs; aqui ficam só os itens próprios
// dos documentos legais. Valores PENDING nunca são exibidos: o texto público se
// adapta e a pendência é listada no build (LEGAL_REVIEW) para revisão do escritório.
import { SITE, PENDING, isPending } from "./site.mjs";

export const LEGAL = {
  // Data exibida como "Última atualização" nas duas páginas. Atualizar a cada revisão.
  lastUpdated: "2026-10-13",
  cnpj: PENDING,
  // Encarregado pelo tratamento de dados pessoais (nome). Enquanto pendente,
  // a página indica apenas o canal de contato.
  dpo: PENDING,
  // Canal para assuntos de privacidade. Hoje: o e-mail geral confirmado do escritório.
  privacyEmail: SITE.email,
  hostingProvider: PENDING,
  applicableLaw: "legislação brasileira",
  forum: PENDING,
};

// Recursos do site que mudam o texto da Política. Mantê-los coerentes com o código:
// se uma ferramenta de medição ou publicidade for adicionada, atualizar aqui e na Política.
export const DATA_FLOWS = {
  // Com endpoint configurado, o formulário grava em planilha (Google Apps Script) e notifica a equipe.
  leadSheet: !isPending(SITE.leadEndpoint),
  analytics: [],
  advertising: [],
};

// Pendências para a revisão jurídica interna. Impressas pelo build; não vão para o HTML.
export const LEGAL_REVIEW = [
  isPending(LEGAL.cnpj) && "CNPJ da sociedade (Política, seção 1) [CONFIRMAR DADO INSTITUCIONAL]",
  isPending(LEGAL.dpo) && "Encarregado e canal específico de privacidade, se houver (Política, seção 12) [VALIDAR RESPONSÁVEL/CANAL LGPD]",
  isPending(LEGAL.hostingProvider) && "Provedor e localização da hospedagem; cookies técnicos definidos pelo servidor em produção (Política, seções 2, 7, 8 e 9) [CONFIRMAR ANTES DA PUBLICAÇÃO]",
  "Bases legais por finalidade, em especial para dados sensíveis enviados espontaneamente (Política, seção 6) [REVISÃO JURÍDICA NECESSÁRIA]",
  "Aplicabilidade do art. 15 do Marco Civil (guarda de registros de acesso) ao escritório (Política, seção 6) [REVISÃO JURÍDICA NECESSÁRIA]",
  "Matriz interna de retenção de contatos não convertidos em atendimento (Política, seção 10) [CONFIRMAR ANTES DA PUBLICAÇÃO]",
  isPending(LEGAL.forum) && "Foro, se o escritório quiser indicá-lo (Termos, seção 15) [VALIDAR FORO COM O ESCRITÓRIO]",
  DATA_FLOWS.leadSheet && "Formulário grava em planilha Google: confirmar contrato/termos do Google Workspace e região dos dados (Política, seções 4, 8 e 9)",
].filter(Boolean);

const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
export const formatDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
};

export const LEGAL_PATHS = { privacy: "/politica-de-privacidade/", terms: "/termos-de-uso/" };
