import { SITE } from "../data/site.mjs";
import { GOOGLE_STATIC } from "../data/depoimentos.mjs";
import { esc, join } from "../lib/html.mjs";

// Avaliações do Google (carrossel). O HTML já traz as avaliações publicadas e o total informado pelo
// escritório (SITE.googleReviewsCount). Quando a API (/api/google-reviews.php, no servidor, com cache)
// estiver configurada, assets/js/reviews.js troca tudo pelos dados reais (nota, total e textos).
export const GOOGLE_REVIEWS_SCRIPT = "/assets/js/reviews.js";

const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 1).map((p) => p[0]).join("").toUpperCase();
const G = '<svg class="gr-g" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.87z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.27a12 12 0 0 0 0 10.74l4-3.09z"/><path fill="#EA4335" d="M12 4.76c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.18 15.24 0 12 0A12 12 0 0 0 1.27 6.63l4 3.09C6.22 6.87 8.87 4.76 12 4.76z"/></svg>';
const STAR = '<svg viewBox="0 0 20 20" fill="#F9B601" aria-hidden="true"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z"/></svg>';
const stars = `<span class="gr-stars" role="img" aria-label="5 de 5 estrelas">${STAR.repeat(5)}</span>`;

export function googleReviews({ id = "avaliacoes", muted = false } = {}) {
  if (!SITE.googleReviews) return "";
  const count = SITE.googleReviewsCount;
  const link = SITE.units[0].mapsUrl;
  return `<div class="g-reviews__sentinel" data-reviews-sentinel aria-hidden="true"></div>
<section class="section ${muted ? "section--muted" : "section--white"} g-reviews" id="${id}" aria-labelledby="${id}-titulo" data-reviews data-endpoint="/api/google-reviews.php" data-state="static">
  <div class="container">
    <div class="g-reviews__head">
      <p class="g-reviews__pill">Depoimentos</p>
      <h2 class="h-section" id="${id}-titulo">O que dizem <span class="grad">nossos clientes.</span></h2>
      <p class="g-reviews__lead">Avaliações de clientes atendidos pelo escritório, publicadas no Google.</p>
      <div class="g-reviews__actions">
        <a class="g-reviews__btn" data-reviews-link href="${link}" target="_blank" rel="noopener noreferrer">${G}Ver avaliações no Google</a>
        <a class="g-reviews__write" href="${SITE.googleReviewUrl}" target="_blank" rel="noopener noreferrer">Já é cliente? Deixe sua avaliação</a>
      </div>
    </div>
    <div class="g-reviews__bar">
      <p class="g-reviews__summary" data-reviews-summary>${G}<strong class="g-reviews__label">Excelente</strong><span data-reviews-stars>${stars}</span><strong data-reviews-rating>5,0</strong><span class="g-reviews__count" data-reviews-count>${count ? `${count} avaliações no Google` : "Avaliações dos nossos clientes no Google"}</span></p>
      <a class="g-reviews__all" data-reviews-link href="${link}" target="_blank" rel="noopener noreferrer">Ver todas no Google</a>
    </div>
    <div class="g-reviews__carousel">
      <div class="g-reviews__track" data-reviews-track role="region" aria-label="Avaliações de clientes no Google" tabindex="0">
        ${join(GOOGLE_STATIC, (r) => `<figure class="g-review">
          <div class="g-review__who"><span class="g-review__ini" style="background:${r.color || "#5F6368"}" aria-hidden="true">${esc(initials(r.name))}</span><figcaption class="g-review__meta"><strong class="g-review__name">${esc(r.name)}</strong><span class="g-review__src">Avaliação no Google</span></figcaption>${G}</div>
          ${stars}
          <blockquote class="g-review__text">${esc(r.text)}</blockquote>
        </figure>`)}
      </div>
      <div class="g-reviews__ctrl" data-reviews-ctrl>
        <button class="g-reviews__arrow" type="button" data-dir="-1" aria-label="Avaliação anterior"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <div class="g-reviews__dots" data-reviews-dots></div>
        <span class="g-reviews__pos" data-reviews-pos aria-live="polite"></span>
        <button class="g-reviews__arrow" type="button" data-dir="1" aria-label="Próxima avaliação"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
    </div>
    <p class="g-reviews__note">Avaliações publicadas por clientes no Google. O total informado é do Perfil da Empresa.</p>
  </div>
</section>`;
}
