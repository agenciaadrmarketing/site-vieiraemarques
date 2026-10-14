# Redirecionamento das landing pages (opcional)

As LPs dos subdomínios continuam no ar. Use estes arquivos **somente se o escritório decidir
desativar uma LP** e levar o visitante para a página equivalente do site novo (redirecionamento
301, que preserva o SEO). LPs usadas em anúncios ativos devem continuar no ar.

## Como aplicar (Hostinger)

1. Faça backup da pasta do subdomínio (Gerenciador de Arquivos).
2. Substitua o `.htaccess` da pasta do subdomínio pelo arquivo correspondente abaixo
   (ou apague os arquivos da LP e deixe apenas esse `.htaccess`).
3. Teste o endereço antigo: deve abrir a página nova.

| Subdomínio | Destino no site novo | Arquivo |
|---|---|---|
| boituva.vieiraemarquesadvogados.com | / (página inicial) | `boituva.htaccess` |
| divorcio.vieiraemarquesadvogados.com | /areas/direito-de-familia/divorcio/ | `divorcio.htaccess` |
| divorcio-sp.vieiraemarquesadvogados.com | /areas/direito-de-familia/divorcio/ | `divorcio.htaccess` |
| divorcio-semfilhos.vieiraemarquesadvogados.com | /areas/direito-de-familia/divorcio/ | `divorcio.htaccess` |
| advogado-golpedopix.vieiraemarquesadvogados.com | /areas/direito-bancario/golpe-do-pix/ | `golpe-do-pix.htaccess` |
| verbas-rescisorias.vieiraemarquesadvogados.com | /areas/direito-trabalhista/verbas-rescisorias/ | `verbas-rescisorias.htaccess` |
| (LP de juros abusivos) | /areas/direito-bancario/juros-abusivos-financiamento/ | `juros-abusivos.htaccess` |

O caminho `/divorcio-sao-paulo/` do domínio principal já é redirecionado pelo `.htaccess` do site.
