// llms.txt (https://llmstxt.org): resumo do escritório em Markdown para assistentes de IA
// (ChatGPT, Claude, Perplexity, Gemini). Gerado dos mesmos dados das páginas, sem texto à parte:
// o que está aqui está publicado no site.
import { SITE, isPending } from "../data/site.mjs";
import { practiceAreas, areaUrl } from "../data/areas.mjs";
import { servicePages } from "../data/services/index.mjs";
import { team, profilePath } from "../data/team.mjs";
import { articles } from "../data/articles.mjs";
import { LEGAL_PATHS } from "../data/legal.mjs";
import { REGIONAL, CITIES_HUB, regionalPath } from "../data/regional.mjs";

const abs = (path) => SITE.origin + path;
const link = (label, path, text) => `- [${label}](${abs(path)})${text ? `: ${text}` : ""}`;

export function llmsTxt() {
  const sede = SITE.units[0];
  const areaNames = practiceAreas.map((a) => a.title.replace(/^Direito /, "")).join(", ");
  const lines = [
    `# ${SITE.name}`,
    "",
    `> Escritório de advocacia com sede em ${sede.city}/${sede.region}, atendimento presencial em Boituva e Sorocaba e online em São Paulo e todo o Brasil. Atua em Direito ${areaNames}.`,
    "",
    "Conteúdo informativo, em conformidade com o Código de Ética e Disciplina da OAB e o Provimento nº 205/2021: não há promessa de resultado e cada caso é analisado individualmente. O primeiro contato é feito com a equipe de atendimento, pelo WhatsApp ou telefone, que encaminha o caso ao profissional da área.",
    "",
    "## Contato e endereço",
    "",
    `- Sede: ${sede.street} — ${sede.district}, ${sede.city}/${sede.region}, CEP ${sede.postalCode}`,
    "- Atendimento presencial: Boituva e Sorocaba (SP), com horário combinado",
    "- Atendimento online: São Paulo e todo o Brasil, com reuniões por vídeo",
    `- Telefone e WhatsApp: ${SITE.phone.display}`,
    ...(isPending(SITE.email) ? [] : [`- E-mail: ${SITE.email}`]),
    ...(isPending(SITE.hours) ? [] : [`- Horário: ${SITE.hours}`]),
    `- CNPJ: ${SITE.cnpj}`,
    `- [Localização no Google Maps](${sede.mapsUrl})`,
    link("Página de contato", "/contato/"),
    "",
    "## Áreas de atuação",
    "",
    ...practiceAreas.map((a) => link(a.title, areaUrl(a), `${a.summary} Temas: ${a.services.map((s) => s.title).join(", ")}.`)),
    "",
    "## Guias por assunto",
    "",
    ...servicePages.map((p) => link(p.seo.title.replace(/ \| Vieira & Marques$/, ""), p.path, p.seo.description)),
    "",
    "## Cidades atendidas",
    "",
    link("Cidades atendidas em São Paulo", CITIES_HUB, "endereço físico somente na sede, em Boituva; presencial também em Sorocaba, com horário combinado; demais cidades por vídeo"),
    ...REGIONAL.map((c) => link(`Advogado em ${c.city}/SP`, regionalPath(c), c.description)),
    "",
    "## Equipe",
    "",
    ...team.map((p) => {
      const text = `${p.role}, ${p.oab}. ${p.summary}`;
      return p.hasProfile ? link(p.name, profilePath(p), text) : `- ${p.name}: ${text}`;
    }),
    "",
    "## Páginas institucionais",
    "",
    link("O Escritório", "/escritorio/", "história, princípios, estrutura e equipe"),
    link("Áreas de atuação", "/areas-de-atuacao/", "todas as áreas e serviços"),
    link("Base de Conhecimento", "/conhecimento/", "artigos, guias em PDF e perguntas frequentes"),
    link("Política de Privacidade", LEGAL_PATHS.privacy),
    link("Termos de Uso", LEGAL_PATHS.terms),
    "",
    "## Optional",
    "",
    ...articles.map((a) => `- [${a.title}](${a.url})`),
    "",
  ];
  return lines.join("\n");
}

// Robôs de busca e de IA. No domínio oficial todos podem ler o site; na homologação (novosite),
// os robôs de IA ficam de fora pelo robots.txt (eles não seguem o X-Robots-Tag do .htaccess).
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot", "Amazonbot", "meta-externalagent", "Bytespider"];
const PRIVATE = ["/src/", "/design/", "/api/"];

export function robotsTxt() {
  return [
    "User-agent: *",
    "Allow: /",
    ...PRIVATE.map((p) => `Disallow: ${p}`),
    "",
    "# Assistentes e buscadores de IA (ChatGPT, Claude, Perplexity, Gemini e outros) podem ler o site.",
    "# Resumo do escritório para IAs: /llms.txt",
    ...AI_BOTS.map((b) => `User-agent: ${b}`),
    "Allow: /",
    ...PRIVATE.map((p) => `Disallow: ${p}`),
    "",
    `Sitemap: ${SITE.origin}/sitemap.xml`,
    "",
  ].join("\n");
}

export function robotsStagingTxt() {
  return [
    "# Homologação (novosite): fora das IAs. Buscadores recebem noindex pelo .htaccess.",
    ...AI_BOTS.map((b) => `User-agent: ${b}`),
    "Disallow: /",
    "",
    "User-agent: *",
    "Allow: /",
    ...PRIVATE.map((p) => `Disallow: ${p}`),
    "",
  ].join("\n");
}
