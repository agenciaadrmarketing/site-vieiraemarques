import { SITE } from "../data/site.mjs";
import { team } from "../data/team.mjs";
import { esc } from "../lib/html.mjs";
import { icon } from "./icons.mjs";

// Faixa logo abaixo das heros: nota e total de avaliações no Google + inscrição na OAB.
// Sem frases comparativas ("a melhor", "nº 1"): o Provimento 205/2021 da OAB veda autoengrandecimento
// e comparação. A nota e o total são os mesmos da seção de avaliações (SITE.googleReviewsCount).
const G = '<svg class="trust__g" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.87z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.27a12 12 0 0 0 0 10.74l4-3.09z"/><path fill="#EA4335" d="M12 4.76c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.18 15.24 0 12 0A12 12 0 0 0 1.27 6.63l4 3.09C6.22 6.87 8.87 4.76 12 4.76z"/></svg>';
const STAR = '<svg viewBox="0 0 20 20" width="18" height="18" fill="#F9B601" aria-hidden="true"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z"/></svg>';

// person: integrante cuja inscrição aparece (padrão: sócio fundador).
export function trustBar({ person = team[0] } = {}) {
  if (!SITE.googleReviews) return "";
  const count = SITE.googleReviewsCount;
  const link = SITE.units[0].mapsUrl;
  return `<section class="trust" aria-label="Avaliações no Google e inscrição na OAB">
  <div class="container">
    <ul class="trust__list">
      <li class="trust__item trust__item--rating">
        <strong class="trust__score">5,0</strong>
        <span class="trust__body"><span class="trust__stars" role="img" aria-label="Nota 5 de 5 no Google">${STAR.repeat(5)}</span><span class="trust__sub">Nota máxima no Google</span></span>
      </li>
      <li class="trust__item">
        <a class="trust__link" href="${esc(link)}" target="_blank" rel="noopener noreferrer">${G}<span class="trust__body"><strong class="trust__title">${count ? `${count} clientes avaliaram o escritório` : "Avaliações de clientes"}</strong><span class="trust__sub">Ler as avaliações no Google <span aria-hidden="true">↗</span></span></span></a>
      </li>
      <li class="trust__item">
        <span class="trust__icon">${icon.shield(22)}</span>
        <span class="trust__body"><strong class="trust__title">${esc(person.oab.replace("OAB/SP ", "OAB/SP nº "))}</strong><span class="trust__sub">${esc(person.name)} · ${esc(person.role.toLowerCase())}</span></span>
      </li>
    </ul>
  </div>
</section>`;
}
