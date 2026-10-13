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

  /* ---------- Tela de carregamento e transição entre páginas ---------- */
  // Primeira visita: cobre a página até o "load" (mín. ~0,45 s, máx. 2,5 s).
  // Vindo de outra página do site: sai assim que o conteúdo está pronto.
  // Voltar/avançar (cache do navegador) e "reduzir movimento": sem tela.
  function initLoader() {
    var el = document.querySelector("[data-loader]");
    var root = document.documentElement;
    function ready() { root.classList.add("is-ready"); }
    if (!el) { ready(); return; }
    el.style.animation = "none"; // o JS assume o controle (cancela o fallback do CSS)
    var start = Date.now();
    var hidden = false;
    function hide() {
      if (hidden) return;
      hidden = true;
      el.classList.add("is-hidden");
      ready();
    }
    var nav = (window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || {};
    var internal = false;
    try { internal = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (e) { /* referrer inválido */ }

    if (reduceMotion || nav.type === "back_forward") hide();
    else if (internal) requestAnimationFrame(function () { requestAnimationFrame(hide); });
    else {
      var done = function () { setTimeout(hide, Math.max(150, 450 - (Date.now() - start))); };
      if (document.readyState === "complete") done();
      else window.addEventListener("load", done);
      setTimeout(hide, 2500);
    }

    // Página restaurada do cache (botão voltar): nunca deixar a tela por cima.
    window.addEventListener("pageshow", function (e) { if (e.persisted) { el.classList.add("is-hidden"); hidden = true; ready(); } });

    if (reduceMotion) return;
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download") || a.hasAttribute("data-no-transition")) return;
      var url;
      try { url = new URL(a.getAttribute("href"), location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // âncora na mesma página
      if (/\.[a-z0-9]{2,4}$/i.test(url.pathname) && !/\.html$/i.test(url.pathname)) return; // arquivos
      e.preventDefault();
      el.classList.remove("is-hidden");
      hidden = false;
      setTimeout(function () { location.href = url.href; }, 280);
    });
  }

  /* ---------- Rolagem suave (Lenis) ---------- */
  // Só com mouse/trackpad: no toque a rolagem nativa já é suave. Carrega sob demanda.
  function initSmoothScroll() {
    if (reduceMotion || !window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;
    var me = document.querySelector("script[data-lenis]");
    if (!me) return;
    var s = document.createElement("script");
    s.src = me.getAttribute("data-lenis");
    s.async = true;
    s.onload = function () {
      if (!window.Lenis) return;
      var lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
      // Rolagem animada até uma posição absoluta. Sincroniza antes com a posição real,
      // que pode ter mudado por teclado (foco) ou rolagem nativa.
      lenis.vmScrollTo = function (y) {
        lenis.scrollTo(window.scrollY, { immediate: true });
        lenis.scrollTo(Math.max(0, y));
      };
      window.vmLenis = lenis;
      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      // Âncoras na mesma página: desliza respeitando a altura do cabeçalho.
      document.addEventListener("click", function (e) {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
        var a = e.target.closest && e.target.closest('a[href*="#"]');
        if (!a) return;
        var url;
        try { url = new URL(a.getAttribute("href"), location.href); } catch (err) { return; }
        if (url.pathname !== location.pathname || !url.hash || url.hash === "#") return;
        var target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (!target) return;
        e.preventDefault();
        var offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        lenis.vmScrollTo(target.getBoundingClientRect().top + window.scrollY - offset);
        history.pushState(null, "", url.hash);
        if (target.tabIndex < 0 && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA|SUMMARY)$/.test(target.tagName)) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    };
    document.head.appendChild(s);
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
      if (window.vmLenis) window.vmLenis[open ? "stop" : "start"]();
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

  /* ---------- Submenus do cabeçalho ---------- */
  // Desktop: abre por hover (com tolerância), clique no botão ou teclado; Esc fecha.
  // O fundo único se ajusta ao painel ativo (efeito "morphing island").
  function initNav() {
    var nav = document.querySelector("[data-nav]");
    if (!nav) return;
    var items = [].slice.call(nav.querySelectorAll("[data-nav-item]"));
    var open = null;
    var closeTimer = null;

    function setState(item, on) {
      var btn = item.querySelector("[data-nav-toggle]");
      var panel = item.querySelector("[data-nav-panel]");
      if (btn) btn.setAttribute("aria-expanded", String(on));
      if (panel) panel.classList.toggle("is-open", on);
    }
    function movePill(item) {
      var n = nav.getBoundingClientRect();
      var r = item.getBoundingClientRect();
      nav.style.setProperty("--pill-x", (r.left - n.left) + "px");
      nav.style.setProperty("--pill-w", r.width + "px");
      nav.setAttribute("data-pill", "");
    }
    function place(item, panel) {
      var n = nav.getBoundingClientRect();
      var r = item.getBoundingClientRect();
      var w = panel.offsetWidth;
      var vw = document.documentElement.clientWidth;
      var x = r.left + r.width / 2 - n.left - w / 2;
      x = Math.max(16 - n.left, Math.min(x, vw - 16 - n.left - w));
      panel.style.setProperty("--px", x + "px");
      nav.style.setProperty("--sf-x", x + "px");
      nav.style.setProperty("--sf-w", w + "px");
      nav.style.setProperty("--sf-h", panel.offsetHeight + "px");
    }
    function closeAll() {
      clearTimeout(closeTimer);
      if (open) setState(open, false);
      open = null;
      nav.removeAttribute("data-open");
    }
    function openMenu(item) {
      clearTimeout(closeTimer);
      var panel = item.querySelector("[data-nav-panel]");
      if (!panel) { closeAll(); return; }
      if (open === item) return;
      var first = !open;
      if (open) setState(open, false);
      if (first) nav.setAttribute("data-instant", "");
      place(item, panel);
      setState(item, true);
      nav.setAttribute("data-open", "");
      open = item;
      if (first) requestAnimationFrame(function () { requestAnimationFrame(function () { nav.removeAttribute("data-instant"); }); });
    }
    function closeSoon(ms) { clearTimeout(closeTimer); closeTimer = setTimeout(closeAll, ms); }

    items.forEach(function (item) {
      item.addEventListener("mouseenter", function () { movePill(item); openMenu(item); });
      var btn = item.querySelector("[data-nav-toggle]");
      if (btn) btn.addEventListener("click", function () {
        if (open === item) closeAll();
        else { openMenu(item); var first = item.querySelector("[data-nav-panel] a"); if (first && btn.matches(":focus-visible")) first.focus(); }
      });
    });
    nav.addEventListener("mouseenter", function () { clearTimeout(closeTimer); });
    nav.addEventListener("mouseleave", function () { nav.removeAttribute("data-pill"); closeSoon(160); });
    nav.addEventListener("focusout", function (e) { if (open && !nav.contains(e.relatedTarget)) closeAll(); });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || !open) return;
      var btn = open.querySelector("[data-nav-toggle]");
      closeAll();
      if (btn) btn.focus();
    });
    document.addEventListener("click", function (e) { if (open && !nav.contains(e.target)) closeAll(); });
    window.addEventListener("resize", closeAll);
  }

  // Mobile: acordeão dos submenus.
  function initMobileSubmenus() {
    document.querySelectorAll("[data-mm-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var sub = document.getElementById(btn.getAttribute("aria-controls"));
        var on = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(on));
        if (sub) sub.hidden = !on;
      });
    });
  }

  /* ---------- Revelação suave ---------- */
  // Contêineres cujos itens entram em cascata e mídias que entram com leve aproximação.
  var STAGGER = ".section-head > .stack-sm, .svc-head, .area-index, .services, .steps, .facts, .principles, .cards-grid, .article-list, " +
    ".svc-related__list, .svc-list, .svc-timeline, .svc-docs, .svc-columns, .checklist, .recognitions, .profiles, .team-panels, " +
    ".contact-list, .gallery, .wa-panel__choices, .faq";
  var MEDIA = ".figure, .page-hero__media, .svc-trust__media, .svc-doc-figure";
  function prepareReveal() {
    document.querySelectorAll(STAGGER).forEach(function (el) {
      if (el.closest(".page-hero, .hero, .site-footer")) return;
      el.setAttribute("data-reveal-stagger", "");
      if (!el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", "");
      [].forEach.call(el.children, function (child, i) { child.style.setProperty("--i", Math.min(i, 9)); });
    });
    document.querySelectorAll(MEDIA).forEach(function (el) {
      if (el.closest(".page-hero, .hero")) return;
      el.setAttribute("data-reveal-media", "");
      if (!el.hasAttribute("data-reveal") && !el.closest("[data-reveal]")) el.setAttribute("data-reveal", "");
    });
  }

  function initReveal() {
    if (!reduceMotion) prepareReveal();
    var items = document.querySelectorAll("[data-reveal], [data-reveal-media]");
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
    var form = document.querySelector("[data-lead-form]") || document.getElementById("contato");
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
      if (window.vmLenis) window.vmLenis.vmScrollTo(0);
      else window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
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
      // 0 quando o rodapé entra na tela, 1 quando termina; o letreiro sobe até 24px.
      var progress = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (r.height || 1)));
      giant.style.setProperty("--giant-y", (24 - progress * 24).toFixed(1) + "px");
    }
    new IntersectionObserver(function (entries) { active = entries[0].isIntersecting; if (active) update(); }).observe(footer);
    window.addEventListener("scroll", function () {
      if (active && !ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ---------- Equipe em painéis: o painel em foco/hover/clique se expande ---------- */
  function initTeamPanels() {
    document.querySelectorAll("[data-team-panels]").forEach(function (group) {
      var panels = [].slice.call(group.querySelectorAll(".team-panel"));
      function activate(panel) {
        if (panel.classList.contains("is-active")) return;
        panels.forEach(function (p) { p.classList.toggle("is-active", p === panel); });
      }
      panels.forEach(function (panel) {
        panel.addEventListener("mouseenter", function () { activate(panel); });
        panel.addEventListener("focusin", function () { activate(panel); });
        panel.addEventListener("click", function () { activate(panel); });
      });
    });
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
      if (a) {
        var isPhone = a.href.indexOf("tel:") === 0;
        track(isPhone ? "phone_click" : "whatsapp_click", { link_url: a.href, cta_position: a.getAttribute("data-cta") || "" });
        if (!isPhone && pageCtx) track("service_whatsapp_redirect", { cta_position: a.getAttribute("data-cta") || "" });
      }
    });
  }

  if (document.body.hasAttribute("data-forms")) captureOrigin();
  initLoader();
  initSmoothScroll();
  initMenu();
  initNav();
  initMobileSubmenus();
  initReveal();
  initFloat();
  initHub();
  initFilters();
  initLeadForm();
  initToc();
  initStickyCta();
  initTocSpy();
  initFooter();
  initTeamPanels();
  initClickTracking();
})();
