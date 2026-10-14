import { servicePage } from "./factory.mjs";

const SIM_NAO = ["Sim", "Não", "Não sei"];

export default [
  servicePage("familia", "pensao-alimenticia", {
    h1: "Pensão alimentícia",
    grad: "Fixação, revisão e cobrança.",
    lede: "Como o valor da pensão é definido, quando ele pode ser revisto e o que fazer quando os pagamentos atrasam.",
    description: "Pensão alimentícia: como o valor é definido, quando pedir revisão ou exoneração e como cobrar parcelas atrasadas. Atendimento presencial e online.",
    topic: "pensão alimentícia",
    facts: [
      { label: "Critério", text: "Necessidade de quem recebe e possibilidade de quem paga." },
      { label: "Revisão", text: "Cabe quando muda a situação financeira de uma das partes." },
      { label: "Atraso", text: "Parcelas em aberto podem ser cobradas judicialmente." },
    ],
    intro: {
      title: `O valor da pensão <span class="grad">não segue uma tabela fixa.</span>`,
      paragraphs: [
        "A lei não estabelece um percentual único. O valor é definido considerando a necessidade de quem recebe — alimentação, escola, saúde, moradia, lazer — e a possibilidade de quem paga, a partir da renda e do padrão de vida comprovados.",
        "A pensão pode ser fixada por acordo, homologado pelo juiz ou feito em cartório quando não há filhos menores, ou por decisão judicial. Depois de fixada, ela pode ser revista sempre que a situação de uma das partes mudar.",
      ],
      points: ["Pode ser paga em dinheiro, em despesas diretas (como escola e plano de saúde) ou de forma mista.", "Filhos maiores podem continuar recebendo, especialmente durante a formação.", "A gestante também pode pedir alimentos durante a gravidez (alimentos gravídicos)."],
    },
    situations: {
      title: `Os pedidos mais comuns <span class="grad">envolvendo pensão.</span>`,
      items: [
        { title: "Fixação", text: "Primeiro pedido de pensão, para filhos, ex-cônjuge ou ex-companheiro, ou durante a gestação." },
        { title: "Revisão para aumentar", text: "Quando as despesas de quem recebe aumentaram ou a renda de quem paga cresceu." },
        { title: "Revisão para reduzir", text: "Quando quem paga perdeu renda, teve novos filhos ou outras obrigações comprovadas." },
        { title: "Exoneração", text: "Pedido para encerrar a obrigação. A maioridade, sozinha, não encerra a pensão: é preciso decisão judicial." },
        { title: "Cobrança de atrasados", text: "Execução das parcelas não pagas, com as medidas previstas na lei." },
        { title: "Oferta de alimentos", text: "Quem deve pagar também pode propor o valor que considera adequado." },
      ],
    },
    steps: {
      title: `Do pedido <span class="grad">à decisão.</span>`,
      items: [
        { title: "Levantamento de renda e despesas", text: "Comprovantes de quem paga e gastos mensais de quem recebe, como escola, saúde e alimentação." },
        { title: "Tentativa de acordo", text: "Quando possível, o valor é negociado e o acordo é levado ao juiz para homologação." },
        { title: "Ação judicial", text: "Sem acordo, o pedido segue na Justiça. O juiz pode fixar alimentos provisórios logo no início." },
        { title: "Acompanhamento", text: "Depois de fixada, a pensão pode ser revista ou cobrada se as condições mudarem ou se houver atraso." },
      ],
    },
    callout: {
      title: "Pensão atrasada pode ser cobrada com medidas fortes.",
      paragraphs: ["A cobrança das três últimas parcelas vencidas e das que vencerem durante o processo pode levar à prisão civil de quem deve, além de protesto e penhora de bens. Parcelas mais antigas são cobradas por outros meios, como penhora. Cada medida depende do caso e da análise do juiz."],
    },
    documents: [
      { title: "Para fixar ou revisar", items: ["Certidão de nascimento dos filhos", "Comprovantes das despesas mensais (escola, saúde, alimentação)", "Informações sobre a renda de quem paga, se houver"] },
      { title: "Para cobrar atrasados", items: ["Decisão ou acordo que fixou a pensão", "Controle dos pagamentos recebidos e em aberto", "Extratos ou comprovantes de depósito"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre pensão alimentícia.</span>`,
    faq: [
      ["Existe um percentual fixo de 30% do salário?", "Não. Esse percentual é uma referência comum, mas não está na lei. O valor depende da necessidade de quem recebe e da possibilidade de quem paga."],
      ["A pensão acaba quando o filho completa 18 anos?", "Não automaticamente. É preciso pedir a exoneração na Justiça, e o filho pode continuar recebendo, por exemplo, enquanto estuda."],
      ["Perdi o emprego. Posso parar de pagar?", "Não. O caminho é pedir a revisão do valor. Até a decisão, a obrigação continua como foi fixada."],
      ["Quem paga a pensão pode ver como o dinheiro é gasto?", "A lei permite pedir prestação de contas em situações específicas, quando há indícios de que os valores não atendem o interesse do filho."],
      ["Avós podem ser chamados a pagar?", "Sim, de forma complementar, quando os pais não conseguem arcar com o necessário. Cada caso é analisado individualmente."],
    ],
    questions: [
      { id: "pedido", type: "select", label: "O que você precisa?", options: ["Fixar pensão", "Aumentar o valor", "Reduzir o valor", "Encerrar a pensão", "Cobrar atrasados", "Outro"] },
      { id: "acordo", type: "choice", label: "Já existe decisão ou acordo de pensão?", options: SIM_NAO },
    ],
    related: [["familia", "divorcio"], ["familia", "guarda"]],
  }),

  servicePage("familia", "uniao-estavel", {
    h1: "União estável",
    grad: "Reconhecimento, regime de bens e dissolução.",
    lede: "O que caracteriza a união estável, como formalizá-la e o que acontece com os bens quando a relação termina.",
    description: "União estável: o que caracteriza, como formalizar em cartório, qual o regime de bens e como funciona a dissolução, com ou sem acordo.",
    topic: "união estável",
    facts: [
      { label: "Requisitos", text: "Convivência pública, contínua, duradoura e com objetivo de constituir família." },
      { label: "Regime de bens", text: "Comunhão parcial, se não houver contrato escrito em sentido diferente." },
      { label: "Formalização", text: "Pode ser feita por escritura pública em cartório." },
    ],
    intro: {
      title: `A união estável existe <span class="grad">mesmo sem papel assinado.</span>`,
      paragraphs: [
        "A união estável é reconhecida quando o casal mantém convivência pública, contínua e duradoura, com o objetivo de constituir família. Não há prazo mínimo fixado em lei, e morar juntos não é requisito obrigatório: o conjunto da relação é que é analisado.",
        "Formalizar a união por escritura pública ou contrato escrito dá segurança sobre a data de início e permite escolher o regime de bens. Sem contrato, aplica-se a comunhão parcial: os bens adquiridos onerosamente durante a união são, em regra, dos dois.",
      ],
      points: ["A união pode ser convertida em casamento.", "Companheiros têm direitos sucessórios equiparados aos dos cônjuges, segundo o STF.", "A dissolução pode ser feita em cartório quando há consenso e não há filhos menores ou incapazes."],
    },
    situations: {
      title: `Quando procurar <span class="grad">orientação.</span>`,
      items: [
        { title: "Formalizar a união", text: "Escritura pública com data de início e escolha do regime de bens." },
        { title: "Dissolução com acordo", text: "Partilha de bens, guarda e pensão definidos em conjunto, em cartório ou na Justiça." },
        { title: "Dissolução sem acordo", text: "Quando há disputa sobre bens, período da união ou filhos." },
        { title: "Reconhecimento após falecimento", text: "Para garantir direitos sucessórios e previdenciários do companheiro sobrevivente." },
      ],
    },
    steps: {
      title: `Do reconhecimento <span class="grad">à partilha.</span>`,
      items: [
        { title: "Definição do período", text: "Quando a união começou e quando terminou, com base em documentos e testemunhas." },
        { title: "Levantamento dos bens", text: "O que foi adquirido durante a união e o que é anterior ou recebido por herança ou doação." },
        { title: "Acordo ou ação", text: "Com consenso, escritura ou homologação judicial; sem consenso, ação de reconhecimento e dissolução." },
        { title: "Partilha e demais pontos", text: "Divisão dos bens e, havendo filhos, definição de guarda, convivência e pensão." },
      ],
    },
    documents: [
      { title: "Da união", items: ["Comprovantes de endereço em comum", "Contas conjuntas, plano de saúde ou seguro com o companheiro como dependente", "Fotos, mensagens e declarações que mostrem a vida em comum"] },
      { title: "Dos bens", items: ["Matrículas de imóveis e documentos de veículos", "Contratos de financiamento", "Extratos de contas e investimentos"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre união estável.</span>`,
    faq: [
      ["Quanto tempo de relacionamento caracteriza união estável?", "A lei não fixa prazo mínimo. O que conta é a convivência pública, contínua e duradoura com objetivo de constituir família."],
      ["Namoro longo é união estável?", "Não necessariamente. A diferença está no objetivo de constituir família no presente. Alguns casais firmam contrato de namoro, cuja validade é analisada caso a caso."],
      ["Na união estável os bens são divididos meio a meio?", "Sem contrato escrito, aplica-se a comunhão parcial: dividem-se os bens adquiridos onerosamente durante a união. Bens anteriores, heranças e doações, em regra, ficam de fora."],
      ["O companheiro tem direito à herança?", "Sim. O STF equiparou os direitos sucessórios de companheiros e cônjuges. A comprovação da união é essencial nesses casos."],
      ["Posso dissolver a união estável em cartório?", "Sim, quando há consenso e não há filhos menores ou incapazes, com a participação de advogado."],
    ],
    questions: [
      { id: "pedido", type: "select", label: "O que você precisa?", options: ["Formalizar a união", "Dissolver com acordo", "Dissolver sem acordo", "Reconhecer após falecimento", "Outro"] },
      { id: "filhos", type: "choice", label: "Há filhos menores?", options: SIM_NAO },
    ],
    related: [["familia", "divorcio"], ["sucessorio", "heranca"]],
  }),

  servicePage("familia", "guarda", {
    h1: "Guarda de filhos",
    grad: "Decisões pensadas a partir da criança.",
    lede: "Guarda compartilhada ou unilateral, regime de convivência e mudanças de guarda: como funcionam e o que o juiz considera.",
    description: "Guarda de filhos: diferença entre guarda compartilhada e unilateral, regime de convivência e quando é possível pedir a modificação da guarda.",
    topic: "guarda de filhos",
    facts: [
      { label: "Regra", text: "A guarda compartilhada é a regra prevista em lei." },
      { label: "Convivência", text: "Organizada em um regime próprio, separado da guarda." },
      { label: "Critério", text: "O melhor interesse da criança orienta as decisões." },
    ],
    intro: {
      title: `Guarda e convivência <span class="grad">são coisas diferentes.</span>`,
      paragraphs: [
        "A guarda trata de quem toma as decisões importantes sobre a vida do filho — escola, saúde, religião, viagens. Na guarda compartilhada, essas decisões são dos dois; na unilateral, de um deles, com o outro mantendo o direito de acompanhar e fiscalizar.",
        "A convivência — os dias e horários com cada um — é organizada em um regime próprio, que pode ser equilibrado ou não, conforme a rotina da família. A lei prevê a guarda compartilhada como regra, salvo quando um dos pais declara que não a deseja ou quando há risco à criança.",
      ],
      points: ["Guarda compartilhada não significa dividir a semana ao meio.", "A pensão alimentícia continua existindo, mesmo na guarda compartilhada.", "Situações de violência doméstica afastam a guarda compartilhada."],
    },
    situations: {
      title: `Pedidos comuns <span class="grad">sobre guarda.</span>`,
      items: [
        { title: "Definição da guarda", text: "Na separação, no divórcio ou na dissolução da união estável." },
        { title: "Regime de convivência", text: "Dias, feriados, férias e datas comemorativas com cada um." },
        { title: "Modificação da guarda", text: "Quando a situação da criança ou dos pais muda de forma relevante." },
        { title: "Mudança de cidade", text: "Quando um dos pais pretende se mudar com o filho." },
        { title: "Descumprimento da convivência", text: "Impedimentos frequentes ou faltas à convivência combinada." },
        { title: "Alienação parental", text: "Atos que dificultam o vínculo da criança com um dos pais." },
      ],
    },
    steps: {
      title: `Como a guarda <span class="grad">é decidida.</span>`,
      items: [
        { title: "Análise da rotina", text: "Escola, moradia, horários de trabalho e a relação de cada um com a criança." },
        { title: "Tentativa de acordo", text: "Plano de guarda e convivência construído em conjunto, quando possível." },
        { title: "Estudo e audiência", text: "Sem acordo, o juiz pode determinar estudo psicossocial e ouvir as partes." },
        { title: "Decisão e revisão", text: "A guarda pode ser revista se houver mudança relevante na situação da criança." },
      ],
    },
    documents: [
      { title: "Da criança", items: ["Certidão de nascimento", "Declaração de matrícula escolar", "Informações sobre saúde e acompanhamentos"] },
      { title: "Da rotina", items: ["Comprovante de endereço de cada um", "Horários de trabalho", "Mensagens relevantes sobre a convivência"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre guarda de filhos.</span>`,
    faq: [
      ["Na guarda compartilhada a criança mora com os dois?", "Não necessariamente. Normalmente há uma residência de referência e um regime de convivência com o outro, definido conforme a rotina da família."],
      ["Quem tem a guarda compartilhada paga pensão?", "Sim, pode haver pensão. Ela considera a necessidade da criança e a possibilidade de cada um."],
      ["Posso me mudar de cidade com meu filho?", "Mudanças que afetam a convivência devem ser combinadas com o outro genitor ou autorizadas pelo juiz."],
      ["A criança pode escolher com quem morar?", "A opinião da criança pode ser ouvida, conforme a idade e a maturidade, mas a decisão considera o melhor interesse dela como um todo."],
      ["O que é alienação parental?", "São atos que dificultam o vínculo da criança com um dos pais, como desqualificar o outro genitor ou impedir a convivência. A lei prevê medidas para coibir essas condutas."],
    ],
    questions: [
      { id: "pedido", type: "select", label: "O que você precisa?", options: ["Definir a guarda", "Definir a convivência", "Modificar a guarda", "Mudança de cidade", "Descumprimento da convivência", "Outro"] },
      { id: "acordo", type: "choice", label: "Já existe decisão ou acordo de guarda?", options: SIM_NAO },
    ],
    related: [["familia", "pensao-alimenticia"], ["familia", "divorcio"]],
  }),
];
