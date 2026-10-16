// Mensagens do balão do WhatsApp flutuante nas páginas de serviço: 4 por tema, cada uma sobre
// a situação do próprio serviço. Texto informativo, sem promessa de resultado nem urgência.
const q = (t, s) => ({ t, s });
export const SERVICE_PHRASES = {
  "familia/divorcio": [
    q("Pensando em se divorciar?", "Conte a situação: o primeiro passo é entender se o caminho é cartório ou Justiça."),
    q("Existem filhos menores ou bens?", "Isso muda o procedimento. A equipe explica o que costuma ser analisado em cada caso."),
    q("Dúvida sobre partilha de bens?", "Informe o regime de casamento e os bens existentes para uma análise inicial."),
    q("Já há acordo entre o casal?", "Fale com a equipe e veja quais documentos ajudam a organizar o divórcio."),
  ],
  "trabalhista/verbas-rescisorias": [
    q("Foi desligado e quer conferir as verbas?", "Envie o termo de rescisão para a análise inicial pela equipe."),
    q("Ficou em dúvida sobre algum valor?", "Saldo de salário, férias, 13º e FGTS podem ser conferidos a partir dos documentos."),
    q("Tem carteira de trabalho e contracheques?", "Esses documentos ajudam a entender o que já foi pago e o que pode estar faltando."),
    q("Assinou algo e ficou inseguro?", "Conte a situação: a equipe orienta sobre os próximos passos."),
  ],
  "bancario/juros-abusivos": [
    q("Parcela do financiamento muito alta?", "Envie o contrato para verificar as taxas cobradas."),
    q("Quer saber se os juros são abusivos?", "A análise compara o contrato com os dados disponíveis do mercado."),
    q("Tem o contrato do veículo em mãos?", "Ele mostra taxa, tarifas e prazo, informações-chave para a análise."),
    q("Pagamentos em atraso?", "Conte a situação atual do financiamento para a equipe orientar."),
  ],
  "bancario/golpe-do-pix": [
    q("Caiu em um golpe do Pix?", "Registre o que aconteceu: data, valor e canais usados ajudam na análise."),
    q("Já avisou o banco?", "Conte o que foi comunicado e as respostas recebidas."),
    q("Tem prints e comprovantes?", "Mensagens, comprovantes e boletim de ocorrência fazem parte da análise inicial."),
    q("Não sabe o que fazer agora?", "Descreva a situação: a equipe indica as medidas ainda possíveis."),
  ],
  "familia/pensao-alimenticia": [
    q("Precisa fixar a pensão?", "Informe a renda de quem paga e as despesas de quem recebe."),
    q("Quer revisar o valor da pensão?", "Mudanças na renda ou nas necessidades podem ser analisadas."),
    q("A pensão está atrasada?", "Conte desde quando e se existe decisão ou acordo registrado."),
    q("Dúvida sobre exoneração?", "A equipe explica em quais situações o tema costuma ser discutido."),
  ],
  "familia/uniao-estavel": [
    q("Vive em união estável?", "Saiba o que costuma ser analisado para reconhecer e registrar a união."),
    q("Quer formalizar a união?", "Contrato ou escritura em cartório: veja os caminhos possíveis."),
    q("Precisa encerrar a união?", "A dissolução também envolve filhos e bens. Conte sua situação."),
    q("Dúvida sobre o período de convivência?", "Fotos, contas e documentos em comum ajudam na análise."),
  ],
  "familia/guarda": [
    q("Dúvida sobre a guarda dos filhos?", "Compartilhada ou unilateral: a equipe explica as diferenças."),
    q("Precisa organizar a convivência?", "Rotina, moradia e datas podem ser tratadas por acordo ou decisão."),
    q("Quer alterar uma guarda existente?", "Conte o que mudou desde a decisão ou o acordo anterior."),
    q("Há desacordo entre os pais?", "Descreva a situação para uma análise inicial."),
  ],
  "sucessorio/inventario": [
    q("Precisa abrir um inventário?", "Veja se o caminho é cartório ou Justiça conforme a situação da família."),
    q("Não sabe quais bens entram?", "Liste imóveis, contas e veículos para a análise inicial."),
    q("Há herdeiros em desacordo?", "Isso pode mudar o procedimento. Conte como está a situação."),
    q("Tem a certidão de óbito?", "Ela e os documentos dos bens são o ponto de partida do inventário."),
  ],
  "sucessorio/heranca": [
    q("Dúvida sobre herança?", "Quem são os herdeiros e como os bens são divididos depende de cada caso."),
    q("Existe testamento?", "A existência dele muda a análise. Conte o que você sabe."),
    q("Imóvel sem escritura em nome do falecido?", "A equipe explica o que costuma ser verificado."),
    q("Herdeiros não se entendem?", "Descreva a situação para uma análise inicial."),
  ],
  "sucessorio/testamento": [
    q("Quer deixar um testamento?", "Saiba o que a lei permite e quais as formas existentes."),
    q("Dúvida sobre a parte dos herdeiros?", "Há regras sobre a parte do patrimônio que pode ser livremente destinada."),
    q("Precisa de testamento em cartório?", "A equipe explica o caminho e os documentos usuais."),
    q("Quer conversar sobre o tema?", "Conte sua situação familiar e patrimonial de forma geral."),
  ],
  "sucessorio/planejamento-sucessorio": [
    q("Pensando em organizar seu patrimônio?", "Planejar a sucessão ajuda a reduzir conflitos futuros na família."),
    q("Tem empresa ou imóveis?", "A estrutura dos bens influencia os caminhos possíveis."),
    q("Doação em vida ou testamento?", "A equipe explica as diferenças gerais entre as opções."),
    q("Quer entender os custos e etapas?", "Conte sua situação para uma análise inicial."),
  ],
  "trabalhista/rescisao-indireta": [
    q("Seu empregador descumpre o contrato?", "Atraso de salário e FGTS sem depósito podem ser analisados."),
    q("Pensa em sair por falta grave da empresa?", "Antes de qualquer decisão, converse sobre os documentos e provas."),
    q("Tem mensagens ou registros?", "Eles ajudam a mostrar o que aconteceu no ambiente de trabalho."),
    q("Dúvida sobre os direitos na saída?", "A equipe explica o que costuma ser verificado."),
  ],
  "trabalhista/vinculo": [
    q("Trabalha sem carteira assinada?", "Informe função, horários e forma de pagamento."),
    q("Recebe como pessoa jurídica, mas tem rotina de empregado?", "O caso pode ser analisado a partir da realidade do trabalho."),
    q("Tem mensagens, extratos ou testemunhas?", "Eles podem ajudar a mostrar como o trabalho acontecia."),
    q("Quer entender seus direitos?", "Conte a situação para uma análise inicial."),
  ],
  "trabalhista/desvio-de-funcao": [
    q("Faz tarefas diferentes do seu cargo?", "Compare a função da carteira com o que realmente executa."),
    q("Assumiu atividades sem mudança no salário?", "Conte quando começou e o que mudou na rotina."),
    q("Tem registros do que faz?", "E-mails, escalas e mensagens ajudam na análise."),
    q("Dúvida sobre diferenças salariais?", "A equipe explica o que costuma ser verificado."),
  ],
  "trabalhista/assedio-moral": [
    q("Sofre pressão ou humilhação no trabalho?", "Descreva o que ocorre, com datas e pessoas envolvidas."),
    q("Guarda mensagens ou áudios?", "Registros ajudam a organizar o que aconteceu."),
    q("Tem testemunhas dos fatos?", "Informe quem presenciou as situações."),
    q("Não sabe por onde começar?", "Conte sua situação de forma reservada e sigilosa."),
  ],
  "trabalhista/horas-extras": [
    q("Trabalha além da jornada contratada?", "Registros de ponto e mensagens ajudam a conferir as horas."),
    q("Horas extras não aparecem no contracheque?", "Compare contracheques e controles de jornada."),
    q("Banco de horas sem compensação?", "A equipe explica o que costuma ser analisado."),
    q("Tem cartões de ponto ou escalas?", "Envie para a análise inicial."),
  ],
  "trabalhista/insalubridade": [
    q("Trabalha exposto a ruído, calor ou agentes químicos?", "O adicional depende das condições do ambiente."),
    q("Recebe adicional de insalubridade?", "Confira no contracheque se há o pagamento e em que percentual."),
    q("Tem laudos ou PPP?", "Esses documentos descrevem as condições de trabalho."),
    q("Dúvida sobre o grau do adicional?", "Conte sua função e o ambiente de trabalho."),
  ],
  "trabalhista/gestante": [
    q("Está grávida e foi desligada?", "A lei prevê estabilidade em situações específicas. Conte o que aconteceu."),
    q("Descobriu a gravidez depois do aviso prévio?", "As datas são importantes para a análise."),
    q("Tem exame ou atestado da gravidez?", "Ele ajuda a organizar o caso."),
    q("Dúvida sobre seus direitos?", "A equipe de atendimento orienta sobre os próximos passos."),
  ],
  "criminal/defesa-criminal": [
    q("Foi intimado ou citado em um processo?", "Envie o documento recebido para uma análise inicial."),
    q("Investigado em inquérito policial?", "Saiba o que costuma ser analisado em cada fase."),
    q("Familiar envolvido em um caso?", "Conte a situação com discrição, sem expor dados desnecessários."),
    q("Tem prazo em andamento?", "Informe as datas do documento para a equipe verificar."),
  ],
  "criminal/habeas-corpus": [
    q("Alguém foi preso ou ameaçado de prisão?", "Informe local, data e o motivo informado."),
    q("Quer entender o habeas corpus?", "A equipe explica quando o instrumento costuma ser discutido."),
    q("Tem o mandado ou a decisão?", "Esses documentos ajudam na análise."),
    q("Quer orientação sobre o caso?", "Descreva os fatos e a equipe encaminha o caso."),
  ],
  "criminal/revisao-criminal": [
    q("Condenação definitiva e dúvidas sobre ela?", "A revisão tem hipóteses específicas previstas em lei."),
    q("Surgiram provas novas?", "Conte o que descobriu e em que processo."),
    q("Tem a sentença e o trânsito em julgado?", "Esses documentos são o ponto de partida."),
    q("Quer saber se é o caminho?", "A equipe faz uma análise inicial do que foi decidido."),
  ],
  "criminal/prisao-em-flagrante": [
    q("Alguém foi preso em flagrante?", "Informe data, local e a delegacia responsável."),
    q("Audiência de custódia?", "A equipe explica como ela costuma funcionar."),
    q("Tem o auto de prisão?", "Ele traz os fatos registrados na delegacia."),
    q("Quer contar o que aconteceu?", "Descreva a situação com o que já se sabe."),
  ],
  "saude/defesa-profissionais": [
    q("Médico ou dentista com reclamação aberta?", "Informe se é processo, conselho profissional ou notificação."),
    q("Recebeu notificação do conselho?", "Envie o documento e os prazos para análise."),
    q("Tem prontuário e registros do atendimento?", "Eles organizam a defesa do profissional."),
    q("Prefere conversar com discrição?", "A equipe de atendimento mantém o sigilo."),
  ],
  "saude/reajuste-convenio": [
    q("Mensalidade do plano subiu muito?", "Envie o contrato e os boletos para conferir o reajuste."),
    q("Reajuste por faixa etária?", "A equipe explica o que costuma ser verificado."),
    q("Tem a comunicação da operadora?", "Ela mostra o índice aplicado."),
    q("Plano individual, familiar ou coletivo?", "O tipo de contrato muda a análise."),
  ],
  "saude/erro-medico": [
    q("Acredita que houve erro em tratamento?", "Conte o que ocorreu, com datas e profissionais envolvidos."),
    q("Tem prontuário e exames?", "Eles ajudam a entender o que foi feito."),
    q("Problema após procedimento odontológico?", "Descreva o atendimento e as consequências observadas."),
    q("Quer saber se o caso pode ser analisado?", "A equipe faz uma triagem inicial."),
  ],
  "saude/pos-bariatrica": [
    q("Precisa de cirurgia após emagrecimento?", "O plano pode negar o procedimento. Conte o que foi informado."),
    q("Plano negou a cirurgia reparadora?", "Envie a negativa e o relatório médico."),
    q("Tem laudo do cirurgião?", "Ele descreve a necessidade do procedimento."),
    q("Dúvida sobre cobertura?", "A equipe explica como o tema costuma ser analisado."),
  ],
  "saude/tratamento-medicamento": [
    q("Plano ou SUS negou tratamento ou medicamento?", "Envie a negativa por escrito e o relatório médico."),
    q("Tem receita e laudos?", "Eles são a base da análise inicial."),
    q("Medicamento de alto custo?", "A equipe explica os caminhos possíveis."),
    q("Precisa de orientação?", "Conte a situação de saúde de forma geral."),
  ],
  "bancario/busca-e-apreensao": [
    q("Recebeu ação de busca e apreensão do veículo?", "Envie o documento para verificar prazos."),
    q("Parcelas atrasadas no financiamento?", "Conte desde quando e quanto foi pago."),
    q("Tem o contrato e a notificação do banco?", "Eles ajudam a entender a situação."),
    q("Dúvida sobre purgação da mora?", "A equipe explica o que costuma ser discutido."),
  ],
  "imobiliario/locacao": [
    q("Dúvida sobre contrato de aluguel?", "Envie o contrato para uma análise inicial."),
    q("Reajuste ou despejo em discussão?", "Conte o que foi comunicado e as datas."),
    q("É locador ou locatário?", "Cada lado tem direitos e deveres específicos."),
    q("Garantia do aluguel em dúvida?", "Fiador, caução ou seguro: a equipe explica."),
  ],
  "imobiliario/atraso-em-obra": [
    q("Imóvel na planta com entrega atrasada?", "Confira o prazo do contrato e a data prometida."),
    q("Construtora sem previsão de entrega?", "Reúna contrato, comunicados e comprovantes."),
    q("Quer entender a cláusula de tolerância?", "A equipe explica o que costuma ser analisado."),
    q("Pensa em desistir da compra?", "Converse antes sobre as consequências."),
  ],
  "imobiliario/usucapiao": [
    q("Mora há anos em um imóvel sem escritura?", "Veja se os requisitos da usucapião podem ser analisados."),
    q("Tem contas e comprovantes de posse?", "Eles ajudam a mostrar o tempo de moradia."),
    q("Imóvel urbano ou rural?", "Os prazos mudam conforme o tipo."),
    q("Quer regularizar o imóvel?", "Conte sua situação para uma análise inicial."),
  ],
  "previdenciario/bpc-loas": [
    q("Dúvida sobre o BPC/LOAS?", "O benefício tem critérios de renda e de condição da pessoa."),
    q("Pedido foi negado no INSS?", "Envie a carta de indeferimento para análise."),
    q("Tem laudos médicos e CadÚnico?", "Eles fazem parte da análise inicial."),
    q("Cuida de idoso ou pessoa com deficiência?", "Conte a situação da família."),
  ],
  "previdenciario/auxilio-doenca": [
    q("Está afastado por doença?", "Veja o que costuma ser analisado no pedido ao INSS."),
    q("Benefício negado ou cortado?", "Envie a decisão e os laudos recebidos."),
    q("Tem atestados e exames?", "Eles são a base do pedido."),
    q("Perícia marcada?", "A equipe explica como organizar os documentos."),
  ],
  "previdenciario/salario-maternidade": [
    q("Dúvida sobre o salário-maternidade?", "Contribuição e qualidade de segurada fazem parte da análise."),
    q("Pedido negado no INSS?", "Envie a negativa para uma análise inicial."),
    q("Trabalha como autônoma ou MEI?", "Os requisitos variam conforme o tipo de contribuição."),
    q("Tem certidão de nascimento e contribuições?", "Esses documentos ajudam no pedido."),
  ],
};

