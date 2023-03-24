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

  videoGrid = document.querySelectorAll(".video-grid");

  videoGrid.forEach(function(grid, e){

    var videoGridContainer = grid.querySelector(".video-grid__container");

    videoGridContainer.before(btnPlayPause);

    var video = grid.querySelectorAll("video");

    btnPlayPause.addEventListener("click", function() {

      video.forEach(function(v, e){
    
        if (v.paused == true) {

          v.play();

        } else {

          v.pause();

        }
    
      });

  })











});

  
})();


