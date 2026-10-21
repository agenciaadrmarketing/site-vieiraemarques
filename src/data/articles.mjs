import { SITE } from "./site.mjs";
import { PAUSED_AREAS } from "./areas.mjs";

// Somente artigos publicados no blog atual (as URLs antigas são preservadas em `path`). Quando a integração com o WordPress
// (REST API em /wp-json/wp/v2/posts) estiver disponível, esta lista passa a ser
// gerada no build a partir dela, mantendo o mesmo formato.
// type: "artigo" | "guia"
const raw = [
  {
    title: "Construção no terreno do avô: como evitar surpresas no inventário",
    area: "sucessorio",
    type: "artigo",
    date: "2026-08-24",
    path: "/construcao-no-terreno-do-avo-inventario/",
    excerpt:
      "Benfeitorias feitas em imóvel de família costumam aparecer só na hora da partilha. O artigo explica o que precisa estar documentado antes da abertura do inventário.",
    featured: true,
  },
  {
    title: "Advogados desistem: o que fazer em casos criminais?",
    area: "criminal",
    type: "artigo",
    date: "2026-08-27",
    path: "/advogados-desistem-o-que-fazer/",
  },
  {
    title: "Pagamentos de julho: o que fazer se seu benefício for negado?",
    area: "previdenciario",
    type: "artigo",
    date: "2026-08-27",
    path: "/pagamentos-de-julho-beneficio-negado/",
  },
  {
    title: "Fim da Justiça do Trabalho afeta seus direitos?",
    area: "trabalhista",
    type: "artigo",
    date: "2026-08-26",
    path: "/fim-da-justica-do-trabalho-afeta-direitos/",
  },
  // Artigos já publicados no blog atual, cadastrados só como índice (título, data, área e link original).
  // Autor a confirmar: não exibido. O texto integral continua no blog, que não é alterado.
  {
    title: "O que acontece se os herdeiros não fizerem o inventário? Entenda os riscos",
    area: "sucessorio",
    type: "artigo",
    date: "2026-07-06",
    path: "/herdeiros-nao-fizerem-inventario/",
  },
  {
    title: "Prêmio recebido durante o casamento entra na divisão de bens no divórcio?",
    area: "familia",
    type: "artigo",
    date: "2026-06-30",
    path: "/premio-recebido-durante-casamento-entra-na-divisao-de-bens/",
  },
  {
    title: "Traição no divórcio influencia na partilha de bens e na pensão? Entenda seus direitos",
    area: "familia",
    type: "artigo",
    date: "2026-06-29",
    path: "/traicao-no-divorcio-partilha-bens-pensao/",
  },
  {
    title: "Inventário com testamento: como funciona e quais os primeiros passos",
    area: "sucessorio",
    type: "artigo",
    date: "2026-06-26",
    path: "/inventario-com-testamento-como-funciona/",
  },
  {
    title: "Inquilino não paga aluguel: como fazer a cobrança e pedir despejo",
    area: "imobiliario",
    type: "artigo",
    date: "2026-06-25",
    path: "/inquilino-nao-paga-aluguel-como-fazer-a-cobranca-e-pedir-despejo/",
  },
  {
    title: "Quem pode receber salário-maternidade em 2026? Veja se você tem direito",
    area: "previdenciario",
    type: "artigo",
    date: "2026-06-24",
    path: "/quem-pode-receber-salario-maternidade-em-2026-veja-se-voce-tem-direito/",
  },
  {
    title: "Quem tem direito ao LOAS em 2026? Entenda as regras atualizadas",
    area: "previdenciario",
    type: "artigo",
    date: "2026-06-22",
    path: "/quem-tem-direito-ao-loas/",
  },
  {
    title: "Seu familiar foi preso em flagrante: o que fazer imediatamente?",
    area: "criminal",
    type: "artigo",
    date: "2026-06-19",
    path: "/seu-familiar-foi-preso-em-flagrante-o-que-fazer-imediatamente/",
  },
  {
    title: "Quanto tempo demora um inventário em cartório e quem pode fazer?",
    area: "sucessorio",
    type: "artigo",
    date: "2026-06-10",
    path: "/quanto-tempo-demora-um-inventario-em-cartorio-e-quem-pode-fazer/",
  },
  {
    title: "A polícia pode entrar na minha casa sem mandado? Veja quando isso é permitido",
    area: "criminal",
    type: "artigo",
    date: "2026-06-09",
    path: "/a-policia-pode-entrar-na-minha-casa-sem-mandado-veja-quando-isso-e-permitido/",
  },
  {
    title: "Você acha que inventário no cartório dispensa advogado? Então cuidado com esse erro.",
    area: "sucessorio",
    type: "artigo",
    date: "2026-06-02",
    path: "/voce-acha-que-inventario-no-cartorio-dispensa-advogado-entao-cuidado-com-esse-erro/",
  },
  {
    title: "Posso me divorciar mesmo sem a concordância do meu cônjuge?",
    area: "familia",
    type: "artigo",
    date: "2026-06-01",
    path: "/posso-me-divorciar-mesmo-sem-a-concordancia-do-meu-conjuge/",
  },
  {
    title: "Como Lidar com Benefício Negado pelo INSS",
    area: "previdenciario",
    type: "artigo",
    date: "2026-10-02",
    path: "/como-lidar-com-beneficio-negado-pelo-inss/",
  },
  {
    title: "Impacto dos Criptoativos na Defesa Criminal",
    area: "criminal",
    type: "artigo",
    date: "2026-10-09",
    path: "/impacto-criptoativos-defesa-criminal/",
  },
];

// Artigos de áreas pausadas continuam no blog, mas não são indicados no site.
export const articles = raw
  .filter((a) => !PAUSED_AREAS.has(a.area))
  .map((a) => ({ ...a, url: SITE.blogBase + a.path }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const featuredArticle = articles.find((a) => a.featured) ?? articles[0];

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
export const formatDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};
