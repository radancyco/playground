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

        button.setAttribute("aria-pressed", "false");

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

  let btnRemoveGroup = document.querySelectorAll(".hosted-apply__group__delete");
  let btnCancelGroup = document.querySelectorAll(".hosted-apply__dialog__cancel");
  let btnDeleteGroup = document.querySelectorAll(".hosted-apply__dialog__remove");

  // Init Dialog

  btnRemoveGroup.forEach(function(button) {

    button.addEventListener("click", function (e) {

      let dialog = document.querySelector(".hosted-apply__dialog");
      let groupName = button.getAttribute("aria-label").replace("Delete", "");
      let groupNameToken = dialog.querySelector(".hosted-apply__dialog__name");
      let groupRemove = dialog.querySelector(".hosted-apply__dialog__remove");

      dialog.showModal();
      dialog.setAttribute("data-group-id", button.parentNode.getAttribute("id"));
      dialog.setAttribute("data-group-name", groupName);

      groupNameToken.textContent = groupName;
      groupRemove.focus();

    });

  });

  // Cancel Dialog

  btnCancelGroup.forEach(function(button) {

    button.addEventListener("click", function (e) {

      let dialog = button.parentNode;

      dialog.close();

    });

  });

  // Remove Group

  btnDeleteGroup.forEach(function(button) {

    button.addEventListener("click", function (e) {

      let dialog = document.querySelector(".hosted-apply__dialog");
      let targetSection = document.getElementById(button.parentNode.dataset.groupId);
      let targetSectionName = button.parentNode.dataset.groupName;
      let targetMsg = targetSection.parentNode.querySelector(".hosted-apply__dialog__msg");

      dialog.close();
      targetSection.classList.add("delete");
      targetMsg.innerHTML="";

      setTimeout(function(){

        targetSection.remove();
        targetMsg.textContent = targetSectionName + " has been removed.";

      }, 500);

    });

  });

  // Remove files

  let fileDelete = document.querySelectorAll(".hosted-apply__uploads__delete");

  fileDelete.forEach(function(button) {

    button.addEventListener("click", function (e) {

      let fileName = button.getAttribute("aria-label").replace("Delete ", "");
      let fileDeleteMsg = button.closest(".hosted-apply__uploads").querySelector(".hosted-apply__uploads__msg");

      button.closest("li").remove();

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

      let skillType = button.getAttribute("aria-label").replace("Delete ", "");
      let skillMsg = button.closest(".hosted-apply__skills").querySelector(".hosted-apply__skills__msg");

      button.closest("li").remove();

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

  // Hack: Show section based on URL parameters 

  url = new URL(window.location.href);

  if (url.searchParams.has("step")) {

    let step = url.searchParams.get("step");

    document.getElementById("btn-" + step).click();

    if (url.searchParams.has("group")) {

      let group = url.searchParams.get("group");

      setTimeout(() => {

        let groupID = document.getElementById(group);

        groupID.setAttribute("tabindex", "-1");
        groupID.focus();

      }, "1000");

    }
  
  }

  // Validation Example

  /* var $validation_error = document.createElement('strong');

  $validation_error.className = 'form-validation-error';

  function resetValidation( $field, $parent ) {

    $field.removeAttribute('aria-invalid');
    $field.removeAttribute('aria-errormessage');

    $parent.querySelectorAll('.' + $validation_error.className).forEach(function($el) {

      $parent.removeChild($el);

    });

  }

  function isValid( $field, refocus ) {

    refocus = refocus || false;

    var validity = $field.validity, 
    $parent = $field.parentNode, 
    $message = false, 
    message = '', 
    message_id = $field.id + '-validation-error';

    resetValidation( $field, $parent );

    if ( validity.valid ) {

      return true;

    }

    $message = $validation_error.cloneNode(true);

    $message.id = message_id;

    if ( $field.validity.valueMissing ) {

      message = $field.dataset.errorRequired || 'You forgot to fill in this field';

    } else {

      message = $field.dataset.errorInvalid || 'The value you submitted doesn’t look right';

    }

    $message.innerHTML = message;

    if ( $field.nextElementSibling ) {

      $parent.insertBefore($message, $field.nextElementSibling);

    } else {

      $parent.appendChild($message);

    }

    $field.setAttribute('aria-errormessage', message_id);
    $field.setAttribute('aria-invalid', 'true');

    if (refocus) {

      $field.focus();

    }

    return false;

  }

  function validateMe( e ) {

    var $form = e.target, 
    i = 0, 
    field_count = $form.elements.length, 
    $first_error = false;

    for ( i; i< field_count; i++) {

      var $field = $form.elements[i], 
      valid = isValid($field);

      if ( !$first_error && !valid ) {
        
        $first_error = $field;

      }

    }

    if ( $first_error ){

      e.preventDefault();

      $first_error.focus();    

    }

  }

  var $forms = document.querySelectorAll('form');

  $forms.forEach(function($form){

    $form.setAttribute('novalidate','');

    $form.addEventListener('submit', validateMe, false);

    var field_count = $form.elements.length;

    while (field_count--) {

      $form.elements[field_count].addEventListener('change', function(e){

        isValid(e.target, true);

      }, false)

    }

  }); */

  // End Validation Example

})();
