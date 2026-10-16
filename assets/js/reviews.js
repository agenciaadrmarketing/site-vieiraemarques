/* Avaliações do Google. O HTML já traz as avaliações publicadas e o total informado pelo escritório;
   se /api/google-reviews.php responder com dados reais, esta rotina troca nota, total e textos.
   O texto vindo da API é inserido com textContent (nunca como HTML). */
(function () {
  "use strict";
  var root = document.querySelector("[data-reviews]");
  if (!root) return;
  var track = root.querySelector("[data-reviews-track]");
  var ctrl = root.querySelector("[data-reviews-ctrl]");
  var dotsBox = root.querySelector("[data-reviews-dots]");
  var pos = root.querySelector("[data-reviews-pos]");
  var started = false, dots = [];

  function $(s) { return root.querySelector(s); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function safeUrl(u) { return typeof u === "string" && /^https:\/\//.test(u) ? u : ""; }
  function ini(name) { return String(name || "?").split(/\s+/).filter(Boolean).slice(0, 1).map(function (p) { return p[0]; }).join("").toUpperCase(); }
  var COLORS = ["#5F6368", "#E8710A", "#D81B60", "#7B1FA2", "#00897B", "#1E88E5", "#C5221F", "#6D4C41", "#3949AB"];

  /* ---- carrossel ---- */
  function cards() { return [].slice.call(track.children); }
  function step() { var c = cards(); return c.length > 1 ? c[1].offsetLeft - c[0].offsetLeft : track.clientWidth; }
  function perView() { return Math.max(1, Math.round(track.clientWidth / step())); }
  function pages() { return Math.max(1, cards().length - perView() + 1); }
  function current() { return Math.min(pages() - 1, Math.round(track.scrollLeft / step())); }
  function go(i) { track.scrollTo({ left: i * step() }); }
  function mark() {
    var a = current();
    if (pos) pos.textContent = (a + 1) + " / " + pages();
    dots.forEach(function (b, k) { b.setAttribute("aria-current", k === a ? "true" : "false"); });
  }
  function build() {
    var n = pages();
    ctrl.hidden = n < 2;
    if (dots.length !== n) {
      dotsBox.textContent = ""; dots = [];
      for (var i = 0; i < n; i++) {
        var b = el("button"); b.type = "button"; b.setAttribute("aria-label", "Ir para avaliação " + (i + 1));
        b.appendChild(el("span"));
        (function (k) { b.addEventListener("click", function () { go(k); }); })(i);
        dotsBox.appendChild(b); dots.push(b);
      }
    }
    mark();
  }
  [].forEach.call(root.querySelectorAll("[data-dir]"), function (b) {
    b.addEventListener("click", function () { var n = pages(); go((current() + Number(b.getAttribute("data-dir")) + n) % n); });
  });
  var raf;
  track.addEventListener("scroll", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(mark); }, { passive: true });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault(); var n = pages();
      go((current() + (e.key === "ArrowRight" ? 1 : -1) + n) % n);
    }
  });
  var rz;
  window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(build, 150); });

  /* ---- dados vindos da API ---- */
  function card(r, i) {
    var f = el("figure", "g-review");
    var who = el("div", "g-review__who");
    var photo = safeUrl(r.photo);
    var avatar;
    if (photo) {
      avatar = document.createElement("img");
      avatar.className = "g-review__photo";
      avatar.src = photo; avatar.alt = ""; avatar.width = 42; avatar.height = 42; avatar.loading = "lazy"; avatar.referrerPolicy = "no-referrer";
      avatar.addEventListener("error", function () { var s = el("span", "g-review__ini", ini(r.author)); s.style.background = COLORS[i % COLORS.length]; s.setAttribute("aria-hidden", "true"); avatar.replaceWith(s); });
    } else {
      avatar = el("span", "g-review__ini", ini(r.author)); avatar.style.background = COLORS[i % COLORS.length]; avatar.setAttribute("aria-hidden", "true");
    }
    who.appendChild(avatar);
    var meta = el("figcaption", "g-review__meta");
    var name = safeUrl(r.authorUrl) ? el("a", "g-review__name", r.author) : el("strong", "g-review__name", r.author || "Cliente");
    if (name.tagName === "A") { name.href = r.authorUrl; name.target = "_blank"; name.rel = "noopener noreferrer"; }
    meta.appendChild(name);
    meta.appendChild(el("span", "g-review__src", r.when || "Avaliação no Google"));
    who.appendChild(meta);
    var g = root.querySelector(".g-review .gr-g"); if (g) who.appendChild(g.cloneNode(true));
    f.appendChild(who);
    var st = root.querySelector(".g-review .gr-stars");
    if (st) { var s2 = st.cloneNode(true); var n = Math.max(0, Math.min(5, r.rating | 0)); s2.setAttribute("aria-label", n + " de 5 estrelas"); [].forEach.call(s2.children, function (x, k) { if (k >= n) x.setAttribute("fill", "#C8C8C8"); }); f.appendChild(s2); }
    f.appendChild(el("blockquote", "g-review__text", r.text || ""));
    return f;
  }

  function show(data) {
    var url = safeUrl(data.url);
    if (url) [].forEach.call(root.querySelectorAll("[data-reviews-link]"), function (a) { a.href = url; });
    if (data.status !== "success" || !data.reviews || !data.reviews.length) return; /* mantém o que já está no HTML */
    var rating = Number(data.rating);
    if (rating) $("[data-reviews-rating]").textContent = rating.toFixed(1).replace(".", ",");
    if (data.count) $("[data-reviews-count]").textContent = data.count + (data.count === 1 ? " avaliação" : " avaliações") + " no Google";
    var frag = document.createDocumentFragment();
    data.reviews.forEach(function (r, i) { frag.appendChild(card(r, i)); });
    track.textContent = ""; track.appendChild(frag);
    track.scrollTo({ left: 0 });
    build();
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

  build();
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { io.disconnect(); load(); } }, { rootMargin: "1200px 0px" });
    io.observe(document.querySelector("[data-reviews-sentinel]") || root);
  } else { load(); }
})();
