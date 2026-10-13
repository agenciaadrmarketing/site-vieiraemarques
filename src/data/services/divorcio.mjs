// Página temática (orgânica). A LP de campanha "Divórcio SP" e a LP "divórcio sem filhos"
// continuam na camada de campanhas; aqui o foco é entender o assunto, sem recorte geográfico.
export default {
  area: "familia",
  service: "divorcio",
  seo: {
    title: "Divórcio | Vieira & Marques",
    description:
      "Divórcio consensual, litigioso e em cartório: como funciona cada caminho e o que precisa ser definido sobre filhos, pensão e bens.",
  },
  hero: {
    h1: "Divórcio",
    lede: "Entenda os caminhos possíveis — com ou sem acordo, em cartório ou na Justiça — e o que precisa ser decidido sobre filhos, pensão e patrimônio.",
    cta: "Entender meu caso",
    secondary: { href: "#tipos", label: "Tipos de divórcio" },
    facts: [
      { label: "Motivo", text: "Não é preciso apresentar motivo nem cumprir tempo de separação." },
      { label: "Concordância", text: "A vontade de um dos cônjuges basta para o divórcio." },
      { label: "Cartório", text: "Possível quando há acordo e a lei admite a via extrajudicial." },
    ],
  },
  blocks: [
    {
      type: "prose",
      id: "entenda",
      toc: "O que o divórcio resolve",
      eyebrow: "Entenda",
      title: `O divórcio encerra o casamento. <span class="grad">As decisões que vêm junto definem os próximos anos.</span>`,
      paragraphs: [
        "Desde a Emenda Constitucional 66/2010, o divórcio não depende de separação prévia, de prazo mínimo nem de motivo. Basta a vontade de um dos cônjuges: se o outro não concordar, o divórcio é decretado da mesma forma e os pontos em discussão passam a ser decididos no processo.",
        "Por isso, na prática, a discussão raramente está no divórcio em si. Ela está no que o acompanha: a convivência com os filhos, a pensão, a divisão do patrimônio e a organização da vida de cada um depois da separação.",
        "Quem está separado de fato há anos continua casado para a lei. Sem o divórcio formal, não é possível casar de novo, e o patrimônio adquirido nesse período pode gerar discussão na partilha ou na sucessão.",
      ],
    },
    {
      type: "types",
      id: "tipos",
      toc: "Tipos de divórcio",
      tone: "muted",
      eyebrow: "Tipos de divórcio",
      title: `Três caminhos, <span class="grad">conforme o acordo e a situação dos filhos.</span>`,
      items: [
        {
          id: "divorcio-consensual",
          title: "Consensual",
          paragraphs: [
            "O casal concorda com o divórcio e com as condições: filhos, pensão, bens e uso do nome. O acordo pode ser formalizado em cartório, quando a lei permite, ou levado ao juiz para homologação.",
          ],
          points: ["Acordo sobre todos os pontos", "Um mesmo advogado pode assistir o casal quando não há conflito de interesses"],
        },
        {
          id: "divorcio-litigioso",
          title: "Litigioso",
          paragraphs: [
            "Falta acordo sobre o divórcio ou sobre algum ponto. O juiz decreta o divórcio e decide as questões em disputa depois de ouvir as partes e analisar as provas.",
          ],
          points: ["Cada parte com seu advogado", "Acordos continuam possíveis durante o processo, inclusive em audiência de conciliação"],
        },
        {
          id: "divorcio-extrajudicial",
          title: "Extrajudicial (em cartório)",
          paragraphs: [
            "Feito por escritura pública em Tabelionato de Notas, com advogado. Em regra, exige consenso total e ausência de filhos menores ou incapazes e de gravidez.",
          ],
          points: ["Pode ser realizado de forma eletrônica, pelo e-Notariado", "Normas recentes do CNJ admitem o cartório em situações específicas com filhos menores — a viabilidade é verificada caso a caso"],
        },
      ],
    },
    {
      type: "table",
      id: "cartorio-ou-justica",
      toc: "Cartório ou Justiça",
      eyebrow: "Comparação",
      title: `Cartório ou Justiça: <span class="grad">o que muda.</span>`,
      caption: "Comparação entre divórcio em cartório e divórcio judicial",
      columns: ["", "Em cartório", "Na Justiça"],
      rows: [
        ["Acordo entre o casal", "Necessário sobre todos os pontos", "Não é necessário"],
        ["Filhos menores ou incapazes", "Em regra, não pode haver", "Podem existir; o Ministério Público participa"],
        ["Advogado", "Obrigatório", "Obrigatório"],
        ["Forma", "Escritura pública", "Sentença ou homologação do acordo"],
        ["Tempo", "Em regra, mais curto", "Varia conforme o acordo, as provas e a pauta da vara"],
      ],
      note: "Quadro simplificado. A escolha do caminho depende da situação concreta, inclusive de normas do CNJ e da corregedoria do tribunal local.",
    },
    {
      type: "list",
      id: "questoes",
      toc: "O que acompanha o divórcio",
      tone: "muted",
      layout: "side",
      eyebrow: "Questões que podem acompanhar o divórcio",
      title: `Filhos, pensão, bens <span class="grad">e nome.</span>`,
      intro: "Cada ponto pode ser resolvido por acordo ou por decisão judicial — e nem todos precisam ser definidos ao mesmo tempo.",
      items: [
        {
          id: "filhos",
          title: "Filhos — e filhos menores",
          text: "São situações diferentes. Filhos maiores e capazes não impedem o divórcio em cartório. Havendo filhos menores ou incapazes, guarda, convivência e pensão precisam ser definidas com participação do Judiciário e do Ministério Público.",
        },
        {
          id: "guarda",
          title: "Guarda e convivência",
          text: "A guarda compartilhada é a regra quando ambos os pais estão aptos. Ela trata da divisão das decisões sobre a vida do filho — não significa, necessariamente, tempo de convivência dividido ao meio.",
          service: ["familia", "guarda"],
        },
        {
          id: "pensao",
          title: "Pensão alimentícia",
          text: "Para os filhos, é fixada conforme a necessidade de quem recebe e a capacidade de quem paga, e pode ser revista se a situação mudar. Entre ex-cônjuges é excepcional e, em geral, temporária.",
          service: ["familia", "pensao-alimenticia"],
        },
        {
          id: "partilha",
          title: "Partilha de bens",
          text: "Segue o regime de bens do casamento. Na comunhão parcial — o regime padrão —, divide-se o que foi adquirido de forma onerosa durante o casamento; dívidas também entram na conta. A partilha pode ser feita depois do divórcio.",
        },
        {
          id: "nome",
          title: "Sobrenome",
          text: "Quem adotou o sobrenome do outro cônjuge pode mantê-lo ou voltar a usar o nome anterior, conforme o caso.",
        },
      ],
    },
    {
      type: "timeline",
      id: "como-funciona",
      toc: "Como funciona",
      tone: "dark",
      eyebrow: "Como funciona",
      title: `Com acordo <span class="grad">ou sem acordo.</span>`,
      intro: "As etapas mudam conforme exista consenso. Em muitos casos, o divórcio é decretado logo e os demais pontos seguem em discussão.",
      tracks: [
        {
          title: "Divórcio com acordo",
          steps: [
            { title: "Conversa inicial", text: "Entendimento da situação, dos filhos, do patrimônio e do que já foi combinado." },
            { title: "Redação do acordo", text: "Guarda, convivência, pensão, partilha e nome definidos por escrito." },
            { title: "Formalização", text: "Escritura em cartório ou petição de homologação ao juiz, conforme o caso." },
            { title: "Averbação", text: "Registro do divórcio na certidão de casamento e, se houver, da partilha nos bens." },
          ],
        },
        {
          title: "Divórcio sem acordo",
          steps: [
            { title: "Análise da situação", text: "Levantamento de documentos, provas e pontos em disputa." },
            { title: "Ação de divórcio", text: "Com pedidos urgentes quando cabíveis, como alimentos e guarda provisórios." },
            { title: "Conciliação ou mediação", text: "Tentativa de acordo, total ou parcial, em audiência." },
            { title: "Decisão e averbação", text: "O juiz decide os pontos em disputa; a sentença é registrada." },
          ],
        },
      ],
    },
    {
      type: "documents",
      id: "documentos",
      toc: "Documentos",
      eyebrow: "Documentação",
      title: `O que costuma ser <span class="grad">necessário.</span>`,
      intro: "Para a primeira conversa não é preciso ter tudo. A lista abaixo é organizada ao longo do atendimento.",
      groups: [
        { title: "Do casal", items: ["Certidão de casamento atualizada", "Documento de identidade e CPF", "Comprovante de endereço", "Pacto antenupcial, se houver"] },
        { title: "Dos filhos", items: ["Certidões de nascimento", "Comprovantes de despesas com escola, saúde e atividades"] },
        { title: "Do patrimônio e da renda", items: ["Matrículas de imóveis e documentos de veículos", "Contratos de financiamento e extratos", "Contrato social de empresa, se houver", "Comprovantes de renda e declaração de imposto de renda"] },
      ],
    },
    {
      type: "faq",
      id: "perguntas",
      toc: "Perguntas frequentes",
      tone: "muted",
      eyebrow: "Perguntas frequentes",
      title: `Dúvidas comuns <span class="grad">sobre divórcio.</span>`,
      items: [
        ["Preciso de um motivo para me divorciar?", "Não. Desde a Emenda Constitucional 66/2010, a lei não exige motivo, culpa ou tempo mínimo de separação. A vontade de um dos cônjuges é suficiente."],
        ["O outro cônjuge pode impedir o divórcio?", "Não. A recusa transforma o processo em litigioso: o divórcio é decretado, e partilha, guarda e pensão passam a ser decididas pelo juiz se não houver acordo."],
        ["Estamos separados de fato há anos. Ainda preciso me divorciar?", "Sim. Sem o divórcio formal, a pessoa continua casada para todos os efeitos legais, inclusive para casar novamente e para questões patrimoniais e sucessórias. A data da separação de fato ajuda a delimitar a partilha."],
        ["A partilha precisa ser feita junto com o divórcio?", "Não. A lei permite o divórcio sem partilha prévia. Os bens podem ser divididos depois, por acordo ou em ação própria — o que exige atenção ao regime de bens e ao período de aquisição."],
        ["Um advogado pode atender os dois?", "No divórcio consensual, sim, quando não há conflito de interesses. Se surgir divergência real, cada parte deve ter o seu advogado — é uma exigência ética."],
        ["Quanto tempo leva um divórcio?", "Depende do caminho. Em cartório, o prazo costuma ser menor, porque depende do consenso e da documentação. Na Justiça, varia com a existência de acordo, a complexidade da partilha, a necessidade de provas e a pauta da vara."],
      ],
    },
  ],
  trust: {
    image: "equipe-reuniao",
    title: "Atuação em Família e Sucessões, com atenção aos filhos e ao patrimônio.",
    person: "oscar-moreira-vieira",
  },
  related: {
    services: [["familia", "pensao-alimenticia"], ["familia", "guarda"], ["familia", "uniao-estavel"], ["sucessorio", "inventario"]],
    articleAreas: ["familia"],
    faqArea: "familia",
  },
  // Mensagem inicial dos botões de WhatsApp desta página.
  whatsapp: { message: "Olá! Vim pelo site da Vieira & Marques e gostaria de orientação sobre divórcio." },
  form: {
    heading: `Conte a situação. <span class="grad">A análise começa pelos fatos.</span>`,
    lead: "Não é preciso ter tudo decidido. As respostas abaixo ajudam o advogado a entender o cenário antes da primeira conversa.",
    points: ["Atendimento sigiloso", "Reunião presencial em Boituva ou por vídeo", "Condições do trabalho combinadas por escrito, depois da análise"],
    questions: [
      { id: "acordo", type: "choice", label: "Existe acordo sobre o divórcio?", options: ["Sim", "Em parte", "Não", "Ainda não conversamos"] },
      { id: "filhos", type: "choice", label: "Existem filhos do casal?", options: ["Sim", "Não"] },
      { id: "filhos_menores", type: "choice", label: "Algum filho é menor de idade ou incapaz?", options: ["Sim", "Não"], showIf: { filhos: "Sim" } },
      { id: "bens", type: "choice", label: "Existem bens para partilhar?", options: ["Sim", "Não", "Não sei"] },
    ],
    message: { label: "Breve descrição", placeholder: "Se quiser, conte em poucas linhas o que está acontecendo.", required: false },
  },
};
