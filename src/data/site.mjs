// Dados institucionais confirmados (site antigo, sinalização do escritório e landing pages em produção).
// Qualquer valor ainda não confirmado fica como PENDING e nunca é renderizado como informação real.
export const PENDING = "[INFORMAÇÃO PENDENTE]";
export const isPending = (v) => v == null || v === "" || v === PENDING;

export const SITE = {
  name: "Vieira & Marques Sociedade de Advogados",
  cnpj: "58.433.320/0001-15",
  shortName: "Vieira & Marques",
  origin: "https://vieiraemarquesadvogados.com",
  locale: "pt_BR",
  lang: "pt-BR",
  description:
    "Sociedade de advogados com sede em Boituva (SP), atendimento presencial em Boituva e Sorocaba e online em São Paulo e todo o Brasil.",

  phone: { display: "(15) 3347-0189", href: "tel:+551533470189", e164: "+551533470189" },
  whatsapp: { number: "551533470189", display: "(15) 3347-0189" },
  email: "vieiraemarques.advogados@gmail.com",
  // Horário de atendimento confirmado pelo escritório (vale para a equipe comercial).
  hours: "Segunda a sexta, das 8h às 18h",
  hoursSpec: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },

  // Endereço físico confirmado: somente a sede em Boituva. Sorocaba é região atendida;
  // só publicar uma "Unidade Sorocaba" depois de o escritório confirmar rua, número,
  // complemento, bairro, CEP e telefone.
  serviceRegion: "Sorocaba",
  units: [
    {
      id: "boituva",
      label: "Sede — Boituva/SP",
      city: "Boituva",
      region: "SP",
      street: "Rua Benedita Sanson Labronici, 180",
      district: "Chácara Labronici",
      postalCode: "18556-048",
      // Ficha oficial no Google Maps (CID informado pelo escritório) e coordenadas da ficha.
      mapsUrl: "https://www.google.com/maps?cid=14980209794321835232",
      geo: { latitude: -23.2886185, longitude: -47.6805114 },
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

  // Formulários de lead (Contato e páginas de serviço). Desativados: o contato é feito
  // direto pelo WhatsApp, com mensagem inicial própria de cada página. O código do
  // formulário permanece em src/partials/lead-form.mjs; para reativar, usar true.
  forms: false,

  // Medição e verificação (tudo vazio = desativado). Ao preencher:
  //   googleSiteVerification  código da meta tag do Google Search Console;
  //   ga4                     ID do Google Analytics 4 (ex.: "G-XXXXXXXXXX");
  //   metaPixel               ID do Pixel da Meta (somente números).
  // Com ga4 ou metaPixel, o build libera os domínios na CSP do .htaccess, a Política de
  // Privacidade passa a descrever as ferramentas e o site exibe o aviso de consentimento:
  // as tags só carregam depois que o visitante aceita.
  // Avaliações do Google via api/google-reviews.php (servidor, com cache). A seção só aparece se a API
  // estiver configurada no servidor (GOOGLE_PLACES_API_KEY e GOOGLE_PLACE_ID); sem isso, fica oculta.
  googleReviews: true,
  // Mapa "Como chegar" acima do rodapé: o Google Maps só é carregado quando o visitante clica.
  mapEmbed: true,
  // Total de avaliações no Google informado pelo escritório (conferir e atualizar). Enquanto a API
  // (api/google-reviews.php) não estiver configurada, este valor aparece escrito à mão; com a API
  // ativa, o número e a nota passam a vir do Google.
  googleReviewsCount: 180,
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJL36YRqjjxZQR4GRhe3Bl5M8", // mesmo link já usado na LP de Boituva; conferir o Place ID
  measurement: { googleSiteVerification: "", ga4: "", metaPixel: "" },

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

// Mensagens iniciais do WhatsApp: uma por página, serviço ou área.
const WA_HELLO = "Olá! Vim pelo site da Vieira & Marques";
export const waMessage = (subject) => (subject ? `${WA_HELLO} e gostaria de orientação sobre ${subject}.` : `${WA_HELLO} e gostaria de orientação.`);

export const whatsappUrl = (message) =>
  `https://wa.me/${SITE.whatsapp.number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
