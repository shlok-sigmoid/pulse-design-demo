// The analyst hold resolves once — a one-shot reveal, no loops, no spinner.
(function () {
  var hold = document.getElementById("analyst-hold");
  var result = document.getElementById("analyst-result");
  if (!hold || !result) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  setTimeout(function () {
    hold.hidden = true;
    result.hidden = false;
    if (!reduce) result.classList.add("rise");
  }, reduce ? 400 : 2400);
})();
