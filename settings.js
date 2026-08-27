// Settings: real validation, honest save state, §6.6 modal behavior
// (Escape + backdrop close, focus returns to the opener).
(function () {
  var form = document.getElementById("settings-form");
  var email = document.getElementById("f-email");
  var emailError = document.getElementById("email-error");
  var saveNote = document.getElementById("save-note");

  // The error clears the moment the field is valid — it never lingers as decoration.
  function validateEmail() {
    var ok = email.value.trim() !== "" && email.checkValidity();
    email.classList.toggle("invalid", !ok);
    email.setAttribute("aria-invalid", String(!ok));
    emailError.hidden = ok;
    return ok;
  }

  email.addEventListener("input", validateEmail);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateEmail()) {
      email.focus();
      return;
    }
    // The check is earned: settings really persist for this browser.
    var data = {
      name: document.getElementById("f-name").value,
      email: email.value,
      study: document.getElementById("f-study").value,
      frequency: document.getElementById("f-freq").value,
    };
    localStorage.setItem("pulse-settings", JSON.stringify(data));
    saveNote.hidden = false;
  });

  // Restore a previous save so a refresh mid-flow survives.
  var saved = localStorage.getItem("pulse-settings");
  if (saved) {
    try {
      var s = JSON.parse(saved);
      if (s.name) document.getElementById("f-name").value = s.name;
      if (s.email) { email.value = s.email; validateEmail(); }
      if (s.study) document.getElementById("f-study").value = s.study;
      if (s.frequency) document.getElementById("f-freq").value = s.frequency;
    } catch (err) { /* stale value — ignore */ }
  }

  // Delete-account modal
  var scrim = document.getElementById("delete-scrim");
  var openBtn = document.getElementById("delete-open");
  var cancelBtn = document.getElementById("delete-cancel");
  var confirmBtn = document.getElementById("delete-confirm");

  function openModal() {
    scrim.hidden = false;
    cancelBtn.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closeModal() {
    scrim.hidden = true;
    document.removeEventListener("keydown", onKeydown);
    openBtn.focus();
  }

  function onKeydown(e) {
    if (e.key === "Escape") closeModal();
  }

  openBtn.addEventListener("click", openModal);
  cancelBtn.addEventListener("click", closeModal);
  confirmBtn.addEventListener("click", function () {
    localStorage.removeItem("pulse-settings");
    closeModal();
  });
  scrim.addEventListener("click", function (e) {
    if (e.target === scrim) closeModal();
  });
})();
