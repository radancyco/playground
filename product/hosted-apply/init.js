/*!

  Radancy: Hosted Apply Model

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

(function() {

  // Basic Functionality for Multi-Step Navigation and Form Sections

  let hostedApplyProgress = document.querySelectorAll(".hosted-apply__page");
  let hostedApplySections = document.querySelectorAll(".hosted-apply__section");

  hostedApplyProgress.forEach(function(button) {

    button.addEventListener("click", function (e) {

      // Get matching data attributes

      hostedApplyProgress.forEach(function(button) {

        // Remove aria-current, where found.

        button.removeAttribute("aria-current");

      });

      // Apply aria-current to selected step

      button.setAttribute("aria-current", "step");

      hostedApplySections.forEach(function(section) {

        // Remove active state from all sections.

        section.classList.remove("active");

      });

      // Get section based on href of link

      let buttonID = document.getElementById(button.getAttribute("href").replace("#", ""));
      let sectionTarget = buttonID;

      // Apply

      sectionTarget.classList.add("active");
      sectionTarget.setAttribute("tabindex", "-1");
      sectionTarget.focus({

        preventScroll: true

      });

      e.preventDefault();

    });

  });

  // Dialog

  // Using native here for demo. Research needed to see how accessible it is now.

  if(document.getElementById("confirmation-remove")) {

    let dialog = document.getElementById("confirmation-remove");
    let targetSection = document.getElementById("work-experience-1");
    let targetMsg = document.getElementById("work-experience-msg");

    // Show the dialog when clicking "Delete everything"

    document.getElementById("delete-work-experience").addEventListener("click", function() {

      dialog.showModal();

    });

    document.getElementById("cancel-remove").addEventListener("click", function() {

      dialog.close();

    });

    document.getElementById("confirm-remove").addEventListener("click", function() {

      dialog.close();
      targetSection.remove();
      targetMsg.textContent = "Work Experience 1 has been removed.";

    });

  }

  // Announce that application is completed after ajax change.

  if(document.getElementById("application-msg")) {

    let appMsg = document.getElementById("application-msg");

    appMsg.setAttribute("tabindex", "-1");
    appMsg.focus();

    // If state change only, then <title> also needs to change, but this is not how our demo works.

  }

})();
