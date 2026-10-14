import { servicePage } from "./factory.mjs";

const DESLIGAMENTO = { id: "situacao", type: "select", label: "Qual a sua situação atual?", options: ["Ainda trabalho na empresa", "Fui dispensado", "Pedi demissão", "Outro"] };
const TEMPO = { id: "tempo", type: "select", label: "Há quanto tempo o contrato terminou?", options: ["Ainda trabalho na empresa", "Menos de 1 ano", "Entre 1 e 2 anos", "Mais de 2 anos"] };
const PRAZO = {
  title: "O prazo para discutir direitos trabalhistas é limitado.",
  paragraphs: ["A ação deve ser proposta em até dois anos depois do fim do contrato e alcança os direitos dos cinco anos anteriores ao ajuizamento. Reunir documentos cedo também facilita a prova."],
};

export default [
  servicePage("trabalhista", "rescisao-indireta", {
    h1: "Rescisão indireta",
    grad: "Quando a falta grave é do empregador.",
    lede: "As hipóteses previstas na CLT, como o pedido funciona e quais verbas são devidas quando a rescisão indireta é reconhecida.",
    description: "Rescisão indireta: faltas graves do empregador previstas na CLT, como funciona o pedido na Justiça do Trabalho e quais verbas são devidas.",
    topic: "rescisão indireta",
    facts: [
      { label: "Base legal", text: "Art. 483 da CLT, que lista as faltas graves do empregador." },
      { label: "Verbas", text: "As mesmas da dispensa sem justa causa, quando reconhecida." },
      { label: "Prova", text: "A falta grave precisa ser demonstrada no processo." },
    ],
    intro: {
      title: `A "justa causa" <span class="grad">do empregador.</span>`,
      paragraphs: [
        "A rescisão indireta permite ao trabalhador encerrar o contrato quando o empregador comete falta grave. Reconhecida pela Justiça do Trabalho, ela garante as mesmas verbas de uma dispensa sem justa causa: aviso prévio, multa de 40% do FGTS, saque do fundo e acesso ao seguro-desemprego, se preenchidos os requisitos.",
        "O pedido é feito por ação trabalhista. Em algumas hipóteses o trabalhador pode continuar trabalhando até a decisão; em outras, afasta-se. Se a falta grave não for reconhecida, o desligamento pode ser tratado como pedido de demissão — por isso a análise prévia é importante.",
      ],
    },
    situations: {
      title: `Faltas graves <span class="grad">mais comuns.</span>`,
      items: [
        { title: "Atrasos salariais repetidos", text: "Salários pagos fora do prazo de forma reiterada." },
        { title: "FGTS não depositado", text: "Ausência de depósitos do fundo por vários meses." },
        { title: "Assédio ou ofensas", text: "Tratamento humilhante, ameaças ou rigor excessivo." },
        { title: "Exigências além do contratado", text: "Serviços superiores às forças do trabalhador ou alheios ao contrato." },
        { title: "Risco à saúde", text: "Exposição a perigo manifesto sem as medidas de segurança." },
        { title: "Redução do trabalho e do salário", text: "Diminuição de tarefas que afeta sensivelmente a remuneração." },
      ],
    },
    callout: PRAZO,
    documents: [
      { title: "Do contrato", items: ["Carteira de Trabalho e contrato", "Contracheques dos últimos meses", "Extrato do FGTS"] },
      { title: "Da falta grave", items: ["Mensagens, e-mails e comunicados", "Nomes de testemunhas", "Atestados médicos, se houver"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre rescisão indireta.</span>`,
    faq: [
      ["Preciso sair da empresa para pedir a rescisão indireta?", "Depende da hipótese. Em casos como atraso salarial ou FGTS não depositado, a lei permite continuar trabalhando até a decisão."],
      ["Quais verbas recebo se a rescisão indireta for reconhecida?", "As mesmas da dispensa sem justa causa: saldo de salário, aviso prévio, férias e 13º proporcionais, multa de 40% do FGTS e saque do fundo."],
      ["E se o juiz não reconhecer a falta grave?", "O desligamento pode ser tratado como pedido de demissão, com as verbas correspondentes. Por isso a prova é analisada antes do pedido."],
      ["FGTS atrasado justifica rescisão indireta?", "A falta de depósitos do FGTS é uma das situações frequentemente reconhecidas como falta grave, conforme o caso."],
    ],
    questions: [DESLIGAMENTO, { id: "motivo", type: "select", label: "Qual a principal situação?", options: ["Atraso de salário", "FGTS não depositado", "Assédio ou ofensas", "Risco à saúde", "Outro"] }],
    related: [["trabalhista", "verbas-rescisorias"], ["trabalhista", "assedio-moral"]],
  }),

  servicePage("trabalhista", "vinculo", {
    h1: "Reconhecimento de vínculo",
    grad: "Trabalho sem carteira assinada.",
    lede: "Quando o trabalho sem registro configura vínculo de emprego, como ele é comprovado e quais direitos podem ser reconhecidos.",
    description: "Reconhecimento de vínculo de emprego: requisitos da CLT, trabalho sem carteira, pejotização, provas aceitas e direitos que podem ser reconhecidos.",
    topic: "reconhecimento de vínculo de emprego",
    facts: [
      { label: "Requisitos", text: "Pessoalidade, habitualidade, salário e subordinação." },
      { label: "Prova", text: "Documentos, mensagens, pagamentos e testemunhas." },
      { label: "Direitos", text: "Registro em carteira, FGTS, férias, 13º e contribuições ao INSS." },
    ],
    intro: {
      title: `O que vale <span class="grad">é a realidade do trabalho.</span>`,
      paragraphs: [
        "Há vínculo de emprego quando uma pessoa física presta serviços com pessoalidade, de forma habitual, mediante pagamento e sob subordinação. Se esses elementos existem, o nome dado ao contrato — autônomo, PJ, freelancer — não afasta os direitos trabalhistas.",
        "Reconhecido o vínculo, o empregador deve anotar a carteira e pagar as verbas do período, como FGTS, férias com um terço, 13º salário e recolhimentos ao INSS, além das verbas de rescisão quando o contrato já terminou.",
      ],
    },
    situations: {
      title: `Situações <span class="grad">frequentes.</span>`,
      items: [
        { title: "Trabalho sem registro", text: "Prestação de serviços contínua, sem anotação na carteira." },
        { title: "Contratação como PJ", text: "Exigência de abrir empresa ou MEI para trabalhar como empregado." },
        { title: "Período sem registro", text: "Registro feito só depois de meses de trabalho." },
        { title: "Falso autônomo", text: "Autonomia apenas no papel, com horários e ordens como os de empregado." },
      ],
    },
    callout: PRAZO,
    documents: [
      { title: "Da prestação de serviços", items: ["Mensagens com ordens, escalas e horários", "Comprovantes de pagamento (Pix, depósitos, recibos)", "Crachá, uniforme, e-mail corporativo ou acessos"] },
      { title: "Outras provas", items: ["Nomes de testemunhas", "Notas fiscais emitidas como PJ ou MEI, se houver", "Fotos e registros do ambiente de trabalho"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre vínculo de emprego.</span>`,
    faq: [
      ["Trabalhei como MEI ou PJ. Posso ter vínculo reconhecido?", "Sim, se na prática estavam presentes pessoalidade, habitualidade, salário e subordinação. O que conta é a realidade, não o contrato."],
      ["Sem documentos, consigo provar o vínculo?", "Testemunhas também são meio de prova. Mensagens, comprovantes de pagamento e outros registros ajudam a fortalecer o pedido."],
      ["Qual o prazo para pedir o reconhecimento?", "A ação deve ser proposta em até dois anos após o fim do trabalho, alcançando os últimos cinco anos de direitos."],
      ["O período reconhecido conta para a aposentadoria?", "O reconhecimento pode ser usado como prova do tempo de trabalho perante o INSS, conforme os requisitos previdenciários."],
    ],
    questions: [{ id: "forma", type: "select", label: "Como você foi contratado?", options: ["Sem nenhum registro", "Como PJ ou MEI", "Como autônomo", "Registro só depois de um tempo", "Outro"] }, TEMPO],
    related: [["trabalhista", "verbas-rescisorias"], ["previdenciario", "previdenciario-outros"]],
  }),

  servicePage("trabalhista", "desvio-de-funcao", {
    h1: "Desvio de função",
    grad: "Quando o trabalho real é outro.",
    lede: "O que caracteriza o desvio de função, a diferença para equiparação salarial e acúmulo de funções, e quais diferenças podem ser pedidas.",
    description: "Desvio de função: quando o trabalhador exerce atividades de cargo mais bem pago, diferença para equiparação salarial e as diferenças salariais possíveis.",
    topic: "desvio de função",
    facts: [
      { label: "O que é", text: "Exercer atividades de outra função, mais bem remunerada." },
      { label: "Efeito", text: "Diferenças salariais do período, com reflexos." },
      { label: "Prova", text: "Descrição das tarefas, documentos e testemunhas." },
    ],
    intro: {
      title: `Contratado para uma função, <span class="grad">trabalhando em outra.</span>`,
      paragraphs: [
        "Há desvio de função quando o trabalhador, contratado para um cargo, passa a exercer de forma habitual as atividades de outro cargo, mais bem remunerado. Nesses casos, podem ser devidas as diferenças salariais do período, com reflexos em férias, 13º e FGTS.",
        "O desvio é diferente da equiparação salarial, que compara o salário com o de um colega que faz o mesmo trabalho, e do acúmulo de funções, quando o trabalhador soma tarefas de cargos diferentes. Cada situação tem requisitos próprios.",
      ],
    },
    situations: {
      title: `Como costuma <span class="grad">aparecer.</span>`,
      items: [
        { title: "Promoção sem registro", text: "Assume as tarefas de supervisor ou líder sem alteração de cargo e salário." },
        { title: "Cobertura permanente", text: "Substituição de colega que deixa a empresa, sem fim definido." },
        { title: "Função técnica", text: "Atividades que exigem qualificação superior à do cargo registrado." },
        { title: "Mesmo trabalho, salário menor", text: "Situação que pode configurar pedido de equiparação salarial." },
      ],
    },
    callout: PRAZO,
    documents: [
      { title: "Do cargo", items: ["Carteira de Trabalho e contrato", "Descrição do cargo ou plano de cargos e salários, se houver", "Contracheques"] },
      { title: "Das atividades reais", items: ["E-mails, relatórios e assinaturas em nome da outra função", "Organogramas e comunicados internos", "Nomes de testemunhas"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre desvio de função.</span>`,
    faq: [
      ["Desvio de função dá direito à mudança de cargo?", "Em regra, a Justiça do Trabalho reconhece as diferenças salariais do período, e não o reenquadramento no novo cargo."],
      ["Qual a diferença para equiparação salarial?", "Na equiparação, o trabalhador compara seu salário com o de um colega que exerce a mesma função, nas condições da CLT."],
      ["Fazer tarefas extras é sempre acúmulo de função?", "Nem sempre. Tarefas compatíveis com o cargo podem ser exigidas. O acúmulo depende da situação concreta e, muitas vezes, de norma coletiva."],
    ],
    questions: [DESLIGAMENTO, TEMPO],
    related: [["trabalhista", "verbas-rescisorias"], ["trabalhista", "horas-extras"]],
  }),

  servicePage("trabalhista", "assedio-moral", {
    h1: "Assédio moral no trabalho",
    grad: "Condutas que atingem a dignidade.",
    lede: "O que caracteriza o assédio moral, como reunir provas e quais medidas são possíveis, inclusive a rescisão indireta e a indenização.",
    description: "Assédio moral no trabalho: o que caracteriza, exemplos de condutas abusivas, como reunir provas e as medidas possíveis, como indenização e rescisão indireta.",
    topic: "assédio moral no trabalho",
    facts: [
      { label: "Característica", text: "Condutas abusivas repetidas, que humilham ou isolam." },
      { label: "Prova", text: "Mensagens, testemunhas e registros médicos." },
      { label: "Medidas", text: "Indenização por dano moral e, conforme o caso, rescisão indireta." },
    ],
    intro: {
      title: `Mais do que um conflito <span class="grad">pontual.</span>`,
      paragraphs: [
        "O assédio moral é caracterizado por condutas abusivas, geralmente repetidas, que expõem o trabalhador a situações humilhantes, constrangedoras ou de isolamento, afetando sua dignidade e sua saúde. Pode partir de superiores, colegas ou até de subordinados.",
        "Reconhecido o assédio, cabe indenização por dano moral. Conforme a gravidade, também pode justificar a rescisão indireta do contrato. O assédio sexual é crime e tem tratamento próprio.",
      ],
    },
    situations: {
      title: `Condutas <span class="grad">que podem configurar assédio.</span>`,
      items: [
        { title: "Humilhações públicas", text: "Críticas ofensivas, gritos e exposição diante de colegas." },
        { title: "Metas abusivas", text: "Cobranças com ameaças, punições vexatórias ou ranking humilhante." },
        { title: "Isolamento", text: "Retirada de tarefas, exclusão de reuniões ou proibição de contato." },
        { title: "Perseguição", text: "Tratamento diferente e hostil dirigido a um trabalhador." },
      ],
    },
    callout: {
      title: "Cuide primeiro da sua saúde.",
      paragraphs: ["Se o assédio está afetando sua saúde, procure atendimento médico e guarde os atestados e relatórios. Esses documentos também ajudam a demonstrar as consequências da situação."],
    },
    documents: [
      { title: "Das condutas", items: ["Mensagens, e-mails e áudios", "Datas e descrição dos episódios", "Nomes de testemunhas"] },
      { title: "Das consequências", items: ["Atestados e relatórios médicos ou psicológicos", "Afastamentos pelo INSS, se houver", "Registros no canal de denúncias da empresa"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre assédio moral.</span>`,
    faq: [
      ["Uma única discussão é assédio moral?", "Em regra, o assédio envolve condutas repetidas. Um episódio isolado e grave, porém, pode gerar indenização por dano moral."],
      ["Posso gravar conversas como prova?", "A gravação feita por um dos participantes da conversa costuma ser aceita como prova. A análise depende do caso."],
      ["Posso pedir demissão por causa do assédio?", "Em vez de pedir demissão, pode ser possível pedir a rescisão indireta, que garante as verbas da dispensa sem justa causa."],
    ],
    questions: [DESLIGAMENTO, { id: "provas", type: "choice", label: "Você tem mensagens ou testemunhas?", options: ["Sim", "Não", "Não sei"] }],
    related: [["trabalhista", "rescisao-indireta"], ["trabalhista", "verbas-rescisorias"]],
  }),

  servicePage("trabalhista", "horas-extras", {
    h1: "Horas extras",
    grad: "Jornada além da contratada.",
    lede: "Limites da jornada, adicional mínimo, intervalos, banco de horas e como as horas extras não pagas são comprovadas.",
    description: "Horas extras: limites da jornada, adicional mínimo de 50%, intervalo não concedido, banco de horas e como comprovar horas extras não pagas.",
    topic: "horas extras",
    facts: [
      { label: "Jornada", text: "Até 8 horas diárias e 44 semanais, salvo regime especial." },
      { label: "Adicional", text: "No mínimo 50% sobre o valor da hora normal." },
      { label: "Reflexos", text: "Horas habituais refletem em férias, 13º, FGTS e descanso." },
    ],
    intro: {
      title: `Toda hora trabalhada <span class="grad">deve ser registrada e paga.</span>`,
      paragraphs: [
        "A Constituição limita a jornada a 8 horas diárias e 44 semanais. O que passa disso é hora extra, paga com adicional de no mínimo 50% — ou compensada em banco de horas válido. Convenções coletivas podem prever adicionais maiores.",
        "Empresas com mais de 20 empregados devem registrar a jornada. Quando os registros não refletem a realidade, a prova pode ser feita por mensagens, testemunhas e outros documentos.",
      ],
      points: ["O intervalo de almoço não concedido é pago com adicional.", "Horas extras habituais integram férias, 13º salário, FGTS e descanso semanal.", "Cargos de gestão podem ter regras diferentes, conforme a CLT."],
    },
    situations: {
      title: `Situações <span class="grad">comuns.</span>`,
      items: [
        { title: "Ponto britânico", text: "Registros sempre com os mesmos horários, que não mostram a jornada real." },
        { title: "Intervalo reduzido", text: "Almoço de 15 ou 30 minutos em jornadas acima de 6 horas." },
        { title: "Trabalho fora do horário", text: "Mensagens e tarefas no celular depois do expediente." },
        { title: "Banco de horas irregular", text: "Horas acumuladas sem compensação ou sem acordo válido." },
      ],
    },
    callout: PRAZO,
    documents: [
      { title: "Da jornada", items: ["Cartões de ponto ou espelhos de ponto", "Escalas e mensagens com horários", "Registros de acesso, login ou rastreamento"] },
      { title: "Do pagamento", items: ["Contracheques", "Convenção coletiva da categoria, se tiver", "Nomes de testemunhas"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre horas extras.</span>`,
    faq: [
      ["Sem cartão de ponto, consigo provar horas extras?", "Sim. Mensagens, registros de sistemas e testemunhas são aceitos como prova da jornada."],
      ["Domingos e feriados trabalhados são pagos em dobro?", "Quando não há folga compensatória, o trabalho em domingos e feriados é pago em dobro, conforme a jurisprudência do TST."],
      ["Quem tem cargo de confiança recebe horas extras?", "Depende. A CLT exclui do controle de jornada alguns cargos de gestão, mas é preciso verificar se o cargo realmente tem esses poderes."],
    ],
    questions: [DESLIGAMENTO, TEMPO],
    related: [["trabalhista", "verbas-rescisorias"], ["trabalhista", "insalubridade"]],
  }),

  servicePage("trabalhista", "insalubridade", {
    h1: "Insalubridade",
    grad: "Trabalho exposto a agentes nocivos.",
    lede: "Quando o adicional de insalubridade é devido, seus percentuais, o papel da perícia e dos equipamentos de proteção, e a diferença para periculosidade.",
    description: "Adicional de insalubridade: quando é devido, graus de 10%, 20% e 40%, perícia técnica, uso de EPI e diferença para o adicional de periculosidade.",
    topic: "adicional de insalubridade",
    facts: [
      { label: "Graus", text: "10%, 20% ou 40%, conforme o grau de exposição." },
      { label: "Perícia", text: "A caracterização depende de perícia técnica." },
      { label: "Periculosidade", text: "Adicional diferente, de 30%; em regra não se acumulam." },
    ],
    intro: {
      title: `Exposição acima dos limites <span class="grad">gera adicional.</span>`,
      paragraphs: [
        "O adicional de insalubridade é devido a quem trabalha exposto a agentes nocivos à saúde — químicos, físicos ou biológicos — acima dos limites previstos nas normas do Ministério do Trabalho (NR-15). O percentual varia conforme o grau: mínimo, médio ou máximo.",
        "Na Justiça, a caracterização depende de perícia técnica. O fornecimento e o uso correto de equipamentos de proteção podem neutralizar o agente e afastar o adicional — por isso é analisado se o EPI era adequado e efetivamente utilizado.",
      ],
    },
    situations: {
      title: `Exemplos <span class="grad">de exposição.</span>`,
      items: [
        { title: "Ruído", text: "Ambientes com ruído acima dos limites de tolerância." },
        { title: "Agentes químicos", text: "Contato com produtos de limpeza pesada, solventes e outros." },
        { title: "Agentes biológicos", text: "Contato com pacientes, materiais infectados ou lixo urbano." },
        { title: "Calor e frio", text: "Exposição a temperaturas extremas sem proteção adequada." },
      ],
    },
    callout: PRAZO,
    documents: [
      { title: "Do ambiente de trabalho", items: ["Descrição das atividades e dos produtos usados", "Fotos do local, se possível", "Fichas de entrega de EPI"] },
      { title: "Documentos da empresa", items: ["PPP (Perfil Profissiográfico Previdenciário)", "Contracheques", "Exames médicos ocupacionais"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre insalubridade.</span>`,
    faq: [
      ["O uso de EPI elimina o adicional?", "Se o equipamento neutraliza o agente e é fornecido, fiscalizado e efetivamente usado, o adicional pode deixar de ser devido. A perícia analisa cada caso."],
      ["Posso receber insalubridade e periculosidade juntas?", "Em regra, não: o trabalhador opta pelo adicional mais vantajoso."],
      ["O PPP serve para a aposentadoria?", "Sim. O PPP é o documento usado para comprovar atividade especial perante o INSS."],
    ],
    questions: [DESLIGAMENTO, { id: "agente", type: "select", label: "A que você é ou era exposto?", options: ["Ruído", "Produtos químicos", "Agentes biológicos", "Calor ou frio", "Não sei", "Outro"] }],
    related: [["trabalhista", "horas-extras"], ["trabalhista", "verbas-rescisorias"]],
  }),

  servicePage("trabalhista", "gestante", {
    h1: "Estabilidade da gestante",
    grad: "Garantia de emprego desde a confirmação da gravidez.",
    lede: "O período de estabilidade, o que acontece em caso de dispensa durante a gravidez e os direitos ligados à licença-maternidade.",
    description: "Estabilidade da gestante: garantia de emprego da confirmação da gravidez até cinco meses após o parto, dispensa durante a gestação e direitos envolvidos.",
    topic: "estabilidade da gestante",
    facts: [
      { label: "Período", text: "Da confirmação da gravidez até 5 meses após o parto." },
      { label: "Conhecimento", text: "Independe de o empregador saber da gravidez na dispensa." },
      { label: "Efeito", text: "Reintegração ao emprego ou indenização do período." },
    ],
    intro: {
      title: `A estabilidade protege <span class="grad">a gestante e o bebê.</span>`,
      paragraphs: [
        "A Constituição garante à empregada gestante estabilidade no emprego desde a confirmação da gravidez até cinco meses após o parto. Nesse período, ela não pode ser dispensada sem justa causa.",
        "A garantia vale mesmo que o empregador não soubesse da gravidez no momento da dispensa, e mesmo que a própria trabalhadora ainda não soubesse. Em caso de dispensa, pode ser pedida a reintegração ou a indenização correspondente ao período.",
      ],
      points: ["Segundo o TST, a estabilidade também se aplica ao contrato de experiência.", "O pedido de demissão da gestante costuma exigir assistência do sindicato para ter validade.", "A licença-maternidade é de 120 dias, podendo ser ampliada em empresas do Programa Empresa Cidadã."],
    },
    callout: {
      title: "Não deixe para depois do prazo.",
      paragraphs: ["A ação pode ser proposta mesmo após o fim do período de estabilidade, dentro do prazo de dois anos do fim do contrato. Agir enquanto a estabilidade está em curso, porém, permite discutir a reintegração."],
    },
    documents: [
      { title: "Da gravidez", items: ["Exame que confirma a gravidez, com data", "Certidão de nascimento, se o bebê já nasceu"] },
      { title: "Do contrato", items: ["Carteira de Trabalho e termo de rescisão", "Comunicados de dispensa", "Contracheques"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre estabilidade da gestante.</span>`,
    faq: [
      ["Fui dispensada e descobri a gravidez depois. Tenho direito?", "Sim. O que importa é a gravidez já existir na data da dispensa, ainda que ninguém soubesse."],
      ["A estabilidade vale no contrato de experiência?", "Segundo o entendimento do TST, sim."],
      ["Recebo os salários se não quiser voltar à empresa?", "É possível pedir a indenização do período de estabilidade em vez da reintegração, conforme o caso."],
    ],
    questions: [DESLIGAMENTO, { id: "gestacao", type: "select", label: "Qual a sua situação?", options: ["Estou grávida", "O bebê já nasceu", "Outro"] }],
    related: [["previdenciario", "salario-maternidade"], ["trabalhista", "verbas-rescisorias"]],
  }),
];
