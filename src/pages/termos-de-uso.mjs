import { esc } from "../lib/html.mjs";
import { SITE } from "../data/site.mjs";
import { LEGAL, LEGAL_PATHS } from "../data/legal.mjs";
import { legalPage, p, list, callout } from "../partials/legal.mjs";

export default function termosDeUso() {
  const privacy = `<a class="text-link" href="${LEGAL_PATHS.privacy}">Política de Privacidade</a>`;
  const mail = `<a class="text-link" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`;

  const sections = [
    {
      id: "aceitacao",
      title: "Sobre estes Termos",
      body: p(
        `Estes Termos tratam do uso do site da ${esc(SITE.name)}, incluindo as páginas institucionais, as páginas sobre áreas de atuação e a Base de Conhecimento. Ao navegar pelo site, você utiliza seus conteúdos e recursos nas condições descritas aqui.`
      ),
    },
    {
      id: "finalidade",
      title: "Finalidade do site",
      body: p("O site tem finalidade institucional, informativa e educativa. Ele serve para:") +
        list([
          "apresentar o escritório, a equipe e as áreas de atuação;",
          "disponibilizar artigos, guias e respostas a perguntas frequentes sobre temas jurídicos;",
          "oferecer canais de contato com o escritório.",
        ]),
    },
    {
      id: "conteudo-juridico",
      title: "Natureza do conteúdo jurídico",
      body:
        p(
          "Os conteúdos publicados têm caráter informativo e geral. Eles ajudam a compreender temas e caminhos possíveis, mas não substituem a análise individual de um caso concreto, que depende de documentos, datas e circunstâncias específicas.",
          "Leis, regulamentos e entendimentos dos tribunais mudam com o tempo. Os textos refletem o momento em que foram escritos e podem não estar atualizados quando você os ler."
        ) + callout("Resultados", p(`Nenhum conteúdo do site representa promessa ou garantia de resultado. Cada situação tem circunstâncias próprias. ${esc(SITE.oabNotice)}`)),
    },
    {
      id: "relacao-profissional",
      title: "Contato inicial e relação advogado-cliente",
      body: p(
        "Acessar o site, ler um artigo, consultar um guia ou enviar uma mensagem pelo formulário não estabelece, por si só, relação advogado-cliente, nem obriga o escritório a aceitar o caso ou a adotar qualquer providência.",
        "A eventual prestação de serviços depende de análise prévia e da formalização da contratação pelos procedimentos adotados pelo escritório, com definição de escopo e condições."
      ),
    },
    {
      id: "informacoes",
      title: "Informações que você envia",
      body:
        p("Ao usar os formulários, você se compromete a fornecer informações verdadeiras e a enviar dados de outras pessoas apenas quando necessário para descrever a situação.") +
        list([
          "Não envie senhas, tokens, códigos de verificação ou dados bancários e de cartão completos.",
          "Não envie documentos ou informações sensíveis que não sejam necessários para o primeiro contato.",
        ]) +
        p(`O tratamento dessas informações segue a ${privacy}.`),
    },
    {
      id: "uso-permitido",
      title: "Uso permitido",
      body:
        p("Você pode navegar pelo site e utilizar seus conteúdos para fins pessoais, informativos e legítimos. Não é permitido:") +
        list([
          "tentar acessar áreas restritas, invadir sistemas ou explorar vulnerabilidades;",
          "enviar mensagens automatizadas, em massa ou com conteúdo ilícito pelos formulários;",
          "realizar coleta automatizada abusiva de conteúdo ou sobrecarregar o site;",
          "interferir na disponibilidade ou no funcionamento do site;",
          "usar o site de forma fraudulenta, inclusive se passando por outra pessoa;",
          "violar direitos do escritório ou de terceiros.",
        ]),
    },
    {
      id: "propriedade-intelectual",
      title: "Propriedade intelectual",
      body: p(
        "A marca Vieira &amp; Marques, o layout, os textos, as fotografias próprias, os guias e os elementos gráficos do site são protegidos pela legislação de direitos autorais e de propriedade industrial. Materiais de terceiros eventualmente utilizados pertencem aos respectivos titulares.",
        "Você pode compartilhar o link das páginas e citar trechos breves com indicação da fonte. A reprodução integral, a modificação ou o uso comercial dos conteúdos depende de autorização prévia do escritório."
      ),
    },
    {
      id: "materiais",
      title: "Guias e materiais educativos",
      body: p(
        "O acesso a guias, artigos e demais materiais não transfere direitos autorais nem de propriedade intelectual. Esses materiais são disponibilizados para uso pessoal e informativo, nas condições destes Termos."
      ),
    },
    {
      id: "terceiros",
      title: "Serviços e conteúdos de terceiros",
      body: p(
        "O site contém links para serviços externos, como WhatsApp, Instagram, Facebook e Google Maps. Esses serviços são operados por terceiros, com termos e políticas próprios, e o escritório não controla seu funcionamento ou conteúdo."
      ),
    },
    {
      id: "disponibilidade",
      title: "Disponibilidade",
      body: p(
        "O site pode passar por manutenção, atualizações ou ficar temporariamente indisponível. Buscamos mantê-lo em funcionamento e com informações corretas, mas não é possível garantir operação ininterrupta ou livre de erros."
      ),
    },
    {
      id: "responsabilidade",
      title: "Responsabilidade",
      body: p(
        "Como o conteúdo é geral, decisões tomadas apenas com base nele, sem análise do caso concreto por profissional habilitado, são de responsabilidade de quem as toma. O escritório também não responde pelo conteúdo e funcionamento de serviços de terceiros acessados por links, nem por indisponibilidades temporárias do site.",
        "Essas limitações se aplicam nos limites permitidos pela legislação e não afastam responsabilidades que a lei atribua ao escritório."
      ),
    },
    {
      id: "privacidade",
      title: "Privacidade",
      body: p(`O tratamento de dados pessoais no site está descrito na ${privacy}.`),
    },
    {
      id: "alteracoes",
      title: "Alterações destes Termos",
      body: p("Estes Termos podem ser atualizados para refletir mudanças no site ou na legislação. A data da versão vigente aparece no início e no final desta página."),
    },
    {
      id: "contato",
      title: "Contato",
      body: p(`Dúvidas sobre estes Termos podem ser enviadas para ${mail}.`),
    },
    {
      id: "legislacao",
      title: "Legislação aplicável",
      body: p(`Estes Termos são regidos pela ${esc(LEGAL.applicableLaw)}.`),
    },
  ];

  return legalPage({
    path: LEGAL_PATHS.terms,
    label: "Termos de Uso",
    title: "Termos de Uso | Vieira & Marques",
    description: "Consulte os termos aplicáveis à utilização do site e dos conteúdos digitais da Vieira & Marques.",
    eyebrow: "Condições de uso",
    h1: `Termos de <span class="grad">Uso</span>`,
    intro: "As condições para utilizar o site institucional e a Base de Conhecimento da Vieira &amp; Marques: finalidade do conteúdo, contato inicial, uso permitido e propriedade intelectual.",
    sections,
    related: `O tratamento de dados pessoais está descrito na ${privacy}.`,
  });
}
