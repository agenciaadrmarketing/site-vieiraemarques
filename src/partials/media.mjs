import { attrs, esc } from "../lib/html.mjs";
import images from "../data/images.json" with { type: "json" };

const srcset = (entry, key = "src") => entry.variants.map((v) => `${v[key]} ${v.w}w`).join(", ");
const hasAvif = (entry) => entry.variants.every((v) => v.avif);

// <source> AVIF (e, com media, WebP) de uma imagem do manifesto — usado nos <picture> com recorte próprio
// para celular (hero). O navegador escolhe o primeiro formato que suporta: AVIF (~30% menor) ou WebP.
export function imgSources(name, { sizes = "100vw", media } = {}) {
  const entry = images[name];
  const m = media ? ` media="${media}"` : "";
  const last = entry.variants.at(-1);
  const dims = ` width="${last.w}" height="${last.h}"`;
  return (hasAvif(entry) ? `<source type="image/avif"${m} srcset="${srcset(entry, "avif")}" sizes="${sizes}"${dims}>` : "") +
    (media ? `<source type="image/webp"${m} srcset="${srcset(entry)}" sizes="${sizes}"${dims}>` : "");
}

// Imagem responsiva a partir do manifesto gerado por src/tools/images.py: <picture> com AVIF e o <img>
// WebP como reserva. priority: true para o elemento LCP (sem lazy, fetchpriority alto).
// picture: false devolve só o <img> (para quem monta o próprio <picture>).
export function img(name, { alt, sizes = "100vw", priority = false, className, style, picture = true } = {}) {
  const entry = images[name];
  if (!entry) throw new Error(`Imagem desconhecida no manifesto: ${name}`);
  if (alt == null) throw new Error(`alt obrigatório para a imagem ${name}`);
  const largest = entry.variants[entry.variants.length - 1];
  const fallback = entry.variants.find((v) => v.w >= 800) ?? largest;
  const tag = `<img${attrs({
    src: fallback.src,
    srcset: entry.variants.map((v) => `${v.src} ${v.w}w`).join(", "),
    sizes,
    width: largest.w,
    height: largest.h,
    alt,
    loading: priority ? "eager" : "lazy",
    decoding: priority ? "sync" : "async",
    fetchpriority: priority ? "high" : null,
    class: className,
    style,
  })}>`;
  return picture && hasAvif(entry) ? `<picture>${imgSources(name, { sizes })}${tag}</picture>` : tag;
}

// Pré-carregamento da imagem LCP no mesmo formato que o <picture> vai escolher (AVIF), para não baixar
// a imagem duas vezes; navegadores sem AVIF ignoram o preload (type) e usam o WebP do <img>.
export const imgPreload = (name, sizes = "100vw") => {
  const entry = images[name];
  const avif = hasAvif(entry);
  return {
    href: entry.variants.find((v) => v.w >= 800)?.[avif ? "avif" : "src"] ?? entry.variants[0][avif ? "avif" : "src"],
    imagesrcset: srcset(entry, avif ? "avif" : "src"),
    imagesizes: sizes,
    type: avif ? "image/avif" : null,
    fetchpriority: "high",
  };
};

export function logo(variant, width) {
  const entry = images[`logo-${variant}`];
  const height = Math.round((entry.h * width) / entry.w);
  const srcset = entry.variants ? ` srcset="${entry.variants.map((v) => `${v.src} ${v.w}w`).join(", ")}" sizes="${width}px"` : "";
  return `<img src="${entry.src}"${srcset} width="${width}" height="${height}" alt="${esc("Vieira & Marques Sociedade de Advogados")}" decoding="async">`;
}
