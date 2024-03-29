// Spell's Disney Accessibility Fixes

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

			// also close other stuff

			// What Career Interest You? (Home Page)
			// Yes, I know it is lazy and firing EVERY TIME esc key pressed.

			$(".basic-tabcordion-content").removeClass("active").attr("aria-hidden", "true");
			$(".tab-parent").find(".focus-active").focus();

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

$("iframe").attr({

	"title":  "Video or form content.",
	"loading": "lazy"

});

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
	$(this).parent().attr("data-video-dclose", VideoPlaceholderAlt);

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

$(".navlist, .basic-tabcordion-content").removeAttr("role");

$(".tab-parent .career-dot").removeAttr("aria-selected role").on("click", function(event){

	$(this).parent().parent().find("button").removeAttr("aria-selected").removeClass("focus-active");
	$(".tabcordion-close:visible").focus();
	$(".custom-checklist a").removeAttr("disabled href");
	$(this).addClass("focus-active");

});

$(".basic-tabcordion-panels .tabcordion-close").on("click", function(event){

	$(".tab-parent").find(".focus-active").focus();

});

$(".custom-checklist input").on("click", function(event) {

	if ($(".custom-checklist input:checkbox:checked").length > 0) {

		$(".custom-checklist a").removeAttr("style").attr("href", "/search-jobs?acm=")

	} else {

		$(".custom-checklist a").css("pointer-events", "none").removeAttr("disabled href");

	}

});

$(".custom-checklist a").css("pointer-events", "none").on("keypress", function(event){

	if(a11yClick(event) === true){

		$(this).click();
		return false;

	}

});

$(".custom-checklist .reset-button").on("click", function(event){

	$(".custom-checklist a").removeAttr("href");

});

// Home: Fit finder

$(".fitfinder-two").attr({

	"role":  "tablist",
	"aria-labelledby": "our-business-heading"

});

$(".fitfinder-two .our-business-heading").attr("id", "our-business-heading");
$(".fit-finder-nav__list, .fit-finder-nav__list-item").attr("role", "presentation");
$(".column-wrapper").attr("role", "tabpanel");

$(".fit-finder-nav__list-item a").each(function() {

	var thisHref = $(this).attr("href").replace("#", "");

	$(this).attr({

		"role":  "tab",
		"aria-selected": "false",
		"aria-controls": thisHref

	});

	if($(this).hasClass("active")) {

		$(this).attr("aria-selected", "true");

	}

});

$(".toggle-column-wrapper").each(function() {

	var thisHref = $(this).attr("href").replace("#", "");

	$(this).attr({

		"role":  "button",
		"aria-expanded": "false",
		"aria-controls": thisHref

	});

	if($(this).next().hasClass("open")) {

		$(this).attr("aria-expanded", "true");

	}

});

var $tabElements = $("a[href='#direct-to-consumer'], a[href='#media-network'], a[href='#parks-experince'], a[href='#the-walt-disney-company']");

$tabElements.on("click", function() {

	$(this).parents(".fitfinder-two").find("a[role='tab']").attr("aria-selected", "false");
	$(this).parents(".fitfinder-two").find("a[role='button']").attr("aria-expanded", "false");

	setTimeout(function(){

		$(".fitfinder-two").find(".active").attr("aria-selected", "true");

		$(".fitfinder-two").find(".open").prev().attr("aria-expanded", "true");

	}, 300);

});

// General Escape Key Functionality

$(document).on('keyup', function(e){

	if (e.keyCode === 27 ) {

		$(".tabcordion-close").trigger("click");

		// Homepage "tabcordions" - https://www.screencast.com/t/bLxTaxly

	};

});

// End Careers Fixes.

// Home: Where will your story begin?

// $(".fit-options button").on("click", function(event){



// });

// Advanced Job: Success Profile
// How are blind individuals to know how they rate from a purely graphical representation of ratings?

