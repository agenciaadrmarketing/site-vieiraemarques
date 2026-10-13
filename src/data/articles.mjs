import { SITE } from "./site.mjs";

// Somente artigos publicados no blog atual. Quando a integração com o WordPress
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
];

export const articles = raw
  .map((a) => ({ ...a, url: SITE.blogBase + a.path }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const featuredArticle = articles.find((a) => a.featured) ?? articles[0];

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
export const formatDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};
