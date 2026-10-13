// Dados institucionais confirmados (site antigo, sinalização do escritório e landing pages em produção).
// Qualquer valor ainda não confirmado fica como PENDING e nunca é renderizado como informação real.
export const PENDING = "[INFORMAÇÃO PENDENTE]";
export const isPending = (v) => v == null || v === "" || v === PENDING;

export const SITE = {
  name: "Vieira & Marques Sociedade de Advogados",
  shortName: "Vieira & Marques",
  origin: "https://vieiraemarquesadvogados.com",
  locale: "pt_BR",
  lang: "pt-BR",
  description:
    "Sociedade de advogados em Boituva e Sorocaba (SP), com atendimento presencial e online em todo o Brasil.",

  phone: { display: "(15) 3347-0189", href: "tel:+551533470189", e164: "+551533470189" },
  whatsapp: { number: "551533470189", display: "(15) 3347-0189" },
  email: "vieiraemarques.advogados@gmail.com",
  hours: "Segunda a sexta, das 8h às 18h",

  units: [
    {
      id: "boituva",
      label: "Sede — Boituva/SP",
      city: "Boituva",
      region: "SP",
      street: "Rua Benedita Sanson Labronici, 180",
      district: "Chácara Labronici",
      postalCode: "18556-048",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Vieira+e+Marques+Sociedade+de+Advogados+Rua+Benedita+Sanson+Labronici+180+Boituva+SP",
    },
    {
      id: "sorocaba",
      label: "Unidade Sorocaba/SP",
      city: "Sorocaba",
      region: "SP",
      street: PENDING,
      district: PENDING,
      postalCode: PENDING,
      mapsUrl: null,
    },
  ],

  social: [
    { label: "Instagram", url: "https://www.instagram.com/vieiraemarques.advogados/" },
    { label: "Facebook", url: "https://www.facebook.com/vieiraemarques.advogados" },
  ],

  // Artigos continuam publicados no WordPress atual. Trocar aqui quando o blog migrar
  // (ex.: https://blog.vieiraemarquesadvogados.com).
  blogBase: "https://vieiraemarquesadvogados.com",

  // URL /exec do Google Apps Script que grava leads na planilha e notifica por e-mail
  // (mesmo contrato usado nas landing pages). Vazio = o formulário encaminha pelo WhatsApp.
  leadEndpoint: "",

  oabNotice:
    "Conteúdo de caráter informativo, em conformidade com o Código de Ética e Disciplina da OAB e o Provimento nº 205/2021. Não há oferta de serviços, captação de clientela ou promessa de resultado. Cada caso é analisado individualmente.",
};

export const NAV = [
  { href: "/", label: "Início" },
  { href: "/escritorio/", label: "O Escritório" },
  { href: "/areas-de-atuacao/", label: "Áreas de Atuação" },
  { href: "/conhecimento/", label: "Base de Conhecimento" },
  { href: "/contato/", label: "Contato" },
];

export const whatsappUrl = (message) =>
  `https://wa.me/${SITE.whatsapp.number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
