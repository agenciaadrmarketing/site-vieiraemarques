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

- `novosite.*` fica fora das buscas por três mecanismos do `.htaccess`, todos condicionados ao host `^novosite\.` (variável `VM_STAGING`): cabeçalhos `X-Robots-Tag` por robô (googlebot, bingbot, yandex, duckduckbot, applebot, baiduspider), `robots.txt` reescrito para `robots-staging.txt` (robôs de IA bloqueados) e nada mais. Em produção nenhuma dessas regras dispara.
- Os canonicals e o sitemap já usam `https://vieiraemarquesadvogados.com/`; as prévias de link (`og:url`, imagem) usam `shareOrigin` (novosite) até a migração — ver item 7 do checklist.
- **Validação P0 pós-migração (robots/indexação)** — executar no domínio oficial, antes de enviar o sitemap:
  1. `curl -sI https://vieiraemarquesadvogados.com/ | grep -i x-robots` → vazio (nenhum cabeçalho por robô).
  2. `curl -s https://vieiraemarquesadvogados.com/robots.txt` → deve ser o `robots.txt` normal (começa com `User-agent: *` / `Allow: /` e lista os robôs de IA com `Allow`), **não** o `robots-staging.txt` (que começa com o comentário "Homologação").
  3. Nenhuma página com `<meta name="robots" content="noindex">` além da 404: `grep -rl 'content="noindex"' --include=index.html .` no pacote deve retornar vazio.
  4. Teste de URL ao vivo no Search Console para `/`, uma área, um serviço e uma regional: "Indexação permitida".
  5. Se o `novosite.` continuar no ar depois da troca, mantê-lo com as regras de homologação (ou redirecioná-lo 301 para o domínio oficial) para não gerar conteúdo duplicado.

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
| `divorcio.` → `/divorcio/` · `divorcio-sp.` → `/divorcio-sao-paulo/` · `divorcio-boituva.` → `/divorcio-boituva/` · `divorcio-semfilhos.` → `/divorcio-sem-filhos-sem-bens/` · `juros-abusivos.` → `/juros-abusivos/` · `advogado-golpedopix.` → `/golpe-do-pix/` · `boituva.` → `/advogado-boituva/` | | `redirecionamentos-lps/` |

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
   - Medição: o Google Tag Manager (LPs) e eventuais GA4/Pixel em `src/data/site.mjs` precisam ter o domínio oficial autorizado nos respectivos painéis; conferir no DebugView que `page_path`, `cidade_pagina` e `utm_*` chegam.
   - Search Console: adicionar a propriedade de domínio (se ainda não existir), enviar `sitemap.xml` e, após 48 h, conferir que as 32 regionais e o índice `/cidades-atendidas/` foram descobertos.
   - Formulários/WhatsApp: abrir uma regional, uma área e um serviço e conferir que a mensagem pré-preenchida do WhatsApp identifica a página; se `SITE.forms` for ativado, testar o envio e a captura de origem (URL, área, serviço, UTMs).
   - DNS: a troca de apontamento do domínio principal só depois dos itens 1 a 6; conferir MX/e-mail antes e depois.
   - Antes de gerar o pacote final, trocar `shareOrigin` em `src/data/site.mjs` para o domínio oficial (o mesmo valor de `origin`): é o endereço usado nas prévias de link (`og:url` e imagem). Depois de publicar, testar um link no WhatsApp e passar as páginas principais no Depurador de Compartilhamento do Facebook ("Extrair novamente") para atualizar as prévias guardadas.
8. Acompanhar Search Console (cobertura, erros 404/soft 404) por 30 dias.
