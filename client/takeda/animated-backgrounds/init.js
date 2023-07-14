/*!

  Radancy: Background Video Control (BVC)

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

  Note(s): 
  1. Video utilizes prefers-reduced-motion in addition to the pause button. When user disables animation in their operating system, 
  these videos will not autoplay.
  2. Cookie set or removed when pause button toggled to remember the desired setting on return visits across entire site where BVC used.
  3. Video may not play if mobile device is in low-power mode. This is for a good reason—so video does not drain the battery life.

*/

(function() {

  "use strict";

  var $bvcClass = ".bvc";
  var $bvcMediaClass = ".bvc__video";
  var $bvcButtonClassName = "bvc__button"
  var $bvcButtonLabel = "Pause Background Animations";

  // Check Cookie. If set to true, pause video.

  function getCookie(name) {

    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
  
  }

  var videoPaused = getCookie("backgroundVideosPaused");

  // Background Video Container

  var backgroundVideoContainers = document.querySelectorAll($bvcClass);

  // Background Videos

  var backgroundVideos = document.querySelectorAll($bvcMediaClass);

  backgroundVideoContainers.forEach(function(container){

    // Create Pause Button

    var btnPlayPause = document.createElement("button");
    btnPlayPause.setAttribute("aria-label", $bvcButtonLabel);
    btnPlayPause.classList.add($bvcButtonClassName);

    // Set attribute depending on OS user settings in OS...

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {

       // ... and has not paused video(s).

      if(videoPaused !== null) {

        btnPlayPause.setAttribute("aria-pressed", "true");

      } else {

        btnPlayPause.setAttribute("aria-pressed", "false");

      }

    } else {

      btnPlayPause.setAttribute("aria-pressed", "true");

    }
    
    // Append Pause Button
    
    container.prepend(btnPlayPause);

    // Pause Button Toggle Event

    btnPlayPause.addEventListener("click", function() {

      var backgroundVideoBtn = document.querySelectorAll("." + $bvcButtonClassName);

      if (this.getAttribute("aria-pressed") === "false") {

        // Get all pause buttons on page and set them to true. 

        backgroundVideoBtn.forEach(function(button){

          button.setAttribute("aria-pressed", "true");

        });

        // Set cookie and pause video(s).

        backgroundVideos.forEach(function(video) {

          video.pause();
          document.cookie = "backgroundVideosPaused=true; path=/";

        });

      } else {

        // Get all pause buttons on page and set them to true. 

        backgroundVideoBtn.forEach(function(button){

          button.setAttribute("aria-pressed", "false");
        
        });

        // Remove cookie and play video(s).

        backgroundVideos.forEach(function(video){

          document.cookie = "backgroundVideosPaused=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          video.play();
  
        });

      }

    });

  });

  // Loop through all videos on page load.

  backgroundVideos.forEach(function(video){

    // Only play video(s) if user has not disabled animation in OS...

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {

      // ...or has not paused video.

      if(videoPaused === null) {

        video.autoplay = true;

      }

    }

  });

})();