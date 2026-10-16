// Dados conferidos com a página "Sobre Nós" do site antigo (captura de 10/09/2026).
// Não acrescentar formação, cargo ou título sem confirmação do escritório.
export const team = [
  {
    id: "oscar-moreira-vieira",
    slug: "oscar-moreira-vieira",
    hasProfile: true,
    summary: "Atua em Direito de Família e Sucessões. Presidiu a Comissão de Direito de Família e Sucessões da OAB de Boituva (2022/2024).",
    about: [
      "O Dr. Oscar Moreira Vieira é **sócio fundador da Vieira & Marques** e atua em **Direito de Família e Sucessões** — divórcio, guarda, pensão alimentícia, inventário e herança.",
      "É **pós-graduado em Direito de Família e Sucessões** pela Escola Brasileira de Direito e cursa pós-graduação em **Direito Público**, com ênfase em Direito Constitucional, Administrativo e Eleitoral.",
      "**Presidiu a Comissão de Direito de Família e Sucessões da OAB de Boituva** no triênio 2022/2024 e foi **diretor executivo da Escola do Legislativo** da Câmara de Boituva em 2022/2023.",
    ],
    education: [
      { course: "Direito de Família e Sucessões", level: "Pós-graduação", institution: "Escola Brasileira de Direito" },
      { course: "Direito Público, com ênfase em Direito Constitucional, Administrativo e Eleitoral", level: "Pós-graduação (em andamento)", institution: "Escola Brasileira de Direito" },
    ],
    recognitionsList: [
      "Presidente da Comissão de Direito de Família e Sucessões da OAB de Boituva (2022/2024)",
      "Diretor executivo da Escola do Legislativo da Câmara de Boituva (2022/2023)",
      "Título de Jovem Inspirador concedido pela Câmara de Boituva",
    ],
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
    // Painéis da equipe: foto horizontal (rosto menor, texto longe do rosto).
    panel: "oscar-moreira-vieira-fundo",
    panelPos: "43% 50%",
    panelPosActive: "34% 50%",
    // Foto larga para o topo do perfil (pessoa à direita, degradê à esquerda).
    hero: "oscar-moreira-vieira-fundo",
    heroPosition: "44% 30%",
    // Componente de equipe da Home: temas exibidos e enquadramento da foto quando expandida.
    tags: ["Divórcio", "Inventário", "Guarda", "Pensão"],
    positionActive: "57% 0%",
    position: "57% 18%",
  },
  {
    id: "jislana-marques",
    slug: "jislana-marques",
    hasProfile: true,
    summary: "Atua em Direito Penal e Direito Previdenciário. Graduada em Direito pela Universidade Paulista.",
    about: [
      "A Dra. Jislana Marques é **sócia fundadora da Vieira & Marques** e atua em **Direito Penal e Direito Previdenciário** — da defesa criminal aos pedidos e revisões de benefícios do INSS.",
      "É **graduada em Direito pela Universidade Paulista** e cursa **pós-graduação em Direito Previdenciário**.",
      "Recebeu o **diploma de Jovem Inspiradora**, concedido pela Câmara Municipal de Boituva.",
    ],
    education: [
      { course: "Direito", level: "Graduação", institution: "Universidade Paulista" },
      { course: "Direito Previdenciário", level: "Pós-graduação (em andamento)" },
    ],
    recognitionsList: ["Diploma de Jovem Inspiradora concedido pela Câmara Municipal de Boituva"],
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
    // Painéis da equipe: foto horizontal (rosto menor, texto longe do rosto).
    panel: "jislana-marques-fundo",
    panelPos: "59% 50%",
    panelPosActive: "68% 50%",
    // Foto larga para o topo do perfil (pessoa à direita, degradê à esquerda).
    hero: "jislana-marques-fundo",
    heroPosition: "50% 25%",
    tags: ["Defesa criminal", "INSS", "Benefícios"],
    positionActive: "79% 0%",
    position: "79% 22%",
  },
  {
    id: "leticia-pereira-de-abreu",
    slug: "leticia-pereira-de-abreu",
    hasProfile: false,
    summary: "Atua em processos criminais e execução penal. Graduada em Direito pela ESAMC-Sorocaba / UNISO.",
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
    // Painéis da equipe: foto horizontal (rosto menor, texto longe do rosto).
    panel: "leticia-pereira-de-abreu-fundo",
    panelPos: "54% 50%",
    panelPosActive: "58% 50%",
    tags: ["Processo penal", "Execução penal"],
    positionActive: "68% 0%",
    position: "68% 22%",
  },
  {
    id: "gledie-camargo",
    slug: "gledie-camargo",
    hasProfile: true,
    summary: "Atua em Direito Penal, Processo Penal e execução penal. Graduada em Direito pela UNISO.",
    about: [
      "A Dra. Glediê Camargo atua em **Direito Penal, Processo Penal e execução penal**.",
      "É graduada em Direito pela **Universidade de Sorocaba (UNISO)** e **pós-graduada em Direito Penal e em Processo Penal**.",
    ],
    education: [
      { course: "Direito", level: "Graduação", institution: "Universidade de Sorocaba (UNISO)" },
      { course: "Direito Penal", level: "Pós-graduação" },
      { course: "Processo Penal", level: "Pós-graduação" },
    ],
    recognitionsList: [],
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
    // Painéis da equipe: foto horizontal (rosto menor, texto longe do rosto).
    panel: "gledie-camargo-fundo",
    panelPos: "50% 50%",
    panelPosActive: "50% 50%",
    // Foto larga para o topo do perfil (pessoa à direita, degradê à esquerda).
    hero: "gledie-camargo-fundo",
    heroPosition: "52% 28%",
    tags: ["Direito Penal", "Processo Penal", "Execução"],
    positionActive: "26% 0%",
    position: "26% 30%",
  },
  {
    id: "natalia-okumura",
    slug: "natalia-okumura",
    hasProfile: true,
    summary: "Atua em Direito Civil e do Consumidor e em ações de saúde contra o SUS e planos de saúde.",
    about: [
      "A Dra. Natália Okumura atua em **Direito Civil e do Consumidor** e em **ações de saúde contra o SUS e planos de saúde**.",
      "É graduada pela **Faculdade de Direito de Sorocaba (FADI)** e cursa pós-graduação em **Advocacia Cível** e em **Direito Médico, Odontológico e da Saúde**.",
    ],
    education: [
      { course: "Direito", level: "Graduação", institution: "Faculdade de Direito de Sorocaba (FADI)" },
      { course: "Advocacia Cível", level: "Pós-graduação (em andamento)", institution: "Fundação Escola Superior do Ministério Público (FMP)" },
      { course: "Direito Médico, Odontológico e da Saúde", level: "Pós-graduação (em andamento)", institution: "Universidade de São Paulo (USP)" },
    ],
    recognitionsList: [],
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
    // Painéis da equipe: foto horizontal (rosto menor, texto longe do rosto).
    panel: "natalia-okumura-fundo",
    panelPos: "56% 50%",
    panelPosActive: "63% 50%",
    // Foto larga para o topo do perfil (pessoa à direita, degradê à esquerda).
    hero: "natalia-okumura-fundo",
    heroPosition: "50% 25%",
    tags: ["Contratos", "Consumidor", "Saúde"],
    positionActive: "50% 0%",
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

export const profilePath = (p) => `/advogados/${p.slug}/`;
export const personName = (p) => p.name.replace(/^Dra?\. /, "");
export const teamWithProfile = team.filter((p) => p.hasProfile);
