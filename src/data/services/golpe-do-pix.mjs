// Página temática e informativa. A LP "Golpe do Pix" segue como página de campanha.
export default {
  area: "bancario",
  service: "golpe-do-pix",
  seo: {
    title: "Golpe do Pix | Vieira & Marques",
    description:
      "O que fazer nas primeiras etapas após uma fraude com Pix, como funciona o pedido de devolução (MED) e como a responsabilidade dos bancos é analisada.",
  },
  hero: {
    h1: "Golpe do Pix",
    lede: "Foi vítima de uma fraude envolvendo Pix? Veja o que costuma ser feito nas primeiras etapas, como funciona o pedido de devolução e quais informações ajudam a analisar o caso.",
    cta: "Enviar informações",
    secondary: { href: "#primeiras-etapas", label: "Primeiras etapas" },
    facts: [
      { label: "MED", text: "Mecanismo do Banco Central para pedido de devolução em caso de fraude." },
      { label: "Contestação", text: "Feita pela vítima, junto à própria instituição, em até 80 dias da transação." },
      { label: "Devolução", text: "Depende de haver saldo na conta que recebeu o valor." },
    ],
  },
  blocks: [
    {
      type: "timeline",
      id: "primeiras-etapas",
      toc: "Primeiras etapas",
      eyebrow: "O que fazer nas primeiras etapas",
      title: `Registrar, preservar <span class="grad">e comunicar.</span>`,
      intro: "Medidas que costumam ser tomadas logo após perceber a fraude. Quanto mais completas as informações, melhor a análise posterior.",
      tracks: [
        {
          steps: [
            { title: "Contatar a sua instituição", text: "Pelos canais oficiais do aplicativo ou do SAC, informe a fraude e peça a abertura do Mecanismo Especial de Devolução (MED). Anote o número de protocolo." },
            { title: "Registrar a ocorrência", text: "O boletim de ocorrência pode ser feito na delegacia eletrônica, com os dados da transação e o relato do que aconteceu." },
            { title: "Preservar comprovantes", text: "Comprovante do Pix com chave, nome do recebedor e identificador da transação, além dos extratos da conta." },
            { title: "Documentar as comunicações", text: "Capturas de tela de conversas, anúncios, perfis, e-mails e números de telefone usados no golpe. Não apague nada." },
            { title: "Proteger as contas", text: "Trocar senhas, revisar dispositivos conectados e avisar contatos se o seu nome foi usado." },
          ],
        },
      ],
      note: "Desconfie de quem prometer recuperar o dinheiro mediante pagamento antecipado ou pedir senhas e códigos: é uma nova tentativa de golpe.",
    },
    {
      type: "list",
      id: "situacoes",
      toc: "Tipos de situação",
      tone: "muted",
      columns: true,
      eyebrow: "Tipos de situação",
      title: `Fraudes que <span class="grad">envolvem Pix.</span>`,
      items: [
        { title: "Falso familiar ou amigo", text: "Mensagem de número desconhecido, com foto de alguém próximo, pedindo uma transferência urgente." },
        { title: "Falsa central de atendimento", text: "Contato que se apresenta como banco e induz a transferências ou à instalação de aplicativos." },
        { title: "Falsa venda ou compra", text: "Anúncio em marketplace ou rede social, inclusive de veículos, com pagamento antecipado." },
        { title: "Conta invadida", text: "Transações não reconhecidas, feitas por terceiros com acesso indevido à conta." },
        { title: "Falso investimento", text: "Promessa de rendimento rápido que exige depósitos sucessivos." },
        { title: "Crédito não contratado", text: "Empréstimo ou consignado em seu nome, seguido de transferência do valor liberado." },
      ],
    },
    {
      type: "compare",
      id: "responsabilidade",
      toc: "Responsabilidade do banco",
      eyebrow: "Responsabilidade e análise do caso",
      title: `Nem toda fraude gera responsabilidade do banco. <span class="grad">O que é analisado.</span>`,
      paragraphs: [
        "O Superior Tribunal de Justiça entende que instituições financeiras respondem por danos causados por fraudes praticadas no âmbito de operações bancárias (Súmula 479). A aplicação dessa regra, porém, depende das circunstâncias: é preciso examinar a conduta da instituição de quem pagou e da que recebeu os valores.",
      ],
      columns: [
        { title: "Pontos que costumam ser examinados", items: ["Transações fora do perfil habitual da conta, sem bloqueio ou confirmação adicional", "Falhas de segurança no acesso ou no aplicativo", "Abertura e movimentação da conta recebedora sem a devida verificação", "Demora no bloqueio depois da comunicação da fraude"] },
        { title: "Pontos que podem afastar a responsabilidade", items: ["Transação autorizada pelo próprio cliente sem falha atribuível ao banco", "Fornecimento voluntário de senhas ou códigos a terceiros", "Comunicação da fraude muito tempo depois do ocorrido"] },
      ],
    },
    {
      type: "documents",
      id: "documentos",
      toc: "Documentos",
      tone: "muted",
      eyebrow: "Documentos importantes",
      title: `O que reunir <span class="grad">para a análise.</span>`,
      groups: [
        { title: "Da transação", items: ["Comprovante do Pix com identificador da transação", "Extratos do período", "Dados do recebedor: nome, chave e instituição"] },
        { title: "Das comunicações", items: ["Protocolo da contestação e respostas do banco", "Boletim de ocorrência", "Capturas de tela de conversas, anúncios e perfis"] },
      ],
      warning: "Nunca compartilhe senhas, tokens, códigos de verificação ou o número completo do cartão — nem com o escritório.",
    },
    {
      type: "timeline",
      id: "como-funciona",
      toc: "Como funciona a análise",
      tone: "dark",
      eyebrow: "Como funciona a análise",
      title: `Do relato <span class="grad">à definição do caminho.</span>`,
      tracks: [
        {
          steps: [
            { title: "Você envia as informações", text: "Tipo de fraude, data, valor, instituições envolvidas e o que já foi comunicado." },
            { title: "Verificação das medidas iniciais", text: "Se o MED foi aberto, se há boletim de ocorrência e quais prazos estão em curso." },
            { title: "Análise de responsabilidade", text: "Conduta das instituições envolvidas, à luz dos documentos e das regras do Banco Central." },
            { title: "Definição do caminho", text: "Reclamação administrativa, ação judicial com pedido de urgência quando cabível — ou a orientação de que não há medida útil." },
          ],
        },
      ],
    },
    {
      type: "faq",
      id: "perguntas",
      toc: "Perguntas frequentes",
      eyebrow: "Perguntas frequentes",
      title: `Dúvidas comuns <span class="grad">sobre golpe do Pix.</span>`,
      items: [
        ["O que é o MED e como ele funciona?", "É o Mecanismo Especial de Devolução, criado pelo Banco Central. A vítima contesta a transação junto à própria instituição, que comunica a instituição recebedora. Havendo indício de fraude e saldo disponível, os valores podem ser bloqueados e devolvidos."],
        ["Existe prazo para pedir a devolução pelo MED?", "Sim. A contestação deve ser feita em até 80 dias da transação, conforme as regras do Banco Central. Comunicar logo aumenta a chance de ainda existir saldo na conta recebedora."],
        ["O banco é obrigado a devolver o valor?", "Não automaticamente. A responsabilidade depende das circunstâncias, como falhas de segurança, transações fora do perfil e a conduta da instituição que recebeu os valores."],
        ["O banco negou a contestação. O caso termina aí?", "Não necessariamente. A negativa administrativa pode ser analisada e, conforme o caso, discutida judicialmente."],
        ["Preciso registrar boletim de ocorrência?", "É recomendável. O boletim formaliza o relato e costuma ser pedido pelas instituições e em eventual ação judicial."],
        ["Alguém prometeu recuperar meu dinheiro se eu pagar uma taxa. É seguro?", "Desconfie. Promessas de recuperação mediante pagamento antecipado, ou pedidos de senhas e códigos, são uma forma conhecida de novo golpe."],
      ],
    },
  ],
  trust: { image: "equipe-reuniao" },
  related: {
    services: [["bancario", "juros-abusivos"], ["bancario", "busca-e-apreensao"]],
  },
  // Mensagem inicial dos botões de WhatsApp desta página.
  whatsapp: { message: "Olá! Vim pelo site da Vieira & Marques. Fui vítima de um golpe envolvendo Pix e gostaria de orientação." },
  form: {
    heading: `Envie as informações <span class="grad">sobre a fraude.</span>`,
    lead: "Com o tipo de fraude, a data e o que já foi comunicado ao banco, o advogado avalia quais medidas ainda são possíveis.",
    points: ["Atendimento sigiloso", "Não pedimos senhas, tokens ou dados de cartão", "Explicação honesta sobre o que é possível no caso"],
    questions: [
      { id: "tipo_fraude", type: "select", label: "Tipo de fraude", options: ["Falso familiar ou amigo", "Falsa central de atendimento", "Falsa venda ou compra", "Conta invadida", "Falso investimento", "Crédito não contratado", "Outro"] },
      { id: "data", type: "select", label: "Quando aconteceu?", options: ["Hoje ou ontem", "Nesta semana", "Neste mês", "Entre 1 e 3 meses", "Há mais de 3 meses"] },
      { id: "valor", type: "select", label: "Valor aproximado", options: ["Até R$ 1.000", "De R$ 1.000 a R$ 5.000", "De R$ 5.000 a R$ 20.000", "Acima de R$ 20.000"] },
      { id: "instituicao", type: "text", label: "Instituição bancária", placeholder: "Banco ou aplicativo usado no Pix", maxlength: 60 },
      { id: "comunicou", type: "choice", label: "Já comunicou o banco?", options: ["Sim, tenho protocolo", "Sim, sem protocolo", "Ainda não"], hint: "Se ainda não comunicou, faça isso pelos canais oficiais da sua instituição — o pedido de devolução (MED) é aberto por ela." },
    ],
    message: { label: "Breve relato", placeholder: "Se quiser, conte em poucas linhas como aconteceu.", required: false },
    warning: "Nunca informe senhas, tokens, códigos de verificação ou o número completo do cartão.",
  },
};
