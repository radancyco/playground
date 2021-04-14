// Spell's Disney Accessibility Fixes - I never said it would be pretty.

// Append CSS

$("head").append("<link href='https://radancy.dev/playground/disney/init.css' rel='stylesheet'>");

// Enhance Primary Navigation links so AT users understand where they are within the site.

// Enahnce Primary Navigation

var navHref = window.location.pathname;

// console.log(navHref);

if( $("#primary-nav a[href='" + navHref + "']").length ) {

	$("#primary-nava[href='" + navHref + "']").attr({

		'aria-current': 'page',
		'href': '#content'

	});

}

// Add button role to Advanced Search Jobs toggle

$(".advanced-search-toggle").attr("role", "button");

// Ensure ASJ button toggle can be used with space bar

$(".top-bar .advanced-search-toggle").on("keypress", function() {

	$(this).click();
	return false;

});


setTimeout(function(){

	// Carousel Fixes

	var $SlickSliderList = $(".one-time");

	$(".slick-dots").after("<button class='slick-carousel-pause' aria-label='Pause' aria-pressed='false'></button>");

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

	$(".fancybox-close").removeAttribute("title").attr({

    "role":"button",
    "aria-label": "Close"

	}).on("keypress", function() {

			$.fancybox.close();

	});

}, 3000);
