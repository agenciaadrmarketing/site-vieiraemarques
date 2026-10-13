// Dados conferidos com a página "Sobre Nós" do site antigo (captura de 10/09/2026).
// Não acrescentar formação, cargo ou título sem confirmação do escritório.
export const team = [
  {
    id: "oscar-moreira-vieira",
    name: "Dr. Oscar Moreira Vieira",
    role: "Sócio fundador",
    oab: "OAB/SP 442.118",
    areas: ["familia", "sucessorio"],
    focus: "Família e Sucessões",
    bio: "Atua em Direito de Família e Sucessões. Presidiu a Comissão de Direito de Família e Sucessões da OAB de Boituva no triênio 2022/2024.",
    credentials: [
      "Pós-graduado em Direito de Família e Sucessões pela Escola Brasileira de Direito",
      "Pós-graduando em Direito Público, com ênfase em Direito Constitucional, Administrativo e Eleitoral, pela Escola Brasileira de Direito",
      "Presidente da Comissão de Direito de Família e Sucessões da OAB de Boituva (2022/2024)",
      "Diretor executivo da Escola do Legislativo da Câmara de Boituva (2022/2023)",
      "Título de Jovem Inspirador concedido pela Câmara de Boituva",
    ],
    photo: "oscar-moreira-vieira",
    // Componente de equipe da Home: temas exibidos e enquadramento da foto quando expandida.
    tags: ["Divórcio", "Inventário", "Guarda", "Pensão"],
    positionActive: "38% 58%",
    position: "50% 18%",
  },
  {
    id: "jislana-marques",
    name: "Dra. Jislana Marques",
    role: "Sócia fundadora",
    oab: "OAB/SP 470.356",
    areas: ["criminal", "previdenciario"],
    focus: "Penal e Previdenciário",
    bio: "Atua em Direito Penal e Direito Previdenciário. Graduada em Direito pela Universidade Paulista.",
    credentials: [
      "Graduada em Direito pela Universidade Paulista",
      "Pós-graduanda em Direito Previdenciário",
      "Diploma de Jovem Inspiradora concedido pela Câmara Municipal de Boituva",
    ],
    photo: "jislana-marques",
    tags: ["Defesa criminal", "INSS", "Benefícios"],
    positionActive: "50% 12%",
    position: "50% 22%",
  },
  {
    id: "leticia-pereira-de-abreu",
    name: "Dra. Leticia Pereira de Abreu",
    role: "Advogada",
    oab: "OAB/SP 449.619",
    areas: ["criminal"],
    focus: "Processo Penal e Execução Penal",
    bio: "Atua em processos criminais e execução penal. Graduada em Direito pela ESAMC-Sorocaba / UNISO.",
    credentials: [
      "Graduada em Direito pela ESAMC-Sorocaba / UNISO",
      "Atuação em processos criminais e execução penal",
    ],
    photo: "leticia-pereira-de-abreu",
    tags: ["Processo penal", "Execução penal"],
    positionActive: "52% 14%",
    position: "52% 22%",
  },
  {
    id: "gledie-camargo",
    name: "Dra. Glediê Camargo",
    role: "Advogada",
    oab: "OAB/SP 453.152",
    areas: ["criminal"],
    focus: "Direito Penal e Processo Penal",
    bio: "Atua em Direito Penal, Processo Penal e execução penal. Graduada em Direito pela Universidade de Sorocaba (UNISO).",
    credentials: [
      "Graduada em Direito pela Universidade de Sorocaba (UNISO)",
      "Pós-graduada em Direito Penal",
      "Pós-graduada em Processo Penal",
    ],
    photo: "gledie-camargo",
    tags: ["Direito Penal", "Processo Penal", "Execução"],
    positionActive: "62% 34%",
    position: "62% 30%",
  },
  {
    id: "natalia-okumura",
    name: "Dra. Natália Okumura",
    role: "Advogada",
    oab: "OAB/SP 460.641",
    areas: ["saude"],
    focus: "Cível, Consumidor e Saúde",
    bio: "Atua em Direito Civil e do Consumidor e em ações de saúde contra o SUS e planos de saúde. Graduada pela Faculdade de Direito de Sorocaba (FADI).",
    credentials: [
      "Graduada em Direito pela Faculdade de Direito de Sorocaba (FADI)",
      "Pós-graduanda em Advocacia Cível pela Fundação Escola Superior do Ministério Público (FMP)",
      "Pós-graduanda em Direito Médico, Odontológico e da Saúde pela Universidade de São Paulo (USP)",
    ],
    photo: "natalia-okumura",
    tags: ["Contratos", "Consumidor", "Saúde"],
    positionActive: "50% 10%",
    position: "50% 18%",
  },
];

// Destaques do corpo profissional (conferidos com as credenciais acima).
export const teamRecognitions = [
  "Presidência da Comissão de Direito de Família e Sucessões da OAB de Boituva (2022/2024) — Dr. Oscar Moreira Vieira.",
  "Pós-graduações concluídas e em curso em Família e Sucessões, Direito Penal, Processo Penal, Previdenciário, Advocacia Cível e Direito Médico.",
  "Títulos de Jovem Inspirador e Jovem Inspiradora concedidos pela Câmara Municipal de Boituva.",
];

export const teamByArea = (areaId) => team.filter((p) => p.areas.includes(areaId));
