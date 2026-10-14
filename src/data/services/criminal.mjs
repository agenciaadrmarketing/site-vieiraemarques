import { servicePage } from "./factory.mjs";

const SIGILO = "Atendimento sigiloso. Envie apenas o necessário para a análise inicial; detalhes sensíveis podem ser tratados diretamente com o advogado responsável.";
const FASE = { id: "fase", type: "select", label: "Em que fase está o caso?", options: ["Recebi uma intimação", "Inquérito policial", "Processo criminal", "Prisão", "Já há condenação", "Não sei"] };

export default [
  servicePage("criminal", "defesa-criminal", {
    h1: "Defesa criminal",
    grad: "Do inquérito ao processo.",
    lede: "Como funciona a defesa em cada fase da persecução penal, os direitos da pessoa investigada ou acusada e os acordos previstos em lei.",
    description: "Defesa criminal: atuação no inquérito policial, na audiência de custódia e no processo criminal, direitos do investigado e acordos previstos em lei.",
    topic: "defesa criminal",
    facts: [
      { label: "Início", text: "A defesa pode atuar já na fase de investigação." },
      { label: "Direitos", text: "Silêncio, assistência de advogado e acesso aos autos." },
      { label: "Acordos", text: "Transação, suspensão do processo e acordo de não persecução, quando cabíveis." },
    ],
    intro: {
      title: `Cada fase tem <span class="grad">prazos e estratégias próprios.</span>`,
      paragraphs: [
        "A persecução penal começa, em regra, com a investigação — normalmente o inquérito policial — e pode seguir para o processo criminal, se houver denúncia. A defesa técnica pode atuar desde o início, acompanhando depoimentos e acessando os elementos já documentados na investigação.",
        "Conforme o caso, a lei prevê alternativas ao processo, como a transação penal, a suspensão condicional do processo e o acordo de não persecução penal. A viabilidade de cada uma depende do crime imputado e das circunstâncias.",
      ],
      points: ["Ninguém é obrigado a produzir prova contra si mesmo.", "O silêncio não pode ser interpretado em prejuízo da defesa.", "O advogado tem acesso aos elementos já documentados no inquérito (Súmula Vinculante 14)."],
    },
    steps: {
      title: `Fases <span class="grad">da persecução penal.</span>`,
      items: [
        { title: "Investigação", text: "Inquérito policial, com oitivas, perícias e outras diligências." },
        { title: "Denúncia", text: "O Ministério Público oferece a acusação, ou propõe acordo quando cabível." },
        { title: "Resposta à acusação", text: "Primeira manifestação da defesa no processo, com prazo de 10 dias." },
        { title: "Instrução e sentença", text: "Audiência com testemunhas e interrogatório, alegações finais e decisão." },
        { title: "Recursos", text: "Revisão da decisão pelos tribunais, quando cabível." },
      ],
    },
    documents: [
      { title: "Do caso", items: ["Intimações, mandados e boletins de ocorrência", "Número do inquérito ou processo", "Decisões já proferidas"] },
      { title: "Da pessoa", items: ["Documentos pessoais", "Comprovante de residência e de trabalho", "Documentos que ajudem a esclarecer os fatos"] },
    ],
    docWarning: SIGILO,
    faqTitle: `Dúvidas comuns <span class="grad">sobre defesa criminal.</span>`,
    faq: [
      ["Recebi uma intimação para depor. Preciso de advogado?", "É recomendável. O advogado orienta sobre o depoimento e acompanha o ato, garantindo os direitos da pessoa ouvida."],
      ["O que é acordo de não persecução penal?", "É um acordo com o Ministério Público, previsto em lei para crimes sem violência ou grave ameaça com pena mínima inferior a quatro anos, mediante condições."],
      ["Ter um processo criminal significa ser condenado?", "Não. A Constituição garante a presunção de inocência até a decisão definitiva."],
    ],
    questions: [FASE],
    formWarning: SIGILO,
    related: [["criminal", "habeas-corpus"], ["criminal", "prisao-em-flagrante"]],
  }),

  servicePage("criminal", "habeas-corpus", {
    h1: "Habeas corpus",
    grad: "Contra prisão ou ameaça ilegal à liberdade.",
    lede: "O que é o habeas corpus, em quais situações é cabível e como funciona o pedido, inclusive com pedido de liminar.",
    description: "Habeas corpus: quando é cabível contra prisão ilegal ou ameaça à liberdade, situações comuns, pedido de liminar e como funciona o julgamento.",
    topic: "habeas corpus",
    facts: [
      { label: "Previsão", text: "Garantia constitucional (art. 5º, LXVIII)." },
      { label: "Cabimento", text: "Prisão ou ameaça ilegal à liberdade de locomoção." },
      { label: "Liminar", text: "Pode ser pedida para uma decisão rápida." },
    ],
    intro: {
      title: `Uma garantia <span class="grad">da liberdade.</span>`,
      paragraphs: [
        "O habeas corpus é uma ação constitucional para proteger a liberdade de locomoção contra ilegalidade ou abuso de poder. Pode ser liberatório, quando a pessoa já está presa, ou preventivo, quando há ameaça concreta de prisão ilegal.",
        "É um instrumento técnico: o pedido precisa demonstrar a ilegalidade com base nos documentos do processo. Os tribunais também limitam o seu uso como substituto de recursos.",
      ],
    },
    situations: {
      title: `Situações <span class="grad">em que costuma ser usado.</span>`,
      items: [
        { title: "Falta de fundamentação", text: "Prisão preventiva decretada sem fundamentação concreta." },
        { title: "Excesso de prazo", text: "Prisão que se prolonga sem andamento do processo." },
        { title: "Medida desproporcional", text: "Prisão quando medidas cautelares alternativas seriam suficientes." },
        { title: "Ilegalidade na prisão", text: "Prisão em flagrante fora das hipóteses legais." },
      ],
    },
    documents: [
      { title: "Do processo", items: ["Número do processo ou inquérito", "Decisão que decretou ou manteve a prisão", "Auto de prisão em flagrante, se houver"] },
      { title: "Da pessoa", items: ["Comprovante de residência", "Comprovante de trabalho ou estudo", "Documentos sobre saúde ou filhos dependentes, se for o caso"] },
    ],
    docWarning: SIGILO,
    faqTitle: `Dúvidas comuns <span class="grad">sobre habeas corpus.</span>`,
    faq: [
      ["Quem pode pedir habeas corpus?", "A lei permite que qualquer pessoa impetre, mas a atuação técnica de advogado é importante para demonstrar a ilegalidade."],
      ["O habeas corpus solta a pessoa na hora?", "Pode haver pedido de liminar, analisado com rapidez. A concessão depende da demonstração da ilegalidade."],
      ["Se for negado, o caso termina?", "Não necessariamente. Há outros caminhos processuais, conforme o caso e a fase do processo."],
    ],
    questions: [FASE],
    formWarning: SIGILO,
    related: [["criminal", "prisao-em-flagrante"], ["criminal", "defesa-criminal"]],
  }),

  servicePage("criminal", "revisao-criminal", {
    h1: "Revisão criminal",
    grad: "Rever uma condenação definitiva.",
    lede: "Quando é possível pedir a revisão de uma condenação já transitada em julgado, as hipóteses da lei e os documentos necessários.",
    description: "Revisão criminal: hipóteses previstas no Código de Processo Penal para rever condenação definitiva, provas novas e como funciona o pedido.",
    topic: "revisão criminal",
    facts: [
      { label: "Quando", text: "Após o trânsito em julgado da condenação." },
      { label: "Prazo", text: "Pode ser pedida a qualquer tempo, inclusive após o cumprimento da pena." },
      { label: "Sentido", text: "Somente em favor do condenado." },
    ],
    intro: {
      title: `Quando a decisão definitiva <span class="grad">pode ser revista.</span>`,
      paragraphs: [
        "A revisão criminal permite rever uma condenação definitiva nas hipóteses do artigo 621 do Código de Processo Penal: decisão contrária à lei ou à evidência dos autos, condenação fundada em provas comprovadamente falsas ou surgimento de provas novas de inocência ou de circunstância que diminua a pena.",
        "Não é um novo recurso: é preciso demonstrar uma dessas hipóteses. Quando procedente, pode levar à absolvição, à redução da pena ou à anulação do processo.",
      ],
    },
    documents: [
      { title: "Do processo", items: ["Número do processo", "Sentença e acórdãos", "Certidão de trânsito em julgado"] },
      { title: "Das novas provas", items: ["Documentos, laudos ou declarações novos", "Indicação de testemunhas não ouvidas"] },
    ],
    docWarning: SIGILO,
    faqTitle: `Dúvidas comuns <span class="grad">sobre revisão criminal.</span>`,
    faq: [
      ["Existe prazo para pedir revisão criminal?", "Não. Ela pode ser pedida a qualquer tempo, antes ou depois da extinção da pena."],
      ["A revisão pode piorar a situação do condenado?", "Não. A revisão criminal só pode ser decidida em favor do condenado."],
      ["Discordar da sentença basta para a revisão?", "Não. É preciso demonstrar uma das hipóteses previstas no Código de Processo Penal."],
    ],
    questions: [{ id: "motivo", type: "select", label: "Qual o fundamento principal?", options: ["Provas novas", "Prova falsa", "Decisão contrária às provas", "Não sei"] }],
    formWarning: SIGILO,
    related: [["criminal", "defesa-criminal"], ["criminal", "habeas-corpus"]],
  }),

  servicePage("criminal", "prisao-em-flagrante", {
    h1: "Prisão em flagrante",
    grad: "O que acontece nas primeiras horas.",
    lede: "Quando a prisão em flagrante é possível, o papel da audiência de custódia e as decisões que o juiz pode tomar logo depois.",
    description: "Prisão em flagrante: hipóteses legais, comunicação à família, audiência de custódia e as decisões possíveis do juiz, como liberdade provisória.",
    topic: "prisão em flagrante",
    facts: [
      { label: "Custódia", text: "A pessoa presa deve ser apresentada a um juiz em até 24 horas." },
      { label: "Comunicação", text: "A prisão deve ser comunicada à família ou a quem a pessoa indicar." },
      { label: "Decisões", text: "Relaxamento, liberdade provisória ou conversão em preventiva." },
    ],
    intro: {
      title: `A audiência de custódia <span class="grad">é um momento decisivo.</span>`,
      paragraphs: [
        "A prisão em flagrante ocorre quando a pessoa é surpreendida cometendo o crime, logo após cometê-lo ou em situações equiparadas previstas em lei. Ela deve ser comunicada ao juiz, ao Ministério Público e à família ou a pessoa indicada pelo preso.",
        "Em até 24 horas, a pessoa presa deve ser levada à audiência de custódia. Nela, o juiz verifica a legalidade da prisão e decide se a relaxa, se concede liberdade provisória — com ou sem fiança e medidas cautelares — ou se a converte em prisão preventiva.",
      ],
      points: ["Em crimes com pena máxima de até quatro anos, a própria autoridade policial pode arbitrar fiança.", "A pessoa presa tem direito de permanecer em silêncio e de ser assistida por advogado.", "A atuação da defesa na audiência de custódia pode evitar a manutenção da prisão."],
    },
    documents: [
      { title: "Para a audiência de custódia", items: ["Documentos pessoais", "Comprovante de residência", "Comprovante de trabalho ou estudo"] },
      { title: "Outras informações", items: ["Delegacia onde a pessoa está", "Informações sobre filhos ou dependentes", "Documentos de saúde, se houver"] },
    ],
    docWarning: SIGILO,
    faqTitle: `Dúvidas comuns <span class="grad">sobre prisão em flagrante.</span>`,
    faq: [
      ["Um familiar foi preso. O que fazer primeiro?", "Identificar a delegacia, reunir documentos pessoais, comprovante de residência e de trabalho e buscar assistência de advogado para a audiência de custódia."],
      ["O que é fiança?", "É um valor pago como garantia para responder ao processo em liberdade. Pode ser fixada pelo delegado, em crimes com pena máxima de até quatro anos, ou pelo juiz."],
      ["A prisão em flagrante pode virar preventiva?", "Sim, se o juiz entender presentes os requisitos legais. A defesa pode apresentar elementos para demonstrar que a prisão não é necessária."],
    ],
    questions: [{ id: "quando", type: "select", label: "Quando ocorreu a prisão?", options: ["Hoje", "Nos últimos dias", "Há mais tempo"] }],
    formWarning: SIGILO,
    related: [["criminal", "habeas-corpus"], ["criminal", "defesa-criminal"]],
  }),
];
