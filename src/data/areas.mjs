// Fonte única das áreas de atuação. Home, hub de áreas, base de conhecimento,
// formulário e rodapé leem daqui. Para criar as páginas próprias no futuro
// (/areas/<slug>/ e /areas/<slug>/<servico>/), basta trocar areaUrl/serviceUrl.
// Todas as áreas; as marcadas com paused: true ficam fora do site (páginas, menus, listas, sitemap)
// até serem reativadas — basta remover a marcação. O conteúdo continua aqui.
const ALL_AREAS = [
  {
    id: "familia",
    number: "01",
    title: "Direito de Família",
    shortTitle: "Família",
    slug: "direito-de-familia",
    summary:
      "Divórcio, pensão, guarda e união estável — decisões que seguem pela vida inteira da família.",
    description:
      "Separações e decisões sobre filhos envolvem convivência, patrimônio e responsabilidades que se estendem por anos. A orientação começa por separar o que pode ser acordado do que dependerá de decisão judicial.",
    services: [
      {
        id: "divorcio",
        title: "Divórcio",
        slug: "divorcio",
        text: "Consensual ou litigioso, em cartório quando a lei permite ou pela via judicial.",
        items: [
          "Com partilha de bens",
          "Sem partilha de bens",
          "Com filhos menores",
          "Sem filhos menores",
          "Divórcio extrajudicial (em cartório)",
        ],
      },
      {
        id: "pensao-alimenticia",
        title: "Pensão alimentícia",
        slug: "pensao-alimenticia",
        text: "Definida pela necessidade de quem recebe e pela capacidade de quem paga.",
        items: ["Fixação", "Redução", "Aumento", "Exoneração"],
      },
      {
        id: "uniao-estavel",
        title: "União estável",
        slug: "uniao-estavel",
        text: "Reconhecimento da união, período de convivência e regime de bens.",
        items: ["Formalização", "Dissolução"],
      },
      {
        id: "guarda",
        title: "Guarda de filhos",
        slug: "guarda-de-filhos",
        text: "Guarda compartilhada ou unilateral e organização do regime de convivência.",
        items: [],
      },
      {
        id: "familia-outros",
        title: "Demais assuntos de Família",
        slug: null,
        text: "Outras questões familiares são avaliadas a partir dos fatos e documentos do caso.",
        items: [],
      },
    ],
  },
  {
    id: "sucessorio",
    number: "02",
    title: "Direito Sucessório e Herança",
    shortTitle: "Sucessório",
    slug: "direito-sucessorio",
    summary: "Inventário, herança, testamento e planejamento da transmissão do patrimônio.",
    description:
      "Inventários reúnem interesses diferentes dentro da mesma família. Antes de abrir o procedimento é preciso saber quais bens entram, quem são os herdeiros e se o caminho em cartório é possível.",
    services: [
      {
        id: "inventario",
        title: "Inventário",
        slug: "inventario",
        text: "Em cartório, quando há consenso entre herdeiros maiores e capazes; judicial nos demais casos.",
        items: ["Judicial", "Extrajudicial (em cartório)"],
      },
      {
        id: "heranca",
        title: "Herança",
        slug: "heranca",
        text: "Quem herda, o que entra na partilha e o que acontece quando o inventário atrasa.",
        items: [
          "Direitos dos herdeiros",
          "Prazo para abertura do inventário",
          "Questões relacionadas ao atraso",
        ],
      },
      {
        id: "testamento",
        title: "Testamento",
        slug: "testamento",
        text: "Elaboração e cumprimento, dentro dos limites legais da legítima.",
        items: [],
      },
      {
        id: "planejamento-sucessorio",
        title: "Planejamento sucessório",
        slug: "planejamento-sucessorio",
        text: "Instrumentos para organizar a transmissão do patrimônio e reduzir litígios futuros.",
        items: [],
      },
      {
        id: "sucessorio-outros",
        title: "Demais assuntos sucessórios",
        slug: null,
        text: "Outras situações envolvendo herança e partilha são avaliadas caso a caso.",
        items: [],
      },
    ],
  },
  {
    id: "trabalhista",
    number: "03",
    title: "Direito Trabalhista",
    shortTitle: "Trabalhista",
    slug: "direito-trabalhista",
    summary: "Rescisão, verbas, vínculo, horas extras e condições de trabalho.",
    description:
      "Demissões e verbas em aberto envolvem contas, prazos e provas. O primeiro passo é conferir o que foi pago e o que a lei ou a convenção coletiva ainda garante.",
    services: [
      {
        id: "rescisao-indireta",
        title: "Rescisão indireta",
        slug: "rescisao-indireta",
        text: "Quando a falta grave é do empregador e o contrato pode ser encerrado com as verbas devidas.",
        items: [],
      },
      {
        id: "vinculo",
        title: "Reconhecimento de vínculo",
        slug: "reconhecimento-de-vinculo",
        text: "Trabalho sem registro em carteira, comprovado por documentos e testemunhas.",
        items: [],
      },
      {
        id: "desvio-de-funcao",
        title: "Desvio de função",
        slug: "desvio-de-funcao",
        text: "Exercício de atividades diferentes das contratadas, com reflexos salariais.",
        items: [],
      },
      {
        id: "assedio-moral",
        title: "Assédio moral",
        slug: "assedio-moral",
        text: "Condutas abusivas repetidas que atingem a dignidade do trabalhador.",
        items: [],
      },
      {
        id: "verbas-rescisorias",
        title: "Verbas rescisórias",
        slug: "verbas-rescisorias",
        text: "Conferência do que foi pago na rescisão e cobrança do que ficou em aberto.",
        items: [],
      },
      {
        id: "horas-extras",
        title: "Horas extras",
        slug: "horas-extras",
        text: "Jornada além da contratada, comprovada por cartões de ponto, escalas e registros.",
        items: [],
      },
      {
        id: "insalubridade",
        title: "Insalubridade",
        slug: "insalubridade",
        text: "Exposição a agentes nocivos à saúde e o adicional correspondente.",
        items: [],
      },
      {
        id: "gestante",
        title: "Estabilidade da gestante",
        slug: "estabilidade-da-gestante",
        text: "Garantia de emprego desde a confirmação da gravidez.",
        items: [],
      },
      {
        id: "trabalhista-outros",
        title: "Demais assuntos trabalhistas",
        slug: null,
        text: "Outras questões da relação de trabalho são avaliadas com os documentos do contrato.",
        items: [],
      },
    ],
  },
  {
    id: "criminal",
    number: "04",
    title: "Direito Criminal",
    shortTitle: "Criminal",
    slug: "direito-criminal",
    summary: "Defesa desde o inquérito policial até a execução da pena.",
    description:
      "Investigações e acusações penais têm prazos curtos e efeitos imediatos sobre a liberdade. A atuação é técnica e pode começar ainda na fase policial.",
    services: [
      {
        id: "defesa-criminal",
        title: "Defesa criminal",
        slug: "defesa-criminal",
        text: "Acompanhamento técnico em todas as fases da persecução penal.",
        items: ["Inquérito policial", "Audiência de custódia", "Processo criminal"],
      },
      {
        id: "habeas-corpus",
        title: "Habeas corpus",
        slug: "habeas-corpus",
        text: "Medida contra prisão ou ameaça ilegal à liberdade de locomoção.",
        items: [],
      },
      {
        id: "revisao-criminal",
        title: "Revisão criminal",
        slug: "revisao-criminal",
        text: "Revisão de condenação definitiva nas hipóteses previstas em lei.",
        items: [],
      },
      {
        id: "prisao-em-flagrante",
        title: "Prisão em flagrante",
        slug: "prisao-em-flagrante",
        text: "Atuação imediata, inclusive na audiência de custódia.",
        items: [],
      },
      {
        id: "criminal-outros",
        title: "Demais assuntos criminais",
        slug: null,
        text: "Inclui pedidos na execução penal, como progressão de regime e livramento condicional.",
        items: [],
      },
    ],
  },
  {
    id: "saude",
    number: "05",
    title: "Direito Médico e da Saúde",
    shortTitle: "Médico e Saúde",
    slug: "direito-medico-saude",
    summary:
      "Defesa de profissionais da saúde, planos de saúde, SUS e responsabilidade por erro médico.",
    description:
      "Questões de saúde envolvem urgência, contratos e documentação técnica. Relatórios médicos, prescrições e negativas formais são o ponto de partida de qualquer análise.",
    services: [
      {
        id: "defesa-profissionais",
        title: "Defesa de médicos e dentistas",
        slug: "defesa-medicos-dentistas",
        text: "Atuação em procedimentos que envolvem a prática profissional.",
        items: ["Judicial", "Extrajudicial", "Ético-profissional"],
      },
      {
        id: "reajuste-convenio",
        title: "Reajuste de convênio médico",
        slug: "reajuste-plano-saude",
        text: "Análise de reajustes por faixa etária, sinistralidade e cláusulas contratuais.",
        items: [],
      },
      {
        id: "erro-medico",
        title: "Indenização por erro médico ou odontológico",
        slug: "erro-medico-odontologico",
        text: "Avaliação da responsabilidade a partir do prontuário e da documentação do atendimento.",
        items: [],
      },
      {
        id: "pos-bariatrica",
        title: "Cirurgia plástica pós-bariátrica",
        slug: "cirurgia-pos-bariatrica",
        text: "Negativas de cobertura para cirurgias reparadoras indicadas após a bariátrica.",
        items: [],
      },
      {
        id: "tratamento-medicamento",
        title: "Tratamento ou medicamento",
        slug: "tratamento-medicamento",
        text: "Pedidos de cobertura negados, com base na prescrição médica fundamentada.",
        items: ["Pelo SUS", "Pelo plano de saúde"],
      },
      {
        id: "saude-outros",
        title: "Demais assuntos de Direito Médico e da Saúde",
        slug: null,
        text: "Outras situações são avaliadas a partir dos documentos médicos e contratuais.",
        items: [],
      },
    ],
  },
  {
    id: "bancario",
    number: "06",
    title: "Direito Bancário",
    shortTitle: "Bancário",
    slug: "direito-bancario",
    summary: "Juros abusivos, busca e apreensão de veículo e fraudes como o golpe do Pix.",
    description:
      "Contratos bancários e fraudes eletrônicas exigem leitura atenta das cláusulas, dos extratos e dos registros da operação. É com esses documentos que se avalia o caminho possível.",
    services: [
      {
        id: "juros-abusivos",
        title: "Juros abusivos em financiamento de veículo",
        slug: "juros-abusivos-financiamento",
        text: "Revisão de contratos com taxas e encargos acima do permitido.",
        items: [],
      },
      {
        id: "busca-e-apreensao",
        title: "Busca e apreensão de veículo",
        slug: "busca-apreensao-veiculo",
        text: "Defesa em ações movidas pela instituição financeira por atraso nas parcelas.",
        items: [],
      },
      {
        id: "golpe-do-pix",
        title: "Golpe do Pix",
        slug: "golpe-do-pix",
        text: "Análise da responsabilidade da instituição em transferências fraudulentas.",
        items: [],
      },
      {
        id: "bancario-outros",
        title: "Demais assuntos bancários",
        slug: null,
        text: "Outras questões com bancos e financeiras são avaliadas com o contrato e os extratos.",
        items: [],
      },
    ],
  },
  {
    id: "imobiliario",
    number: "07",
    title: "Direito Imobiliário",
    shortTitle: "Imobiliário",
    slug: "direito-imobiliario",
    summary: "Locação, atraso na entrega de obra e usucapião.",
    description:
      "Questões imobiliárias dependem de contrato, matrícula e histórico de posse. A análise desses documentos define se o caminho é notificação, acordo ou ação judicial.",
    services: [
      {
        id: "locacao",
        title: "Locação",
        slug: "locacao",
        text: "Relação entre locador e locatário, do contrato à retomada do imóvel.",
        items: ["Despejo", "Contrato de aluguel", "Cobrança de aluguel"],
      },
      {
        id: "atraso-em-obra",
        title: "Atraso em obra",
        slug: "atraso-em-obra",
        text: "Descumprimento do prazo de entrega de imóvel na planta.",
        items: [],
      },
      {
        id: "usucapiao",
        title: "Usucapião",
        slug: "usucapiao",
        text: "Regularização da propriedade pela posse prolongada, judicial ou em cartório.",
        items: [],
      },
      {
        id: "imobiliario-outros",
        title: "Demais assuntos imobiliários",
        slug: null,
        text: "Outras questões envolvendo imóveis são avaliadas a partir da documentação.",
        items: [],
      },
    ],
  },
  {
    id: "previdenciario",
    number: "08",
    title: "Direito Previdenciário",
    shortTitle: "Previdenciário",
    slug: "direito-previdenciario",
    summary: "Benefícios do INSS, BPC/LOAS e pedidos negados.",
    description:
      "Pedidos negados pelo INSS raramente terminam ali. O histórico de contribuições e o motivo da negativa são analisados antes de indicar recurso administrativo ou ação judicial.",
    services: [
      {
        id: "bpc-loas",
        title: "BPC / LOAS",
        slug: "bpc-loas",
        text: "Benefício assistencial para pessoa idosa ou com deficiência em situação de baixa renda.",
        items: [],
      },
      {
        id: "auxilio-doenca",
        title: "Auxílio-doença",
        slug: "auxilio-doenca",
        text: "Benefício por incapacidade temporária, inclusive após perícia desfavorável.",
        items: [],
      },
      {
        id: "salario-maternidade",
        title: "Salário-maternidade",
        slug: "salario-maternidade",
        text: "Benefício devido em razão de nascimento, adoção ou guarda para adoção.",
        items: [],
      },
      {
        id: "previdenciario-outros",
        title: "Demais assuntos previdenciários",
        slug: null,
        text: "Aposentadorias, revisões e pensão por morte são avaliadas a partir do CNIS.",
        items: [],
      },
    ],
  },
];