if($("#advanced-job").length) {

	$(".ajd_graph__percent.one").html("<span class='wai'>1/10 Stars</span>");
	$(".ajd_graph__percent.two").html("<span class='wai'>2/10 Stars</span>");
	$(".ajd_graph__percent.three").html("<span class='wai'>3/10 Stars</span>");
	$(".ajd_graph__percent.four").html("<span class='wai'>4/10 Stars</span>");
	$(".ajd_graph__percent.five").html("<span class='wai'>5/10 Stars</span>");
	$(".ajd_graph__percent.six").html("<span class='wai'>6/10 Stars</span>");
	$(".ajd_graph__percent.seven").html("<span class='wai'>7/10 Stars</span>");
	$(".ajd_graph__percent.eight").html("<span class='wai'>8/10 Stars</span>");
	$(".ajd_graph__percent.nine").html("<span class='wai'>9/10 Stars</span>");
	$(".ajd_graph__percent.10").html("<span class='wai'>10/10 Stars</span>");

}

// Global: Hero video not needed on page still loaded on page and present in markup. May be implemented incorrectly.
// For now, simply removing video (and puse button), with a src value of null .

$("#hero-banner video[src='null']").next().remove();
$("#hero-banner video[src='null']").remove();
$("#hero-banner video").removeAttr("aria-label").attr("title", "Background Animation");

// Weird empty iframes on site

$(".video-modal .video-modal-content #videoIframe").each(function() {

  if($(this).attr("src") == "") {

		// $(this).parent().parent().remove();

		$(this).attr("role", "presentation");

	}

});


if($("#videoIframe[src='']")) {

	$(this).attr("role", "presentation");

	// $(this).parent().remove();

}

// Empty aside that development should be REMOVING from DOM. If it has no content, WHY keep it on the page at all?

$("aside").each(function() {

	if ($(this).children().length == 0){

	  $(this).remove();

	}

});

// Sitemap Page Fixes

$("#sitemap #content h2.expandable-parent").removeAttr("tabindex aria-expanded");

$("#sitemap #content a.expandable-parent").attr("role", "button").on("keypress", function(event){

	if(a11yClick(event) === true){

		$(this).click();
		return false;

	}

});

// Goofy (no pun intended) issue. This is global and may move to magic bullet script:
// The "Advanced Search" link point to a refrence that does not exist on the page, so let's add an ID to it.

$(".advanced-search-form-fields").attr("id", "advanced-search-form-fields");

// Remove noscript tags.

$("noscript").remove();

setTimeout(function(){

	// Carousel Fixes

	var $SlickSliderList = $(".one-time, .one-time2, .espn-banner, .quote-slider");

	$SlickSliderList.find(".slick-dots, .slick-next").after("<button class='slick-carousel-pause' aria-label='Pause' aria-pressed='false'></button>");

	$(".slick-carousel-pause").on("click", function() {

	  var $slickPause = $(".slick-carousel-pause");

	  if ($(this).attr("aria-pressed") === "false"){

	    $SlickSliderList.slick("slickPause");
	    $slickPause.attr("aria-pressed", "true");

	  } else {

	    $SlickSliderList.slick("slickPlay");
	    $slickPause.attr("aria-pressed", "false");

	  }

	});

	// Get Help Link in wrong area

	var $getHelpLink = $(".advanced-search-form + .contact-us");
	var $primaryNav = $("#primary-nav");

	$getHelpLink.insertBefore($primaryNav);

	// Video Module Fixes

	$(".vid-main-wrapper").each(function(index) {

		var thisVideoContainer = $(this).find(".vid-container");
		var thisVideoList = $(this).find(".vid-list");
		var thisVideoIframe = thisVideoContainer.find("iframe");

		// Prepend Return to Video Nav link

		if(!$(".btn-video-nav").length) {

			thisVideoContainer.prepend("<button class='btn-video-nav'>Go to Video Nav</button>");

		}

		$(".btn-video-nav").on("click", function() {

			$("#video-nav-0" + index).attr("tabindex", "-1").focus();

			return false;

		});

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
			"src": $InitVideoURL,
			"allow": "fullscreen"

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

	// Remove random goofy old-school Stuff

	//$("script, link, style").removeAttr("type charset");

	// Annoying redundant placeholder text

	$('input[placeholder="First Name"], input[placeholder="Last Name"]').removeAttr("placeholder");

}, 3000);
