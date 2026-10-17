import { esc } from "../lib/html.mjs";
import { SITE, isPending } from "../data/site.mjs";
import { LEGAL, DATA_FLOWS, LEGAL_PATHS } from "../data/legal.mjs";
import { legalPage, p, h3, list, steps, callout, table } from "../partials/legal.mjs";

// Texto baseado na auditoria do código do site (contato por WhatsApp, formulário quando
// ativo, armazenamento de sessão, ausência de cookies próprios e de ferramentas de medição).
// O texto acompanha SITE.forms e SITE.leadEndpoint via DATA_FLOWS (src/data/legal.mjs).
export default function politicaDePrivacidade() {
  const sede = SITE.units[0];
  const { forms, leadSheet: sheet } = DATA_FLOWS;
  const tools = [...DATA_FLOWS.analytics, ...DATA_FLOWS.advertising];
  const measuring = tools.length > 0;
  const toolList = tools.join(" e ");
  // Só o GTM das landing pages ativo: o aviso de cookies aparece apenas nas páginas de campanha.
  const campaignOnly = Boolean(SITE.measurement.gtm) && !SITE.measurement.ga4 && !SITE.measurement.metaPixel;
  const hosting = isPending(LEGAL.hostingProvider) ? "" : esc(LEGAL.hostingProvider);
  const mail = `<a class="text-link" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`;
  const phone = `<a class="text-link" href="${SITE.phone.href}">${SITE.phone.display}</a>`;
  const hours = isPending(SITE.hours) ? "" : ` (${esc(SITE.hours.toLowerCase())})`;
  const terms = `<a class="text-link" href="${LEGAL_PATHS.terms}">Termos de Uso</a>`;

  const sections = [
    {
      id: "controlador",
      title: "Quem é responsável pelos seus dados",
      body:
        p(
          `A <strong>${esc(SITE.name)}</strong> é a controladora dos dados pessoais tratados por meio deste site, ou seja, é quem decide como e para que esses dados são utilizados.`
        ) +
        list([
          `Endereço: ${esc(sede.street)}, ${esc(sede.district)}, ${esc(sede.city)}/${esc(sede.region)}, CEP ${esc(sede.postalCode)}`,
          ...(isPending(SITE.cnpj) ? [] : [`CNPJ: ${esc(SITE.cnpj)}`]),
          `E-mail: ${mail}`,
          `Telefone: ${phone}`,
        ]),
    },
    {
      id: "dados",
      title: "Quais dados podem ser tratados",
      body:
        h3("Dados que você informa") +
        (forms
          ? p("Ao preencher um formulário do site, você informa:") +
            list([
              "nome e número de WhatsApp;",
              "e-mail, cidade e estado, se quiser informá-los;",
              "o assunto ou a área de interesse;",
              "as respostas às perguntas da página — por exemplo, se já houve desligamento da empresa, o tipo de contrato ou a faixa de valor envolvida;",
              "a mensagem que você escrever.",
            ])
          : p(
              "O site não tem formulário de contato. Quando você conversa com o escritório pelo WhatsApp, por telefone ou por e-mail, são tratados os dados que você decidir compartilhar — normalmente nome, número de telefone, o assunto e o relato da situação.",
              "Os botões de WhatsApp do site abrem a conversa com uma mensagem inicial que indica o assunto da página visitada (por exemplo, “divórcio” ou “golpe do Pix”). Essa mensagem só é enviada se você a confirmar no aplicativo."
            )) +
        (forms
          ? h3("Dados sobre a origem do acesso") +
            p(
              "Para identificar como o contato chegou ao site, o navegador guarda, durante a sessão, a primeira página acessada, o endereço da página anterior (quando o navegador o informa) e, se estiverem presentes no link, parâmetros de campanha: utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid e fbclid.",
              sheet
                ? "Essas informações são enviadas ao escritório junto com o formulário, além do título e do endereço da página em que ele foi preenchido e da data e hora do envio."
                : "Atualmente, essas informações permanecem no seu navegador e não são enviadas ao escritório."
            )
          : "") +
        h3("Dados técnicos da conexão") +
        p(
          `Para exibir as páginas, o servidor de hospedagem${hosting ? ` (${hosting})` : ""} recebe dados técnicos da conexão, como endereço IP, data e hora, página solicitada e tipo de navegador. Esses registros podem ser mantidos pelo provedor de hospedagem por razões de segurança e funcionamento, conforme as regras aplicáveis.`
        ),
    },
    {
      id: "sensiveis",
      title: "Informações sensíveis e dados de terceiros",
      body:
        p(
          "Por se tratar de um escritório de advocacia, uma mensagem pode envolver situações pessoais, de saúde, familiares ou financeiras. O primeiro contato serve para entender o assunto: basta uma descrição breve."
        ) +
        callout(
          "Antes de enviar",
          p(
            "Evite enviar, no primeiro contato, documentos, senhas, dados bancários completos ou outras informações sensíveis que não sejam necessárias para o primeiro contato. O escritório nunca solicita senhas, tokens, códigos de verificação ou números completos de cartão."
          )
        ) +
        p(
          "Casos de família, guarda, pensão ou saúde podem envolver crianças e adolescentes. Nesses casos, informe apenas o indispensável para descrever a situação. Dados de menores eventualmente recebidos são tratados no melhor interesse deles e somente para a finalidade do atendimento solicitado."
        ),
    },
    {
      id: "formularios",
      title: forms ? "Como funcionam os formulários" : "Como funciona o contato pelo site",
      body: !forms
        ? p("O contato pelo site é feito diretamente pelo WhatsApp:") +
          steps([
            "Você toca em um botão de WhatsApp. O aplicativo (ou o WhatsApp Web) abre uma conversa com o número do escritório e uma mensagem inicial sobre o assunto da página.",
            "Você pode revisar, alterar ou apagar essa mensagem — ou desistir do envio. Nada é transmitido ao escritório pelo site.",
            "Se decidir enviar, a conversa continua no WhatsApp, e o escritório passa a tratar as informações que você compartilhar ali.",
            "A conversa é atendida inicialmente pela equipe de atendimento do escritório, que faz a triagem e, quando aplicável, encaminha o caso internamente ao advogado ou profissional responsável pela área.",
          ]) +
          p("O site não coleta nem armazena mensagens, nomes ou números de telefone.")
        : sheet
        ? p("O caminho das informações enviadas pelo site é este:") +
          steps([
            "Você preenche o formulário. Os campos são conferidos no próprio navegador antes do envio.",
            "As informações são registradas em uma ferramenta de planilha em nuvem utilizada pelo escritório para organizar os contatos recebidos.",
            "A equipe é avisada do novo contato e encaminha a solicitação à área adequada.",
            "O retorno é feito pelo WhatsApp ou pelo e-mail informado. Se preferir, você pode iniciar a conversa pelo WhatsApp logo após o envio.",
          ])
        : p("O caminho das informações enviadas pelo site é este:") +
          steps([
            "Você preenche o formulário. Os campos são conferidos no próprio navegador.",
            "Ao confirmar, o site abre o WhatsApp com uma mensagem já redigida, contendo seu nome, o assunto, as respostas e o texto escrito por você.",
            "Nada é transmitido ao escritório até que você envie essa mensagem no WhatsApp. Você pode revisá-la, alterá-la ou desistir do envio.",
            "A partir do envio, o atendimento continua pela conversa no WhatsApp.",
          ]) +
          p("O site não mantém banco de dados próprio com as mensagens preenchidas no formulário."),
    },
    {
      id: "whatsapp",
      title: "WhatsApp e outros serviços externos",
      body: p(
        "Ao seguir para o WhatsApp, você passa a usar também uma plataforma de terceiro, operada por empresa própria e sujeita às suas políticas e termos. O escritório trata as informações que recebe na conversa, mas não controla o tratamento realizado pela própria plataforma.",
        "O mesmo vale para os links do site que levam ao Instagram, ao Facebook e ao Google Maps: ao abri-los, você sai deste site, e as práticas de privacidade passam a ser as desses serviços."
      ),
    },
    {
      id: "finalidades",
      title: "Para que utilizamos seus dados e com qual base legal",
      body:
        p(
          "A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) prevê diferentes bases legais para o tratamento. Nem todo tratamento depende de consentimento: cada finalidade tem a sua."
        ) +
        table({
          caption: "Finalidades e bases legais do tratamento",
          head: ["Finalidade", "Base legal"],
          rows: [
            ["Responder à sua solicitação e organizar o primeiro atendimento", "Procedimentos preliminares relacionados a contrato, a pedido do titular"],
            ["Encaminhar o contato à área de atuação adequada", "Procedimentos preliminares relacionados a contrato, a pedido do titular"],
            ...(measuring ? [[`Medir a audiência do site${DATA_FLOWS.advertising.length ? " e o resultado de campanhas" : ""}, com ${esc(toolList)}`, "Consentimento, que pode ser revogado a qualquer momento"]] : []),
            ...(sheet ? [["Identificar a origem do contato (página e campanha)", "Legítimo interesse do escritório em entender como é encontrado, com dados limitados ao necessário"]] : []),
            forms
              ? ["Evitar envios automáticos e abusos nos formulários", "Legítimo interesse, para a segurança do site e de quem o utiliza"]
              : ["Manter o site seguro e disponível", "Legítimo interesse, para a segurança do site e de quem o utiliza"],
            ["Guardar registros técnicos de acesso, quando exigido", "Cumprimento de obrigação legal ou regulatória"],
            ["Informações sensíveis que você decida incluir na mensagem", "Tratamento limitado ao necessário para avaliar a solicitação, nas hipóteses do art. 11 da LGPD, como o exercício regular de direitos"],
            ["Defender direitos em eventual processo administrativo ou judicial", "Exercício regular de direitos"],
          ],
        }) +
        p(`Os dados que você informa não são vendidos nem utilizados para envio de publicidade.${DATA_FLOWS.advertising.length ? " As ferramentas de campanha descritas na seção de cookies servem para medir o resultado dos anúncios e só são ativadas com a sua autorização." : ""}`),
    },
    {
      id: "cookies",
      title: "Cookies e tecnologias semelhantes",
      // Com ferramentas de medição, o texto descreve o aviso de cookies; sem elas, informa que não há
      // aviso. Os parágrafos de armazenamento de sessão, mapa e avaliações valem nos dois casos.
      body:
        (measuring
          ? p(
              `O site não cria cookies próprios. Com a sua autorização, utiliza ferramentas de medição de terceiros — ${esc(toolList)} — que usam cookies e identificadores para gerar estatísticas de uso${DATA_FLOWS.advertising.length ? " e medir o resultado de campanhas" : ""}.`,
              `Essas ferramentas só são carregadas depois que você clica em “Aceitar” no aviso exibido na primeira visita${campaignOnly ? " a uma página de campanha" : ""}. Se recusar, nenhuma delas é ativada e o site funciona normalmente.`,
              `A sua escolha fica guardada no armazenamento do navegador (localStorage), sem identificar você, e pode ser alterada a qualquer momento em “Preferências de cookies”, no rodapé${campaignOnly ? " das páginas de campanha" : ""}.`,
              "As fontes, as imagens e os demais scripts do site — inclusive a biblioteca de código aberto usada na rolagem suave — são servidos pelo próprio site."
            )
          : p(
              "O site não cria cookies próprios e não utiliza, atualmente, ferramentas de análise de audiência, de publicidade, de mapas de calor ou de gravação de sessão — como Google Analytics, Google Tag Manager, Google Ads ou Meta Pixel. As fontes, as imagens e os scripts — inclusive a biblioteca de código aberto usada na rolagem suave — são servidos pelo próprio site, sem incorporações de serviços de terceiros."
            )) +
        (forms
          ? p("O site usa o armazenamento de sessão do navegador (sessionStorage), que é apagado quando a aba é fechada, para:") +
            list([
              "<strong>Origem do acesso</strong> — guardar a página de entrada, a página anterior e os parâmetros de campanha descritos na seção 2;",
              "<strong>Proteção contra envios repetidos</strong> — registrar o horário do último envio de formulário, evitando duplicidades.",
              "<strong>Animação de abertura</strong> — lembrar, durante a visita, que a tela de abertura já foi exibida, sem identificar você.",
            ])
          : p("O site usa o armazenamento de sessão do navegador (sessionStorage) apenas para lembrar, durante a visita, que a animação de abertura já foi exibida. Esse marcador não identifica você e é apagado quando a aba é fechada.")) +
        (measuring
          ? p(`O site registra eventos de navegação — como cliques em botões — em uma variável interna da página. Esses eventos só são enviados às ferramentas de medição${campaignOnly ? ", nas páginas de campanha," : ""} depois do seu aceite; sem ele, não saem do seu navegador.`)
          : p(
              "O site registra eventos de navegação — como cliques em botões — em uma variável interna da página, preparada para uma futura ferramenta de medição. Esses eventos não saem do seu navegador e não são enviados a nenhum serviço.",
              "Por não haver cookies ou tecnologias de rastreamento não essenciais, o site não exibe aviso de consentimento de cookies. Se ferramentas desse tipo forem adotadas, esta Política será atualizada e você poderá aceitá-las ou recusá-las antes de serem ativadas."
            )) +
        (SITE.mapEmbed
          ? p("O mapa “Como chegar”, acima do rodapé, só é carregado se você clicar em “Carregar mapa interativo”. Nesse momento o Google Maps passa a fornecer o mapa e pode receber o seu endereço IP e usar cookies, conforme a política do Google. Sem o clique, nenhum serviço do Google é acionado por esse mapa.")
          : "") +
        (SITE.googleReviews
          ? p("A seção de avaliações exibe comentários publicados por clientes no Google. Eles são consultados pelo servidor do site, sem o seu navegador acessar o Google para isso; apenas as fotos de perfil dos autores, quando existirem, são carregadas dos servidores do Google, que pode receber o seu endereço IP nessa requisição.")
          : ""),
    },
    {
      id: "compartilhamento",
      title: "Com quem os dados podem ser compartilhados",
      body:
        p("Os dados são compartilhados somente na medida necessária para as finalidades descritas:") +
        list([
          hosting
            ? `<strong>Hospedagem</strong> — a ${hosting}, empresa que mantém o site no ar, recebe os dados técnicos da conexão;`
            : "<strong>Hospedagem</strong> — o provedor que mantém o site no ar recebe os dados técnicos da conexão;",
          ...(sheet ? ["<strong>Ferramentas de produtividade em nuvem</strong> — a planilha e o e-mail usados para registrar e organizar os contatos recebidos;"] : []),
          "<strong>Mensageria</strong> — o WhatsApp, quando você opta por continuar a conversa por ele;",
          ...(measuring ? [`<strong>Medição de audiência</strong> — ${esc(toolList)}, somente se você autorizar no aviso de cookies;`] : []),
          "<strong>Autoridades</strong> — quando houver obrigação legal, ordem judicial ou necessidade de defesa de direitos.",
        ]),
    },
    {
      id: "transferencia",
      title: "Transferência internacional",
      body: p(
        `Alguns serviços utilizados${sheet ? " — como o WhatsApp e as ferramentas de planilha e e-mail em nuvem —" : measuring ? ` — como o WhatsApp e ${esc(toolList)} —` : ", como o WhatsApp,"} são operados por empresas que podem processar dados em servidores localizados fora do Brasil. Nesses casos, a transferência ocorre nas hipóteses admitidas pela LGPD e conforme as garantias oferecidas por esses fornecedores.`,
        hosting
          ? `A hospedagem do site é contratada com a ${hosting}, que mantém o servidor deste site nos Estados Unidos (Arizona), com cópias de segurança também nos Estados Unidos (Boston). Os dados técnicos da conexão e as informações do site são, portanto, processados fora do Brasil, nas mesmas condições.`
          : ""
      ),
    },
    {
      id: "retencao",
      title: "Por quanto tempo mantemos os dados",
      body:
        p(
          "Os dados pessoais serão mantidos pelo período necessário para o cumprimento das finalidades que justificaram sua coleta e tratamento, bem como pelo período necessário ao cumprimento de obrigações legais ou regulatórias e ao exercício regular de direitos. Encerrada a finalidade e inexistindo fundamento para sua conservação, os dados serão eliminados ou anonimizados, observados os limites técnicos e legais aplicáveis."
        ) +
        p(
          "No caso de clientes, os dados pessoais e os dados processuais permanecem na base de dados do escritório, sem prazo de eliminação definido, em razão do dever de guarda da documentação do caso, do cumprimento de obrigações legais e regulatórias e do exercício regular de direitos. O compromisso do escritório de fornecer dados e documentos ao cliente se encerra com a conclusão do contrato de prestação de serviços."
        ),
    },
    {
      id: "direitos",
      title: "Seus direitos",
      body:
        p("A LGPD garante ao titular dos dados, nos termos e limites da lei, os direitos de:") +
        list([
          "confirmar se seus dados são tratados e acessá-los;",
          "corrigir dados incompletos, inexatos ou desatualizados;",
          "pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;",
          "pedir a portabilidade dos dados, conforme a regulamentação da Autoridade Nacional de Proteção de Dados (ANPD);",
          "saber com quais entidades os dados foram compartilhados;",
          "ser informado sobre a possibilidade de não fornecer consentimento e suas consequências, quando o tratamento depender dele;",
          "revogar o consentimento, quando ele for a base do tratamento;",
          "opor-se a tratamento realizado em desconformidade com a lei;",
          "pedir a revisão de decisões tomadas unicamente com base em tratamento automatizado, se houver.",
        ]) +
        p(
          "Alguns pedidos podem ter limites. A eliminação, por exemplo, não alcança dados que precisem ser mantidos para cumprir obrigação legal ou para o exercício regular de direitos. Quando isso ocorrer, você será informado do motivo.",
          "Você também pode apresentar reclamação à ANPD."
        ),
    },
    {
      id: "contato",
      title: "Como falar conosco sobre seus dados",
      body:
        (LEGAL.privacyChannelApproved
          ? p(
              `Para exercer seus direitos ou tirar dúvidas sobre esta Política, entre em contato pelo e-mail ${mail}, indicando no assunto “Privacidade”. Também é possível usar o telefone ${phone}${hours}.`,
              "Esse é o canal do escritório para assuntos de proteção de dados pessoais, inclusive para comunicações da Autoridade Nacional de Proteção de Dados (ANPD)."
            )
          : p(`Para exercer seus direitos ou tirar dúvidas sobre esta Política, entre em contato com o escritório pelo telefone ${phone}${hours} ou na sede indicada na seção 1, informando que o assunto é privacidade e dados pessoais.`)) +
        p("Para proteger seus dados, poderemos pedir informações que confirmem sua identidade antes de atender à solicitação."),
    },
    {
      id: "seguranca",
      title: "Segurança e incidentes",
      body: p(
        "Adotamos medidas técnicas e administrativas destinadas a proteger os dados pessoais contra acessos não autorizados e situações acidentais ou ilícitas. O site funciona com conexão criptografada (HTTPS), e o acesso às informações recebidas é restrito a quem precisa delas para o atendimento.",
        "Nenhum sistema é totalmente imune a falhas. Se ocorrer um incidente de segurança que possa acarretar risco ou dano relevante aos titulares, o escritório adotará as medidas cabíveis e fará as comunicações previstas na legislação."
      ),
    },
    {
      id: "alteracoes",
      title: "Alterações desta Política",
      body: p(
        "Esta Política pode ser atualizada para refletir mudanças no site, nos serviços utilizados ou na legislação. A data da versão vigente aparece no início e no final desta página. Mudanças relevantes, como a adoção de novas ferramentas de medição, serão indicadas aqui antes de entrarem em funcionamento."
      ),
    },
  ];

  return legalPage({
    path: LEGAL_PATHS.privacy,
    label: "Política de Privacidade",
    title: "Política de Privacidade | Vieira & Marques",
    description: "Consulte informações sobre privacidade e tratamento de dados pessoais nos canais digitais da Vieira & Marques.",
    eyebrow: "Privacidade e LGPD",
    h1: `Política de <span class="grad">Privacidade</span>`,
    intro: "Este documento explica como os dados pessoais podem ser tratados durante a utilização dos canais digitais da Vieira &amp; Marques: o que é coletado, para quê, com quem é compartilhado e como você pode exercer seus direitos.",
    sections,
    whatsappMessage: "Olá! Vim pelo site da Vieira & Marques e tenho uma dúvida sobre privacidade e meus dados pessoais.",
    related: `As condições de uso do site estão nos ${terms}.`,
  });
}
