/* Avaliações do Google: busca /api/google-reviews.php perto da rolagem e monta o carrossel.
   O texto vem do Google e é inserido com textContent (nunca como HTML). */
(function () {
  "use strict";
  var root = document.querySelector("[data-reviews]");
  if (!root) return;
  var started = false;

  function $(s) { return root.querySelector(s); }
  function stars(n) { return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function safeUrl(u) { return typeof u === "string" && /^https:\/\//.test(u) ? u : ""; }

  function card(r) {
    var li = el("article", "g-review");
    li.setAttribute("role", "group");
    var top = el("div", "g-review__top");
    top.appendChild(el("span", "g-review__stars", stars(Math.max(0, Math.min(5, r.rating | 0)))));
    top.appendChild(el("span", "g-review__src", "Google"));
    li.appendChild(top);
    var body = el("p", "g-review__text", r.text || "");
    li.appendChild(body);
    var more = el("button", "g-review__more", "Ler mais");
    more.type = "button";
    more.hidden = true;
    more.setAttribute("aria-expanded", "false");
    more.addEventListener("click", function () {
      var open = li.classList.toggle("is-open");
      more.textContent = open ? "Ler menos" : "Ler mais";
      more.setAttribute("aria-expanded", open ? "true" : "false");
    });
    li.appendChild(more);
    var who = el("div", "g-review__who");
    var photo = safeUrl(r.photo);
    if (photo) {
      var im = document.createElement("img");
      im.src = photo; im.alt = ""; im.width = 40; im.height = 40; im.loading = "lazy"; im.referrerPolicy = "no-referrer";
      im.addEventListener("error", function () { im.remove(); });
      who.appendChild(im);
    }
    var meta = el("span", "g-review__meta");
    var name = safeUrl(r.authorUrl) ? el("a", "g-review__name", r.author) : el("strong", "g-review__name", r.author || "Cliente");
    if (name.tagName === "A") { name.href = r.authorUrl; name.target = "_blank"; name.rel = "noopener noreferrer"; }
    meta.appendChild(name);
    if (r.when) meta.appendChild(el("span", "g-review__when", r.when));
    who.appendChild(meta);
    li.appendChild(who);
    return { li: li, body: body, more: more };
  }

  function show(data) {
    var link = $("[data-reviews-link]");
    var url = safeUrl(data.url);
    if (url) { link.href = url; link.hidden = false; }
    if (data.status === "success" && data.reviews && data.reviews.length) {
      var rating = Number(data.rating);
      if (rating) {
        $("[data-reviews-stars]").textContent = stars(Math.round(rating));
        $("[data-reviews-rating]").textContent = rating.toFixed(1).replace(".", ",");
        $("[data-reviews-count]").textContent = data.count ? "Baseado em " + data.count + (data.count === 1 ? " avaliação" : " avaliações") + " no Google" : "";
        $("[data-reviews-summary]").hidden = false;
      }
      var track = $("[data-reviews-track]");
      var cards = data.reviews.map(card);
      cards.forEach(function (c) { track.appendChild(c.li); });
      $("[data-reviews-carousel]").hidden = false;
      root.hidden = false;
      cards.forEach(function (c) { if (c.body.scrollHeight > c.body.clientHeight + 2) c.more.hidden = false; });
      controls(track);
      root.setAttribute("data-state", "success");
    } else if (data.status === "error" && url) {
      $("[data-reviews-fallback]").hidden = false;
      $(".g-reviews__note").hidden = true;
      root.hidden = false;
      root.setAttribute("data-state", "error");
    } else {
      root.setAttribute("data-state", "empty"); /* sem configuração ou sem avaliações: seção oculta */
    }
  }

  function controls(track) {
    var prev = $("[data-reviews-prev]"), next = $("[data-reviews-next]");
    function step() { var c = track.firstElementChild; return c ? c.getBoundingClientRect().width + 16 : 320; }
    function sync() {
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      $(".g-reviews__controls").hidden = prev.disabled && next.disabled;
    }
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
    });
    /* arrastar com o mouse (toque já rola nativamente) */
    var drag = null;
    track.addEventListener("pointerdown", function (e) { if (e.pointerType === "mouse") drag = { x: e.clientX, s: track.scrollLeft, moved: false }; });
    track.addEventListener("pointermove", function (e) { if (!drag) return; var dx = e.clientX - drag.x; if (Math.abs(dx) > 4) { drag.moved = true; track.classList.add("is-drag"); } track.scrollLeft = drag.s - dx; });
    function end() { if (drag) { track.classList.remove("is-drag"); drag = null; } }
    track.addEventListener("pointerup", end); track.addEventListener("pointerleave", end);
    sync();
  }

  function load() {
    if (started) return; started = true;
    root.setAttribute("data-state", "loading");
    fetch(root.getAttribute("data-endpoint"), { headers: { Accept: "application/json" }, credentials: "omit" })
      .then(function (r) { if (!r.ok) throw new Error("http"); return r.json(); })
      .then(show)
      .catch(function () { root.setAttribute("data-state", "empty"); });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { io.disconnect(); load(); } }, { rootMargin: "1200px 0px" });
    io.observe(document.querySelector("[data-reviews-sentinel]") || root);
  } else { load(); }
})();
