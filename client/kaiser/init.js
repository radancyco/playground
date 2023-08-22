

/* 

  $(window).on('pageshow', function() {


    if ($('#svg-map ').length) {

      $(".zoom path,.zoom circle").css('opacity', '1');
      $('#map-overlay-default').removeClass("zoomin");
      $("#btn-close").remove();

    }

  });

  $(function() {


    if ($('#svg-map ').length) {
   



      $("#svg-map .zoom").mouseover(function() {

        if (!$('#map-overlay-default').hasClass("zoomin")) {

          $(".zoom path,.zoom circle").css('opacity', '0.77');
        }
      }).mouseout(function() {

        $(".zoom path,.zoom circle").css('opacity', '');
      });


      $("#svg-map  .state-link").click(function(e) {

        e.preventDefault();


        if ($('#map-overlay-default').hasClass("zoomin") || $(this).attr('class').indexOf('zoom') == -1) {

          var selState = $(this).attr("aria-label").toLowerCase();
          var targetURL = "https://locations.kaiserpermanentejobs.org/#" + selState;
          APP.MODELS.GoogleBot.sendCustomDimensions('Explore our Locations', 'Click', selState, 'event');

          location.href = targetURL;
          $('#info-box').hide();
        }

      });


      $("#svg-map  .state_default").click(function(e) {

        var targetURL = "https://locations.kaiserpermanentejobs.org/";
        location.href = targetURL;
        e.preventDefault();
        $('#info-box').hide();


      });

      $("#svg-map .zoom").click(function(e) {

        e.preventDefault();
        $('#map-overlay-default').addClass("zoomin");

        $('#map-overlay-default').append('<button aria-label="Zoom Out" id="btn-close">X</button>');
        $("#btn-close").click(function(e) {

          $('#map-overlay-default').removeClass("zoomin");
          $("#btn-close").remove();
          $('#map-overlay-default').focus();

        });
      });

      $('#svg-map  .state-link').mousemove(function(e) {
        $('#info-box').css('top', e.pageY - $('#info-box').height() - 30);
        $('#info-box').css('left', e.pageX - ($('#info-box').width()) / 2);

      });

      $('#svg-map  .state_default').mousemove(function(e) {
        $('#info-box').hide();
      });
      $("#svg-map  .state-link").mouseleave(function() {
        $('#info-box').hide();
      });

      $("#svg-map  .state-link").hover(function(e) {
        $('#info-box').css('display', 'block');
        var selSate = $(this).attr('xlink:title');
        var dGroup = $(this).attr('data-group-name');
        if (!$('#map-overlay-default').hasClass("zoomin")) {
          $('#info-box').html(dGroup);
        } else {
          $('#info-box').html(selSate);
        }
      });
    }

  });

  */



  // New 





    var $customLocations = $(".custom-locations");
    var $customLocationsMap = $(".custom-locations__map");
    var $customLocationsLabel = $(".custom-locations__label");
    var $customLocationsState = $(".custom-locations__state");

    $customLocationsState.click(function(e) {

        $customLocationsLabel.hide();

        var selState = $(this).data("state");

        //APP.MODELS.GoogleBot.sendCustomDimensions('Explore our Locations', 'Click', selState, 'event');

        

    });

    $customLocationsMap.find(".zoom").click(function(e) {

        e.preventDefault();

    

        

        $customLocations.addClass("zoomin");

        $customLocations.append('<button aria-label="Zoom Out" class="custom-locations__button">X</button>');

       //  trapFocus();

        var $customLocationsBtn = $(".custom-locations__button");

        $customLocationsBtn.click(function(e) {

            $customLocations.removeClass("zoomin");
            $customLocationsBtn.remove();
            $customLocationsLabel.hide();
            

          // $customLocations.focus();

        });

    });

    $customLocationsState.mousemove(function(e) {

        $customLocationsLabel.css('inset-block-start', e.pageY - $customLocationsLabel.height() - 120);
        $customLocationsLabel.css('inset-inline-start', e.pageX - ($customLocationsLabel.width()) / .5);

    });


    $customLocationsState.mouseleave(function() {

        $customLocationsLabel.hide();
        
    });

    $customLocationsState.focus(function(e) {
        
        var $focusedState = $(':focus-visible');
        
        $customLocationsLabel.css('display', 'block');
        $customLocationsLabel.css('inset-block-start', $focusedState.position().top - 200);
        $customLocationsLabel.css('inset-inline-start', $focusedState.position().left - 100);
        
        var selSate = $(this).data('state');
        
        $customLocationsLabel.html(selSate);
    
        
    });

    $customLocationsState.hover(function(e) {
    
        $customLocationsLabel.css('display', 'block');
    
        var selSate = $(this).data('state');
    
        $customLocationsLabel.html(selSate);

    });

    // Function: Trap Focus (Accessibility)

function trapFocus() {

  var tabbable = $(".zoomin").find(".custom-locations__button, .zoom").filter(":visible");
  var firstTabbable = tabbable.first();
  var lastTabbable = tabbable.last();



  /*redirect last tab to first input*/

  lastTabbable.on('keydown', function (e) {

    if ((e.which === 9 && !e.shiftKey)) {

      e.preventDefault();
      firstTabbable.focus();

    }

  });

  /*redirect first shift+tab to last input*/

  firstTabbable.on('keydown', function (e) {

    if ((e.which === 9 && e.shiftKey)) {

      e.preventDefault();
      lastTabbable.focus();

    }

  });


};
    




 