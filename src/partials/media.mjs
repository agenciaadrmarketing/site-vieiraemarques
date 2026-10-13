import { attrs, esc } from "../lib/html.mjs";
import images from "../data/images.json" with { type: "json" };

// <img> responsivo a partir do manifesto gerado por src/tools/images.py.
// priority: true para o elemento LCP (sem lazy, fetchpriority alto).
export function img(name, { alt, sizes = "100vw", priority = false, className, style } = {}) {
  const entry = images[name];
  if (!entry) throw new Error(`Imagem desconhecida no manifesto: ${name}`);
  if (alt == null) throw new Error(`alt obrigatório para a imagem ${name}`);
  const largest = entry.variants[entry.variants.length - 1];
  const fallback = entry.variants.find((v) => v.w >= 800) ?? largest;
  return `<img${attrs({
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
}

export const imgPreload = (name, sizes = "100vw") => {
  const entry = images[name];
  return {
    href: entry.variants.find((v) => v.w >= 800)?.src ?? entry.variants[0].src,
    imagesrcset: entry.variants.map((v) => `${v.src} ${v.w}w`).join(", "),
    imagesizes: sizes,
    fetchpriority: "high",
  };
};

export function logo(variant, width) {
  const entry = images[`logo-${variant}`];
  const height = Math.round((entry.h * width) / entry.w);
  const srcset = entry.variants ? ` srcset="${entry.variants.map((v) => `${v.src} ${v.w}w`).join(", ")}" sizes="${width}px"` : "";
  return `<img src="${entry.src}"${srcset} width="${width}" height="${height}" alt="${esc("Vieira & Marques Sociedade de Advogados")}" decoding="async">`;
}
