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
    "fachada": (f"{SRC}/fachada-escritorio-vieira-marques-advogados-boituva.webp", [480, 800, 1228, 1672], "fachada-escritorio-vieira-marques-advogados-boituva-sp"),
    "recepcao": (f"{SRC}/recepcao-escritorio-vieira-marques-advogados.webp", [480, 800, 1228, 1672], "recepcao-escritorio-de-advocacia-vieira-marques-v2"),
    "sala-atendimento": (f"{SRC}/sala-de-atendimento-vieira-marques-advogados.webp", [480, 800, 1228, 1672], "sala-de-atendimento-advogados-boituva-v3"),
    "sala-reuniao": (f"{SRC}/sala-de-reuniao-vieira-marques-advogados.webp", [480, 800, 1228, 1672], "sala-de-reuniao-vieira-marques-advogados-v3"),
    "estacao-trabalho": (f"{SRC}/estacao-de-trabalho-escritorio-vieira-marques.webp", [480, 800, 1228, 1672], "estacao-de-trabalho-escritorio-de-advocacia-v2"),
    "letreiro": (f"{SRC}/letreiro-vieira-marques-sociedade-de-advogados.webp", [480, 800, 1200], "letreiro-vieira-marques-sociedade-de-advogados-v2"),
    "equipe": (f"{SRC}/equipe-advogados-vieira-marques-boituva.webp", [480, 800, 1228, 1672], "equipe-de-advogados-vieira-marques-boituva-v2"),
    "atendimento-mesa": (f"{SRC}/atendimento-juridico-vieira-marques.webp", [480, 800, 1228, 1672], "atendimento-juridico-vieira-marques-advogados-v3"),
    "mesa-trabalho": (f"{SRC}/mesa-de-trabalho-escritorio-vieira-marques.webp", [480, 800, 1200], "mesa-de-trabalho-escritorio-de-advocacia-boituva-v2"),
    "equipe-reuniao": (f"{SRC}/reuniao-equipe-vieira-marques-advogados.webp", [480, 800, 1228, 1672], "reuniao-equipe-vieira-marques-advogados-v2"),
    "carteira-trabalho": (f"{SRC}/carteira-de-trabalho-ctps.webp", [360, 600], "carteira-de-trabalho-ctps-verbas-rescisorias"),
    "escritorio-interno": (f"{SRC}/escritorio-interno-vieira-marques-advogados.webp", [480, 800, 1200, 1600, 1672], "escritorio-de-advocacia-vieira-marques-boituva-sp-v3"),
    "oscar-moreira-vieira": (f"{SRC}/oscar-moreira-vieira-advogado.webp", [360, 600, 900], "oscar-moreira-vieira-advogado-v2"),
    "jislana-marques": (f"{SRC}/jislana-marques-advogada.webp", [360, 600, 706], "jislana-marques-advogada-v2"),
    "leticia-pereira-de-abreu": (f"{SRC}/leticia-pereira-de-abreu-advogada.webp", [360, 600, 900], "leticia-pereira-de-abreu-advogada-v2"),
    "gledie-camargo": (f"{SRC}/gledie-camargo-advogada.webp", [360, 600, 900], "gledie-camargo-advogada-v2"),
    "natalia-okumura": (f"{SRC}/natalia-okumura-advogada.webp", [360, 600, 940], "natalia-okumura-advogada-v3"),
    "hero-trabalhista": (f"{SRC}/tema-trabalhista-carteira-de-trabalho.webp", [480, 800, 1280, 1920], "advogado-direito-do-trabalho-carteira-de-trabalho-boituva"),
    "textura-trabalhista": (f"{SRC}/tema-trabalhista-livros-e-ctps.webp", [640], "direito-do-trabalho-livros-ctps"),
    "textura-trabalhista-2": (f"{SRC}/tema-trabalhista-balanca-e-relogio.webp", [640], "direito-do-trabalho-balanca-relogio"),
    "hero-bancario": (f"{SRC}/tema-bancario-contrato-de-financiamento.webp", [480, 800, 1280, 1672], "advogado-direito-bancario-revisao-financiamento-boituva"),
    "tema-pix": (f"{SRC}/tema-bancario-golpe-do-pix.webp", [480, 800, 1280], "advogado-golpe-do-pix-boituva"),
    "hero-familia": (f"{SRC}/tema-familia-divorcio-acordo-partilha-guarda.webp", [480, 800, 1280, 1920], "advogado-divorcio-acordo-partilha-guarda-boituva"),
    "tema-familia-consulta": (f"{SRC}/tema-familia-atendimento-casal.webp", [480, 800, 1400], "advogado-direito-de-familia-atendimento"),
    "tema-familia-aliancas": (f"{SRC}/tema-familia-aliancas.webp", [480, 800, 1400], "divorcio-pensao-alimenticia-guarda-aliancas"),
    "area-familia-wide": (f"{SRC}/area-familia-panoramica.webp", [768, 1152, 1536], "advogado-direito-de-familia-boituva"),
    "area-familia-tall": (f"{SRC}/area-familia-vertical.webp", [384, 768], "advogado-direito-de-familia-boituva-sp"),
    "area-sucessorio-wide": (f"{SRC}/area-sucessorio-panoramica.webp", [768, 1152, 1536], "advogado-direito-sucessorio-heranca-inventario-boituva"),
    "area-sucessorio-tall": (f"{SRC}/area-sucessorio-vertical.webp", [384, 768], "advogado-direito-sucessorio-heranca-inventario-boituva-sp"),
    "area-trabalhista-wide": (f"{SRC}/area-trabalhista-panoramica.webp", [768, 1152, 1536], "advogado-direito-trabalhista-boituva"),
    "area-trabalhista-tall": (f"{SRC}/area-trabalhista-vertical.webp", [384, 768], "advogado-direito-trabalhista-boituva-sp"),
    "area-criminal-wide": (f"{SRC}/area-criminal-panoramica.webp", [768, 1152, 1536], "advogado-direito-criminal-defesa-boituva"),
    "area-criminal-tall": (f"{SRC}/area-criminal-vertical.webp", [384, 768], "advogado-direito-criminal-defesa-boituva-sp"),
    "area-saude-wide": (f"{SRC}/area-saude-panoramica.webp", [768, 1152, 1536], "advogado-direito-medico-saude-plano-de-saude-boituva"),
    "area-saude-tall": (f"{SRC}/area-saude-vertical.webp", [384, 768], "advogado-direito-medico-saude-plano-de-saude-boituva-sp"),
    "area-bancario-wide": (f"{SRC}/area-bancario-panoramica.webp", [768, 1152, 1536], "advogado-direito-bancario-financiamento-boituva"),
    "area-bancario-tall": (f"{SRC}/area-bancario-vertical.webp", [384, 768], "advogado-direito-bancario-financiamento-boituva-sp"),
    "area-imobiliario-wide": (f"{SRC}/area-imobiliario-panoramica.webp", [768, 1152, 1536], "advogado-direito-imobiliario-imovel-boituva"),
    "area-imobiliario-tall": (f"{SRC}/area-imobiliario-vertical.webp", [384, 768], "advogado-direito-imobiliario-imovel-boituva-sp"),
    "area-previdenciario-wide": (f"{SRC}/area-previdenciario-panoramica.webp", [768, 1152, 1536], "advogado-direito-previdenciario-inss-boituva"),
    "area-previdenciario-tall": (f"{SRC}/area-previdenciario-vertical.webp", [384, 768], "advogado-direito-previdenciario-inss-boituva-sp"),
    "area-familia-detalhe": (f"{SRC}/area-familia-detalhe.webp", [384, 768], "direito-de-familia-vieira-marques"),
    "area-sucessorio-detalhe": (f"{SRC}/area-sucessorio-detalhe.webp", [384, 768], "heranca-inventario-testamento-vieira-marques"),
    "area-criminal-detalhe": (f"{SRC}/area-criminal-detalhe.webp", [384, 768], "justica-direito-criminal-vieira-marques"),
    "area-saude-detalhe": (f"{SRC}/area-saude-detalhe.webp", [384, 768], "direito-medico-saude-vieira-marques"),
    "area-bancario-detalhe": (f"{SRC}/area-bancario-detalhe.webp", [384, 768], "revisao-contrato-bancario-vieira-marques"),
    "area-imobiliario-detalhe": (f"{SRC}/area-imobiliario-detalhe.webp", [384, 768], "direito-imobiliario-chaves-imovel-vieira-marques"),
    "area-previdenciario-detalhe": (f"{SRC}/area-previdenciario-detalhe.webp", [384, 768], "beneficio-inss-previdenciario-vieira-marques"),
    "oscar-moreira-vieira-fundo": (f"{SRC}/oscar-moreira-vieira-fundo.webp", [768, 1280, 1672], "oscar-moreira-vieira-advogado-escritorio-v2"),
    "jislana-marques-fundo": (f"{SRC}/jislana-marques-fundo.webp", [768, 1280, 1672], "jislana-marques-advogada-estudio-v2"),
    "natalia-okumura-fundo": (f"{SRC}/natalia-okumura-fundo.webp", [768, 1280, 1536], "natalia-okumura-advogada-escritorio-v2"),
    "gledie-camargo-fundo": (f"{SRC}/gledie-camargo-fundo.webp", [768, 1280, 1536], "gledie-camargo-advogada-escritorio-v2"),
    "hero-home": (f"{SRC}/hero-home-notebook-vieira-marques.webp", [800, 1280, 1672, 2000], "escritorio-vieira-marques-advogados-mesa-de-trabalho-hero"),
    "atendente": (f"{SRC}/atendente-avatar.webp", [96, 170], "atendimento-vieira-marques-whatsapp"),
    "hero-conhecimento": (f"{SRC}/hero-conhecimento-advogada-escritorio.webp", [800, 1280, 1672], "hero-conhecimento-advogados-vieira-marques-v1"),
    "hero-area-familia": (f"{SRC}/hero-area-familia-advogado-escritorio.webp", [800, 1280, 1672], "hero-area-familia-advogados-vieira-marques-v1"),
    "hero-area-criminal": (f"{SRC}/hero-area-criminal-advogada-escritorio.webp", [800, 1280, 1672], "hero-area-criminal-advogados-vieira-marques-v1"),
    "hero-area-saude": (f"{SRC}/hero-area-saude-advogada-escritorio.webp", [800, 1280, 1672], "hero-area-saude-advogados-vieira-marques-v1"),
    "lp-divorcio": (f"{SRC}/lp-divorcio-advogado-orienta-casal.webp", [480, 800, 1280, 1920], "advogado-divorcio-orientacao-casal-vieira-marques-v1"),
    "bandeira": (f"{SRC}/bandeira-do-brasil-fundo.webp", [960, 1672], "bandeira-do-brasil-fundo-v2"),
}


def save_variants(src, widths, slug):
    quality = 84 if slug.endswith("-hero") else 90
    im = Image.open(os.path.join(ROOT, src))
    im.load()
    im = im.convert("RGB")
    variants = []
    for w in dict.fromkeys(min(w, im.width) for w in widths):
        h = round(im.height * w / im.width)
        out = f"{slug}-{w}.webp"
        im.resize((w, h), Image.LANCZOS).save(os.path.join(OUT_DIR, out), "WEBP", quality=quality, method=6)
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
        if f.endswith(".svg"):  # mapa gerado por src/tools/mapa-sp.mjs
            continue
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
