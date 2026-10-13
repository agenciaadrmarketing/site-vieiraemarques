"""Gera as variantes responsivas (WebP) usadas pelo site e o manifesto lido pelo build.

Uso: python3 src/tools/images.py   (a partir da raiz do repositório)
"""
import json
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT_DIR = os.path.join(ROOT, "assets", "img")
MANIFEST = os.path.join(ROOT, "src", "data", "images.json")
INST = "uploads/imagens-institucional-vieira-marques-webp"

SOURCES = {
    "fachada": ("assets/fachada-escritorio-vieira-marques-boituva-otm.webp", [480, 800, 1228]),
    "recepcao": ("assets/recepcao-vieira-marques-advogados-otm.webp", [480, 800, 1228]),
    "sala-atendimento": ("assets/sala-de-atendimento-vieira-marques-otm.webp", [480, 800, 1228]),
    "sala-reuniao": ("assets/sala-reuniao-vieira-marques-boituva-otm.webp", [480, 800, 1228]),
    "estacao-trabalho": ("assets/estacao-trabalho-vieira-marques-otm.webp", [480, 800, 1228]),
    "letreiro": ("assets/letreiro-vm-vieira-marques-advogados-otm.webp", [480, 800, 1200]),
    "equipe": ("assets/equipe-vieira-marques-advogados-boituva-sp-otm.webp", [480, 800, 1228]),
    "atendimento-mesa": (f"{INST}/16.webp", [480, 800, 1228]),
    "mesa-trabalho": (f"{INST}/IMG_20231023_103912675_HDR-scaled-1.webp", [480, 800, 1200]),
    "escritorio-interno": (f"{INST}/IMG_20231023_103618894_HDR-scaled-1.webp", [480, 800, 1200, 1600]),
    "oscar-moreira-vieira": ("assets/oscar-moreira-vieira-advogado-boituva-otm.webp", [360, 600, 900]),
    "jislana-marques": ("assets/jislana-marques-advogada-vieira-marques-otm.webp", [360, 600]),
    "leticia-pereira-de-abreu": ("assets/leticia-pereira-de-abreu-advogada-otm.webp", [360, 600, 900]),
    "gledie-camargo": ("assets/gledie-camargo-advogada-otm.webp", [360, 600, 900]),
    "natalia-okumura": ("assets/natalia-okumura-advogada-otm.webp", [360, 600]),
}


def save_variants(name, src, widths):
    im = Image.open(os.path.join(ROOT, src))
    im.load()
    im = im.convert("RGB")
    variants = []
    for w in widths:
        w = min(w, im.width)
        h = round(im.height * w / im.width)
        out = f"{name}-{w}.webp"
        im.resize((w, h), Image.LANCZOS).save(os.path.join(OUT_DIR, out), "WEBP", quality=78, method=6)
        variants.append({"src": f"/assets/img/{out}", "w": w, "h": h})
    return {"width": im.width, "height": im.height, "variants": variants}


def logo_variants():
    im = Image.open(os.path.join(ROOT, "assets/vieira-marques-advogados-logo-otm.webp")).convert("RGBA")
    bbox = im.getbbox()
    im = im.crop(bbox)
    dark = im.copy()
    # versão clara para fundos escuros: inverte cor, preserva transparência
    r, g, b, a = im.split()
    light = Image.merge("RGBA", (*[c.point(lambda v: 255 - v) for c in (r, g, b)], a))
    out = {}
    for label, img in (("logo-escuro", dark), ("logo-claro", light)):
        path = f"{label}.webp"
        img.save(os.path.join(OUT_DIR, path), "WEBP", quality=90, method=6)
        out[label] = {"src": f"/assets/img/{path}", "w": img.width, "h": img.height}
    return out


def og_image():
    im = Image.open(os.path.join(ROOT, SOURCES["fachada"][0])).convert("RGB")
    target_ratio = 1200 / 630
    w, h = im.size
    new_h = round(w / target_ratio)
    top = max(0, (h - new_h) // 2)
    im = im.crop((0, top, w, top + new_h)).resize((1200, 630), Image.LANCZOS)
    im.save(os.path.join(OUT_DIR, "og-vieira-marques.jpg"), "JPEG", quality=82, optimize=True, progressive=True)
    return {"src": "/assets/img/og-vieira-marques.jpg", "w": 1200, "h": 630}


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    manifest = {name: save_variants(name, src, widths) for name, (src, widths) in SOURCES.items()}
    manifest.update(logo_variants())
    manifest["og"] = og_image()
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"{len(manifest)} imagens no manifesto")


if __name__ == "__main__":
    main()
