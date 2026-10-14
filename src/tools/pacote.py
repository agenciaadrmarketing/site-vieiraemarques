"""Gera o pacote de publicação (somente arquivos públicos) para subir na Hostinger.

Uso: npm run pacote   (roda o build e a verificação antes)
Saída: dist/site-vieiraemarques.zip

Na Hostinger: Gerenciador de Arquivos > public_html > enviar o .zip > Extrair.
O pacote inclui o .htaccess (redirecionamentos, cache e cabeçalhos de segurança).
Ficam de fora as fontes do build (src/), o arquivo de design e os metadados do projeto.
"""
import os
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "dist", "site-vieiraemarques.zip")
EXCLUDE_DIRS = {"src", "design", "dist", "node_modules", ".git", ".github", ".claude"}
EXCLUDE_FILES = {"package.json", "package-lock.json", ".gitignore"}


def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    count = 0
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for base, dirs, files in os.walk(ROOT):
            rel = os.path.relpath(base, ROOT)
            if rel == ".":
                dirs[:] = sorted(d for d in dirs if d not in EXCLUDE_DIRS)
            else:
                dirs.sort()
            for f in sorted(files):
                if rel == "." and f in EXCLUDE_FILES:
                    continue
                path = os.path.join(base, f)
                z.write(path, os.path.relpath(path, ROOT))
                count += 1
    size = os.path.getsize(OUT) / 1024 / 1024
    print(f"Pacote: {os.path.relpath(OUT, ROOT)} — {count} arquivos, {size:.1f} MB")


if __name__ == "__main__":
    main()
