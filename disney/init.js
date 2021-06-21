// Spell's Disney Accessibility Fixes - I never said it would be pretty.

// Append CSS

$("head").append("<link href='https://radancy.dev/playground/disney/init.css' rel='stylesheet'>");

// Global Keypress function

function a11yClick(event){

	if(event.type === "click"){

		return true;

	} else if(event.type === "keypress"){

		var code = event.charCode || event.keyCode;

		if((code === 32)|| (code === 13)){

			return true;

		}

	} else {

		return false;

	}

}

// Function: Trap Focus (Accessibility)

var trapFocus = function(elem) {

  var tabbable = elem.find("select, input, textarea, div[tabindex=0], button, a").filter(":visible");
  var firstTabbable = tabbable.first();
  var lastTabbable = tabbable.last();

  /*set focus on first input*/

  firstTabbable.focus();

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

  /* allow escape key to close insiders div */

  elem.on('keyup', function(e){

    if (e.keyCode === 27 ) {

      elem.hide();

    };

  });

};


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

$("img.play,.yt-video,.foreign-trainer-vid img").attr("tabindex", "0").click(function () {

	$.fancybox({

		'type': 'iframe',
		'href': $(this).attr('data-source')

	});

});

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

// Video Placeholder has poor alt text.

$(".video-placeholder").each(function(index) {

	var VideoPlaceholderHeading = $(this).parent().find("h2, h3, h4").text();
	var VideoPlaceholderAlt = VideoPlaceholderHeading + " (Video)";
	$(this).attr("alt", VideoPlaceholderAlt);
	$(this).parent().attr("data-video-desc", VideoPlaceholderAlt);

});

// Some video placeholders have a tabindex with only a click event on them. That won't work with Keyboard enter and spacebar.
// Add keybress event and trigger click event when key pressed on.

$(".video-placeholder").on("keypress", function(event){

	if(a11yClick(event) === true){

		var thisParent = $(this).parent();
		var thisParentDesc = thisParent.data("video-desc");

		$(this).click();

		var thisiFrame = thisParent.find("iframe");

		thisiFrame.attr("title", thisParentDesc);

		return false;

	}

});

$(".play").on("keypress", function(event){

	if(a11yClick(event) === true){

		$(this).click();
		return false;

	}

});

// Auditions Page

$(".event-filters").removeAttr("tabindex");

// Advanced Search Fixes - Category Section - I know it's not pretty, but gets job done across entire site.

$("#audition-alert").attr("role", "none").removeAttr("aria-label");
$("#audition-alert #category-toggle").attr("role", "button");
$("#audition-alert #category-toggle label").wrap('<span class="label" />').contents().unwrap();
$("#audition-alert #category-toggle .alert-dropdown").attr("aria-hidden", "true");
$("#audition-alert .search-filter-list").removeAttr("aria-expanded");

$("#audition-alert #category-toggle").on("keypress", function(event){

	if(a11yClick(event) === true){

		$(this).click();
		$(this).next().removeAttr("aria-expanded");
		return false;

	}

});

// An old video modal is throwing complaints about an SVG not being titled. Quick fix.

$(".close-video-modal").attr("aria-label", "Close");
$(".close-video-modal svg").attr("aria-hidden", "true");

// More Job Description Stuff

$(".ats-description li").removeAttr("aria-level");
$(".ats-description iframe").attr("title", "Video or form");

// Job Alert has a link with a role of button that contains no tabindex.

$(".data-form.ja-form #btn-more").attr("tabindex", "0").on("keypress", function(event){

	if(a11yClick(event) === true){

		$(this).click();
		return false;

	}

});

// Home: What Career Area Interests You?

$(".tab-parent .career-dot").removeAttr("aria-expanded").on("click", function(event){

	$(this).parent().parent().find("button").removeAttr("aria-expanded").removeClass("focus-active");
	$(".basic-tabcordion-panels").attr("tabindex", "-1").focus();
	$(".custom-checklist a").attr("role", "button").removeAttr("disabled href");
	$(this).addClass("focus-active");

});

$(".basic-tabcordion-panels .tabcordion-close").on("click", function(event){

	$(".tab-parent").find(".focus-active").focus();

});

$(".custom-checklist input").on("click", function(event) {

	if ($(".custom-checklist input:checkbox:checked").length > 0) {

		$(".custom-checklist a").attr("href", "/search-jobs?acm=")

	} else {

		$(".custom-checklist a").removeAttr("disabled href");

	}

});

$(".custom-checklist a").on("keypress", function(event){

	if(a11yClick(event) === true){

		$(this).click();
		return false;

	}

});

// End Careers Fixes.

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

	// Get Help Link in wrong area

	var $getHelpLink = $(".advanced-search-form + .contact-us");
	var $primaryNav = $("#primary-nav");

	$getHelpLink.insertBefore($primaryNav);

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

	// Fancybox A11y Issues

	// Fancy Box Close Button

	$(".fancybox-close").removeAttr("title").attr({

		"role":"button",
		"aria-label": "Close"

	}).on("keypress", function() {

			//$.fancybox.close();

	});

	var $fancyBox = $(".fancybox-wrap");
	$fancyBox .attr({

		"role" : "dialog",
		"aria-label" : "Message"

	});

	trapFocus($fancyBox);

	// ThisMoment Job Description image

	$(".JD-related__img").attr("alt", "");

	// Personalization modules has tabindexs on them. Removing.

	$("section.personalization").removeAttr("tabindex");

}, 3000);
