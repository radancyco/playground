/*!

  Radancy: Hosted Apply Model

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

(function() {

  // Basic functionality for multi-step navigation and form buttons

  let hostedApplyStep = document.querySelectorAll(".hosted-apply__step, .hosted-apply__button[data-form-target]");
  let hostedApplySections = document.querySelectorAll(".hosted-apply__section");

  hostedApplyStep.forEach(function(button) {

    button.addEventListener("click", function (e) {

      // Remove aria-aria-pressed, where found.

      hostedApplyStep.forEach(function(button) {

        button.removeAttribute("aria-pressed");

      });

      // Remove active state from all sections.

      hostedApplySections.forEach(function(section) {

        section.classList.remove("active");

      });

      // Get section and button targets

      let sectionTarget = document.getElementById(button.dataset.formTarget);
      let buttonTarget = document.getElementById("btn-" + button.dataset.formTarget);

      // Apply aria-pressed to selected step in navigation

      buttonTarget.setAttribute("aria-pressed", "true");

      // Load selected section

      sectionTarget.classList.add("active");
      sectionTarget.setAttribute("tabindex", "-1");
      sectionTarget.focus();

      window.scrollTo(0, 0);

    });

  });

  // Dialog

  // Using native dialog here for demo. Research needed to see how accessible it is now.

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

  // Remove files

  let fileDelete = document.querySelectorAll(".hosted-apply__uploads__delete");

  fileDelete.forEach(function(button) {

    button.addEventListener("click", function (e) {

      let fileName = button.getAttribute("aria-label").replace("Delete ", "");

      button.parentNode.parentNode.remove();

      let fileDeleteMsg = document.getElementById("uloaded-file-msg");

      fileDeleteMsg.innerHTML="";

      setTimeout(function(){

        fileDeleteMsg.textContent = fileName + " has been deleted."

      }, 100);

    });

  });

  // Remove Skills

  let skillDelete = document.querySelectorAll(".hosted-apply__skills__delete");

  skillDelete.forEach(function(button) {

    button.addEventListener("click", function (e) {

      let skillType = button.textContent

      button.parentNode.remove();

      let skillMsg = document.getElementById("skills-msg");

      skillMsg.innerHTML="";

      setTimeout(function(){

        skillMsg.textContent = skillType + " has been deleted."

      }, 100);

    });

  });

  // Announce that application is completed after ajax change.

  if(document.getElementById("application-msg")) {

    let appMsg = document.getElementById("application-msg");

    appMsg.setAttribute("tabindex", "-1");
    appMsg.focus();

    // If state change only, then <title> also needs to change, but this is not how our demo works.

  }

})();
