import { SITE } from "../data/site.mjs";
import { icon } from "./icons.mjs";

// Avaliações reais do Google, carregadas depois da página por assets/js/reviews.js a partir de
// /api/google-reviews.php (servidor, com cache). A seção nasce oculta e só aparece se a API
// responder com avaliações (ou, em caso de falha, com o link para o Google). Nada é fixo no HTML.
export const GOOGLE_REVIEWS_SCRIPT = "/assets/js/reviews.js";

export function googleReviews({ id = "avaliacoes", muted = true } = {}) {
  if (!SITE.googleReviews) return "";
  return `<div class="g-reviews__sentinel" data-reviews-sentinel aria-hidden="true"></div>
<section class="section ${muted ? "section--muted" : "section--white"} g-reviews" id="${id}" aria-labelledby="${id}-titulo" data-reviews data-endpoint="/api/google-reviews.php" data-state="idle" hidden>
  <div class="container">
    <div class="g-reviews__head">
      <div class="stack-sm">
        <p class="eyebrow">Avaliações</p>
        <h2 class="h-section" id="${id}-titulo">O que dizem sobre <span class="grad">nosso atendimento.</span></h2>
        <p class="g-reviews__summary" data-reviews-summary hidden><span class="g-reviews__stars" data-reviews-stars aria-hidden="true"></span><strong data-reviews-rating></strong><span data-reviews-count></span></p>
        <p class="g-reviews__fallback lead" data-reviews-fallback hidden>Avaliações dos nossos clientes no Google.</p>
      </div>
      <a class="btn btn--ghost" data-reviews-link href="#" target="_blank" rel="noopener noreferrer" hidden>Ver todas no Google ${icon.arrowUpRight(16)}</a>
    </div>
    <div class="g-reviews__carousel" data-reviews-carousel hidden>
      <div class="g-reviews__track" data-reviews-track tabindex="0" role="region" aria-label="Avaliações de clientes no Google" aria-roledescription="carrossel"></div>
      <div class="g-reviews__controls">
        <button class="team-carousel__arrow" type="button" data-reviews-prev aria-label="Avaliações anteriores">${icon.arrow(16)}</button>
        <button class="team-carousel__arrow" type="button" data-reviews-next aria-label="Próximas avaliações">${icon.arrow(16)}</button>
      </div>
    </div>
    <p class="g-reviews__note">Avaliações publicadas por clientes no Google, exibidas como recebidas. Ordem definida pelo Google.</p>
  </div>
</section>`;
}
