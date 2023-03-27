/*!

  Radancy Pattern Library: Grid Disclosure

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

(function() {

  var btnPlayPause = document.createElement("button");
  btnPlayPause.setAttribute("aria-label", "Play all videos");
  btnPlayPause.setAttribute("aria-pressed", "false");
  btnPlayPause.classList.add("video-grid__button");

  videoGrid = document.querySelectorAll(".video-grid");

  videoGrid.forEach(function(grid, e){

    var videoGridContainer = grid.querySelector(".video-grid__container");

    videoGridContainer.before(btnPlayPause);

    var video = grid.querySelectorAll("video");

    video.forEach(function(v){

      v.removeAttribute("controls");
      v.setAttribute("disableremoteplayback", "");
      v.setAttribute("playsinline", "");

    });

    btnPlayPause.addEventListener("click", function() {

      if (this.getAttribute("aria-pressed") === "false") {

        this.setAttribute("aria-pressed", "true");

        video.forEach(function(v){

          v.pause();

        });

      } else {

        this.setAttribute("aria-pressed", "false");

        video.forEach(function(v){

            v.play();
  
        });

      }

  })

});

})();


