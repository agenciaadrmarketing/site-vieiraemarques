/* Roda antes da primeira pintura (script pequeno e em cache). Decide se a tela de carregamento
   aparece: só na primeira página de cada visita. Navegações internas, recargas, voltar/avançar e
   "reduzir movimento" entram direto, sem tela e sem repetir a entrada animada do topo. */
(function () {
  var d = document.documentElement;
  var skip = false;
  try {
    var nav = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || {};
    var internal = !!document.referrer && new URL(document.referrer).origin === location.origin;
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    skip = internal || reduce || nav.type === "back_forward" || nav.type === "reload" || !!sessionStorage.getItem("vm_intro");
    if (!skip) sessionStorage.setItem("vm_intro", "1");
  } catch (e) { /* sem storage: mostra a tela só nesta página */ }
  if (skip) d.classList.add("no-intro", "js", "is-ready");
})();
