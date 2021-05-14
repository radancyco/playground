// Spell's Disney Accessibility Fixes - I never said it would be pretty.

// Append CSS

$("head").append("<link href='https://radancy.dev/playground/disney/init.css' rel='stylesheet'>");

// Enhance Primary Navigation links so AT users understand where they are within the site.

var navHref = window.location.pathname;

// console.log(navHref);

if( $("#primary-nav a[href='" + navHref + "']").length ) {

	$("#primary-nav a[href='" + navHref + "']").attr({

		'aria-current': 'page',
		'href': '#content'

	});

}

// Iframe need a title attribute. Hate to do this, but fixing every iframe on site is not practial.

$("iframe").attr("title", "Video or form content.");

// Some inline videos are not keyboard friendly.

$("img.play,.yt-video,.foreign-trainer-vid img").attr("tabindex", "0");

// Add button role to Advanced Search Jobs toggle

$(".advanced-search-toggle").attr("role", "button");

// Ensure ASJ button toggle can be used with space bar

$(".top-bar .advanced-search-toggle").on("keypress", function() {

	$(this).click();
	return false;

});

// Some toggle buttons missing aria-expanded state

$(".form-expand, button[data-toggle-type='parent'], .faq__question").attr("aria-expanded", "false").on("click", function() {

	$(this).attr("aria-expanded", function (i, attr) {

		 return attr == "true" ? "false" : "true"

	 });

});

setTimeout(function(){

	// Carousel Fixes

	var $SlickSliderList = $(".one-time, .espn-banner, .quote-slider");

	$SlickSliderList.find(".slick-dots, .slick-next").after("<button class='slick-carousel-pause' aria-label='Pause' aria-pressed='false'></button>");

	$(".slick-carousel-pause").on("click", function() {

	  if ($(this).attr("aria-pressed") === "false"){

	    $SlickSliderList.slick("slickPause");
	    $(this).attr("aria-pressed", "true");

	  } else {

	    $SlickSliderList.slick("slickPlay");
	    $(this).attr("aria-pressed", "false");

	  }

	});

	// Fancy Box Close Button

	$(".fancybox-close").removeAttr("title").attr({

    "role":"button",
    "aria-label": "Close"

	}).on("keypress", function() {

			//$.fancybox.close();

	});

	// Video Module Fixes

	$(".videos").each(function(index) {

		var thisVideoContainer = $(this).find(".vid-container");
		var thisVideoList = $(this).find(".vid-list");
		var thisVideoIframe = thisVideoContainer.find("iframe");

		// Prepend Return to Video Nav link

		thisVideoContainer.prepend("<a class='btn-video-nav' href='#video-nav-0" + index + "'>Go to Video Nav</a>");

		// Add ID to Video Navigation List

		thisVideoList.attr("id", "video-nav-0" + index);

		// Add title to default video and update src

		var $InitVideoSelect = thisVideoList.find(".selected");
		var $InitVideoText =  $InitVideoSelect.find(".desc").text();
		var $InitVideoLink = $InitVideoSelect.find("a");
		var $InitVideoID = $InitVideoLink.data("video");
		var $InitVideoURL = "https://www.youtube.com/embed/" + $InitVideoID + "?rel=0&cc_load_policy=1&modestbranding=1&showinfo=0&enablejsapi=1&";
		thisVideoIframe.attr({

	    "title":  $InitVideoText,
			"src": $InitVideoURL

		});

		// List Link Action

		var $ListLinks = thisVideoList.find("a");

		$ListLinks.each(function() {

			$(this).on("click", function() {

				var $SelectedVideoText = $(this).find(".desc").text();
				var YouTubeID = $(this).data("video");
				var NewURL = "https://www.youtube.com/embed/" + YouTubeID + "?rel=0&cc_load_policy=1&modestbranding=1&autoplay=1&showinfo=0";

				thisVideoIframe.attr({

			    "title":  $SelectedVideoText,
					"src": NewURL

				}).parent().attr("tabindex", "-1").focus();

				return false;

			});

		});

	});

}, 3000);
