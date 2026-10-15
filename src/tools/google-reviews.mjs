// Baixa as avaliações do Perfil da Empresa no Google (Places API) e grava
// src/data/google-reviews.json. Roda no seu computador, antes do build — o site publicado
// não chama o Google (nada de terceiros no navegador do visitante).
//
//   GOOGLE_PLACES_API_KEY=... GOOGLE_PLACE_ID=... node src/tools/google-reviews.mjs
//
// A API devolve até 5 avaliações (as mais relevantes) e a nota/total geral. Para exibir,
// defina SITE.googleReviews = true em src/data/site.mjs. Antes disso, valide com o
// escritório se a exibição de avaliações de clientes é compatível com o Provimento 205/2021.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const key = process.env.GOOGLE_PLACES_API_KEY, id = process.env.GOOGLE_PLACE_ID;
if (!key || !id) {
  process.stderr.write("Defina GOOGLE_PLACES_API_KEY e GOOGLE_PLACE_ID.\n");
  process.exit(1);
}
const res = await fetch(`https://places.googleapis.com/v1/places/${id}?languageCode=pt-BR`, {
  headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "displayName,rating,userRatingCount,googleMapsUri,reviews" },
});
if (!res.ok) { process.stderr.write(`Places API: ${res.status} ${await res.text()}\n`); process.exit(1); }
const p = await res.json();
const out = {
  fetchedAt: new Date().toISOString().slice(0, 10),
  rating: p.rating ?? null,
  count: p.userRatingCount ?? 0,
  url: p.googleMapsUri ?? "",
  reviews: (p.reviews ?? []).filter((r) => (r.rating ?? 0) >= 4 && (r.text?.text ?? r.originalText?.text)).map((r) => ({
    author: r.authorAttribution?.displayName ?? "Cliente",
    rating: r.rating,
    when: r.relativePublishTimeDescription ?? "",
    text: (r.text?.text ?? r.originalText?.text).trim(),
  })),
};
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), "../data/google-reviews.json"), JSON.stringify(out, null, 2) + "\n");
process.stdout.write(`${out.reviews.length} avaliações gravadas (nota ${out.rating}, ${out.count} no total).\n`);
