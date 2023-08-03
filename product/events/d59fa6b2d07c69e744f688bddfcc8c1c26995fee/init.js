
// Quick and dirty hidding of content when submit clicked, to illustrate behavior. 

// If multiple forms, will obviously will need forEach.

var formElement = document.getElementById("event-form");
var formSuccess = document.getElementById("event-success");
var formSuccessHeading = document.getElementById("success-heading");
var formSuccessClose = document.getElementById("event-success-btn");

formElement.addEventListener("submit", function(e) {

  formElement.classList.add("success");
  formSuccess.removeAttribute("hidden");
  formSuccessHeading.setAttribute("tabindex", "-1");
  formSuccessHeading.focus();
  
  e.preventDefault();

});

formSuccessClose.addEventListener("click", function() {

  formElement.classList.remove("success");
  formSuccess.setAttribute("hidden", "");

});