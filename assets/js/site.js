/* Vieira & Marques — comportamento compartilhado. Sem dependências. */
(function () {
  "use strict";

  // Só oculta conteúdo para a revelação quando este script de fato executa.
  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Origem do lead (primeiro toque na sessão) ---------- */
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
  function captureOrigin() {
    try {
      if (sessionStorage.getItem("vm_origem")) return;
      var q = new URLSearchParams(window.location.search);
      var data = { landing_page: window.location.href, referrer: document.referrer || "" };
      UTM_KEYS.forEach(function (k) { data[k] = q.get(k) || ""; });
      sessionStorage.setItem("vm_origem", JSON.stringify(data));
    } catch (e) { /* storage indisponível: segue sem origem */ }
  }
  function readOrigin() {
    try { return JSON.parse(sessionStorage.getItem("vm_origem") || "{}"); } catch (e) { return {}; }
  }

  /* ---------- Menu mobile ---------- */
  function initMenu() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var menu = document.querySelector("[data-menu]");
    if (!toggle || !menu) return;
    var label = toggle.querySelector(".sr-only");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? "Fechar menu" : "Abrir menu";
      menu.hidden = !open;
      document.body.classList.toggle("menu-open", open);
      if (open) {
        var first = menu.querySelector("a");
        if (first) first.focus();
      }
    }
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1080 && toggle.getAttribute("aria-expanded") === "true") setOpen(false);
    });
  }

  /* ---------- Revelação suave ---------- */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.04 });
    items.forEach(function (el) {
      // Conteúdo acima da dobra ao abrir a página por âncora não deve ficar oculto.
      if (el.getBoundingClientRect().bottom < window.innerHeight) el.classList.add("is-visible");
      else io.observe(el);
    });
  }

  /* ---------- WhatsApp flutuante ---------- */
  function initFloat() {
    var el = document.querySelector("[data-wa-float]");
    if (!el) return;
    var ticking = false;
    function update() {
      ticking = false;
      var show = window.scrollY > window.innerHeight * 0.6;
      el.setAttribute("data-hidden", show ? "false" : "true");
      el.tabIndex = show ? 0 : -1;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Hub de áreas: índice ativo ---------- */
  function initHub() {
    var nav = document.querySelector("[data-hub-nav]");
    var sections = Array.prototype.slice.call(document.querySelectorAll("[data-hub-section]"));
    if (!nav || !sections.length) return;
    var links = {};
    nav.querySelectorAll("[data-hub-link]").forEach(function (a) { links[a.getAttribute("data-hub-link")] = a; });
    var current = null;

    function activate(id) {
      if (id === current) return;
      current = id;
      Object.keys(links).forEach(function (k) {
        if (k === id) links[k].setAttribute("aria-current", "true");
        else links[k].removeAttribute("aria-current");
      });
      var link = links[id];
      if (link && window.innerWidth < 1040) {
        var left = link.offsetLeft - (nav.clientWidth - link.clientWidth) / 2;
        nav.scrollTo({ left: left, behavior: reduceMotion ? "auto" : "smooth" });
      }
    }
    // Ativa a última seção cujo topo já passou de 35% da altura da janela.
    function update() {
      ticking = false;
      var line = window.innerHeight * 0.35;
      var active = sections[0].id;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= line) active = sections[i].id;
      }
      activate(active);
    }
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Filtros da base de conhecimento ---------- */
  function initFilters() {
    var scope = document.querySelector("[data-filter-scope]");
    if (!scope) return;
    var chips = scope.querySelectorAll("[data-filter]");
    var items = scope.querySelectorAll("[data-filter-item]");
    var blocks = scope.querySelectorAll("[data-filter-block]");
    var empty = scope.querySelector("[data-filter-empty]");
    var emptyLink = scope.querySelector("[data-filter-area-link]");
    var status = scope.querySelector("[data-filter-status]");

    function apply(area, updateUrl) {
      var shown = 0;
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-filter") === area)); });
      items.forEach(function (it) {
        var match = area === "todos" || it.getAttribute("data-area") === area;
        it.hidden = !match;
        if (match) shown++;
      });
      blocks.forEach(function (b) { b.hidden = !b.querySelector("[data-filter-item]:not([hidden])"); });
      if (empty) empty.hidden = shown > 0;
      if (emptyLink) emptyLink.href = "/areas-de-atuacao/" + (area === "todos" ? "" : "#" + area);
      if (status) status.textContent = shown ? shown + " conteúdo(s) exibido(s)." : "Nenhum conteúdo nesta área ainda.";
      if (updateUrl && window.history.replaceState) {
        var url = new URL(window.location.href);
        if (area === "todos") url.searchParams.delete("area"); else url.searchParams.set("area", area);
        window.history.replaceState(null, "", url);
      }
    }
    chips.forEach(function (c) {
      c.addEventListener("click", function () { apply(c.getAttribute("data-filter"), true); });
    });
    var initial = new URLSearchParams(window.location.search).get("area");
    if (initial && scope.querySelector('[data-filter="' + initial.replace(/[^a-z-]/g, "") + '"]')) apply(initial, false);
  }

  /* ---------- Rastreio (dataLayer) ---------- */
  var pageCtx = (function () {
    var el = document.querySelector("[data-service-page]");
    return el ? { practice_area: el.getAttribute("data-practice-area"), service: el.getAttribute("data-service") } : null;
  })();
  function track(event, params) {
    window.dataLayer = window.dataLayer || [];
    var data = { event: event, page_path: window.location.pathname };
    if (pageCtx) { data.practice_area = pageCtx.practice_area; data.service = pageCtx.service; }
    Object.keys(params || {}).forEach(function (k) { data[k] = params[k]; });
    window.dataLayer.push(data);
  }

  /* ---------- Formulário de lead (contato e serviços) ---------- */
  var LIMITS = { nome: 120, whatsapp: 30, email: 160, cidade: 80, mensagem: 2000, text: 80 };
  var MIN_FILL_MS = 2500;
  var THROTTLE_MS = 30000;

  function clean(value, max) {
    return String(value || "")
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      .replace(/[ \t]+/g, " ")
      .trim()
      .slice(0, max);
  }

  function initLeadForm() {
    var form = document.querySelector("[data-lead-form]");
    if (!form) return;
    var panel = form.parentNode;
    var success = panel.querySelector("[data-success]");
    var statusEl = form.querySelector("[data-status]");
    var submit = form.querySelector("[data-submit]");
    var endpoint = (form.getAttribute("data-endpoint") || "").trim();
    var waNumber = form.getAttribute("data-whatsapp");
    var formId = form.getAttribute("data-form-id") || "site_contato";
    var ctx = {
      practice_area: form.getAttribute("data-practice-area") || "",
      service: form.getAttribute("data-service") || "",
    };
    var startedAt = Date.now();
    var started = false;
    var sending = false;
    var questions = Array.prototype.slice.call(form.querySelectorAll("[data-question]"));
    var areaSelect = form.elements.area && form.elements.area.tagName === "SELECT" ? form.elements.area : null;

    // Contato: ?area= e ?servico= chegam dos links das páginas de área e serviço.
    var params = new URLSearchParams(window.location.search);
    var map = {};
    try { map = JSON.parse(form.getAttribute("data-service-map") || "{}"); } catch (e) { map = {}; }
    var servicoParam = (params.get("servico") || "").replace(/[^a-z-]/g, "");
    if (map[servicoParam]) {
      ctx.service = map[servicoParam].t;
      ctx.practice_area = map[servicoParam].at;
      if (areaSelect) areaSelect.value = map[servicoParam].a;
    }
    var areaParam = (params.get("area") || "").replace(/[^a-z-]/g, "");
    if (areaSelect && areaParam && areaSelect.querySelector('option[value="' + areaParam + '"]')) areaSelect.value = areaParam;

    function valueOf(name) {
      var el = form.elements[name];
      if (!el) return "";
      if (typeof RadioNodeList !== "undefined" && el instanceof RadioNodeList) return el.value || "";
      return el.value || "";
    }
    function labelOf(name) {
      var q = form.querySelector('[data-question="' + name + '"]');
      if (!q) return name;
      var lbl = q.tagName === "FIELDSET" ? q.querySelector("legend") : form.querySelector('label[for="lead-' + name + '"]');
      return lbl ? lbl.childNodes[0].textContent.trim() : name;
    }
    function displayValue(name) {
      var el = form.elements[name];
      if (el && el.tagName === "SELECT") { var o = el.options[el.selectedIndex]; return o && o.value ? o.textContent : ""; }
      return valueOf(name);
    }

    // Perguntas condicionais (showIf)
    var conditionals = Array.prototype.slice.call(form.querySelectorAll("[data-show-if]"));
    function updateConditionals() {
      conditionals.forEach(function (el) {
        var rule = {};
        try { rule = JSON.parse(el.getAttribute("data-show-if")); } catch (e) { rule = {}; }
        var show = Object.keys(rule).every(function (k) { return valueOf(k) === rule[k]; });
        el.hidden = !show;
        if (!show) el.querySelectorAll("input, select, textarea").forEach(function (i) {
          if (i.type === "radio") i.checked = false; else i.value = "";
        });
      });
    }
    form.addEventListener("change", updateConditionals);
    updateConditionals();

    // Eventos de funil
    if ("IntersectionObserver" in window) {
      var seen = false;
      var io = new IntersectionObserver(function (entries) {
        if (!seen && entries[0].isIntersecting) { seen = true; track("service_form_open", { form_id: formId }); io.disconnect(); }
      }, { threshold: 0.25 });
      io.observe(form);
    }
    form.addEventListener("input", function () {
      if (!started) { started = true; track("service_form_start", { form_id: formId }); }
    });

    function setError(name, msg) {
      var err = document.getElementById("lead-" + name + "-erro");
      var input = form.elements[name];
      if (input && input.setAttribute) {
        input.setAttribute("aria-invalid", msg ? "true" : "false");
        input.setAttribute("aria-describedby", "lead-" + name + "-erro");
      }
      if (err) err.textContent = msg || "";
    }

    function collect() {
      var d = {
        nome: clean(valueOf("nome"), LIMITS.nome),
        whatsapp: clean(valueOf("whatsapp"), LIMITS.whatsapp),
        email: clean(valueOf("email"), LIMITS.email),
        cidade: clean(valueOf("cidade"), LIMITS.cidade),
        mensagem: clean(valueOf("mensagem"), LIMITS.mensagem),
        answers: [],
      };
      questions.forEach(function (q) {
        var name = q.getAttribute("data-question");
        if (name === "area") return;
        var holder = q.closest("[data-show-if]");
        if (holder && holder.hidden) return;
        var v = clean(displayValue(name), LIMITS.text);
        if (v) d.answers.push({ id: name, label: labelOf(name), value: v });
      });
      if (areaSelect && !servicoParam) ctx.practice_area = displayValue("area");
      return d;
    }

    function validate(d) {
      var errors = {};
      if (d.nome.length < 2) errors.nome = "Informe seu nome.";
      var digits = d.whatsapp.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 13) errors.whatsapp = "Informe um WhatsApp com DDD.";
      if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errors.email = "Confira o e-mail informado.";
      questions.forEach(function (q) {
        var name = q.getAttribute("data-question");
        var required = q.hasAttribute("required") || q.hasAttribute("data-required");
        var holder = q.closest("[data-show-if]");
        if (required && !(holder && holder.hidden) && !valueOf(name)) errors[name] = "Selecione uma opção.";
      });
      if (form.elements.mensagem.required && d.mensagem.length < 10) errors.mensagem = "Descreva brevemente a situação.";
      return errors;
    }

    function summary(d) {
      var lines = [];
      if (ctx.service) lines.push("Assunto: " + ctx.service + (ctx.practice_area ? " (" + ctx.practice_area + ")" : ""));
      else if (ctx.practice_area) lines.push("Assunto: " + ctx.practice_area);
      d.answers.forEach(function (a) { lines.push(a.label + ": " + a.value); });
      if (d.cidade) lines.push("Cidade: " + d.cidade);
      if (d.mensagem) lines.push("", d.mensagem);
      return lines;
    }

    function composeWhatsApp(d) {
      var lines = ["Olá, vim pelo site da Vieira & Marques.", "", "Nome: " + d.nome].concat(summary(d));
      return "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(lines.join("\n"));
    }

    function send(payload) {
      // Mesmo contrato e mecanismos das landing pages: GET por imagem (segue o 302 do
      // Apps Script), POST no-cors e sendBeacon. O Apps Script deduplica repetições.
      var qs = Object.keys(payload).map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(payload[k] || ""); }).join("&");
      try { new Image().src = endpoint + (endpoint.indexOf("?") < 0 ? "?" : "&") + qs; } catch (e) { /* segue */ }
      try { fetch(endpoint, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) }); } catch (e) { /* segue */ }
      if (navigator.sendBeacon) {
        try { navigator.sendBeacon(endpoint, new Blob([JSON.stringify(payload)], { type: "text/plain;charset=UTF-8" })); } catch (e) { /* segue */ }
      }
    }

    function showSuccess(d, waUrl, viaWhatsApp) {
      form.hidden = true;
      success.hidden = false;
      success.querySelector("[data-success-title]").textContent = "Obrigado, " + d.nome.split(" ")[0] + ".";
      success.querySelector("[data-success-text]").textContent = viaWhatsApp
        ? "Sua mensagem foi preparada no WhatsApp. Se a conversa não abriu, use o botão abaixo."
        : "Suas informações foram encaminhadas à equipe. O retorno é feito pelo WhatsApp ou e-mail informado.";
      success.querySelector("[data-success-whatsapp]").href = waUrl;
      success.focus();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (sending) return;
      statusEl.textContent = "";
      statusEl.className = "form__status";
      if (form.elements.website.value) return; // honeypot preenchido: robô

      var d = collect();
      var errors = validate(d);
      ["nome", "whatsapp", "email", "mensagem"].concat(questions.map(function (q) { return q.getAttribute("data-question"); }))
        .forEach(function (k) { setError(k, errors[k]); });
      var firstInvalid = Object.keys(errors)[0];
      if (firstInvalid) {
        var target = form.elements[firstInvalid];
        if (target && target.length && !target.focus) target = target[0];
        if (target && target.focus) target.focus();
        return;
      }
      if (Date.now() - startedAt < MIN_FILL_MS) { // preenchimento instantâneo: provável robô
        statusEl.textContent = "Aguarde um instante e envie novamente.";
        return;
      }
      try {
        if (Date.now() - Number(sessionStorage.getItem("vm_lead_ts") || 0) < THROTTLE_MS) {
          statusEl.className = "form__status form__status--error";
          statusEl.textContent = "Sua mensagem acabou de ser enviada. Aguarde alguns segundos antes de enviar outra.";
          return;
        }
      } catch (err) { /* sem storage, sem limite local */ }

      sending = true;
      submit.setAttribute("aria-busy", "true");
      submit.disabled = true;

      var waUrl = composeWhatsApp(d);
      var origin = readOrigin();
      // "mensagem" reúne respostas e relato para caber na coluna existente da planilha.
      var payload = {
        nome: d.nome, whatsapp: d.whatsapp, email: d.email, cidade: d.cidade,
        mensagem: summary(d).join("\n"), relato: d.mensagem,
        practice_area: ctx.practice_area, service: ctx.service,
        origem_form: formId, pagina: window.location.href, page_url: window.location.href, page_title: document.title,
        timestamp: new Date().toISOString(), referrer: origin.referrer || document.referrer || "", landing_page: origin.landing_page || "",
      };
      d.answers.forEach(function (a) { payload["q_" + a.id] = a.value; });
      UTM_KEYS.forEach(function (k) { payload[k] = origin[k] || ""; });

      var viaWhatsApp = !endpoint;
      if (endpoint) send(payload);
      else window.open(waUrl, "_blank", "noopener");

      try { sessionStorage.setItem("vm_lead_ts", String(Date.now())); } catch (err) { /* segue */ }
      track(pageCtx ? "service_form_submit" : "lead_form_submitted", { form_id: formId, practice_area: ctx.practice_area, service: ctx.service, lead_channel: viaWhatsApp ? "whatsapp" : "planilha" });
      if (viaWhatsApp) track("service_whatsapp_redirect", { form_id: formId, practice_area: ctx.practice_area, service: ctx.service });

      showSuccess(d, waUrl, viaWhatsApp);
      sending = false;
      submit.removeAttribute("aria-busy");
      submit.disabled = false;
    });

    panel.querySelector("[data-reset]").addEventListener("click", function () {
      form.reset();
      updateConditionals();
      success.hidden = true;
      form.hidden = false;
      startedAt = Date.now();
      form.elements.nome.focus();
    });
  }

  /* ---------- Índice "Nesta página": aberto no desktop, recolhido no mobile ---------- */
  function initToc() {
    var toc = document.querySelector("[data-toc]");
    if (toc && window.innerWidth >= 960) toc.open = true;
  }

  /* ---------- CTA fixo (mobile) nas páginas de serviço ---------- */
  function initStickyCta() {
    var cta = document.querySelector("[data-sticky-cta]");
    var form = document.querySelector("[data-lead-form]");
    var hero = document.querySelector(".svc-hero");
    if (!cta || !form || !hero) return;
    cta.hidden = false;
    var formVisible = false;
    function update() {
      var pastHero = hero.getBoundingClientRect().bottom < 0;
      var show = pastHero && !formVisible;
      cta.setAttribute("data-hidden", show ? "false" : "true");
      cta.tabIndex = show ? 0 : -1;
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) { formVisible = entries[0].isIntersecting; update(); }, { threshold: 0 })
        .observe(form.closest("section") || form);
    }
    var ticking = false;
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; update(); }); } }, { passive: true });
    update();
  }

  /* ---------- Índice das páginas legais: seção atual ---------- */
  function initTocSpy() {
    var links = document.querySelectorAll(".legal-toc a");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        var a = byId[entry.target.id];
        if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(byId).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Rodapé: voltar ao topo e deslocamento discreto do letreiro ---------- */
  function initFooter() {
    var top = document.querySelector("[data-back-to-top]");
    if (top) top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      var main = document.getElementById("conteudo");
      if (main) main.focus({ preventScroll: true });
    });
    var footer = document.querySelector("[data-footer]");
    var giant = document.querySelector("[data-footer-giant]");
    if (reduceMotion || !footer || !giant || !("IntersectionObserver" in window)) return;
    var active = false, ticking = false;
    function update() {
      ticking = false;
      var r = footer.getBoundingClientRect();
      // 0 quando o rodapé entra na tela, 1 quando termina; o letreiro sobe até 40px.
      var progress = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (r.height || 1)));
      giant.style.setProperty("--giant-y", (40 - progress * 40).toFixed(1) + "px");
    }
    new IntersectionObserver(function (entries) { active = entries[0].isIntersecting; if (active) update(); }).observe(footer);
    window.addEventListener("scroll", function () {
      if (active && !ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ---------- Rastreio de cliques ---------- */
  function initClickTracking() {
    if (pageCtx) track("service_page_view");
    document.addEventListener("click", function (e) {
      if (!e.target.closest) return;
      var cta = e.target.closest("[data-cta]");
      if (cta && pageCtx) track("service_cta_click", { cta_position: cta.getAttribute("data-cta") });
      var tracked = e.target.closest("[data-track]");
      if (tracked) track(tracked.getAttribute("data-track"), { link_url: tracked.href || "" });
      var a = e.target.closest('a[href^="https://wa.me/"], a[href^="tel:"]');
      if (a) track(a.href.indexOf("tel:") === 0 ? "phone_click" : "whatsapp_click", { link_url: a.href });
    });
  }

  captureOrigin();
  initMenu();
  initReveal();
  initFloat();
  initHub();
  initFilters();
  initLeadForm();
  initToc();
  initStickyCta();
  initTocSpy();
  initFooter();
  initClickTracking();
})();
