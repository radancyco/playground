/*!

  Radancy: Hosted Apply

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

(function() {

  // Basic Functionality for form

  let hostedApplyProgress = document.querySelectorAll(".hosted-apply__page");
  let hostedApplySections = document.querySelectorAll(".hosted-apply__section");

  hostedApplyProgress.forEach(function(button) {

    button.addEventListener("click", function (e) {

      // Get matching data attributes 

      let thisButtonId = document.querySelectorAll("[data-button-id=" + button.dataset.buttonId + "]");

      hostedApplyProgress.forEach(function(button) {

        // Temporarily set all aria-expanded to false, where found.

        if(button.hasAttribute("aria-expanded")) {

          button.setAttribute("aria-expanded", "false");

        } else {

          // Temporarily remove aria-current, where found.

          button.removeAttribute("aria-current");

        }

      });

      thisButtonId.forEach(function(button) {

        if(button.hasAttribute("aria-expanded")) {

          button.setAttribute("aria-expanded", "true");

        } else {

          button.setAttribute("aria-current", "page");

        }

      });




      hostedApplySections.forEach(function(section) {

        // Remove active state from all sections.

        section.classList.remove("active");

      });

    //  if(button.hasAttribute("aria-expanded")) {

        //button.setAttribute("aria-expanded", "false");

    //  } else {

        // Get section based on href of link

        let buttonID = document.getElementById(button.dataset.buttonId);

        let sectionTarget = buttonID;

        // Apply

        sectionTarget.classList.add("active");
        sectionTarget.setAttribute("tabindex", "-1");
        sectionTarget.focus({

          preventScroll: true

        });

  //    }

      e.preventDefault();

    });

  });

})();
