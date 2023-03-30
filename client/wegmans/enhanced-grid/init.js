/*!

  Wegmans: Enhanced Grid

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

(function() {

  var $gridClass = ".enhanced-grid";
  var $gridHeaderClass = ".enhanced-grid__hdr";
  var $gridContainerClass = ".enhanced-grid__container";
  var $gridMediaClass = ".enhanced-grid__media";
  var $gridButtonName = "enhanced-grid__button"
  var $gridButtonLabel = "Pause Video Animations";
  var $gridState = "active";

  var enhancedGrid = document.querySelectorAll($gridClass);

  enhancedGrid.forEach(function(grid, e){

    window.onscroll = function()  {

      if(grid.getBoundingClientRect().top <= 0){

        grid.classList.add($gridState);

      } 

    }

    // Enhanced Grid ID

    var enhancedGridId = e + 1;

    // Set Attributes

    grid.setAttribute("id", "enhanced-grid-" + enhancedGridId);
    grid.setAttribute("aria-labelledby", "hdr-enhanced-grid-" + enhancedGridId);

    // Get Header & Set ID

    var enhancedGridHdr = grid.querySelector($gridHeaderClass);

    enhancedGridHdr.setAttribute("id", "hdr-enhanced-grid-" + enhancedGridId);

    // Get All Videos Within Grid

    var enhancedGridMedia = grid.querySelectorAll($gridMediaClass);

    // Remove and Set Attributes

    enhancedGridMedia.forEach(function(media){

      media.removeAttribute("controls"); // Controls only needed if JS disabled.
      media.setAttribute("disableremoteplayback", ""); // We do not need remote playback here as these videos are decorative.
      media.setAttribute("playsinline", ""); // For Safari
      media.setAttribute("tabindex", "-1"); // Some browser allow focus on video. We really do not need that here as it is decorative. 

      // Only play videos if user has not disabled animation

      if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {

        media.setAttribute("autoplay", "");

      }

    });

    // Create Pause Button

    var btnPlayPause = document.createElement("button");
    btnPlayPause.setAttribute("aria-label", $gridButtonName);
    btnPlayPause.classList.add($gridButtonName);

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {

      btnPlayPause.setAttribute("aria-pressed", "false");

    } else {

      btnPlayPause.setAttribute("aria-pressed", "true");

    }
    
    // Append Pause Button
    
    grid.querySelector($gridContainerClass).append(btnPlayPause);

    // Pause Toggle

    btnPlayPause.addEventListener("click", function() {

      if (this.getAttribute("aria-pressed") === "false") {

        this.setAttribute("aria-pressed", "true");

        enhancedGridMedia.forEach(function(media) {

          media.pause();

        });

      } else {

        this.setAttribute("aria-pressed", "false");

        enhancedGridMedia.forEach(function(media){

          media.play();
  
        });

      }

    });

    // For keyboard support. If button tabbed to, show grid.

    btnPlayPause.addEventListener("focus", function() {

      this.closest($gridClass).classList.add($gridState);

    });

  });

})();


