// Landing pages de campanha publicadas no domínio principal (pastas na raiz do repositório,
// fora do build). Vieram dos subdomínios; entram no sitemap e no pacote de publicação.
// Cada pasta tem um .htaccess próprio que remove a CSP do site (as LPs usam GTM e scripts inline).
export const LANDING_PAGES = [
  { path: "/divorcio/", from: "divorcio.vieiraemarquesadvogados.com" },
  { path: "/divorcio-sao-paulo/", from: "divorcio-sp.vieiraemarquesadvogados.com" },
  { path: "/divorcio-boituva/", from: "divorcio-boituva.vieiraemarquesadvogados.com" },
  { path: "/divorcio-sem-filhos-sem-bens/", from: "divorcio-semfilhos.vieiraemarquesadvogados.com" },
  { path: "/juros-abusivos/", from: "juros-abusivos.vieiraemarquesadvogados.com" },
];
