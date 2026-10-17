import { servicePage } from "./factory.mjs";

const SAUDE_WARNING = "Envie somente os documentos médicos necessários para a análise inicial. Dados de saúde são tratados com sigilo.";
const PLANO = { id: "plano", type: "select", label: "Tipo de plano", options: ["Individual ou familiar", "Coletivo empresarial", "Coletivo por adesão", "Não sei"] };

export default [
  servicePage("saude", "defesa-profissionais", {
    h1: "Defesa de médicos e dentistas",
    grad: "Nas esferas ética, cível e criminal.",
    lede: "Atuação em sindicâncias e processos nos conselhos profissionais, ações de indenização e procedimentos criminais ligados à prática profissional.",
    description: "Defesa de médicos e dentistas em sindicâncias e processos ético-profissionais nos conselhos, ações de indenização e procedimentos criminais.",
    topic: "defesa de profissional da saúde",
    facts: [
      { label: "Esferas", text: "Conselho profissional, Justiça cível e Justiça criminal." },
      { label: "Prova central", text: "Prontuário completo e termo de consentimento." },
      { label: "Prevenção", text: "Documentação adequada reduz riscos." },
    ],
    intro: {
      title: `Uma mesma situação <span class="grad">pode gerar processos diferentes.</span>`,
      paragraphs: [
        "Uma reclamação de paciente pode gerar, ao mesmo tempo, sindicância ou processo ético no conselho profissional (CRM ou CRO), ação de indenização na Justiça cível e, em casos mais graves, investigação criminal. Cada esfera tem regras, prazos e consequências próprias.",
        "A defesa começa pela análise do prontuário, dos exames, do termo de consentimento informado e da comunicação com o paciente. A atuação preventiva — revisão de documentos e rotinas — também reduz riscos futuros.",
      ],
    },
    situations: {
      title: `Situações <span class="grad">de atuação.</span>`,
      items: [
        { title: "Sindicância no conselho", text: "Apuração preliminar a partir de denúncia de paciente ou instituição." },
        { title: "Processo ético-profissional", text: "Defesa técnica perante o CRM ou o CRO, até o julgamento." },
        { title: "Ação de indenização", text: "Pedidos de danos morais, materiais ou estéticos." },
        { title: "Orientação preventiva", text: "Revisão de prontuários, termos de consentimento e contratos." },
      ],
    },
    documents: [
      { title: "Do atendimento", items: ["Prontuário completo", "Termo de consentimento informado", "Exames, laudos e registros de comunicação com o paciente"] },
      { title: "Do procedimento", items: ["Notificação do conselho ou citação judicial", "Prazos indicados nos documentos recebidos"] },
    ],
    docWarning: SAUDE_WARNING,
    faqTitle: `Dúvidas comuns <span class="grad">de profissionais da saúde.</span>`,
    faq: [
      ["Recebi uma notificação do conselho. É grave?", "A sindicância é uma fase preliminar. Uma resposta técnica bem fundamentada, com o prontuário, é importante desde o início."],
      ["O médico responde por todo resultado ruim?", "Em regra, a responsabilidade do profissional depende de culpa — negligência, imprudência ou imperícia. A obrigação, na maioria dos casos, é de meio."],
      ["O termo de consentimento protege o profissional?", "Ele demonstra que o paciente foi informado sobre riscos e alternativas, mas não afasta a responsabilidade se houver falha na conduta."],
    ],
    questions: [{ id: "tipo", type: "select", label: "Qual a situação?", options: ["Sindicância ou processo no conselho", "Ação de indenização", "Investigação criminal", "Orientação preventiva", "Outro"] }],
    related: [["saude", "erro-medico"], ["criminal", "defesa-criminal"]],
  }),

  servicePage("saude", "reajuste-convenio", {
    h1: "Reajuste de plano de saúde",
    grad: "Entenda o que pode ser revisto.",
    lede: "Como funcionam os reajustes anuais e por faixa etária, as diferenças entre planos individuais e coletivos e quando o aumento pode ser questionado.",
    description: "Reajuste de plano de saúde anual, por idade ou sinistralidade: diferenças entre planos individuais e coletivos e quando o aumento pode ser questionado.",
    topic: "reajuste de plano de saúde",
    facts: [
      { label: "Individuais", text: "Reajuste anual limitado ao percentual autorizado pela ANS." },
      { label: "Coletivos", text: "Reajuste negociado, que deve ser justificado e transparente." },
      { label: "Faixa etária", text: "Deve seguir as regras da ANS e do contrato." },
    ],
    intro: {
      title: `Nem todo reajuste <span class="grad">segue a mesma regra.</span>`,
      paragraphs: [
        "Nos planos individuais e familiares, o reajuste anual é limitado ao percentual autorizado pela ANS. Nos planos coletivos — empresariais ou por adesão —, o reajuste é negociado entre a operadora e a contratante, sem teto fixo, mas deve ser justificado e não pode ser abusivo.",
        "O reajuste por faixa etária precisa estar previsto no contrato e seguir as normas da ANS. O Estatuto da Pessoa Idosa e a jurisprudência do STJ estabelecem limites para aumentos desproporcionais.",
      ],
    },
    situations: {
      title: `Quando vale <span class="grad">analisar o reajuste.</span>`,
      items: [
        { title: "Aumento muito acima da inflação", text: "Reajustes anuais elevados em planos coletivos, sem justificativa clara." },
        { title: "Mudança de faixa etária", text: "Aumentos expressivos ao completar determinadas idades." },
        { title: "Falso coletivo", text: "Plano coletivo com poucas vidas, usado como plano familiar." },
        { title: "Cobranças retroativas", text: "Valores cobrados de uma só vez, sem aviso adequado." },
      ],
    },
    documents: [
      { title: "Do contrato", items: ["Contrato ou proposta de adesão", "Carteirinha e dados do plano"] },
      { title: "Dos reajustes", items: ["Boletos ou faturas dos últimos anos", "Comunicados de reajuste recebidos"] },
    ],
    faqTitle: `Dúvidas comuns <span class="grad">sobre reajuste de plano.</span>`,
    faq: [
      ["O teto da ANS vale para o meu plano?", "O teto anual da ANS vale para planos individuais e familiares. Planos coletivos têm reajuste negociado, que também pode ser analisado."],
      ["Posso discutir reajustes antigos?", "Sim, dentro do prazo prescricional. A devolução de valores pagos a mais também tem prazo limitado."],
      ["Questionar o reajuste pode cancelar meu plano?", "Não. O plano não pode ser cancelado por causa de questionamento. O pagamento das mensalidades deve continuar."],
    ],
    questions: [PLANO, { id: "motivo", type: "select", label: "Tipo de reajuste", options: ["Anual", "Por faixa etária", "Não sei"] }],
    related: [["saude", "tratamento-medicamento"], ["saude", "pos-bariatrica"]],
  }),

  servicePage("saude", "erro-medico", {
    h1: "Erro médico ou odontológico",
    grad: "Como a responsabilidade é avaliada.",
    lede: "O que caracteriza o erro médico ou odontológico, a responsabilidade de profissionais e hospitais, os prazos e as provas necessárias.",
    description: "Erro médico ou odontológico: como a responsabilidade é analisada, o papel do prontuário e da perícia, prazos e indenização por dano moral, material e estético.",
    topic: "erro médico ou odontológico",
    facts: [
      { label: "Profissional", text: "Responde, em regra, quando há culpa comprovada." },
      { label: "Hospital", text: "Responde pelos serviços prestados pela instituição." },
      { label: "Prova", text: "Prontuário, exames e perícia técnica." },
    ],
    intro: {
      title: `Resultado ruim <span class="grad">nem sempre é erro.</span>`,
      paragraphs: [
        "Nem todo resultado indesejado decorre de erro: a medicina e a odontologia lidam com riscos. Há responsabilidade quando a conduta do profissional se afasta do esperado, por negligência, imprudência ou imperícia, e isso causa dano ao paciente.",
        "A análise começa pelo prontuário e pelos exames, e normalmente depende de perícia técnica. Em procedimentos estéticos, os tribunais costumam tratar a obrigação como de resultado, o que muda a forma de avaliar o caso.",
      ],
      points: ["O prontuário pertence ao paciente, que pode solicitar uma cópia.", "Podem ser pedidos danos materiais, morais e estéticos.", "O prazo para a ação de indenização é limitado."],
    },
    documents: [
      { title: "Do atendimento", items: ["Cópia do prontuário", "Exames, laudos e receitas", "Termo de consentimento, se houver"] },
      { title: "Das consequências", items: ["Relatórios de outros profissionais", "Comprovantes de despesas com tratamento", "Fotos, quando pertinentes"] },
    ],
    docWarning: SAUDE_WARNING,
    faqTitle: `Dúvidas comuns <span class="grad">sobre erro médico.</span>`,
    faq: [
      ["Como peço o prontuário?", "Por solicitação ao hospital, clínica ou profissional. O paciente tem direito à cópia do prontuário."],
      ["O hospital também pode ser responsabilizado?", "Sim, pelos serviços prestados pela instituição. Quanto aos atos do médico, a análise depende da comprovação de culpa."],
      ["Existe prazo para entrar com a ação?", "Sim. Nas relações de consumo, o prazo é de cinco anos a partir do conhecimento do dano e de sua autoria."],
    ],
    questions: [{ id: "tipo", type: "select", label: "Tipo de atendimento", options: ["Cirurgia", "Procedimento estético", "Tratamento odontológico", "Diagnóstico ou tratamento clínico", "Parto", "Outro"] }],
    formWarning: SAUDE_WARNING,
    related: [["saude", "defesa-profissionais"], ["saude", "tratamento-medicamento"]],
  }),

  servicePage("saude", "pos-bariatrica", {
    h1: "Cirurgia plástica pós-bariátrica",
    grad: "Quando a cirurgia reparadora deve ser coberta.",
    lede: "O entendimento do STJ sobre a cobertura das cirurgias reparadoras indicadas após a bariátrica e os documentos que sustentam o pedido.",
    description: "Cirurgia plástica pós-bariátrica: entendimento do STJ sobre a cobertura das cirurgias reparadoras pelo plano de saúde, documentos e negativas.",
    topic: "cirurgia plástica pós-bariátrica",
    facts: [
      { label: "STJ", text: "Cirurgias reparadoras indicadas pelo médico devem ser cobertas (Tema 1069)." },
      { label: "Natureza", text: "Reparadora ou funcional, e não meramente estética." },
      { label: "Prova", text: "Relatório médico detalhado." },
    ],
    intro: {
      title: `Reparar não é <span class="grad">o mesmo que embelezar.</span>`,
      paragraphs: [
        "Após a bariátrica, o excesso de pele pode causar infecções, dermatites, dores e limitações. Nesses casos, a cirurgia plástica tem caráter reparador ou funcional, como continuidade do tratamento da obesidade.",
        "O STJ firmou o entendimento (Tema 1069) de que o plano de saúde deve custear as cirurgias plásticas reparadoras ou funcionais indicadas pelo médico assistente, podendo a operadora instaurar junta médica em caso de dúvida justificada.",
      ],
    },
    documents: [
      { title: "Do tratamento", items: ["Relatório do médico assistente com a indicação e a finalidade da cirurgia", "Laudos sobre as consequências do excesso de pele", "Histórico da cirurgia bariátrica"] },
      { title: "Do plano", items: ["Negativa da operadora por escrito ou número de protocolo", "Contrato e carteirinha do plano"] },
    ],
    docWarning: SAUDE_WARNING,
    faqTitle: `Dúvidas comuns <span class="grad">sobre cirurgia pós-bariátrica.</span>`,
    faq: [
      ["O plano pode negar alegando que é estética?", "A negativa pode ser questionada quando o médico indica a cirurgia com finalidade reparadora ou funcional."],
      ["Quais cirurgias costumam ser discutidas?", "Dermolipectomia abdominal e outras cirurgias de retirada de excesso de pele, conforme indicação médica."],
      ["O que é a junta médica?", "É uma avaliação prevista nas normas da ANS para casos de divergência técnica entre o médico do paciente e a operadora."],
    ],
    questions: [PLANO, { id: "negativa", type: "choice", label: "O plano já negou o pedido?", options: ["Sim", "Não", "Ainda não pedi"] }],
    formWarning: SAUDE_WARNING,
    related: [["saude", "tratamento-medicamento"], ["saude", "reajuste-convenio"]],
  }),

  servicePage("saude", "tratamento-medicamento", {
    h1: "Tratamento ou medicamento negado",
    grad: "Pelo plano de saúde ou pelo SUS.",
    lede: "Como funcionam as coberturas do plano e do SUS, o rol da ANS, medicamentos de alto custo e o que fazer diante de uma negativa.",
    description: "Tratamento ou medicamento negado pelo plano de saúde ou pelo SUS: rol da ANS, medicamentos de alto custo, documentos e pedidos com urgência.",
    topic: "tratamento ou medicamento negado",
    facts: [
      { label: "Rol da ANS", text: "Referência de cobertura, com exceções previstas em lei." },
      { label: "SUS", text: "Fornecimento fora das listas segue critérios fixados pelo STF." },
      { label: "Urgência", text: "Pedidos podem ser feitos com pedido de liminar." },
    ],
    intro: {
      title: `A prescrição médica <span class="grad">é o ponto de partida.</span>`,
      paragraphs: [
        "Nos planos de saúde, o rol da ANS é a referência de cobertura. Desde a Lei 14.454/2022, tratamentos fora do rol podem ser cobertos quando há comprovação de eficácia e recomendação técnica, nos termos da lei.",
        "No SUS, o fornecimento de medicamentos não incorporados às listas oficiais segue critérios definidos pelo STF, como a comprovação da necessidade, a ausência de alternativa terapêutica disponível e a negativa administrativa prévia.",
      ],
      points: ["Peça sempre a negativa por escrito ou anote o protocolo.", "O relatório médico deve explicar por que aquele tratamento é necessário.", "Em casos urgentes, o pedido judicial pode incluir liminar."],
    },
    situations: {
      title: `Negativas <span class="grad">mais comuns.</span>`,
      items: [
        { title: "Medicamento de alto custo", text: "Remédios oncológicos, imunobiológicos e outros de valor elevado." },
        { title: "Tratamento fora do rol", text: "Terapias e procedimentos não listados pela ANS." },
        { title: "Terapias multidisciplinares", text: "Sessões de fonoaudiologia, psicologia e terapia ocupacional, por exemplo." },
        { title: "Home care e internação", text: "Atendimento domiciliar ou prorrogação de internação." },
      ],
    },
    documents: [
      { title: "Médicos", items: ["Relatório médico detalhado, com diagnóstico e justificativa", "Prescrição e exames recentes"] },
      { title: "Da negativa", items: ["Negativa por escrito ou número de protocolo", "Contrato do plano ou cartão do SUS", "Orçamentos, se houver"] },
    ],
    docWarning: SAUDE_WARNING,
    faqTitle: `Dúvidas comuns <span class="grad">sobre negativas de cobertura.</span>`,
    faq: [
      ["O plano pode negar porque o tratamento não está no rol?", "Não automaticamente. A lei prevê hipóteses de cobertura fora do rol, com comprovação técnica."],
      ["O SUS é obrigado a fornecer qualquer medicamento?", "Não. O fornecimento de medicamentos fora das listas oficiais segue critérios fixados pelo STF, analisados caso a caso."],
      ["Quanto tempo leva um pedido urgente?", "Pedidos com liminar podem ser analisados rapidamente pelo juiz, mas o tempo depende de cada caso."],
    ],
    questions: [{ id: "origem", type: "select", label: "Quem negou?", options: ["Plano de saúde", "SUS", "Ainda não pedi"] }, { id: "tipo", type: "select", label: "O que foi negado?", options: ["Medicamento", "Cirurgia ou procedimento", "Terapia", "Home care ou internação", "Outro"] }],
    formWarning: SAUDE_WARNING,
    related: [["saude", "pos-bariatrica"], ["saude", "reajuste-convenio"]],
  }),
];
