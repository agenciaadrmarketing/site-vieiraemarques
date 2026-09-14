/* ==========================================================================
   WAFlutuante — botão de WhatsApp flutuante + balão rotativo + popup de form
   Vieira & Marques. Sem dependências. Requer cta-shine.css.

   WAFlutuante.init({
     telefone: '551533470189',          // obrigatório, só dígitos com DDI
     mensagemPadrao: 'Oi, ...',         // mensagem enviada no WhatsApp
     endpointPlanilha: '',              // URL /exec do Apps Script (opcional)
     origemForm: 'lp-divorcio',         // identificador na planilha
     logo: 'uploads/logo-vm.png',       // logo no topo do popup (opcional)
     rotulo: 'Falar pelo WhatsApp',     // texto do botão flutuante
     exitIntent: true,                  // abre o popup ao tentar sair
     frases: [ { titulo, sub }, ... ]   // balões rotativos
   });
   ========================================================================== */

window.WAFlutuante = (function () {
  var cfg = {};
  var estado = { balaoVisivel: true, fraseIndex: 0, encerrado: false, msgPendente: '' };
  var els = {};
  var timers = {};

  var VISIVEL = [7000, 9000, 6500, 8000];
  var OCULTO = [5000, 11000, 7000, 14000];

  function init(opcoes) {
    cfg = Object.assign({
      telefone: '',
      mensagemPadrao: 'Olá! Vim pelo site.',
      endpointPlanilha: '',
      origemForm: 'site',
      logo: '',
      rotulo: 'Falar pelo WhatsApp',
      exitIntent: true,
      frases: []
    }, opcoes || {});

    estado.msgPendente = cfg.mensagemPadrao;
    capturarUtm();
    montarFlutuante();
    ligarBotoes();
    if (cfg.frases.length) girarFrases();
    if (cfg.exitIntent) ligarExitIntent();
  }

  /* ---------- botão flutuante + balão ---------- */

  function montarFlutuante() {
    var wrap = document.createElement('div');
    wrap.className = 'wa-flutuante';

    var botao = document.createElement('a');
    botao.href = linkWhatsapp(cfg.mensagemPadrao);
    botao.target = '_blank';
    botao.rel = 'noopener';
    botao.className = 'cta-shine';
    botao.setAttribute('aria-label', cfg.rotulo);
    botao.style.cssText = 'color:#FFFFFF; padding:15px 22px; border-radius:999px; font-size:15px; font-weight:600;';
    botao.textContent = cfg.rotulo;
    botao.setAttribute('data-wa-msg', cfg.mensagemPadrao);

    wrap.appendChild(botao);
    document.body.appendChild(wrap);

    els.wrap = wrap;
    els.botao = botao;
    if (cfg.frases.length) renderBalao();
  }

  function renderBalao() {
    if (els.balao) { els.balao.remove(); els.balao = null; }
    if (!estado.balaoVisivel || estado.encerrado) return;

    var f = cfg.frases[estado.fraseIndex % cfg.frases.length];
    var balao = document.createElement('div');
    balao.className = 'wa-balao';
    balao.innerHTML =
      '<button class="wa-balao__fechar" aria-label="Fechar">&times;</button>' +
      '<p class="wa-balao__titulo"></p>' +
      '<p class="wa-balao__sub"></p>' +
      '<span class="wa-balao__bico"></span>';
    balao.querySelector('.wa-balao__titulo').textContent = f.titulo || '';
    balao.querySelector('.wa-balao__sub').textContent = f.sub || '';
    balao.querySelector('.wa-balao__fechar').addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      estado.balaoVisivel = false;
      estado.encerrado = true;
      clearTimeout(timers.t1);
      clearTimeout(timers.t2);
      renderBalao();
    });

    els.wrap.insertBefore(balao, els.botao);
    els.balao = balao;
  }

  function girarFrases() {
    function ciclo() {
      if (estado.encerrado) return;
      var i = estado.fraseIndex;
      timers.t1 = setTimeout(function () {
        estado.balaoVisivel = false;
        renderBalao();
        timers.t2 = setTimeout(function () {
          if (estado.encerrado) return;
          estado.fraseIndex = i + 1;
          estado.balaoVisivel = true;
          renderBalao();
          ciclo();
        }, OCULTO[i % OCULTO.length]);
      }, VISIVEL[i % VISIVEL.length]);
    }
    ciclo();
  }

  /* ---------- popup de formulário ---------- */

  function ligarBotoes() {
    document.addEventListener('click', function (ev) {
      var el = ev.target.closest && ev.target.closest('[data-wa-msg]');
      if (!el) return;
      ev.preventDefault();
      abrir(el.getAttribute('data-wa-msg') || cfg.mensagemPadrao);
    });
  }

  function abrir(msg, titulo, sub) {
    if (els.veil) return;
    estado.msgPendente = msg || cfg.mensagemPadrao;

    var veil = document.createElement('div');
    veil.className = 'wa-veil';
    veil.setAttribute('role', 'dialog');
    veil.setAttribute('aria-modal', 'true');
    veil.innerHTML =
      '<div class="wa-veil__bg"></div>' +
      '<div class="wa-pop">' +
        '<button type="button" class="wa-pop__fechar" aria-label="Fechar formulário">&times;</button>' +
        (cfg.logo ? '<img class="wa-pop__logo" src="' + cfg.logo + '" alt="">' : '') +
        '<h2 class="wa-pop__titulo"></h2>' +
        '<p class="wa-pop__sub"></p>' +
        '<form class="wa-pop__form" novalidate>' +
          '<label class="wa-pop__label"><span>Nome completo</span>' +
            '<input class="wa-pop__input" name="nome" type="text" autocomplete="name" placeholder="Seu nome" required></label>' +
          '<label class="wa-pop__label"><span>WhatsApp</span>' +
            '<input class="wa-pop__input" name="tel" type="tel" autocomplete="tel" placeholder="(15) 90000-0000" required></label>' +
          '<label class="wa-pop__label"><span>E-mail (opcional)</span>' +
            '<input class="wa-pop__input" name="email" type="email" autocomplete="email" placeholder="seu@email.com"></label>' +
          '<p class="wa-pop__erro" role="alert" hidden></p>' +
          '<button type="submit" class="wa-pop__submit cta-shine">Continuar no WhatsApp</button>' +
          '<p class="wa-pop__aviso">Seus dados são sigilosos. Nada de spam.</p>' +
        '</form>' +
      '</div>';

    veil.querySelector('.wa-pop__titulo').textContent = titulo || 'Vamos conversar?';
    veil.querySelector('.wa-pop__sub').textContent = sub || 'Deixe seu nome e WhatsApp — a mensagem já vai pronta.';
    veil.querySelector('.wa-veil__bg').addEventListener('click', fechar);
    veil.querySelector('.wa-pop__fechar').addEventListener('click', fechar);
    veil.querySelector('form').addEventListener('submit', enviar);

    document.body.appendChild(veil);
    els.veil = veil;
    setTimeout(function () { veil.querySelector('input[name="nome"]').focus(); }, 420);
    document.addEventListener('keydown', onEsc);
  }

  function onEsc(e) { if (e.key === 'Escape') fechar(); }

  function fechar() {
    if (!els.veil) return;
    els.veil.remove();
    els.veil = null;
    document.removeEventListener('keydown', onEsc);
  }

  function enviar(e) {
    e.preventDefault();
    var form = e.currentTarget;
    var nome = form.nome.value.trim();
    var tel = form.tel.value.trim();
    var email = form.email.value.trim();
    var erro = form.parentNode.querySelector('.wa-pop__erro');

    if (!nome || !tel) {
      erro.textContent = 'Preciso do seu nome e WhatsApp para continuar.';
      erro.hidden = false;
      return;
    }
    erro.hidden = true;

    enviarPlanilha(nome, email, tel);

    var linhas = [estado.msgPendente || 'Olá!', '', 'Nome: ' + nome];
    if (email) linhas.push('E-mail: ' + email);
    linhas.push('Telefone: ' + tel);

    window.open(linkWhatsapp(linhas.join('\n')), '_blank', 'noopener,noreferrer');
    try { sessionStorage.setItem('wa_lead_enviado', '1'); } catch (err) {}
    fechar();
  }

  /* ---------- planilha (Apps Script) ---------- */

  function capturarUtm() {
    try {
      if (sessionStorage.getItem('wa_utm')) return;
      var q = new URLSearchParams(window.location.search);
      var utm = {
        utm_source: q.get('utm_source') || '', utm_medium: q.get('utm_medium') || '',
        utm_campaign: q.get('utm_campaign') || '', utm_term: q.get('utm_term') || '',
        utm_content: q.get('utm_content') || '', gclid: q.get('gclid') || '', fbclid: q.get('fbclid') || ''
      };
      sessionStorage.setItem('wa_utm', JSON.stringify(utm));
    } catch (err) {}
  }

  function enviarPlanilha(nome, email, tel) {
    if (!cfg.endpointPlanilha) return;
    var utm = {};
    try { utm = JSON.parse(sessionStorage.getItem('wa_utm') || '{}'); } catch (err) {}
    var dados = Object.assign({
      nome: nome, email: email, whatsapp: tel,
      mensagem: estado.msgPendente || '',
      origem_form: cfg.origemForm,
      pagina: window.location.href
    }, utm);
    var qs = Object.keys(dados).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(dados[k] || '');
    }).join('&');
    try { new Image().src = cfg.endpointPlanilha + '?' + qs; } catch (err) {}
    try { fetch(cfg.endpointPlanilha, { method: 'POST', mode: 'no-cors', body: JSON.stringify(dados) }); } catch (err) {}
  }

  /* ---------- exit intent ---------- */

  function ligarExitIntent() {
    if (window.innerWidth < 900) return;
    var ja = false;
    try {
      ja = sessionStorage.getItem('wa_exit_mostrado') === '1' ||
           sessionStorage.getItem('wa_lead_enviado') === '1';
    } catch (err) {}
    if (ja) return;

    function handler(ev) {
      if (ev.clientY > 0 || els.veil) return;
      try { sessionStorage.setItem('wa_exit_mostrado', '1'); } catch (err) {}
      document.removeEventListener('mouseout', handler);
      abrir(cfg.mensagemPadrao, 'Antes de você ir...', 'Se ainda tem dúvidas, deixe seu contato — a gente te responde pelo WhatsApp.');
    }
    setTimeout(function () { document.addEventListener('mouseout', handler); }, 8000);
  }

  /* ---------- utilidades ---------- */

  function linkWhatsapp(texto) {
    var fone = String(cfg.telefone || '').replace(/\D/g, '');
    return 'https://api.whatsapp.com/send/?phone=' + fone + '&text=' + encodeURIComponent(texto || '');
  }

  return { init: init, abrir: abrir, fechar: fechar };
})();