export const PAUSED_AREAS = new Set(ALL_AREAS.filter((a) => a.paused).map((a) => a.id));
// Áreas publicadas, numeradas na ordem em que aparecem (01, 02...).
export const practiceAreas = ALL_AREAS.filter((a) => !a.paused).map((a, i) => ({ ...a, number: String(i + 1).padStart(2, "0") }));
export const areaById = Object.fromEntries(practiceAreas.map((a) => [a.id, a]));
// Textos que citam as áreas acompanham as publicadas: "sete áreas", "Família, Sucessões ... e INSS".
const COUNT_WORDS = ["nenhuma", "uma", "duas", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez"];
export const areaCountWord = COUNT_WORDS[practiceAreas.length];
export const areaCountTitle = areaCountWord.charAt(0).toUpperCase() + areaCountWord.slice(1);
// labels: { id: "rótulo" } na ordem desejada; só entram as áreas publicadas.
export const areaNames = (labels) => {
  const list = Object.entries(labels).filter(([id]) => areaById[id]).map(([, l]) => l);
  return list.length > 1 ? `${list.slice(0, -1).join(", ")} e ${list.at(-1)}` : list.join("");
};

export const AREAS_HUB = "/areas-de-atuacao/";
// Página própria de cada área (página-pilar), mãe das páginas de serviço.
export const areaUrl = (area) => `/areas/${area.slug}/`;
// Bloco da área dentro do hub /areas-de-atuacao/ (índice lateral da página).
export const areaHubAnchor = (area) => `${AREAS_HUB}#${area.id}`;
export const areaFaqUrl = (area) => `${areaUrl(area)}#perguntas`;
export const servicePath = (area, service) => (service.slug ? `/areas/${area.slug}/${service.slug}/` : null);
