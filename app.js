// fake live alert counter
var alertCount = 7;
setInterval(function () {
  alertCount = 5 + Math.floor(Math.random() * 5);
  var el = document.getElementById("alert-count");
  if (el) el.textContent = alertCount;
}, 4000);

// fake AI analysis finishing after 3 seconds
setTimeout(function () {
  var spinner = document.getElementById("spinner");
  var status = document.getElementById("ai-status");
  var result = document.getElementById("ai-result");
  if (spinner) spinner.style.display = "none";
  if (status) status.style.display = "none";
  if (result) result.style.display = "block";
}, 3000);
