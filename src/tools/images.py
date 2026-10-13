"""Gera as variantes responsivas (WebP) usadas pelo site e o manifesto lido pelo build.

Uso: python3 src/tools/images.py   (a partir da raiz do repositório)
"""
import json
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT_DIR = os.path.join(ROOT, "assets", "img")
MANIFEST = os.path.join(ROOT, "src", "data", "images.json")
# Originais ficam fora da área pública (src/ responde 404 no servidor).
SRC = "src/media/fotos"

# chave interna (usada em img("...")) -> (original, larguras, nome do arquivo publicado)
# Os nomes publicados descrevem a imagem para busca de imagens; a largura vai no sufixo.
SOURCES = {
    "fachada": (f"{SRC}/fachada-escritorio-vieira-marques-advogados-boituva.webp", [480, 800, 1228], "fachada-escritorio-vieira-marques-advogados-boituva-sp"),
    "recepcao": (f"{SRC}/recepcao-escritorio-vieira-marques-advogados.webp", [480, 800, 1228], "recepcao-escritorio-de-advocacia-vieira-marques"),
    "sala-atendimento": (f"{SRC}/sala-de-atendimento-vieira-marques-advogados.webp", [480, 800, 1228], "sala-de-atendimento-advogados-boituva"),
    "sala-reuniao": (f"{SRC}/sala-de-reuniao-vieira-marques-advogados.webp", [480, 800, 1228], "sala-de-reuniao-vieira-marques-advogados"),
    "estacao-trabalho": (f"{SRC}/estacao-de-trabalho-escritorio-vieira-marques.webp", [480, 800, 1228], "estacao-de-trabalho-escritorio-de-advocacia"),
    "letreiro": (f"{SRC}/letreiro-vieira-marques-sociedade-de-advogados.webp", [480, 800, 1200], "letreiro-vieira-marques-sociedade-de-advogados"),
    "equipe": (f"{SRC}/equipe-advogados-vieira-marques-boituva.webp", [480, 800, 1228], "equipe-de-advogados-vieira-marques-boituva"),
    "atendimento-mesa": (f"{SRC}/atendimento-juridico-vieira-marques.webp", [480, 800, 1228], "atendimento-juridico-vieira-marques-advogados"),
    "mesa-trabalho": (f"{SRC}/mesa-de-trabalho-escritorio-vieira-marques.webp", [480, 800, 1200], "mesa-de-trabalho-escritorio-de-advocacia-boituva"),
    "equipe-reuniao": (f"{SRC}/reuniao-equipe-vieira-marques-advogados.webp", [480, 800, 1228], "reuniao-equipe-vieira-marques-advogados"),
    "carteira-trabalho": (f"{SRC}/carteira-de-trabalho-ctps.webp", [360, 600], "carteira-de-trabalho-ctps-verbas-rescisorias"),
    "escritorio-interno": (f"{SRC}/escritorio-interno-vieira-marques-advogados.webp", [480, 800, 1200, 1600], "escritorio-de-advocacia-vieira-marques-boituva-sp"),
    "oscar-moreira-vieira": (f"{SRC}/oscar-moreira-vieira-advogado.webp", [360, 600, 900], "oscar-moreira-vieira-advogado"),
    "jislana-marques": (f"{SRC}/jislana-marques-advogada.webp", [360, 600], "jislana-marques-advogada"),
    "leticia-pereira-de-abreu": (f"{SRC}/leticia-pereira-de-abreu-advogada.webp", [360, 600, 900], "leticia-pereira-de-abreu-advogada"),
    "gledie-camargo": (f"{SRC}/gledie-camargo-advogada.webp", [360, 600, 900], "gledie-camargo-advogada"),
    "natalia-okumura": (f"{SRC}/natalia-okumura-advogada.webp", [360, 600], "natalia-okumura-advogada"),
}


