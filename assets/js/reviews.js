/* Avaliações do Google. O HTML já traz as avaliações publicadas e o total informado pelo escritório;
   se /api/google-reviews.php responder com dados reais, esta rotina troca nota, total e textos.
   O texto vindo da API é inserido com textContent (nunca como HTML). */
(function () {
  "use strict";
  var root = document.querySelector("[data-reviews]");
  if (!root) return;
  var track = root.querySelector("[data-reviews-track]");
  var started = false;

  function $(s) { return root.querySelector(s); }
  function stars(n) { return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function safeUrl(u) { return typeof u === "string" && /^https:\/\//.test(u) ? u : ""; }
  function ini(name) { return String(name || "?").split(/\s+/).filter(Boolean).slice(0, 2).map(function (p) { return p[0]; }).join("").toUpperCase(); }

  /* "Ler mais" para textos longos (cartões do HTML e da API) */
  function enhance(li) {
    var body = li.querySelector(".g-review__text"), more = li.querySelector(".g-review__more");
    if (!body || !more || more.getAttribute("data-bound")) return;
    more.setAttribute("data-bound", "1");
    more.addEventListener("click", function () {
      var open = li.classList.toggle("is-open");
      more.textContent = open ? "Ler menos" : "Ler mais";
      more.setAttribute("aria-expanded", open ? "true" : "false");
    });
    more.hidden = !(body.scrollHeight > body.clientHeight + 2);
  }

  function card(r) {
    var li = el("article", "g-review");
    var top = el("div", "g-review__top");
    top.appendChild(el("span", "g-review__stars", stars(Math.max(0, Math.min(5, r.rating | 0)))));
    top.appendChild(el("span", "g-review__src", "Google"));
    li.appendChild(top);
    li.appendChild(el("p", "g-review__text", r.text || ""));
    var more = el("button", "g-review__more", "Ler mais");
    more.type = "button"; more.hidden = true; more.setAttribute("aria-expanded", "false");
    li.appendChild(more);
    var who = el("div", "g-review__who");
    var photo = safeUrl(r.photo);
    if (photo) {
      var im = document.createElement("img");
      im.src = photo; im.alt = ""; im.width = 40; im.height = 40; im.loading = "lazy"; im.referrerPolicy = "no-referrer";
      im.addEventListener("error", function () { var s = el("span", "g-review__ini", ini(r.author)); s.setAttribute("aria-hidden", "true"); im.replaceWith(s); });
      who.appendChild(im);
    } else {
      var s = el("span", "g-review__ini", ini(r.author)); s.setAttribute("aria-hidden", "true"); who.appendChild(s);
    }
    var meta = el("span", "g-review__meta");
    var name = safeUrl(r.authorUrl) ? el("a", "g-review__name", r.author) : el("strong", "g-review__name", r.author || "Cliente");
    if (name.tagName === "A") { name.href = r.authorUrl; name.target = "_blank"; name.rel = "noopener noreferrer"; }
    meta.appendChild(name);
    if (r.when) meta.appendChild(el("span", "g-review__when", r.when));
    who.appendChild(meta);
    li.appendChild(who);
    return li;
  }

  function controls() {
    var prev = $("[data-reviews-prev]"), next = $("[data-reviews-next]"), box = $(".g-reviews__controls");
    function step() { var c = track.firstElementChild; return c ? c.getBoundingClientRect().width + 16 : 320; }
    function sync() {
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      box.hidden = prev.disabled && next.disabled;
    }
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
    });
    var drag = null;
    track.addEventListener("pointerdown", function (e) { if (e.pointerType === "mouse") drag = { x: e.clientX, s: track.scrollLeft }; });
    track.addEventListener("pointermove", function (e) { if (!drag) return; var dx = e.clientX - drag.x; if (Math.abs(dx) > 4) track.classList.add("is-drag"); track.scrollLeft = drag.s - dx; });
    function end() { drag = null; track.classList.remove("is-drag"); }
    track.addEventListener("pointerup", end); track.addEventListener("pointerleave", end);
    sync();
    return sync;
  }

  var sync = controls();
  [].forEach.call(track.children, enhance);
  sync();

  function show(data) {
    var url = safeUrl(data.url);
    if (url) $("[data-reviews-link]").href = url;
    if (data.status !== "success" || !data.reviews || !data.reviews.length) return; /* mantém o que já está no HTML */
    var rating = Number(data.rating);
    if (rating) {
      var st = $("[data-reviews-stars]"), rt = $("[data-reviews-rating]");
      st.textContent = stars(Math.round(rating)); st.hidden = false;
      rt.textContent = rating.toFixed(1).replace(".", ","); rt.hidden = false;
    }
    if (data.count) $("[data-reviews-count]").textContent = "Baseado em " + data.count + (data.count === 1 ? " avaliação" : " avaliações") + " no Google";
    track.textContent = "";
    data.reviews.forEach(function (r) { var li = card(r); track.appendChild(li); });
    track.scrollLeft = 0;
    [].forEach.call(track.children, enhance);
    sync();
    var note = $(".g-reviews__note"); if (note) note.textContent = "Avaliações publicadas por clientes no Google, exibidas como recebidas. Ordem definida pelo Google.";
    root.setAttribute("data-state", "success");
  }

  function load() {
    if (started) return; started = true;
    fetch(root.getAttribute("data-endpoint"), { headers: { Accept: "application/json" }, credentials: "omit" })
      .then(function (r) { if (!r.ok) throw new Error("http"); return r.json(); })
      .then(show)
      .catch(function () { /* sem API: ficam as avaliações do HTML */ });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { io.disconnect(); load(); } }, { rootMargin: "1200px 0px" });
    io.observe(document.querySelector("[data-reviews-sentinel]") || root);
  } else { load(); }
})();
