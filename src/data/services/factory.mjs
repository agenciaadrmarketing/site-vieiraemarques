// Modelo das páginas de serviço (guias informativos). As quatro primeiras páginas
// (divórcio, verbas, juros e Pix) têm planejamento próprio; as demais seguem esta
// estrutura comum: entenda, situações, como funciona, aviso, documentos e perguntas.
// Textos gerais e informativos, sem promessa de resultado (Provimento 205/2021 da OAB).

const PRIVACY_WARNING = "Envie apenas o necessário para a análise inicial. Não informe senhas nem dados bancários completos.";

export function servicePage(area, service, c) {
  return {
    area,
    service,
    seo: { title: `${c.h1} | Vieira & Marques`, description: c.description },
    hero: {
      h1: c.h1,
      grad: c.grad,
      lede: c.lede,
      secondary: { href: "#entenda", label: "Entenda o tema" },
      facts: c.facts,
    },
    blocks: [
      {
        type: "prose",
        id: "entenda",
        toc: "Entenda",
        eyebrow: "Entenda",
        title: c.intro.title,
        paragraphs: c.intro.paragraphs,
        points: c.intro.points,
      },
      c.situations && {
        type: "list",
        id: "situacoes",
        toc: c.situations.toc ?? "Situações comuns",
        tone: "muted",
        columns: c.situations.items.length > 3,
        eyebrow: c.situations.eyebrow ?? "Situações comuns",
        title: c.situations.title,
        intro: c.situations.intro,
        items: c.situations.items,
      },
      c.steps && {
        type: "timeline",
        id: "como-funciona",
        toc: "Como funciona",
        tone: "dark",
        eyebrow: "Como funciona",
        title: c.steps.title,
        intro: c.steps.intro,
        tracks: [{ steps: c.steps.items }],
        note: c.steps.note,
      },
      c.callout && {
        type: "callout",
        id: "importante",
        toc: c.callout.toc ?? "Importante",
        tone: "white",
        variant: c.callout.variant ?? "info",
        eyebrow: c.callout.eyebrow ?? "Importante",
        title: c.callout.title,
        paragraphs: c.callout.paragraphs,
      },
      {
        type: "documents",
        id: "documentos",
        toc: "Documentos",
        tone: "muted",
        eyebrow: "Documentos importantes",
        title: `O que reunir <span class="grad">para a análise.</span>`,
        groups: c.documents,
        note: "Se faltar algum documento, a análise começa com o que existir.",
        warning: c.docWarning,
      },
      {
        type: "faq",
        id: "perguntas",
        toc: "Perguntas frequentes",
        eyebrow: "Perguntas frequentes",
        title: c.faqTitle,
        items: c.faq,
      },
    ].filter(Boolean),
    related: { services: c.related ?? [] },
    whatsapp: { message: `Olá! Vim pelo site da Vieira & Marques e gostaria de orientação sobre ${c.topic}.` },
    form: {
      heading: c.formHeading ?? `Envie as informações <span class="grad">para análise inicial.</span>`,
      lead: c.formLead ?? "Com as respostas abaixo, a equipe de atendimento organiza o caso e o encaminha ao profissional responsável pela área.",
      points: ["Atendimento sigiloso", "Reunião presencial em Boituva ou Sorocaba, ou por vídeo", "Condições do trabalho combinadas por escrito, depois da análise"],
      questions: c.questions ?? [],
      message: { label: "Breve relato", placeholder: "Se quiser, conte em poucas linhas o que aconteceu.", required: false },
      warning: c.formWarning ?? PRIVACY_WARNING,
    },
  };
}
