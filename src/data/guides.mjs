// Guias em PDF do Hub de conteúdo (Central de conteúdos), com o mesmo texto do hub original.
// area: id da área em areas.mjs (usado no filtro); label: rótulo exibido no cartão.
const BASE = "https://vieira-marques-iscas.vercel.app/guias/";
export const guides = [
  { n: "01", label: "Direito Sucessório", area: "sucessorio", word: "HERDEIROS", title: "Guia do Inventário", desc: "Entenda as etapas do inventário, quem são os herdeiros e quais documentos costumam ser necessários.", file: "guia-inventario" },
  { n: "02", label: "Direito de Família", area: "familia", word: "BENS", title: "Divórcio e Patrimônio", desc: "Como regimes de bens e partilha influenciam o patrimônio após o divórcio.", file: "guia-divorcio-patrimonio" },
  { n: "03", label: "Família / Patrimônio", area: "familia", word: "MAPA", title: "Mapa Patrimonial", desc: "Um roteiro para organizar e visualizar o patrimônio familiar com mais clareza.", file: "guia-mapa-patrimonial" },
  { n: "04", label: "Direito de Família", area: "familia", word: "RECOMEÇO", title: "Guia do Divórcio", desc: "Um conteúdo introdutório para compreender aspectos importantes relacionados ao divórcio.", file: "guia-divorcio" },
  { n: "05", label: "Direito de Família", area: "familia", word: "ALIMENTOS", title: "Guia da Pensão Alimentícia", desc: "Quem pode pedir, como o valor é definido e o que fazer em caso de atraso.", file: "guia-pensao" },
  { n: "06", label: "Direito Previdenciário", area: "previdenciario", word: "MÃE", title: "Guia do Salário-Maternidade", desc: "Quem tem direito, por quanto tempo e como solicitar o benefício.", file: "guia-salario-maternidade" },
  { n: "07", label: "Proteção e Direitos", area: "familia", word: "APOIO", title: "Guia sobre Violência Doméstica", desc: "Informações sobre medidas protetivas e os caminhos de apoio disponíveis.", file: "guia-violencia-domestica" },
].map((g) => ({ ...g, url: `${BASE}${g.file}.pdf` }));
