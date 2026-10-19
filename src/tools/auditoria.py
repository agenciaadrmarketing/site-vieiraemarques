"""Auditoria das páginas geradas (somente o site institucional; o blog fica fora).

Uso: node src/build.mjs && python3 -I src/tools/auditoria.py
Gera src/docs/auditoria-rotas.csv e imprime um resumo dos problemas por prioridade.
"""
import csv, glob, hashlib, json, os, re, sys, collections
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.chdir(ROOT)
ORIGIN = "https://vieiraemarquesadvogados.com"
LPS = ("divorcio", "divorcio-sao-paulo", "divorcio-boituva", "divorcio-sem-filhos-sem-bens", "juros-abusivos", "golpe-do-pix")

def kind(u):
    if u in ("/",): return "home"
    if u.startswith("/advogados/"): return "advogado"
    if u.strip("/") in LPS: return "landing"
    if u.startswith("/advogado-") or u == "/cidades-atendidas/": return "regional"
    if u.startswith("/areas/") and u.count("/") == 3: return "area"
    if u.startswith("/areas/"): return "servico"
    if u in ("/escritorio/", "/contato/", "/areas-de-atuacao/"): return "institucional"
    if u == "/conhecimento/": return "conhecimento"
    if "politica" in u or "termos" in u: return "legal"
    return "outra"

pages = {}
for p in sorted(glob.glob("**/index.html", recursive=True)) + ["404.html"]:
    if p.startswith(("src", "dist", "node_modules", ".git")): continue
    u = "/" + p[:-10] if p.endswith("index.html") else "/404.html"
    if u == "/": pass
    pages[u if u != "//" else "/"] = open(p, encoding="utf-8").read()
pages["/"] = pages.pop("/") if "/" in pages else pages.get("//", "")

def text(s): return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s)).strip()
def strip_scripts(s): return re.sub(r"<(script|style)\b.*?</\1>", "", s, flags=re.S)
inbound = collections.Counter(); out = {}
for u, s in pages.items():
    hs = set()
    for h in re.findall(r'<a [^>]*href="(/[^"#?]*)', s):
        if h in pages or h + ("" if h.endswith("/") else "/") in pages: hs.add(h)
    out[u] = hs
    if u != "/404.html":
        for h in hs:
            if h != u: inbound[h] += 1
paras = collections.defaultdict(set)
for u, s in pages.items():
    if kind(u) not in ("servico", "area"): continue
    for t in re.findall(r"<(?:p|li)[^>]*>(.*?)</(?:p|li)>", re.sub(r"<(header|footer|nav)\b.*?</\1>", "", strip_scripts(s), flags=re.S), re.S):
        t = text(t)
        if len(t) > 90: paras[t].add(u)
dups = {t: us for t, us in paras.items() if len(us) > 1}

rows, issues = [], collections.defaultdict(list)
def add(prio, u, msg): issues[prio].append((u, msg))
sm = open("sitemap.xml", encoding="utf-8").read()
smurls = set(re.findall(r"<loc>" + re.escape(ORIGIN) + r"([^<]*)</loc>", sm))
for u, s in pages.items():
    t = (re.search(r"<title>(.*?)</title>", s, re.S) or [0, ""])[1].replace("&amp;", "&")
    d = (re.search(r'name="description" content="(.*?)"', s) or [0, ""])[1].replace("&amp;", "&")
    h1s = re.findall(r"<h1[\s>].*?</h1>", s, re.S); h1 = text(h1s[0]) if h1s else ""
    can = (re.search(r'rel="canonical" href="(.*?)"', s) or [0, ""])[1]
    rob = (re.search(r'name="robots" content="(.*?)"', s) or [0, ""])[1]
    ld = sorted(set(re.findall(r'"@type"\s*:\s*"(\w+)"', "".join(re.findall(r'application/ld\+json">(.*?)</script>', s, re.S)))))
    wa = len(re.findall(r'href="https://wa\.me/', s)); k = kind(u)
    imgs = re.findall(r"<img\b[^>]*>", s)
    noalt = [i for i in imgs if not re.search(r'\balt="', i)]; nodim = [i for i in imgs if not re.search(r"\bwidth=", i)]
    badalt = [i for i in imgs if re.search(r'\balt="(imagem|foto|image|img)"', i, re.I)]
    ph = re.findall(r"\[(?:INFORMAÇÃO PENDENTE|CONFIRMAR[^\]]*|VALIDA[^\]]*|PÁGINA PENDENTE)\]|lorem ipsum|\\bTODO\\b", s)
    hl = [int(x) for x in re.findall(r"<h([1-6])[\s>]", s)]
    skip = any(b > a + 1 for a, b in zip(hl, hl[1:]))
    rows.append([u, k, len(h1s), h1[:80], len(t), t, len(d), can, rob, ",".join(ld), wa, inbound.get(u, 0), len(imgs), len(noalt), len(nodim)])
    if u == "/404.html": continue
    if rob.startswith("noindex"): add("P0", u, "noindex na página final")
    if can and not can.startswith(ORIGIN + "/"): add("P0", u, f"canonical fora do domínio final: {can}")
    if can and can != ORIGIN + u: add("P0", u, f"canonical diferente da URL: {can}")
    if "novosite" in s: add("P0", u, "referência a novosite no HTML")
    if u not in smurls: add("P1", u, "fora do sitemap")
    if len(h1s) != 1: add("P1", u, f"{len(h1s)} H1")
    if not 25 <= len(t) <= 66: add("P1", u, f"title com {len(t)} caracteres")
    if not 70 <= len(d) <= 165: add("P1", u, f"description com {len(d)} caracteres")
    if noalt: add("P1", u, f"{len(noalt)} imagens sem alt")
    if badalt: add("P2", u, "alt genérico")
    if nodim and k not in ("landing",): add("P2", u, f"{len(nodim)} imagens sem width/height")
    if ph: add("P1", u, f"placeholder visível: {ph[:2]}")
    if skip and k != "landing": add("P2", u, "salto de nível de heading")
    if inbound.get(u, 0) == 0 and k != "landing": add("P1", u, "página órfã (nenhum link interno)")
    if wa > 8 and k not in ("landing",): add("P2", u, f"{wa} links de WhatsApp (excesso de CTA)")
    if re.search(r'<a [^>]*href="(#|)"', s): add("P2", u, "link vazio ou # sem destino")
    if re.search(r'<a [^>]*target="_blank"(?![^>]*noopener)', s): add("P1", u, "target _blank sem noopener")
    if re.search(r'<a [^>]*href="https?://[^"]*"[^>]*target="_blank"[^>]*>', s) is None and False: pass
for t, us in dups.items():
    if 2 <= len(us) <= 5: add("P2", ",".join(sorted(us))[:60] + "…", f"trecho repetido em {len(us)} páginas: {t[:70]}…")
for u in smurls:
    if (u in pages) is False and not any(u.strip('/') == l for l in LPS): add("P0", u, "URL do sitemap sem página gerada")
os.makedirs("src/docs", exist_ok=True)
with open("src/docs/auditoria-rotas.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f); w.writerow(["url", "tipo", "h1_qtd", "h1", "title_len", "title", "desc_len", "canonical", "robots", "schema", "links_whatsapp", "links_entrada", "imagens", "sem_alt", "sem_dimensoes"]); w.writerows(rows)
print(f"{len(pages)} páginas; tipos:", dict(collections.Counter(r[1] for r in rows)))
for pr in ("P0", "P1", "P2"):
    print(f"\n== {pr}: {len(issues[pr])}")
    for u, m in issues[pr][:40]: print(f"  {u}: {m}")
