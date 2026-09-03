/**
 * Lightbox modal for the portfolio.
 * - Opens on click of any `.modal-trigger` image.
 * - Toggles body scroll lock while open.
 * - Manages focus: remembers the trigger, focuses the close button,
 *   returns focus when closed.
 * - Closable via button click, overlay click or the Escape key.
 */
(function () {
  "use strict";

  function openModal(modal, trigger) {
    modal.classList.add("modal--visible");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const img = document.getElementById("modalImage");
    const caption = document.getElementById("modalCaption");

    // currentSrc gives the best-res variant actually rendered (e.g. WebP
    // from a <picture> source), falling back to the static src.
    img.src = trigger.currentSrc || trigger.src;
    img.alt = trigger.alt || "";
    caption.textContent = trigger.alt || "";

    // Focus management
    const closeBtn = modal.querySelector(".close");
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeModal(modal, triggerToFocus) {
    if (!modal.classList.contains("modal--visible")) return;
    modal.classList.remove("modal--visible");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (triggerToFocus) {
      triggerToFocus.focus({ preventScroll: true });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("universalModal");
    if (!modal) return;

    const closeBtn = modal.querySelector(".close");
    const triggers = Array.from(document.querySelectorAll(".modal-trigger"));
    let lastTrigger = null;

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        lastTrigger = trigger;
        openModal(modal, trigger);
      });
      // Allow keyboard activation on focusable images
      trigger.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          lastTrigger = trigger;
          openModal(modal, trigger);
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        closeModal(modal, lastTrigger);
      });
    }

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal(modal, lastTrigger);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal(modal, lastTrigger);
      }
    });
  });
})();