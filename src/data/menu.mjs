// Submenus do cabeçalho (desktop: painel flutuante; mobile: acordeão).
// Chave = href do item em NAV. Itens sem submenu não aparecem aqui.
import { SITE } from "./site.mjs";
import { practiceAreas, areaUrl, AREAS_HUB } from "./areas.mjs";
import { servicePages } from "./services/index.mjs";
import { articles } from "./articles.mjs";

// "Divórcio, pensão, guarda e união estável — decisões que…" -> parte antes do travessão.
const short = (text) => text.split(" — ")[0].replace(/\.$/, "");

export const MENUS = {
  "/escritorio/": {
    id: "escritorio",
    heading: "O escritório",
    sub: "Quem somos e como conduzimos cada caso",
    items: [
      { title: "Quem somos", desc: "História, propósito e as oito áreas de atuação.", href: "/escritorio/#historia-titulo" },
      { title: "Como atuamos", desc: "Do primeiro contato à definição do caminho.", href: "/escritorio/#metodo-titulo" },
      { title: "Princípios", desc: "Missão, visão e valores do escritório.", href: "/escritorio/#principios-titulo" },
      { title: "Equipe", desc: "Advogados, inscrição na OAB e formação.", href: "/escritorio/#equipe" },
      { title: "Estrutura", desc: "A sede em Boituva por dentro.", href: "/escritorio/#estrutura-titulo" },
    ],
    footer: { text: `Sede em ${SITE.units[0].city}/${SITE.units[0].region}`, label: "Como chegar", href: SITE.units[0].mapsUrl, external: true },
  },
  "/areas-de-atuacao/": {
    id: "areas",
    wide: true,
    heading: "Áreas de atuação",
    sub: "Organizadas pelo que você precisa resolver",
    items: practiceAreas.map((a) => ({ title: a.title, desc: short(a.summary), href: areaUrl(a), num: a.number })),
    aside: {
      heading: "Guias por serviço",
      items: servicePages.filter((p) => p.featured).map((p) => ({ title: p.serviceData.title, desc: p.areaData.title, href: p.path })),
    },
    footer: { text: "Não sabe qual é a área? Descreva a situação.", label: "Ver todas as áreas", href: AREAS_HUB },
  },
  "/conhecimento/": {
    id: "conhecimento",
    heading: "Base de conhecimento",
    sub: "Conteúdo informativo escrito pela equipe",
    items: [
      { title: "Conteúdos por área", desc: "Artigos, guias e perguntas frequentes.", href: "/conhecimento/#conteudos-titulo" },
      ...articles.slice(0, 2).map((a) => ({ title: a.title, desc: "Artigo recente no blog", href: a.url, external: true })),
    ],
    footer: { text: "Artigos completos no blog do escritório", label: "Sobre o blog", href: "/conhecimento/#blog-titulo" },
  },
};