def save_variants(src, widths, slug):
    im = Image.open(os.path.join(ROOT, src))
    im.load()
    im = im.convert("RGB")
    variants = []
    for w in widths:
        w = min(w, im.width)
        h = round(im.height * w / im.width)
        out = f"{slug}-{w}.webp"
        im.resize((w, h), Image.LANCZOS).save(os.path.join(OUT_DIR, out), "WEBP", quality=78, method=6)
        variants.append({"src": f"/assets/img/{out}", "w": w, "h": h})
    return {"width": im.width, "height": im.height, "variants": variants}


def logo_variants():
    im = Image.open(os.path.join(ROOT, f"{SRC}/logo-vieira-marques-advogados.webp")).convert("RGBA")
    bbox = im.getbbox()
    im = im.crop(bbox)
    dark = im.copy()
    # versão clara para fundos escuros: inverte cor, preserva transparência
    r, g, b, a = im.split()
    light = Image.merge("RGBA", (*[c.point(lambda v: 255 - v) for c in (r, g, b)], a))
    out = {}
    files = {"logo-escuro": "logo-vieira-marques-advogados-preto", "logo-claro": "logo-vieira-marques-advogados-branco"}
    for label, img in (("logo-escuro", dark), ("logo-claro", light)):
        # 400 px cobre o logo do cabeçalho em telas 2x; a versão cheia fica para 3x.
        variants = []
        for w in (400, img.width):
            h = round(img.height * w / img.width)
            path = f"{files[label]}-{w}.webp"
            img.resize((w, h), Image.LANCZOS).save(os.path.join(OUT_DIR, path), "WEBP", quality=90, method=6)
            variants.append({"src": f"/assets/img/{path}", "w": w, "h": h})
        out[label] = {"src": variants[0]["src"], "w": img.width, "h": img.height, "variants": variants}
    return out


def monogram_mask():
    """Monograma VM com fundo transparente (alfa = luminância), usado como máscara
    na tela de carregamento para animar a cor das letras."""
    from PIL import ImageOps
    im = Image.open(os.path.join(ROOT, f"{SRC}/monograma-vieira-marques.webp")).convert("L")
    alpha = ImageOps.autocontrast(im, cutoff=2)
    alpha = alpha.crop(alpha.point(lambda v: 255 if v > 40 else 0).getbbox())
    side = max(alpha.size)
    square = Image.new("L", (side, side), 0)
    square.paste(alpha, ((side - alpha.width) // 2, (side - alpha.height) // 2))
    square = square.resize((128, 128), Image.LANCZOS)
    out = Image.new("RGBA", (128, 128), (255, 255, 255, 0))
    out.putalpha(square)
    name = "monograma-vieira-marques-mascara.webp"
    out.save(os.path.join(OUT_DIR, name), "WEBP", lossless=True, method=6)
    return {"src": f"/assets/img/{name}", "w": 128, "h": 128}


def og_image():
    im = Image.open(os.path.join(ROOT, SOURCES["fachada"][0])).convert("RGB")
    target_ratio = 1200 / 630
    w, h = im.size
    new_h = round(w / target_ratio)
    top = max(0, (h - new_h) // 2)
    im = im.crop((0, top, w, top + new_h)).resize((1200, 630), Image.LANCZOS)
    # JPEG de propósito: prévias de link (WhatsApp, Facebook, LinkedIn) não aceitam WebP de forma confiável.
    name = "vieira-marques-advogados-boituva-sp.jpg"
    im.save(os.path.join(OUT_DIR, name), "JPEG", quality=82, optimize=True, progressive=True)
    return {"src": f"/assets/img/{name}", "w": 1200, "h": 630}


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    # Saída 100% gerada: limpa variantes antigas antes de gerar.
    for f in os.listdir(OUT_DIR):
        os.remove(os.path.join(OUT_DIR, f))
    manifest = {name: save_variants(src, widths, slug) for name, (src, widths, slug) in SOURCES.items()}
    manifest.update(logo_variants())
    manifest["og"] = og_image()
    manifest["monograma-mascara"] = monogram_mask()
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"{len(manifest)} imagens no manifesto")


if __name__ == "__main__":
    main()
