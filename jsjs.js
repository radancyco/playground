/* =========================================================================
global variables
========================================================================== */
//watchers for major breakpoint changes - move from small screen to large screen layout/styles
//these match up to
(function () {
    var mq = {
        end: window.matchMedia("(max-width: 799px)")
    }

    //container ID/class names called by specific functions
    var selectors = {
        searchContainer: '.search-container',
        navContainer: '.header-content',
        pageWrap: '#page',
        socialShare: '.social-share',
        socialShareMore: '.share-more'
    }

    /* =========================================================================
    search form panel
    ========================================================================== */
    //make search form expandable only on small screens
    function searchFormExpandable() {
        if (mq.end.matches) {
            $(selectors.searchForm).expandable('revive');
            $(selectors.advancedSearchForm).expandable('revive');
        }
        else {
            $(selectors.searchForm).expandable('kill');
            $(selectors.searchForm).children('div').removeAttr('style');
            $(selectors.advancedSearchForm).expandable('kill');
            $(selectors.advancedSearchForm).children('div').removeAttr('style');
        }
        return;
    }
    searchFormExpandable();
    mq.end.addListener(searchFormExpandable);

    /* =========================================================================
    Expandable on Mobile
    ========================================================================== */
    //make following elements expandable only on small screens
    function mobileExpandable() {
        if (mq.end.matches) {
        //Search form
            $(selectors.searchContainer).expandable('revive');
        //Header nav
            $(selectors.navContainer).expandable('revive');
        }
        else {
        //Search form
            $(selectors.searchContainer).expandable('kill');
            $(selectors.searchContainer).children('div').removeAttr('style');
        //Header nav
            $(selectors.navContainer).expandable('kill');
            $(selectors.navContainer).children('div').removeAttr('style');
        }
        return;
    }
    mobileExpandable();
    mq.end.addListener(mobileExpandable);

    /* =========================================================================
    slideout filters for search results on small screens
    ========================================================================= */
    if ($('#search-results').length == 1) window.APP.MODELS.FilterSlideOut.create({
        breakpoint: 800,
        animationSpeed: 200,
        pageWrapId: 'page',
        filterType: 'search',
        openToggle: 'Filter Results',
        closeToggle: 'Close'
    });

    /* =========================================================================
    social share open/close toggle
    ========================================================================== */
    $(selectors.socialShare)
        .on('click', selectors.socialShareMore, function () {
            var parent = $(this).parents(selectors.socialShare);
            parent.toggleClass('share-open');
            var moreText = $(this).attr('data-more-text');
            var lessText = $(this).attr('data-less-text');
            //on large screens, move the second list items into the first list, instead of sliding the list down
            if (parent.hasClass('share-open')) {
                $(this).text(lessText);
            }
            else {
                $(this).text(moreText);
            }
            return;
        });

    /* =========================================================================
    Search results scroll to top of results when click pagination buttons
    ========================================================================== */
    if(document.body.id == "search"){
      window.onload = function(){
        $('.next').attr('pagejump', true);
        scrollUpClick();
        $(document).ajaxComplete(function(){
          if($('a[pagejump="true"]').length === 0){
            scrollUpClick();
            $('.next').attr('pagejump', true);
          }
        });
      }
    }

    function scrollUpClick(){
      $('.next, .prev, .pagination-page-jump').click(function(){
        $('html, body').animate({
          scrollTop: $("#search-results").offset().top
        });
      });
    }

    /* =========================================================================
    video
    ========================================================================== */
    $('.play').click(function() {
        $(this).closest('.video').addClass('video-padding');
        var video = '<iframe src="'+ $(this).attr('data-video') +'"></iframe>';
        $(this).replaceWith(video);
    });

    /* =================================================================
    Make search sticky
    ================================================================= */
    
        $(window).on("load", function() {
            var bottom = $('.search-wrapper').offset().top;
            $(window).scroll(function() {
                if ($(this).scrollTop() > bottom) {
                    $('.search-wrapper').addClass('stick-it');
                } else {
                    $('.search-wrapper').removeClass('stick-it');
                }
            });
        });
    

    /* =========================================================================
    Search Toggle Job Matching Callout
    ========================================================================== */
    $('.search-toggle').click(function(){
        $('.jm-link').toggleClass('show');
    });
})();

// Related Content Video Popup
$('.related-content-link-wrap a').each(function(){
	var theHref = $(this).attr('href');
	if(theHref.indexOf("youtube") > -1){
		$(this).parent().parent().find('img').click(function(){
			$.fancybox.open(theHref,{
			type: 'iframe'
			});
		});
	}
});

// Remove ,New-York from job alert form
$('.data-form .keyword-location option[value="6252001-5128638-5133268"]').remove();

// $('[data-id="6252001-5128638-5128581"]').parent().remove();

// $(document).ajaxStop(function(){
//     $('[data-id="6252001-5128638-5128581"]').parent().remove();
// });

// Being Used for Job Alert Resume Upload label
$('.instruction-text').prev('label').html('Upload Resume&nbsp;&nbsp;&nbsp;*Option');

// Search Results Scroll
$(document).on('start-searchresults-scrolling', function(){
        $("html, body").animate({ scrollTop: $("#search-results").offset().top - 150 }, 400, function () {});
});


// Filter Toggle

function filterToggleSpaceBar() {


	$("#search-filters .expandable-parent").on("keydown", function(e) {

		if(e.keyCode == 32){

       			$(this).trigger("click");
			
			return false;
   
		}
		
	
	});

}

// Filtered Search A11y Fix

function setFilterFocus() {

	$(".filter-button").on("click", function() {

		var selectedButtonIndex = $(".filter-button").index(this);

		setTimeout(function(){

			var remainingButtonIndex = $(".filter-button").length;

			// console.log(selectedButtonIndex)

			if(remainingButtonIndex) {

				if(selectedButtonIndex >= remainingButtonIndex) {

					$(".filter-button").last().focus();

				} else {

					$(".filter-button").eq(selectedButtonIndex).focus();

				}
		

			} else {

				$("#search-results-list ul a:first").focus();

			}


		}, 1000);


	});

}

if($("#search").length) {

	filterToggleSpaceBar();
	setFilterFocus();

	$(document).ajaxStop(function() {

		filterToggleSpaceBar();
		setFilterFocus();

	});

}