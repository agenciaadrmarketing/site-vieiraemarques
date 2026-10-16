# Arquitetura das seções — jornada do usuário

Princípio aplicado: primeiro a **função** da seção (contexto, educação, navegação, autoridade, prova, localização, conversão, continuidade), depois posição, fundo, layout e CTA. O fundo escuro marca mudança de contexto, navegação, autoridade, mapa e fechamento; o claro fica com leitura, comparação e dúvidas. Não há alternância automática: cada página tem a própria ordem. O blog não foi tocado.

Legenda: **C** = claro · **E** = escuro · funções: CTX contexto · EDU educação · NAV navegação · AUT autoridade · PRV prova · LOC localização · CNV conversão · CNT continuidade.

## Home (porta de entrada)
| # | Seção | Função | Fundo | Mudança |
|---|---|---|---|---|
| 1 | Hero | CTX + CNV | E | mantida |
| 2 | Áreas de atuação | NAV | E | era cinza; vira a decisão principal |
| 3 | O escritório (posicionamento) | CTX | C | **fundida** com a antiga "intro" (mesmo conteúdo: sede, presencial, online, equipe) e passou a clara |
| 4 | Equipe | AUT | E | era clara |
| 5 | Como funciona o primeiro contato | EDU | C | movida para depois da autoridade |
| 6 | Onde atendemos (Brasil) | LOC | E | movida do fim para o meio |
| 7 | Avaliações do Google | PRV | C | só aparece com a API configurada |
| 8 | Base de conhecimento | EDU/CNT | C | era cinza |
| 9 | CTA final | CNV | E | mantido |

## Escritório (marca)
Hero E → História C → **Princípios (como atua)** E → Método C → **Estrutura** E → Equipe C (painéis escuros dentro) → Onde atendemos E → Avaliações C → **Conteúdos (guias)** C (nova, 3 guias) → CTA E. Formação completa de cada advogado fica nos perfis.

## Áreas de atuação (diretório)
Hero E → **Diretório** C (8 cartões compactos com serviços e link; substituiu os blocos longos de ~330 KB com FAQ e equipe repetidos por área) → Onde atendemos E → Como funciona C → CTA E. Âncoras `#familia` etc. preservadas.

## Páginas-pilar das áreas
| # | Seção | Função | Fundo |
|---|---|---|---|
| 1 | Hero | CTX | E |
| 2 | Pontos de atenção (antes "signals", era depois do meio) | EDU | C |
| 3 | Serviços | NAV | E (cartões claros) |
| 4 | Como funciona | EDU | C |
| 5 | Documentos | EDU | E |
| 6 | Perguntas frequentes | EDU | C |
| 7 | Profissionais da área (com links aos perfis) | AUT | E |
| 8 | Conteúdos relacionados (quando houver) | CNT | C |
| 9 | Onde atendemos | LOC | E |
| 10 | Outras áreas | CNT | C |
| 11 | CTA final | CNV | E |
Removidos: faixa de CTA no meio da página (CTA antes de entender), bloco de estrutura (fundido no Escritório) e a seção "Profissionais da área" separada (fundida no bloco de equipe).

## Páginas de serviço (problema → entendimento → caminho → confiança → contato)
Hero E → blocos de conteúdo (explicação, situações, tipos, comparação, caminho, documentos, perguntas) com fundo definido pela **função**: tabela, comparação, aviso e perguntas sempre claros; "caminho" (linha do tempo) escuro; explicação, situações, tipos e documentos alternam para criar pausas → Equipe da área E → Relacionados C → Contato (CTA) E.
Removidos: CTA intermediário, estrutura e mapa do Brasil (repetiam o Escritório e as páginas-pilar; o atendimento já aparece no hero e no contato). Resultado: de 14 para ~9–10 seções por página.

## Perfis dos advogados (pessoa)
Hero E → Sobre C → Áreas de atuação E → Formação e credenciais C → Conteúdos (se houver) C → CTA E → Outros profissionais C.

## Base de conhecimento (descoberta)
Hero E → Filtros + guias + artigos + perguntas C → Blog E → Conteúdos e serviços por área C → CTA E. Removido o mapa final (não é função desta página).

## Contato (agir)
Hero E → Canais e painel de WhatsApp C (painel escuro dentro) → O que acontece a seguir E → Dúvidas C → Onde atendemos E.

## Regionais / LPs
`/divorcio-sao-paulo/`, `/divorcio-boituva/` e demais LPs rodam em runtime próprio (não pelo gerador do site). **Não alteradas nesta etapa**; reorganizar exige trabalhar o template de cada LP — [PÁGINA PENDENTE DE REVISÃO].

## Verificação
axe-core (WCAG A/AA + boas práticas) com 0 violações em 54 páginas (inclui contraste das variantes escuras); varredura em 360/414/768/1440 px sem erro de JavaScript, imagem quebrada ou rolagem horizontal.
