/*!

  Wegmans: Enhanced Grid

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

(function() {

  var $gridName = ".enhanced-grid";

  var enhancedGrid = document.querySelectorAll($gridName);

  enhancedGrid.forEach(function(grid, e){

    window.onscroll = function()  {

      if(grid.getBoundingClientRect().top <= 0){

        grid.classList.add("active");

      } 

    }

    // Enhanced Grid ID

    var enhancedGridId = e + 1;

    // Set Attributes

    grid.setAttribute("id", "enhanced-grid-" + enhancedGridId);
    grid.setAttribute("aria-labelledby", "hdr-enhanced-grid-" + enhancedGridId);

    // Get Header & Set ID

    var enhancedGridHdr = grid.querySelector(".enhanced-grid__hdr");

    enhancedGridHdr.setAttribute("id", "hdr-enhanced-grid-" + enhancedGridId);

    // Get All Videos Within Grid

    var enhancedGridMedia = grid.querySelectorAll(".enhanced-grid__media");

    // Remove and Set Attributes

    enhancedGridMedia.forEach(function(media){

      media.removeAttribute("controls");
      media.setAttribute("disableremoteplayback", "");
      media.setAttribute("playsinline", "");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        media.removeAttribute("autoplay");

      } else { 

        media.setAttribute("autoplay", "");

      }

    });

    // Create Pause Button

    var btnPlayPause = document.createElement("button");
    btnPlayPause.setAttribute("aria-label", "Play Video Animations");
    btnPlayPause.classList.add("enhanced-grid__button");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

      btnPlayPause.setAttribute("aria-pressed", "true");

    } else {

      btnPlayPause.setAttribute("aria-pressed", "false");

    }
    
    // Append Pause Button
    
    grid.querySelector(".enhanced-grid__container").append(btnPlayPause);

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

    btnPlayPause.addEventListener("focus", function() {

      this.closest($gridName).classList.add("active");

    });


  });

})();


