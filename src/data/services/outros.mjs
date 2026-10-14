import { servicePage } from "./factory.mjs";

const SIM_NAO = ["Sim", "Não", "Não sei"];

export default [
  servicePage("bancario", "busca-e-apreensao", {
    h1: "Busca e apreensão de veículo",
    grad: "Prazos curtos e caminhos possíveis.",
    lede: "Como funciona a ação de busca e apreensão em financiamentos com alienação fiduciária, os prazos depois da apreensão e as defesas possíveis.",
    description: "Busca e apreensão de veículo financiado: notificação, liminar, prazos de 5 e 15 dias após a apreensão, defesa e revisão do contrato.",
    topic: "busca e apreensão de veículo",
    facts: [
      { label: "Pagamento", text: "5 dias após a apreensão para pagar a dívida e reaver o veículo." },
      { label: "Defesa", text: "15 dias após a citação para apresentar resposta." },
      { label: "Requisito", text: "O banco precisa comprovar a mora por notificação." },
    ],
    intro: {
      title: `No financiamento com alienação fiduciária, <span class="grad">o veículo é a garantia.</span>`,
      paragraphs: [
        "Em financiamentos com alienação fiduciária, o veículo fica em garantia até a quitação. Diante do atraso, a instituição pode notificar o devedor e, comprovada a mora, pedir a busca e apreensão com liminar.",
        "Depois da apreensão, a lei dá cinco dias para pagar a integralidade da dívida e recuperar o veículo, e quinze dias para apresentar defesa. A defesa pode discutir irregularidades na notificação, cobranças abusivas e outros pontos do contrato.",
      ],
      points: ["A lei também passou a admitir procedimentos extrajudiciais de cobrança dessas garantias.", "Após a venda do veículo, o banco deve prestar contas do valor obtido.", "Revisar o contrato não suspende, por si só, a obrigação de pagar."],
    },
    steps: {
      title: `Como a ação <span class="grad">costuma andar.</span>`,
      items: [
        { title: "Atraso e notificação", text: "A instituição envia notificação ao endereço do contrato para comprovar a mora." },
        { title: "Liminar e apreensão", text: "Concedida a liminar, o veículo é apreendido." },
        { title: "Prazo para pagar", text: "Cinco dias para pagar a dívida e recuperar o veículo." },
        { title: "Defesa e venda", text: "Quinze dias para apresentar defesa; sem pagamento, o veículo pode ser vendido." },
      ],
    },
    callout: {
      variant: "warning",
      title: "Os prazos começam a contar logo após a apreensão.",
      paragraphs: ["Se o veículo já foi apreendido, procure orientação rapidamente: os prazos para pagar e para se defender são curtos e contados a partir da execução da liminar e da citação."],
    },
    documents: [
      { title: "Do contrato", items: ["Contrato de financiamento", "Comprovantes das parcelas pagas", "Planilha ou extrato da dívida"] },
      { title: "Da ação", items: ["Notificação recebida", "Mandado ou citação", "Auto de apreensão, se o veículo já foi levado"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre busca e apreensão.</span>`,
    faq: [
      ["Já paguei a maior parte do financiamento. O banco pode tomar o carro?", "O STJ entende que o pagamento da maior parte das parcelas, por si só, não impede a busca e apreensão em financiamentos com alienação fiduciária."],
      ["Posso pagar só as parcelas atrasadas?", "Pela regra atual, para recuperar o veículo após a apreensão é preciso pagar a integralidade da dívida em cinco dias."],
      ["Não recebi a notificação. A ação é válida?", "A notificação enviada ao endereço do contrato costuma ser aceita. Irregularidades devem ser analisadas no caso concreto."],
    ],
    questions: [{ id: "situacao", type: "select", label: "Qual a situação?", options: ["Parcelas atrasadas", "Recebi notificação", "Recebi citação", "O veículo já foi apreendido"] }],
    related: [["bancario", "juros-abusivos"], ["bancario", "golpe-do-pix"]],
  }),

  servicePage("imobiliario", "locacao", {
    h1: "Locação de imóveis",
    grad: "Do contrato à retomada do imóvel.",
    lede: "Direitos e deveres de locador e locatário, garantias, reajuste, cobrança de aluguéis e as hipóteses de despejo previstas na Lei do Inquilinato.",
    description: "Locação de imóveis: contrato de aluguel, garantias, reajuste, cobrança de aluguéis atrasados e ação de despejo pela Lei do Inquilinato (Lei 8.245/1991).",
    topic: "locação de imóvel",
    facts: [
      { label: "Lei", text: "Lei do Inquilinato (Lei 8.245/1991)." },
      { label: "Garantia", text: "Apenas uma modalidade por contrato." },
      { label: "Despejo", text: "Há hipóteses com liminar de desocupação em 15 dias." },
    ],
    intro: {
      title: `O contrato define <span class="grad">quase tudo.</span>`,
      paragraphs: [
        "Prazo, valor, índice de reajuste, garantias, responsabilidade por reparos e multa estão no contrato de locação, que deve respeitar a Lei do Inquilinato. A lei admite uma única garantia por contrato: caução, fiança, seguro-fiança ou cessão fiduciária de quotas.",
        "Na falta de pagamento, o locador pode cobrar os aluguéis e pedir o despejo. O locatário, citado, pode evitar a rescisão pagando o débito no prazo legal, uma vez a cada 24 meses.",
      ],
    },
    situations: {
      title: `Questões <span class="grad">frequentes.</span>`,
      items: [
        { title: "Contrato de aluguel", text: "Elaboração ou revisão de contrato residencial ou comercial." },
        { title: "Aluguéis atrasados", text: "Cobrança e ação de despejo por falta de pagamento." },
        { title: "Retomada do imóvel", text: "Fim do prazo, uso próprio e outras hipóteses legais." },
        { title: "Devolução antecipada", text: "Multa proporcional quando o locatário sai antes do prazo." },
        { title: "Reparos e benfeitorias", text: "Quem paga o quê e o direito à indenização." },
        { title: "Revisão do aluguel", text: "Ajuste do valor ao mercado após três anos de contrato." },
      ],
    },
    documents: [
      { title: "Do contrato", items: ["Contrato de locação e aditivos", "Documento da garantia (fiança, caução ou seguro)", "Laudo de vistoria"] },
      { title: "Dos pagamentos", items: ["Comprovantes de aluguel e encargos", "Notificações e mensagens trocadas"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre locação.</span>`,
    faq: [
      ["Posso exigir fiador e caução ao mesmo tempo?", "Não. A lei proíbe mais de uma modalidade de garantia no mesmo contrato."],
      ["Quanto tempo leva um despejo?", "Depende do caso. Em algumas hipóteses, como contratos sem garantia, a lei permite liminar de desocupação em 15 dias."],
      ["Posso devolver o imóvel antes do prazo?", "Sim, pagando a multa prevista no contrato, proporcional ao tempo restante, salvo as exceções legais."],
    ],
    questions: [{ id: "papel", type: "select", label: "Você é", options: ["Locador (proprietário)", "Locatário (inquilino)", "Fiador", "Outro"] }, { id: "tipo", type: "select", label: "Tipo de imóvel", options: ["Residencial", "Comercial"] }],
    related: [["imobiliario", "usucapiao"], ["imobiliario", "atraso-em-obra"]],
  }),

  servicePage("imobiliario", "atraso-em-obra", {
    h1: "Atraso na entrega de imóvel",
    grad: "Na planta, com prazo descumprido.",
    lede: "O prazo de tolerância permitido em lei, as opções do comprador diante do atraso e as indenizações que podem ser discutidas.",
    description: "Atraso na entrega de imóvel na planta: prazo de tolerância de 180 dias, rescisão com devolução de valores, multa e indenização ao comprador.",
    topic: "atraso na entrega de imóvel",
    facts: [
      { label: "Tolerância", text: "Até 180 dias, se previsto no contrato." },
      { label: "Opções", text: "Rescindir com devolução ou manter o contrato com indenização." },
      { label: "Prova", text: "Contrato, comunicados e comprovantes de pagamento." },
    ],
    intro: {
      title: `Depois da tolerância, <span class="grad">o atraso tem consequências.</span>`,
      paragraphs: [
        "A lei admite que o contrato preveja um prazo de tolerância de até 180 dias para a entrega do imóvel. Ultrapassado esse prazo, o comprador pode pedir a rescisão com a devolução dos valores pagos e multa, ou manter o contrato e receber indenização pelo período de atraso.",
        "O STJ reconhece que o atraso pode gerar lucros cessantes — como o valor de aluguel que o comprador deixou de receber ou teve de pagar —, além de discutir multas contratuais e cobranças indevidas durante o atraso.",
      ],
    },
    documents: [
      { title: "Do contrato", items: ["Contrato de compra e venda", "Memorial e prazo de entrega", "Aditivos"] },
      { title: "Do atraso", items: ["Comunicados da construtora", "Comprovantes de pagamento", "Comprovantes de aluguel pago no período, se houver"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre atraso de obra.</span>`,
    faq: [
      ["A cláusula de 180 dias de tolerância é válida?", "Sim, quando prevista de forma clara no contrato. O que passar disso caracteriza atraso."],
      ["Posso desistir do imóvel por causa do atraso?", "Sim. Superada a tolerância, o comprador pode pedir a rescisão com devolução integral dos valores pagos, corrigidos, e multa."],
      ["Tenho direito a aluguel pelo período de atraso?", "Os tribunais reconhecem indenização pelo período de atraso, frequentemente calculada com base no valor locativo do imóvel."],
    ],
    questions: [{ id: "atraso", type: "select", label: "Há quanto tempo o imóvel está atrasado?", options: ["Ainda dentro da tolerância", "Até 6 meses além da tolerância", "Mais de 6 meses", "Não sei"] }],
    related: [["imobiliario", "locacao"], ["imobiliario", "usucapiao"]],
  }),

  servicePage("imobiliario", "usucapiao", {
    h1: "Usucapião",
    grad: "Regularizar o imóvel pela posse.",
    lede: "As modalidades de usucapião, os prazos de posse exigidos e como funciona o pedido em cartório ou na Justiça.",
    description: "Usucapião: modalidades e prazos (extraordinária, ordinária, especial e familiar), requisitos da posse e como funciona o pedido em cartório ou na Justiça.",
    topic: "usucapião",
    facts: [
      { label: "Prazos", text: "De 2 a 15 anos, conforme a modalidade." },
      { label: "Posse", text: "Contínua, sem oposição e como se fosse dono." },
      { label: "Via", text: "Cartório de registro de imóveis ou Justiça." },
    ],
    intro: {
      title: `A posse prolongada <span class="grad">pode virar propriedade.</span>`,
      paragraphs: [
        "A usucapião permite adquirir a propriedade de um imóvel pela posse prolongada, contínua, sem oposição e com intenção de dono, pelo prazo previsto em lei. É o caminho comum para regularizar imóveis comprados por contrato de gaveta ou ocupados há muitos anos.",
        "Preenchidos os requisitos e sem oposição, o pedido pode ser feito no cartório de registro de imóveis, com ata notarial, planta e memorial descritivo. Havendo discordância ou exigências não atendidas, o pedido segue na Justiça.",
      ],
      points: ["Imóveis públicos não podem ser adquiridos por usucapião.", "A posse de antecessores pode ser somada, em certos casos.", "Contas, carnês de IPTU e testemunhas ajudam a provar o tempo de posse."],
    },
    situations: {
      title: `Principais <span class="grad">modalidades.</span>`,
      eyebrow: "Modalidades",
      toc: "Modalidades",
      items: [
        { title: "Extraordinária", text: "15 anos de posse, ou 10 anos se houver moradia ou obras produtivas." },
        { title: "Ordinária", text: "10 anos com justo título e boa-fé, com redução em situações específicas." },
        { title: "Especial urbana", text: "5 anos, para moradia, em imóvel urbano de até 250 m², sem outro imóvel." },
        { title: "Especial rural", text: "5 anos, área rural de até 50 hectares, tornada produtiva pela família." },
        { title: "Familiar", text: "2 anos, para quem permaneceu no imóvel do casal após o abandono do lar pelo ex-cônjuge, nas condições da lei." },
      ],
    },
    documents: [
      { title: "Da posse", items: ["Contratos de compra e venda ou cessão", "Carnês de IPTU e contas de consumo", "Nomes de vizinhos que possam testemunhar"] },
      { title: "Do imóvel", items: ["Matrícula ou certidão do imóvel, se houver", "Planta e memorial descritivo (elaborados por profissional)", "Fotos do imóvel"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre usucapião.</span>`,
    faq: [
      ["Contrato de gaveta permite usucapião?", "Sim, frequentemente. O contrato ajuda a demonstrar a posse e pode caracterizar justo título."],
      ["Usucapião em cartório é mais rápida?", "Costuma ser, quando todos os documentos estão completos e não há oposição dos confrontantes."],
      ["Preciso pagar ITBI na usucapião?", "Em regra, não, pois a usucapião não é uma compra e venda. Há outros custos, como os do cartório e da planta."],
    ],
    questions: [{ id: "tempo", type: "select", label: "Há quanto tempo você tem a posse?", options: ["Menos de 5 anos", "De 5 a 10 anos", "De 10 a 15 anos", "Mais de 15 anos"] }, { id: "contrato", type: "choice", label: "Tem contrato de compra?", options: SIM_NAO }],
    related: [["imobiliario", "locacao"], ["sucessorio", "inventario"]],
  }),

  servicePage("previdenciario", "bpc-loas", {
    h1: "BPC / LOAS",
    grad: "Benefício assistencial sem contribuição.",
    lede: "Quem pode receber o Benefício de Prestação Continuada, os critérios de renda, a avaliação da deficiência e o que fazer após uma negativa.",
    description: "BPC/LOAS: quem tem direito (pessoa idosa ou com deficiência), critério de renda, inscrição no CadÚnico, avaliação do INSS e o que fazer após a negativa.",
    topic: "BPC/LOAS",
    facts: [
      { label: "Valor", text: "Um salário mínimo mensal." },
      { label: "Quem", text: "Pessoa idosa a partir de 65 anos ou pessoa com deficiência." },
      { label: "Requisito", text: "Baixa renda familiar e inscrição no CadÚnico." },
    ],
    intro: {
      title: `Não exige contribuição, <span class="grad">mas exige comprovação.</span>`,
      paragraphs: [
        "O Benefício de Prestação Continuada (BPC), previsto na LOAS, garante um salário mínimo mensal à pessoa idosa a partir de 65 anos ou à pessoa com deficiência de longo prazo que não tenha meios de se manter nem de ser mantida pela família.",
        "O critério de renda principal é de até um quarto do salário mínimo por pessoa da família, mas a situação de vulnerabilidade pode ser comprovada por outros elementos, conforme a lei e a jurisprudência. A inscrição no CadÚnico é obrigatória.",
      ],
      points: ["O BPC não paga 13º salário e não gera pensão por morte.", "Para pessoa com deficiência, há avaliação médica e social do INSS.", "O benefício é revisto periodicamente."],
    },
    documents: [
      { title: "Da família", items: ["Documentos pessoais de todos que moram na casa", "Comprovante de inscrição atualizada no CadÚnico", "Comprovantes de renda e despesas"] },
      { title: "Da deficiência, se for o caso", items: ["Laudos e relatórios médicos atualizados", "Exames e receitas", "Carta de indeferimento do INSS, se houver"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre BPC/LOAS.</span>`,
    faq: [
      ["Preciso ter contribuído para o INSS?", "Não. O BPC é assistencial e não exige contribuições."],
      ["A renda da família passou do limite. Perdi o direito?", "Não necessariamente. Despesas com saúde e outros elementos de vulnerabilidade podem ser considerados na análise."],
      ["O INSS negou o BPC. O que fazer?", "É possível recorrer administrativamente ou discutir judicialmente, a partir do motivo indicado na negativa."],
    ],
    questions: [{ id: "perfil", type: "select", label: "O pedido é para", options: ["Pessoa idosa (65 anos ou mais)", "Pessoa com deficiência"] }, { id: "negado", type: "choice", label: "O INSS já negou?", options: SIM_NAO }],
    related: [["previdenciario", "auxilio-doenca"], ["previdenciario", "salario-maternidade"]],
  }),

  servicePage("previdenciario", "auxilio-doenca", {
    h1: "Auxílio-doença",
    grad: "Benefício por incapacidade temporária.",
    lede: "Requisitos do benefício por incapacidade temporária, a perícia do INSS, a prorrogação e o que fazer quando o pedido é negado ou cortado.",
    description: "Auxílio-doença (benefício por incapacidade temporária): requisitos, carência, perícia do INSS, prorrogação e o que fazer após negativa ou alta indevida.",
    topic: "auxílio-doença",
    facts: [
      { label: "Carência", text: "12 contribuições, com exceções previstas em lei." },
      { label: "Empregado", text: "Os primeiros 15 dias de afastamento são pagos pela empresa." },
      { label: "Perícia", text: "A incapacidade é avaliada pelo INSS." },
    ],
    intro: {
      title: `A incapacidade <span class="grad">precisa ser comprovada.</span>`,
      paragraphs: [
        "O benefício por incapacidade temporária — o antigo auxílio-doença — é devido ao segurado que fica incapaz para o trabalho por mais de 15 dias. Exige qualidade de segurado e, em regra, 12 contribuições, dispensadas em casos de acidente e de algumas doenças previstas em lei.",
        "A incapacidade é verificada por perícia do INSS ou por análise documental. Laudos e relatórios médicos atualizados, com diagnóstico, limitações e tempo estimado de afastamento, são decisivos.",
      ],
      points: ["O pedido de prorrogação deve ser feito antes da data de cessação.", "Da negativa cabe recurso administrativo ou ação judicial.", "Sequelas permanentes podem dar direito ao auxílio-acidente."],
    },
    documents: [
      { title: "Médicos", items: ["Laudos e relatórios médicos atualizados", "Exames", "Atestados e receitas"] },
      { title: "Do INSS e do trabalho", items: ["Carta de indeferimento ou de cessação", "Extrato do CNIS (Meu INSS)", "Carteira de Trabalho"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre auxílio-doença.</span>`,
    faq: [
      ["A perícia negou, mas continuo sem conseguir trabalhar. O que faço?", "É possível recorrer administrativamente ou entrar com ação judicial, com nova perícia. Os documentos médicos são o centro da discussão."],
      ["Recebi alta do INSS e a empresa não me aceita de volta. E agora?", "Essa situação, conhecida como limbo previdenciário, precisa ser analisada com urgência, tanto do lado trabalhista quanto do previdenciário."],
      ["Quem está desempregado pode receber?", "Sim, se ainda mantiver a qualidade de segurado, no chamado período de graça."],
    ],
    questions: [{ id: "situacao", type: "select", label: "Qual a situação?", options: ["Vou pedir o benefício", "O INSS negou", "O benefício foi cortado", "Outro"] }],
    related: [["previdenciario", "bpc-loas"], ["trabalhista", "assedio-moral"]],
  }),

  servicePage("previdenciario", "salario-maternidade", {
    h1: "Salário-maternidade",
    grad: "Nascimento, adoção ou guarda.",
    lede: "Quem tem direito ao salário-maternidade, por quanto tempo é pago e como fazer o pedido conforme o tipo de segurada.",
    description: "Salário-maternidade: quem tem direito, duração de 120 dias, casos de adoção e guarda, seguradas autônomas, MEI e desempregadas, e como pedir ao INSS.",
    topic: "salário-maternidade",
    facts: [
      { label: "Duração", text: "120 dias, em regra." },
      { label: "Quem", text: "Seguradas e segurados do INSS, inclusive em adoção." },
      { label: "Desempregada", text: "Pode receber no período de graça." },
    ],
    intro: {
      title: `Um direito <span class="grad">de diferentes seguradas.</span>`,
      paragraphs: [
        "O salário-maternidade é pago por 120 dias em caso de parto, adoção ou guarda judicial para fins de adoção. Têm direito as seguradas empregadas, domésticas, contribuintes individuais, MEI, facultativas e seguradas especiais, além de quem está desempregada mas mantém a qualidade de segurada.",
        "Para a empregada, o pagamento é feito pela empresa; nos demais casos, o pedido é feito diretamente ao INSS. O STF afastou a exigência de carência para o benefício (ADI 2110).",
      ],
      points: ["Em caso de falecimento da mãe, o benefício pode ser pago ao cônjuge ou companheiro.", "Em caso de natimorto, o benefício também é devido.", "Pedidos negados podem ser revistos administrativa ou judicialmente."],
    },
    documents: [
      { title: "Do nascimento ou adoção", items: ["Certidão de nascimento ou termo de guarda/adoção", "Atestado médico, se o afastamento começar antes do parto"] },
      { title: "Da contribuição", items: ["Extrato do CNIS (Meu INSS)", "Carteira de Trabalho ou comprovantes de contribuição", "Carta de indeferimento, se houver"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre salário-maternidade.</span>`,
    faq: [
      ["Estou desempregada. Tenho direito?", "Sim, se ainda estiver no período de graça, em que se mantém a qualidade de segurada."],
      ["MEI e autônoma recebem salário-maternidade?", "Sim. Com a decisão do STF, a carência deixou de ser exigida para essas seguradas."],
      ["O pai pode receber?", "Em caso de adoção ou de falecimento da mãe, o benefício pode ser pago ao segurado, nas condições da lei."],
    ],
    questions: [{ id: "perfil", type: "select", label: "Qual a sua situação?", options: ["Empregada", "Desempregada", "MEI ou autônoma", "Segurada especial (rural)", "Adoção", "Outro"] }],
    related: [["previdenciario", "bpc-loas"], ["trabalhista", "gestante"]],
  }),
];
