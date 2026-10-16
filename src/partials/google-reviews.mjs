import { SITE } from "../data/site.mjs";
import { GOOGLE_STATIC } from "../data/depoimentos.mjs";
import { esc, join } from "../lib/html.mjs";
import { icon } from "./icons.mjs";

// Avaliações do Google. O HTML já traz as avaliações publicadas anteriormente e o total informado
// pelo escritório (SITE.googleReviewsCount). Quando a API (/api/google-reviews.php, no servidor, com
// cache) estiver configurada, assets/js/reviews.js troca tudo pelos dados reais (nota, total e textos).
export const GOOGLE_REVIEWS_SCRIPT = "/assets/js/reviews.js";

const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();

export function googleReviews({ id = "avaliacoes", muted = false } = {}) {
  if (!SITE.googleReviews) return "";
  const count = SITE.googleReviewsCount;
  const link = SITE.units[0].mapsUrl;
  return `<div class="g-reviews__sentinel" data-reviews-sentinel aria-hidden="true"></div>
<section class="section ${muted ? "section--muted" : "section--white"} g-reviews" id="${id}" aria-labelledby="${id}-titulo" data-reviews data-endpoint="/api/google-reviews.php" data-state="static">
  <div class="container">
    <div class="g-reviews__head">
      <div class="stack-sm">
        <p class="eyebrow">Avaliações</p>
        <h2 class="h-section" id="${id}-titulo">O que dizem sobre <span class="grad">nosso atendimento.</span></h2>
        <p class="g-reviews__summary" data-reviews-summary><span class="g-reviews__stars" data-reviews-stars aria-hidden="true" hidden></span><strong data-reviews-rating hidden></strong><span data-reviews-count>${count ? `${count} avaliações no Google` : "Avaliações dos nossos clientes no Google"}</span></p>
      </div>
      <a class="btn btn--ghost" data-reviews-link href="${link}" target="_blank" rel="noopener noreferrer">Ver todas no Google ${icon.arrowUpRight(16)}</a>
    </div>
    <div class="g-reviews__carousel" data-reviews-carousel>
      <div class="g-reviews__track" data-reviews-track tabindex="0" role="region" aria-label="Avaliações de clientes no Google" aria-roledescription="carrossel">
        ${join(GOOGLE_STATIC, (r) => `<article class="g-review">
          <div class="g-review__top"><span class="g-review__src">Avaliação no Google</span></div>
          <p class="g-review__text">${esc(r.text)}</p>
          <button class="g-review__more" type="button" aria-expanded="false" hidden>Ler mais</button>
          <div class="g-review__who"><span class="g-review__ini" aria-hidden="true">${esc(initials(r.name))}</span><span class="g-review__meta"><strong class="g-review__name">${esc(r.name)}</strong></span></div>
        </article>`)}
      </div>
      <div class="g-reviews__controls" hidden>
        <button class="team-carousel__arrow" type="button" data-reviews-prev aria-label="Avaliações anteriores">${icon.arrow(16)}</button>
        <button class="team-carousel__arrow" type="button" data-reviews-next aria-label="Próximas avaliações">${icon.arrow(16)}</button>
      </div>
    </div>
    <p class="g-reviews__note">Avaliações publicadas por clientes no Google. O total informado é do Perfil da Empresa.</p>
  </div>
</section>`;
}
