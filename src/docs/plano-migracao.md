# Plano de migração — novosite → vieiraemarquesadvogados.com

Escopo: apenas o site institucional. **O blog (WordPress) não é alterado, migrado, redirecionado nem consolidado nesta fase.**
Nada deste documento foi executado: é o roteiro para quando a migração for autorizada.

## 0. Riscos que podem afetar o blog — [RISCO DE IMPACTO NO BLOG — VALIDAR]

O blog hoje responde no mesmo domínio, em caminhos na raiz (ex.: `/construcao-no-terreno-do-avo-inventario/`).
Publicar o pacote do novo site na raiz do `public_html` do domínio principal pode afetá-lo de quatro formas:

1. **`.htaccess` substitui o do WordPress.** O arquivo do pacote não tem o bloco `# BEGIN WordPress`; sem ele, os links permanentes do blog deixam de funcionar. Na migração, manter o bloco do WordPress e inserir as regras do novo site **antes** dele.
2. **Cabeçalho de segurança (CSP) aplicado ao domínio inteiro.** O `.htaccess` do novo site define `Content-Security-Policy` com `script-src 'self'` para todas as respostas; isso quebra scripts do WordPress (admin, temas, plugins). Na migração, aplicar a CSP só aos arquivos `.html` do novo site (`<FilesMatch "\.html$">`). As LPs recebem a CSP própria (mais aberta para o Google Tag Manager) pela variável `VM_LP`, definida no próprio `.htaccess` principal — manter o bloco `# >>> LPs` junto das regras do novo site; testar antes de publicar.
3. **`robots.txt` e `sitemap.xml` físicos** passam a ter precedência sobre os virtuais do WordPress/SEO plugin. Decidir com o cliente se o `robots.txt` final referencia também o sitemap do blog (referenciar não altera o blog).
4. **Páginas do WordPress com o mesmo endereço** de páginas novas (ex.: `/contato/`, `/escritorio/`) deixam de aparecer, porque o arquivo estático vence a regra do WordPress. É o efeito desejado para as páginas institucionais, mas precisa de conferência página a página.

Alternativa de menor risco: manter o blog num subdomínio/diretório próprio. **Decisão do cliente; não executada.**

## 1. Ambiente de homologação

- `novosite.*` envia `X-Robots-Tag: noindex, nofollow` pelo `.htaccess` (regra por host `^novosite\.`). Em produção a regra não dispara.
- Os canonicals, Open Graph e o sitemap já usam `https://vieiraemarquesadvogados.com/`.
- Verificação P0 pós-migração: `curl -sI https://vieiraemarquesadvogados.com/ | grep -i x-robots` deve vir vazio e nenhuma página pode ter `<meta name="robots" content="noindex">` (a 404 é a única).

## 2. DNS e hospedagem (apenas documentação)

- Hoje: `novosite.vieiraemarquesadvogados.com` na Hostinger (Business Web Hosting, servidor nos EUA/Arizona), implantação automática da branch `main` em `public_html`.
- Para o domínio principal: apontar para o mesmo plano/hospedagem **sem** alterar registros do blog; conferir MX/e-mail antes de qualquer troca de nameserver.
- Subdomínios antigos de LPs (`divorcio.`, `divorcio-sp.`, `divorcio-boituva.`, `divorcio-semfilhos.`, `juros-abusivos.`, `advogado-golpedopix.`, boituva, verbas-rescisorias): usar os arquivos de `src/tools/redirecionamentos-lps/` (301 para as novas páginas).

## 3. Mapa de redirecionamentos (institucional) — 301 no servidor

| URL antiga | URL nova | Origem |
|---|---|---|
| `/privacidade/` | `/politica-de-privacidade/` | `.htaccess` |
| `/sobre-nos/`, `/o-escritorio/` | `/escritorio/` | `.htaccess` |
| `/equipe/` | `/escritorio/#equipe` | `.htaccess` |
| `/direito-de-familia/` | `/areas/direito-de-familia/` | `.htaccess` |
| `/direito-sucessorio/` | `/areas/direito-sucessorio/` | `.htaccess` |
| `/direito-criminal/` | `/areas/direito-criminal/` | `.htaccess` |
| `/direito-trabalhista/` | `/areas/direito-trabalhista/` | `.htaccess` |
| `/direito-previdenciario/` | `/areas/direito-previdenciario/` | `.htaccess` |
| `divorcio.` → `/divorcio/` · `divorcio-sp.` → `/divorcio-sao-paulo/` · `divorcio-boituva.` → `/divorcio-boituva/` · `divorcio-semfilhos.` → `/divorcio-sem-filhos-sem-bens/` · `juros-abusivos.` → `/juros-abusivos/` · `advogado-golpedopix.` → `/golpe-do-pix/` | | `redirecionamentos-lps/` |

**Pendente — [VALIDAÇÃO DO CLIENTE NECESSÁRIA]:** a lista completa de URLs do site institucional atual (não há acesso ao domínio a partir deste ambiente). Exportar em *Search Console → Páginas* ou *WordPress → Páginas* (somente leitura) e completar a tabela. Regras: cada URL antiga aponta para a página equivalente mais relevante, nunca para a Home sem motivo, sem cadeias (A → B → C).
URLs de artigos do blog **não entram** no mapa.

## 4. Checklist no dia da migração

1. Backup do `public_html` (arquivos e banco) feito pelo cliente.
2. Mesclar `.htaccess` (item 0) e testar uma URL do blog, `/wp-admin/` e `/wp-json/` antes de liberar.
3. Publicar o pacote; conferir `/`, uma área, um serviço, um advogado, uma LP e a 404.
4. `curl -I` nas URLs do mapa de redirecionamentos (esperado 301 direto ao destino).
5. `sitemap.xml` com o domínio final; enviar no Search Console; pedir indexação das páginas principais.
6. Configurar `api/config.php` (avaliações do Google) e testar `/api/google-reviews.php`.
7. Conferir que nenhum link interno aponta para `novosite.`.
   - Antes de gerar o pacote final, trocar `shareOrigin` em `src/data/site.mjs` para o domínio oficial (o mesmo valor de `origin`): é o endereço usado nas prévias de link (`og:url` e imagem). Depois de publicar, testar um link no WhatsApp e passar as páginas principais no Depurador de Compartilhamento do Facebook ("Extrair novamente") para atualizar as prévias guardadas.
8. Acompanhar Search Console (cobertura, erros 404/soft 404) por 30 dias.
