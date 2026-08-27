// Iris review hold: scan sweep while "reading", then the verdict lands once.
// Honors reduced motion — the hold is skipped and content settles immediately.
(function () {
  var hold = document.getElementById("iris-hold");
  var result = document.getElementById("iris-result");
  if (!hold || !result) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var delay = reduce ? 0 : 2600;

  setTimeout(function () {
    hold.hidden = true;
    result.hidden = false;
    if (!reduce) {
      result.style.animation = "fade-rise 0.45s cubic-bezier(0.2,0.7,0.2,1) both";
    }
  }, delay);
})();
