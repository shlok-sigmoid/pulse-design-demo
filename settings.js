// Validation runs on save, not on load — a pending field is not a failed one.
(function () {
  var form = document.getElementById("profile-form");
  var email = document.getElementById("email");
  var emailError = document.getElementById("email-error");
  var savedChip = document.getElementById("saved-chip");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var valid = email.value.trim() !== "";

    emailError.hidden = valid;
    email.classList.toggle("invalid", !valid);

    if (!valid) {
      savedChip.hidden = true;
      email.focus();
      return;
    }
    savedChip.hidden = false;
  });

  // The saved claim goes stale the moment anything changes again.
  form.addEventListener("input", function () {
    savedChip.hidden = true;
  });

  // Delete flow — §6.6 modal: Escape and backdrop close, focus returns to the trigger.
  var modal = document.getElementById("delete-modal");
  var openBtn = document.getElementById("delete-open");
  var cancelBtn = document.getElementById("delete-cancel");
  var confirmBtn = document.getElementById("delete-confirm");
  var deleteNote = document.getElementById("delete-note");

  function openModal() {
    modal.hidden = false;
    cancelBtn.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closeModal() {
    modal.hidden = true;
    document.removeEventListener("keydown", onKeydown);
    openBtn.focus();
  }

  function onKeydown(e) {
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") {
      // Two focusable controls — keep Tab inside the dialog.
      var first = cancelBtn, last = confirmBtn;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  openBtn.addEventListener("click", openModal);
  cancelBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
  confirmBtn.addEventListener("click", function () {
    closeModal();
    deleteNote.hidden = false;
  });
})();
