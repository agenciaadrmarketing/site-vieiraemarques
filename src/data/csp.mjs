import { SITE } from "./site.mjs";

// Content-Security-Policy do .htaccess, gerada no build a partir da configuração.
// Base: nenhum script de terceiros. Medição ativa (SITE.measurement) libera só os domínios
// necessários para o Google Analytics 4 e o Pixel da Meta.
export function cspHeader() {
  const { ga4, metaPixel } = SITE.measurement;
  const script = ["'self'"], img = ["'self'", "data:", "https://script.google.com", "https://script.googleusercontent.com"], connect = ["'self'", "https://script.google.com", "https://script.googleusercontent.com"];
  if (ga4) {
    script.push("https://www.googletagmanager.com");
    img.push("https://www.google-analytics.com", "https://www.googletagmanager.com");
    connect.push("https://*.google-analytics.com", "https://*.analytics.google.com", "https://www.googletagmanager.com");
  }
  if (metaPixel) {
    script.push("https://connect.facebook.net");
    img.push("https://www.facebook.com");
    connect.push("https://www.facebook.com", "https://connect.facebook.net");
  }
  return `default-src 'self'; script-src ${script.join(" ")}; style-src 'self' 'unsafe-inline'; img-src ${img.join(" ")}; connect-src ${connect.join(" ")}; font-src 'self'; form-action 'self'; frame-ancestors 'self'; base-uri 'self'; object-src 'none'`;
}
