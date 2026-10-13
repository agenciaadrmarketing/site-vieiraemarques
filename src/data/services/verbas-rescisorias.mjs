// Página temática. A LP "Verbas Rescisórias" segue como página de campanha.
const SIM = "Sim";
const NAO = "Não";

export default {
  area: "trabalhista",
  service: "verbas-rescisorias",
  seo: {
    title: "Verbas Rescisórias | Vieira & Marques",
    description:
      "Quais valores fazem parte da rescisão do contrato de trabalho, quando pode haver diferença no pagamento e quais documentos ajudam a conferir o que foi pago.",
  },
  hero: {
    h1: "Verbas rescisórias",
    lede: "Entenda quais parcelas podem fazer parte do encerramento do contrato de trabalho e quais informações são analisadas quando há diferença no pagamento.",
    cta: "Enviar informações",
    secondary: { href: "#parcelas", label: "O que entra na rescisão" },
    facts: [
      { label: "Pagamento", text: "Até 10 dias após o término do contrato." },
      { label: "Prazo para discutir", text: "Até 2 anos após o fim do contrato, alcançando os últimos 5 anos." },
      { label: "Termo assinado", text: "Assinar o TRCT não impede questionar diferenças." },
    ],
  },
  blocks: [
    {
      type: "prose",
      id: "entendendo",
      toc: "Entendendo a rescisão",
      eyebrow: "Entendendo a rescisão",
      title: `As verbas dependem de <span class="grad">como o contrato terminou.</span>`,
      paragraphs: [
        "Dispensa sem justa causa, pedido de demissão, justa causa, acordo entre as partes ou rescisão indireta: cada forma de encerramento gera um conjunto diferente de parcelas. Por isso, o primeiro passo de qualquer conferência é identificar a modalidade registrada — e se ela corresponde ao que de fato aconteceu.",
        "O Termo de Rescisão do Contrato de Trabalho (TRCT) resume o que a empresa considera devido. A lei estabelece prazo de até 10 dias, contados do término do contrato, para o pagamento; o atraso sujeita o empregador a multa equivalente a um salário do trabalhador.",
        "Assinar o termo não significa concordar com todos os valores. Diferenças podem ser discutidas dentro do prazo legal.",
      ],
    },
    {
      type: "table",
      id: "parcelas",
      toc: "Quais valores entram",
      tone: "muted",
      eyebrow: "Parcelas da rescisão",
      title: `Quais valores podem fazer parte <span class="grad">da rescisão.</span>`,
      intro: "Visão geral das parcelas mais comuns em cada forma de encerramento. A rescisão indireta segue as mesmas verbas da dispensa sem justa causa.",
      caption: "Verbas rescisórias por modalidade de desligamento",
      columns: ["Parcela", "Sem justa causa", "Pedido de demissão", "Justa causa", "Acordo (art. 484-A)"],
      rows: [
        ["Saldo de salário", SIM, SIM, SIM, SIM],
        ["Aviso prévio", "Sim, proporcional ao tempo de serviço", "Cumprido pelo empregado ou descontado", NAO, "Metade, se indenizado"],
        ["13º salário proporcional", SIM, SIM, NAO, SIM],
        ["Férias vencidas + 1/3", SIM, SIM, SIM, SIM],
        ["Férias proporcionais + 1/3", SIM, SIM, NAO, SIM],
        ["Multa sobre o FGTS", "40%", NAO, NAO, "20%"],
        ["Saque do FGTS", SIM, NAO, NAO, "Até 80%"],
        ["Seguro-desemprego", "Conforme requisitos", NAO, NAO, NAO],
      ],
      note: "Quadro simplificado. Convenções coletivas, estabilidades e situações específicas podem alterar o resultado.",
    },
    {
      type: "list",
      id: "diferencas",
      toc: "Quando há diferença",
      layout: "side",
      eyebrow: "Pontos de atenção",
      title: `Quando pode existir <span class="grad">diferença no pagamento.</span>`,
      intro: "Situações que costumam aparecer na conferência de uma rescisão.",
      items: [
        { title: "Base de cálculo incompleta", text: "Horas extras, adicional noturno, comissões ou adicionais pagos com habitualidade que não entraram nas médias de férias, 13º e aviso prévio.", service: ["trabalhista", "horas-extras"] },
        { title: "Aviso prévio sem a proporcionalidade", text: "O aviso prévio cresce 3 dias por ano trabalhado, até o limite de 90 dias. O acréscimo nem sempre aparece no termo." },
        { title: "FGTS não depositado ou em atraso", text: "Meses sem depósito reduzem o saldo e, consequentemente, a multa. O extrato do FGTS mostra cada competência." },
        { title: "Férias vencidas", text: "Períodos de férias não usufruídos ou pagos sem o terço constitucional." },
        { title: "Pagamento fora do prazo", text: "Valores quitados depois dos 10 dias legais, o que pode gerar a multa prevista na CLT." },
        { title: "Modalidade registrada diferente da real", text: "Justa causa sem falta grave comprovada, ou pedido de demissão feito sob pressão, mudam todo o conjunto de verbas.", service: ["trabalhista", "rescisao-indireta"] },
      ],
    },
    {
      type: "documents",
      id: "documentos",
      toc: "Documentos",
      tone: "muted",
      eyebrow: "Documentos",
      title: `O que ajuda a <span class="grad">compreender a situação.</span>`,
      intro: "Se faltar algum documento, a análise começa com o que existir.",
      image: { name: "carteira-trabalho", alt: "Carteira de Trabalho e Previdência Social" },
      groups: [
        { title: "Carteira de Trabalho", text: "Física ou digital, pelo aplicativo do governo. Registra admissão, saída, função, salário e alterações do contrato.", items: ["Datas de admissão e de saída", "Função e salário anotados", "Alterações contratuais e afastamentos"] },
        { title: "Rescisão e pagamentos", items: ["Termo de Rescisão (TRCT) e comprovante de pagamento", "Contracheques dos últimos meses", "Extrato do FGTS, pelo aplicativo ou pela Caixa"] },
        { title: "Rotina de trabalho", items: ["Cartões de ponto ou escalas", "Comunicação de dispensa ou pedido de demissão", "Mensagens e e-mails sobre jornada e pagamentos"] },
      ],
    },
    {
      type: "timeline",
      id: "como-funciona",
      toc: "Como funciona a análise",
      tone: "dark",
      eyebrow: "Como funciona a análise",
      title: `Da conferência <span class="grad">à definição do caminho.</span>`,
      tracks: [
        {
          steps: [
            { title: "Você envia as informações", text: "Forma de desligamento, datas e os documentos que tiver em mãos." },
            { title: "Conferência da rescisão", text: "O TRCT é comparado com contracheques, Carteira de Trabalho e extrato do FGTS." },
            { title: "Explicação do resultado", text: "O que foi identificado — e também quando os valores estão corretos." },
            { title: "Definição do caminho", text: "Tentativa de acordo, reclamação trabalhista ou a conclusão de que não há diferença a discutir." },
          ],
        },
      ],
    },
    {
      type: "callout",
      id: "prazos",
      eyebrow: "Prazos",
      title: "O prazo para discutir verbas trabalhistas é limitado.",
      paragraphs: [
        "A ação trabalhista deve ser proposta em até dois anos após o fim do contrato e alcança os créditos dos cinco anos anteriores ao ajuizamento. Reunir documentos cedo também facilita a prova de jornada, pagamentos e condições de trabalho.",
      ],
    },
    {
      type: "faq",
      id: "perguntas",
      toc: "Perguntas frequentes",
      tone: "muted",
      eyebrow: "Perguntas frequentes",
      title: `Dúvidas comuns <span class="grad">sobre a rescisão.</span>`,
      items: [
        ["Já assinei o TRCT. Ainda posso discutir diferenças?", "Sim. A assinatura do termo não impede questionar valores pagos a menor ou não pagos, dentro do prazo de dois anos após o fim do contrato."],
        ["Qual o prazo para a empresa pagar a rescisão?", "Até 10 dias contados do término do contrato. O pagamento fora desse prazo sujeita o empregador à multa prevista na CLT, equivalente a um salário."],
        ["Fui dispensado por justa causa. Recebo alguma verba?", "Sim, ainda que reduzidas: saldo de salário e férias vencidas com o terço constitucional. Se a falta grave não estiver demonstrada, a justa causa pode ser questionada."],
        ["Pedi demissão. Tenho direito ao FGTS?", "Os depósitos continuam na conta, mas, em regra, o saque e a multa de 40% não se aplicam ao pedido de demissão. Recebem-se saldo de salário, 13º e férias proporcionais e vencidas."],
        ["Como funciona a demissão por acordo?", "Prevista na CLT desde 2017, garante metade do aviso prévio indenizado e da multa do FGTS (20%), as demais verbas integrais e o saque de até 80% do FGTS, sem seguro-desemprego."],
        ["O que é rescisão indireta?", "É o encerramento do contrato por falta grave do empregador, como atrasos salariais reiterados ou exigências abusivas. Reconhecida, garante as mesmas verbas da dispensa sem justa causa."],
      ],
    },
  ],
  trust: { image: "sala-reuniao", title: "Conferência técnica antes de qualquer medida." },
  related: {
    services: [["trabalhista", "rescisao-indireta"], ["trabalhista", "horas-extras"], ["trabalhista", "vinculo"], ["trabalhista", "gestante"]],
  },
  form: {
    heading: `Envie as informações <span class="grad">da sua rescisão.</span>`,
    lead: "Com a forma de desligamento, as datas e os documentos disponíveis, o advogado verifica o que já é possível conferir.",
    points: ["Análise sigilosa dos documentos", "Explicação clara, inclusive quando não há diferença", "Reunião presencial ou por vídeo"],
    questions: [
      { id: "desligado", type: "choice", label: "Você já foi desligado da empresa?", options: ["Sim", "Estou cumprindo aviso prévio", "Não, ainda trabalho"] },
      { id: "quando", type: "select", label: "Quando ocorreu o desligamento?", options: ["Há menos de 3 meses", "Entre 3 e 12 meses", "Entre 1 e 2 anos", "Há mais de 2 anos"], showIf: { desligado: "Sim" } },
      { id: "modalidade", type: "select", label: "Como foi o desligamento?", options: ["Dispensa sem justa causa", "Pedido de demissão", "Justa causa", "Acordo com a empresa", "Não sei"], showIf: { desligado: "Sim" } },
      { id: "trct", type: "choice", label: "Recebeu o Termo de Rescisão (TRCT)?", options: ["Sim", "Não", "Não sei"] },
      { id: "documentos", type: "choice", label: "Possui Carteira de Trabalho e outros documentos?", options: ["Sim", "Alguns", "Não"] },
    ],
    message: { label: "Qual é a principal dúvida?", placeholder: "Ex.: acho que as horas extras não entraram no cálculo.", required: false },
  },
};
