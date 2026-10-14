import { servicePage } from "./factory.mjs";

export default [
  servicePage("sucessorio", "inventario", {
    h1: "Inventário",
    grad: "Em cartório ou na Justiça.",
    lede: "Quando o inventário pode ser feito em cartório, quais são os prazos, o imposto envolvido e os documentos necessários para começar.",
    description: "Inventário judicial e extrajudicial: prazos, imposto de transmissão (ITCMD), documentos e quando o procedimento pode ser feito em cartório.",
    topic: "inventário",
    facts: [
      { label: "Abertura", text: "Até 2 meses do falecimento, conforme o Código de Processo Civil." },
      { label: "Cartório", text: "Possível quando há consenso entre os herdeiros, nas condições da lei." },
      { label: "Advogado", text: "Obrigatório nas duas vias, judicial e extrajudicial." },
    ],
    intro: {
      title: `O inventário organiza <span class="grad">a transmissão do patrimônio.</span>`,
      paragraphs: [
        "O inventário levanta os bens, direitos e dívidas deixados por quem faleceu, identifica os herdeiros e define a partilha. Sem ele, os bens não podem ser regularmente transferidos, vendidos ou registrados em nome dos herdeiros.",
        "Quando todos os herdeiros são capazes e estão de acordo, o inventário pode ser feito em cartório, por escritura pública. Normas recentes do CNJ admitem o cartório também em situações específicas com herdeiros menores ou incapazes. Havendo conflito, o caminho é judicial.",
      ],
      points: ["O atraso na abertura pode gerar multa sobre o imposto de transmissão, conforme a lei estadual.", "Um dos herdeiros é nomeado inventariante para administrar os bens até a partilha.", "Bens descobertos depois podem ser incluídos em sobrepartilha."],
    },
    situations: {
      title: `Situações frequentes <span class="grad">no inventário.</span>`,
      items: [
        { title: "Inventário em cartório", text: "Herdeiros de acordo sobre a partilha, com escritura pública." },
        { title: "Inventário judicial", text: "Quando há conflito, testamento a ser cumprido ou outras exigências legais." },
        { title: "Inventário atrasado", text: "Falecimentos antigos sem inventário aberto, com bens ainda em nome de quem faleceu." },
        { title: "Venda de bem do espólio", text: "Quando é preciso vender um bem antes da partilha, com autorização." },
      ],
    },
    steps: {
      title: `Etapas <span class="grad">do inventário.</span>`,
      items: [
        { title: "Levantamento", text: "Documentos de quem faleceu, dos herdeiros, dos bens e das dívidas." },
        { title: "Escolha da via", text: "Cartório, se houver consenso e os requisitos da lei; Justiça, nos demais casos." },
        { title: "Imposto e certidões", text: "Cálculo e recolhimento do ITCMD e obtenção das certidões necessárias." },
        { title: "Partilha e registro", text: "Escritura ou sentença de partilha e registro dos bens em nome dos herdeiros." },
      ],
    },
    documents: [
      { title: "De quem faleceu", items: ["Certidão de óbito", "Documentos pessoais e certidão de casamento, se houver", "Testamento, se existir"] },
      { title: "Dos herdeiros e dos bens", items: ["Documentos pessoais dos herdeiros e cônjuges", "Matrículas atualizadas dos imóveis", "Documentos de veículos, extratos e investimentos"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre inventário.</span>`,
    faq: [
      ["Qual o prazo para abrir o inventário?", "Dois meses a partir do falecimento, segundo o Código de Processo Civil. Em São Paulo, o atraso gera multa sobre o ITCMD."],
      ["É possível fazer inventário sem advogado?", "Não. A lei exige a participação de advogado tanto no inventário judicial quanto no extrajudicial."],
      ["Um herdeiro pode impedir o inventário?", "Não. Se um herdeiro não concordar, o inventário segue pela via judicial."],
      ["Quem paga as dívidas de quem faleceu?", "As dívidas são pagas com os bens da herança. Os herdeiros não respondem além do que receberam."],
      ["Quanto tempo leva um inventário?", "Depende da via, da quantidade de bens e do consenso entre os herdeiros. Em cartório costuma ser mais rápido."],
    ],
    questions: [
      { id: "consenso", type: "choice", label: "Os herdeiros estão de acordo?", options: ["Sim", "Não", "Não sei"] },
      { id: "tempo", type: "select", label: "Quando ocorreu o falecimento?", options: ["Há menos de 2 meses", "Entre 2 meses e 1 ano", "Há mais de 1 ano"] },
    ],
    related: [["sucessorio", "heranca"], ["sucessorio", "testamento"]],
  }),

  servicePage("sucessorio", "heranca", {
    h1: "Herança",
    grad: "Quem herda e o que entra na partilha.",
    lede: "A ordem de quem herda, a parte reservada aos herdeiros necessários, renúncia, dívidas e o que fazer quando o inventário atrasa.",
    description: "Herança: quem são os herdeiros, a legítima, renúncia e cessão de direitos, dívidas de quem faleceu e o que fazer quando há bens sem inventário.",
    topic: "herança",
    facts: [
      { label: "Legítima", text: "Metade do patrimônio é reservada aos herdeiros necessários." },
      { label: "Dívidas", text: "Pagas com os bens da herança, no limite do que foi deixado." },
      { label: "Renúncia", text: "Formal, por escritura pública ou termo no processo." },
    ],
    intro: {
      title: `A lei define <span class="grad">a ordem de quem herda.</span>`,
      paragraphs: [
        "Sem testamento, a herança segue a ordem prevista no Código Civil: descendentes, em concorrência com o cônjuge ou companheiro conforme o regime de bens; depois, ascendentes; depois, o cônjuge; e, por fim, os parentes colaterais até o quarto grau.",
        "Descendentes, ascendentes e cônjuge são herdeiros necessários: metade do patrimônio — a legítima — é reservada a eles. A outra metade pode ser destinada livremente por testamento.",
      ],
      points: ["O herdeiro não responde por dívidas além do valor que recebeu.", "Bens só podem ser vendidos antes da partilha com autorização ou consenso.", "Doações em vida a descendentes, em regra, são consideradas adiantamento da herança."],
    },
    situations: {
      title: `Questões comuns <span class="grad">sobre herança.</span>`,
      items: [
        { title: "Quem tem direito", text: "Identificação dos herdeiros, inclusive filhos de outras relações e companheiros." },
        { title: "Renúncia ou cessão", text: "Abrir mão da herança ou transferir os direitos hereditários a outra pessoa." },
        { title: "Herdeiro excluído", text: "Herdeiro que não foi incluído no inventário pode pedir sua parte." },
        { title: "Bens sem inventário", text: "Imóveis e contas ainda em nome de quem faleceu há anos." },
        { title: "Imóvel ocupado por um herdeiro", text: "Uso exclusivo de bem comum por um dos herdeiros." },
        { title: "Dívidas deixadas", text: "Como ficam empréstimos, financiamentos e débitos de quem faleceu." },
      ],
    },
    documents: [
      { title: "Para entender a herança", items: ["Certidão de óbito", "Certidões de nascimento ou casamento que comprovem o parentesco", "Testamento ou escritura de doação, se houver"] },
      { title: "Sobre os bens", items: ["Matrículas de imóveis e documentos de veículos", "Extratos bancários e de investimentos", "Informações sobre dívidas e financiamentos"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre herança.</span>`,
    faq: [
      ["Filho de outro relacionamento tem direito à herança?", "Sim. Todos os filhos têm os mesmos direitos, sem distinção de origem."],
      ["Posso renunciar à herança?", "Sim, por escritura pública ou termo no processo. A renúncia é total e irrevogável, e a sua parte segue para os demais herdeiros conforme a lei."],
      ["Os herdeiros herdam as dívidas?", "As dívidas são pagas com os bens da herança. Se as dívidas forem maiores que os bens, os herdeiros não respondem com patrimônio próprio."],
      ["Posso vender minha parte antes da partilha?", "É possível ceder os direitos hereditários por escritura pública, respeitando o direito de preferência dos demais herdeiros em certos casos."],
      ["O cônjuge sempre herda?", "Depende do regime de bens e de quem são os demais herdeiros. Em muitos casos o cônjuge concorre com os filhos."],
    ],
    questions: [
      { id: "papel", type: "select", label: "Qual a sua situação?", options: ["Sou herdeiro", "Sou cônjuge ou companheiro", "Fui excluído da herança", "Outro"] },
      { id: "inventario", type: "choice", label: "O inventário já foi aberto?", options: ["Sim", "Não", "Não sei"] },
    ],
    related: [["sucessorio", "inventario"], ["sucessorio", "planejamento-sucessorio"]],
  }),

  servicePage("sucessorio", "testamento", {
    h1: "Testamento",
    grad: "Planejar com segurança e dentro da lei.",
    lede: "Formas de testamento, o que pode ser deixado a quem, os limites da legítima e como o testamento é cumprido depois do falecimento.",
    description: "Testamento: formas previstas em lei, o que pode ser disposto, limites da legítima e como o testamento é registrado e cumprido após o falecimento.",
    topic: "testamento",
    facts: [
      { label: "Parte disponível", text: "Até metade do patrimônio, quando há herdeiros necessários." },
      { label: "Revogação", text: "O testamento pode ser alterado ou revogado a qualquer tempo." },
      { label: "Capacidade", text: "Pessoas a partir de 16 anos podem testar." },
    ],
    intro: {
      title: `O testamento organiza <span class="grad">a vontade de quem deixa os bens.</span>`,
      paragraphs: [
        "Pelo testamento é possível destinar a parte disponível do patrimônio a herdeiros ou a outras pessoas e instituições, indicar bens específicos para cada um, reconhecer filhos e fazer outras disposições permitidas em lei.",
        "Havendo herdeiros necessários — descendentes, ascendentes ou cônjuge —, metade do patrimônio é reservada a eles. A forma mais usada é o testamento público, lavrado em cartório na presença de testemunhas.",
      ],
      points: ["Formas ordinárias: público, cerrado e particular.", "O testamento pode impor cláusulas, como incomunicabilidade, nos limites da lei.", "Depois do falecimento, o testamento precisa ser registrado e cumprido judicialmente."],
    },
    steps: {
      title: `Da elaboração <span class="grad">ao cumprimento.</span>`,
      items: [
        { title: "Planejamento", text: "Levantamento do patrimônio, dos herdeiros necessários e da vontade de quem testa." },
        { title: "Redação", text: "Definição das disposições dentro dos limites da lei." },
        { title: "Formalização", text: "Lavratura no cartório (testamento público) ou outra forma prevista em lei." },
        { title: "Cumprimento", text: "Após o falecimento, registro do testamento e inventário conforme suas disposições." },
      ],
    },
    documents: [
      { title: "Para elaborar", items: ["Documentos pessoais", "Relação dos bens e seus documentos", "Dados das pessoas que serão contempladas"] },
      { title: "Para cumprir", items: ["Certidão de óbito", "Cópia ou traslado do testamento", "Documentos dos herdeiros e legatários"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre testamento.</span>`,
    faq: [
      ["Posso deixar todos os meus bens para uma só pessoa?", "Somente se não houver herdeiros necessários. Havendo, metade do patrimônio é reservada a eles."],
      ["O testamento pode ser mudado?", "Sim. O testamento pode ser revogado ou substituído a qualquer tempo, pela mesma forma em que foi feito."],
      ["Com testamento, o inventário pode ser feito em cartório?", "Em algumas situações, sim, desde que o testamento tenha sido registrado judicialmente e os herdeiros estejam de acordo."],
      ["Qual a diferença entre testamento e doação em vida?", "A doação transfere os bens imediatamente; o testamento só produz efeitos após o falecimento."],
    ],
    questions: [
      { id: "pedido", type: "select", label: "O que você precisa?", options: ["Fazer um testamento", "Alterar um testamento", "Cumprir um testamento", "Questionar um testamento", "Outro"] },
    ],
    related: [["sucessorio", "planejamento-sucessorio"], ["sucessorio", "inventario"]],
  }),

  servicePage("sucessorio", "planejamento-sucessorio", {
    h1: "Planejamento sucessório",
    grad: "Organizar hoje para evitar conflitos amanhã.",
    lede: "Instrumentos para organizar a transmissão do patrimônio, como testamento, doação com reserva de usufruto e seguro de vida.",
    description: "Planejamento sucessório: testamento, doação com reserva de usufruto, holding familiar e seguro de vida para organizar a transmissão do patrimônio.",
    topic: "planejamento sucessório",
    facts: [
      { label: "Objetivo", text: "Organizar a transmissão do patrimônio e reduzir conflitos." },
      { label: "Limite", text: "A legítima dos herdeiros necessários deve ser respeitada." },
      { label: "Revisão", text: "O plano deve acompanhar as mudanças da família e do patrimônio." },
    ],
    intro: {
      title: `Planejar a sucessão <span class="grad">é uma decisão de família.</span>`,
      paragraphs: [
        "O planejamento sucessório reúne instrumentos jurídicos para organizar, ainda em vida, como o patrimônio será transmitido. O objetivo é dar previsibilidade, reduzir disputas entre herdeiros e evitar que bens fiquem parados por anos em inventário.",
        "Não existe solução única: a escolha depende da composição da família, do tipo de patrimônio e dos objetivos de quem planeja. Todos os instrumentos devem respeitar a legítima dos herdeiros necessários.",
      ],
    },
    situations: {
      title: `Instrumentos <span class="grad">mais usados.</span>`,
      eyebrow: "Instrumentos",
      toc: "Instrumentos",
      items: [
        { title: "Testamento", text: "Define o destino da parte disponível e organiza a partilha." },
        { title: "Doação com reserva de usufruto", text: "Transfere a propriedade em vida, mantendo o uso e a renda com quem doa." },
        { title: "Holding familiar", text: "Empresa que reúne bens da família, com regras de administração e sucessão." },
        { title: "Seguro de vida e previdência", text: "Valores pagos aos beneficiários, com regras próprias de tributação e transmissão." },
        { title: "Pacto antenupcial", text: "Escolha do regime de bens no casamento, com reflexos na sucessão." },
        { title: "Cláusulas de proteção", text: "Incomunicabilidade, impenhorabilidade e inalienabilidade, nos limites da lei." },
      ],
    },
    callout: {
      title: "Cada instrumento tem custos, tributos e efeitos próprios.",
      paragraphs: ["Doações em vida podem gerar imposto (ITCMD) no momento da transferência, e estruturas como a holding envolvem custos de manutenção. Por isso, a escolha deve partir de uma análise do patrimônio e da família, não de um modelo pronto."],
    },
    documents: [
      { title: "Da família", items: ["Documentos pessoais e certidão de casamento ou união estável", "Informações sobre filhos e demais herdeiros"] },
      { title: "Do patrimônio", items: ["Matrículas de imóveis e documentos de veículos", "Participações em empresas", "Extratos de investimentos, seguros e previdência"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre planejamento sucessório.</span>`,
    faq: [
      ["Planejamento sucessório é só para quem tem muito patrimônio?", "Não. Mesmo famílias com um único imóvel podem se beneficiar de uma organização prévia, especialmente quando há filhos de relações diferentes."],
      ["Doar os bens aos filhos em vida evita o inventário?", "Pode reduzir o que entra no inventário, mas a doação a descendentes é, em regra, adiantamento da herança e precisa respeitar a legítima."],
      ["O seguro de vida entra na herança?", "Em regra, não: o valor é pago diretamente aos beneficiários indicados na apólice."],
      ["A holding familiar serve para todos?", "Não. Ela faz sentido em situações específicas, conforme o patrimônio e os objetivos da família, e envolve custos de manutenção."],
    ],
    questions: [
      { id: "objetivo", type: "select", label: "Qual o principal objetivo?", options: ["Evitar conflitos entre herdeiros", "Organizar imóveis da família", "Planejar empresa familiar", "Ainda não sei", "Outro"] },
    ],
    related: [["sucessorio", "testamento"], ["sucessorio", "heranca"]],
  }),
];
