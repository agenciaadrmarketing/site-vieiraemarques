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

  /* ---------- Formulário de contato ---------- */
  var LIMITS = { nome: 120, whatsapp: 30, email: 160, cidade: 80, mensagem: 2000 };
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
    var success = document.querySelector("[data-success]");
    var statusEl = form.querySelector("[data-status]");
    var submit = form.querySelector("[data-submit]");
    var endpoint = (form.getAttribute("data-endpoint") || "").trim();
    var waNumber = form.getAttribute("data-whatsapp");
    var startedAt = Date.now();
    var sending = false;

    var areaParam = new URLSearchParams(window.location.search).get("area");
    if (areaParam && form.area.querySelector('option[value="' + areaParam.replace(/[^a-z-]/g, "") + '"]')) form.area.value = areaParam;

    function setError(name, msg) {
      var input = form.elements[name];
      var err = document.getElementById("lead-" + name + "-erro");
      if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (input && err) input.setAttribute("aria-describedby", "lead-" + name + "-erro");
      if (err) err.textContent = msg || "";
    }

    function validate(d) {
      var errors = {};
      if (d.nome.length < 2) errors.nome = "Informe seu nome.";
      var digits = d.whatsapp.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 13) errors.whatsapp = "Informe um WhatsApp com DDD.";
      if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errors.email = "Confira o e-mail informado.";
      if (!d.area) errors.area = "Selecione o assunto principal.";
      if (d.mensagem.length < 10) errors.mensagem = "Descreva brevemente a situação.";
      return errors;
    }

    function areaLabel(value) {
      var opt = form.area.querySelector('option[value="' + value + '"]');
      return opt ? opt.textContent : value;
    }

    function composeWhatsApp(d) {
      var lines = ["Olá, vim pelo site da Vieira & Marques.", "", "Nome: " + d.nome, "Assunto: " + areaLabel(d.area)];
      if (d.cidade) lines.push("Cidade: " + d.cidade);
      lines.push("", d.mensagem);
      return "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(lines.join("\n"));
    }

    function send(payload) {
      // Mesmo contrato e mesmos mecanismos das landing pages: GET por imagem (segue o 302
      // do Apps Script), POST no-cors e sendBeacon. O Apps Script deduplica envios repetidos.
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
        : "Sua mensagem foi encaminhada à equipe. O retorno é feito pelo WhatsApp ou e-mail informado.";
      success.querySelector("[data-success-whatsapp]").href = waUrl;
      success.focus();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (sending) return;
      statusEl.textContent = "";
      statusEl.className = "form__status";

      if (form.website.value) return; // honeypot preenchido: robô
      var d = {
        nome: clean(form.nome.value, LIMITS.nome),
        whatsapp: clean(form.whatsapp.value, LIMITS.whatsapp),
        email: clean(form.email.value, LIMITS.email),
        area: clean(form.area.value, 40),
        cidade: clean(form.cidade.value, LIMITS.cidade),
        mensagem: clean(form.mensagem.value, LIMITS.mensagem),
      };

      var errors = validate(d);
      ["nome", "whatsapp", "email", "area", "mensagem"].forEach(function (k) { setError(k, errors[k]); });
      var consent = form.querySelector("[data-consent]");
      var consentErr = form.querySelector("[data-consent-error]");
      consentErr.textContent = consent.checked ? "" : "É preciso autorizar o contato para enviar.";
      var firstInvalid = Object.keys(errors)[0];
      if (firstInvalid || !consent.checked) {
        (firstInvalid ? form.elements[firstInvalid] : consent).focus();
        return;
      }

      if (Date.now() - startedAt < MIN_FILL_MS) { // preenchimento instantâneo: provável robô
        statusEl.textContent = "Aguarde um instante e envie novamente.";
        return;
      }
      try {
        var last = Number(sessionStorage.getItem("vm_lead_ts") || 0);
        if (Date.now() - last < THROTTLE_MS) {
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
      var payload = {
        nome: d.nome, whatsapp: d.whatsapp, email: d.email, area: areaLabel(d.area), cidade: d.cidade,
        mensagem: d.mensagem, origem_form: "site_contato", pagina: window.location.href,
        timestamp: new Date().toISOString(), referrer: origin.referrer || document.referrer || "",
        landing_page: origin.landing_page || "",
      };
      UTM_KEYS.forEach(function (k) { payload[k] = origin[k] || ""; });

      var viaWhatsApp = !endpoint;
      if (endpoint) send(payload);
      else window.open(waUrl, "_blank", "noopener");

      try { sessionStorage.setItem("vm_lead_ts", String(Date.now())); } catch (err) { /* segue */ }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_form_submitted", form_id: "site_contato", lead_area: d.area, lead_channel: viaWhatsApp ? "whatsapp" : "planilha" });

      showSuccess(d, waUrl, viaWhatsApp);
      sending = false;
      submit.removeAttribute("aria-busy");
      submit.disabled = false;
    });

    document.querySelector("[data-reset]").addEventListener("click", function () {
      form.reset();
      success.hidden = true;
      form.hidden = false;
      startedAt = Date.now();
      form.nome.focus();
    });
  }

  /* ---------- Rastreio de cliques de contato ---------- */
  function initClickTracking() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="https://wa.me/"], a[href^="tel:"]');
      if (!a) return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: a.href.indexOf("tel:") === 0 ? "phone_click" : "whatsapp_click", link_url: a.href, page_path: window.location.pathname });
    });
  }

  captureOrigin();
  initMenu();
  initReveal();
  initFloat();
  initHub();
  initFilters();
  initLeadForm();
  initClickTracking();
})();