// Páginas institucionais (início, escritório, contato, conhecimento): 4 mensagens gerais.
export const GENERAL_PHRASES = [
  q("Ficou com alguma dúvida?", "Fale com a equipe pelo WhatsApp e receba orientação sobre o seu caso."),
  q("Não sabe em qual área seu caso se encaixa?", "Descreva a situação: identificar o caminho faz parte da análise."),
  q("Prefere conversar por mensagem?", "A equipe de atendimento recebe as informações e encaminha o caso ao profissional da área."),
  q("Tem documentos do caso?", "Contratos, notificações e comprovantes ajudam a equipe na análise inicial."),
];

// Complemento das mensagens de cada área de atuação (a página da área já tem 2 próprias).
export const AREA_EXTRA_PHRASES = {
  familia: [q("Tem filhos ou bens envolvidos?", "Conte a situação da família para uma análise inicial."), q("Dúvida entre acordo e processo?", "A equipe explica os caminhos possíveis em linguagem simples.")],
  sucessorio: [q("Perdeu alguém e tem bens a organizar?", "Conte a situação: a equipe explica o que costuma ser analisado."), q("Quer planejar a sucessão da família?", "Saiba quais caminhos existem para organizar o patrimônio.")],
  trabalhista: [q("Tem carteira, contracheques ou termo de rescisão?", "Esses documentos ajudam a conferir o que foi pago."), q("Dúvida sobre seus direitos no trabalho?", "Conte a situação para a equipe de atendimento.")],
  criminal: [q("Recebeu intimação ou foi investigado?", "Envie o documento para uma análise inicial, com discrição."), q("Familiar envolvido em um caso?", "Descreva o que se sabe e a equipe encaminha ao profissional da área.")],
  saude: [q("Plano de saúde negou algo?", "Envie a negativa por escrito e o relatório médico."), q("Profissional da saúde com reclamação aberta?", "Conte a situação com sigilo para a análise inicial.")],
  bancario: [q("Tem contrato de financiamento ou empréstimo?", "Ele mostra taxas e prazo, base da análise."), q("Foi vítima de golpe ou cobrança estranha?", "Registre datas, valores e comprovantes e fale com a equipe.")],
  imobiliario: [q("Dúvida sobre contrato de imóvel?", "Envie o contrato para uma análise inicial."), q("Imóvel sem regularização?", "Conte a situação para a equipe indicar o caminho.")],
  previdenciario: [q("Benefício negado ou cortado pelo INSS?", "Envie a carta de decisão e os laudos."), q("Quer saber se tem direito a um benefício?", "Conte sua situação para uma análise inicial.")],
};

// Perfil individual: quatro mensagens a partir do foco e dos temas do profissional.
export const profilePhrases = (p) => {
  const tags = (p.tags ?? []).map((t) => t.toLowerCase());
  const base = [q(`Quer falar sobre ${p.focus.toLowerCase()}?`, "Fale com nossa equipe de atendimento pelo WhatsApp.")];
  const more = tags.slice(0, 3).map((t, i) => q(["Dúvida sobre", "Precisa de orientação sobre", "Quer entender mais sobre"][i] + ` ${t}?`, "Conte a situação e a equipe encaminha o caso ao profissional da área."));
  while (base.length + more.length < 4) more.push(q("Tem documentos do caso?", "Eles ajudam a equipe na análise inicial."));
  return [...base, ...more].slice(0, 4);
};
