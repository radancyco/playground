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

  // Check Cookie. If set to true, pause video.

  function getCookie(name) {

    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value !== null) ? unescape(value[1]):null;
  
  }

  var gridPaused = getCookie("heroBannerPaused");

  // Render Grid

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

      // Only play videos if user has not disabled animation

      if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {

        if(gridPaused === null) {

          media.setAttribute("autoplay", "");

        }

      }

    });

    // Create Pause Button

    var btnPlayPause = document.createElement("button");
    btnPlayPause.setAttribute("aria-label", $gridButtonLabel);
    btnPlayPause.classList.add($gridButtonName);

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {

      if(gridPaused !== null) {

        btnPlayPause.setAttribute("aria-pressed", "true");

      } else {

        btnPlayPause.setAttribute("aria-pressed", "false");

      }

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
          document.cookie = "heroBannerPaused=true; path=/";

        });

      } else {

        this.setAttribute("aria-pressed", "false");

        enhancedGridMedia.forEach(function(media){

          document.cookie = "heroBannerPaused=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          media.play();
  
        });

      }

    });

    // For keyboard support. If button tabbed to, show grid.

    btnPlayPause.addEventListener("focus", function() {

      this.closest($gridClass).classList.add($gridState);

    });

  });

  // Video Lazy Loader

  document.addEventListener("DOMContentLoaded", function() {

    var lazyVideos = [].slice.call(document.querySelectorAll($gridMediaClass));

    if ("IntersectionObserver" in window) {

      var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {

        entries.forEach(function(video) {

          if (video.isIntersecting) {

            for (var source in video.target.children) {

              var videoSource = video.target.children[source];

              if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {

                videoSource.src = videoSource.dataset.src;

              }

            }

            video.target.load();
            
            video.target.classList.remove("lazy");

            lazyVideoObserver.unobserve(video.target);

          }

        });

      });

      lazyVideos.forEach(function(lazyVideo) {

        lazyVideoObserver.observe(lazyVideo);

      });

    }

  });

})();


