# Auditoria pré-migração — site institucional (blog fora do escopo)

Gerada com `python3 -I src/tools/auditoria.py` (inventário em `auditoria-rotas.csv`), axe-core (WCAG 2 A/AA + boas práticas) em 54 páginas, varredura em 360/414/768/1440 px e testes de teclado. Ambiente: build local; PageSpeed real só após o deploy.

Inventário: 60 páginas — Home 1 · institucionais 3 · áreas 8 · serviços 34 · advogados 4 · Base de Conhecimento 1 · legais 2 · landing pages 6 · 404.

## Prioridades

- **P0 (antes da migração): 0 abertos no código.** Canonicals no domínio final, nenhuma página `noindex` (exceto a 404), sem referência a `novosite`, todas as URLs do sitemap existem, staging protegido por regra de host. Pendência de infraestrutura: ver `plano-migracao.md` (item 0, risco ao blog) — **[RISCO DE IMPACTO NO BLOG — VALIDAR]**.
- **P1:** 3 avisos de "2 H1" nas LPs de divórcio/Golpe do Pix (o HTML pré-renderizado e o template do runtime das LPs repetem o título; só um é exibido). Tratar na fase das LPs.
- **P2 / P3:** ver abaixo.

## ✅ Corrigido nesta fase

**SEO** — títulos de serviço com assunto + local; descrições curtas completadas; `twitter:*`; `max-image-preview`; schema da organização com horário, coordenadas, mapa e equipe; `site.webmanifest`; `robots.txt` bloqueia `/api/`; LPs com títulos ≤ 60 caracteres.
**Acessibilidade** — axe: de 4 tipos de achado para **0 violações** (landmarks, `aside` aninhado, cabeçalho de tabela vazio, região com rótulo duplicado); foco preso no menu mobile aberto (Tab/Shift+Tab, Esc devolve o foco ao botão).
**UI/UX** — Hub de áreas: removido o bloco duplicado de CTA e "Onde atendemos" que se repetia 8 vezes (331 KB → 132 KB); botões "Falar sobre X" viraram "Conhecer a área" (menos WhatsApp, mais navegação); links de equipe apontam para os perfis.
**Mobile** — e-mail longo no Contato e botão do hub não estouram mais a largura; 53 páginas × 4 larguras sem rolagem horizontal.
**Performance** — tela de abertura só na 1ª página da visita; troca de página por View Transitions; Lenis sem laço ocioso; animações infinitas pausam fora da tela; prefetch ao passar o mouse.
**Conteúdo / OAB** — LPs sem "advogado especialista", "gratuita", "urgente", "falar agora com um advogado", "recuperar o seu dinheiro" e experiência não comprovada; CTAs padronizados (Falar com a equipe / Solicitar orientação / Solicitar análise inicial).
**Tracking** — eventos úteis e enxutos: `whatsapp_click`, `phone_click`, `email_click`, `practice_area_click`, `service_click`, `lawyer_profile_click`, `knowledge_click`, `google_review_click` (+ `page_title`). Só saem do navegador com medição autorizada (hoje desligada).
**Segurança** — HTTPS/HSTS, CSP, `nosniff`, Referrer-Policy e Permissions-Policy já ativos; `api/config.php` e cache fora do Git e do pacote.

## ⚠️ Revisão necessária

- **Migração e blog** (CSP e `.htaccess` em domínio compartilhado com o WordPress): `plano-migracao.md`.
- **Mapa de redirects** completo depende da lista de URLs do site atual (sem acesso daqui).
- **Avaliações do Google** e **depoimentos nominais** das LPs de divórcio: OAB (Provimento 205/2021).
- **Retenção de dados "vitalícia"** × LGPD arts. 15–16; **foro** (capital?); **encarregado** não indicado: revisão jurídica.
- **GTM nas LPs** × Política de Privacidade (que diz não usar ferramentas de medição).
- **Duas páginas de Golpe do Pix** (serviço e LP) competem pelo mesmo termo; avaliar `noindex` na LP.
- **P2:** trechos de CTA parecidos entre páginas de área ("Conte o que está acontecendo…", 4–5 páginas) — diferenciar na revisão editorial; CSS ainda sem minificar (~141 KB, ~25 KB comprimido).
- **P3 [FUTURA FASE — BLOG]:** autoria de artigos (`author` no cadastro já preparado), unificar sitemaps e importação de conteúdo — não executado.

## ❌ Bloqueado / informação ausente

- Place ID + chave da Places API (avaliações no ar).
- Código de verificação do Search Console e IDs de medição (GA4/Meta).
- Lista de URLs do site antigo; destino definitivo do blog.
- Equipe de atendimento no site (nome, função, foto autorizada); mini-currículo da Dra. Leticia (perfil próprio).
- Formulários: decisão do escritório é manter só WhatsApp por ora — a estratégia "formulário antes do WhatsApp" do prompt não se aplica agora (`SITE.forms = false`).
- Testes Safari/Firefox/Edge reais e PageSpeed/INP em produção.

## Checklist P0

- [x] links internos funcionando (sem 404 interno)
- [x] titles/descriptions únicos e dentro do limite
- [x] canonical, sitemap e robots corretos
- [x] staging protegido · produção sem noindex
- [x] imagens com alt, dimensões e lazy; LCP sem lazy
- [x] schemas válidos (JSON-LD parseável; sem `Attorney`)
- [x] mobile revisado (4 larguras) · acessibilidade sem violações axe
- [x] WhatsApp funcionando (LPs testadas; mensagens corretas)
- [ ] redirects planejados — **parcial** (falta a lista do site atual)
- [ ] OAB revisada — **pendente** de parecer do escritório
- [ ] Core Web Vitals em produção — **medir após o deploy**
- [x] blog intocado
