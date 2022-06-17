
// Add CSS

var head  = document.getElementsByTagName('head')[0];
var link  = document.createElement('link');

link.rel  = 'stylesheet';
// link.href = 'https://services1-tmpwebeng-com.tmpqa.com/js/target-search-widget.css';
link.href = 'target-search-widget.css';
head.appendChild(link);

window.onload = function () { // same as window.addEventListener('load', (event) => {

  if (window.jQuery === undefined) {

    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement('script');

    jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
    jqTag.onload = tbSearchWidget;
    headTag.appendChild(jqTag);

  } else {

    tbSearchWidget();

  }

};

function tbSearchWidget() {

  if (!$('#tb-search-widget-form').length) {

    alert('Please add a div with an id of "tb-search-widget-form", where you want to display widget.');
    return false;

  }

  jQuery.fn.extend({

    autoSuggest: function (feed) {

      var $catgLocMR = $('#category-location-datalist');


      $('#tb-search-widget-location').on('input', function () {

          var val = this.value;

          var selItem = $catgLocMR.find('option').filter(function () {

              return this.value.toUpperCase() === val.toUpperCase();

          });

          if (typeof selItem !== "undefined"  &&  selItem.length) {

              $(this).attr({

                  "data-lp": selItem.data("lp"),
                  "data-lt": selItem.data("lt"),
                  "data-lat": selItem.data("lat"),
                  "data-lon": selItem.data("lon")

              });

              $('#tb-search-widget-radius').removeAttr("disabled");

              $(this).removeAttr("aria-describedby");

              $('#search-location-error').prop("hidden", true);

          } else {

              $('#tb-search-widget-location').attr({

                  "data-lp": "",
                  "data-lt": "",
                  "data-lat": "",
                  "data-lon": ""

              });

              $('#tb-search-widget-radius').prop("disabled",true);
          }

      });

      $(this).on('keyup', function (e) {

        // ignore arrow keys

        if (e.which >= 37 && e.which <= 40) {

          return false;

        }

        var $that = $(this);

        $catgLocMR.empty();

        var s = $(this).val();

        sel = false;

        if (s.length > 2) {

          $that.attr('data-selected', false);
          $.ajaxSetup({ cache: true });
          $.getJSON(feed.replace("{#keyword}", s), null, function (data) {

            if (data.length > 0) {

              $catgLocMR.empty();

              $.each(data, function (index, value) {

                if (index < 5) {

                  $catgLocMR.append('<option data-lp="' + value.lp + '" data-lt="' + value.lt + '" data-lat="' + value.lat + '" data-lon="' + value.lon + '">' + value.value + '</option>');

                }

              });

            }

          });

        }

      });

    }

  });

  jQuery(document).ready(function($) {

    var $tbSform = $('<form action="/search-jobs" class="search-form" id="tb-search-widget" role="search">');
    var $tbSformDiv = $('<div aria-label="Job Search" class="search-form-fields" role="group"></div>');

    $tbSformDiv.append('<div><label for="tb-search-widget-keyword">Keyword</label><input autocomplete="off" class="search-keyword" id="tb-search-widget-keyword" maxlength="150" name="k" placeholder="Keyword or job type" type="text" value=""></div>');
    $tbSformDiv.append('<div><label for="tb-search-widget-location">Location</label><input autocomplete="off" class="search-location" list="category-location-datalist" id="tb-search-widget-location" maxlength="150" name="location" placeholder="City, State, or Zip" type="text"><datalist id="category-location-datalist"></datalist></div>');
    $tbSformDiv.append('<div><label for="tb-search-widget-radius">Radius</label><select class="search-radius" disabled id="tb-search-widget-radius" name="r"><option value="">Please Select</option><option value="5">5 miles</option><option value="15">15 miles</option><option value="25">25 miles</option><option value="35">35 miles</option><option value="50">50 miles</option></select></div>');
    $tbSformDiv.append('<div><input id="tb-search-widget-org-ids" name="orgIds" value="2015" type="hidden"><button class="search-button" id="tb-search-submit">Browse jobs listings</button></div>');
    $tbSform.append($tbSformDiv);

    $("#tb-search-widget-form").empty();

    $("#tb-search-widget-form").append($tbSform);
    $("#tb-search-widget-form").append('<p hidden id="search-location-error">Please try again. Choose a location from the suggestions or clear the field to submit your search.</p>');
    $("#tb-search-widget-form").append('<p id="serach-widget-links"><a href="https://jobs.target.com/saved-jobs">Saved jobs</a><a href="https://jobs.target.com/recently-viewed-jobs">Recently viewed jobs</a></p>');

    $("#tb-search-widget-form").parent().addClass('corp-container');

    $('input[name="location"]').autoSuggest("https://services1.tmpwebeng.com/feed/feed-proxy.aspx?feed=https://jobs.target.com/search-jobs/locations?term={#keyword}&countryCodes=US&lat=&lon=");

    $("#tb-search-widget").submit(function (e) {

        e.preventDefault();

        var keyword = $('#tb-search-widget-keyword').val();
        var location = $('#tb-search-widget-location').val();
        var lat = $('#tb-search-widget-location').attr("data-lat") + "";
        var lon = $('#tb-search-widget-location').attr("data-lon") + "";
        var lp = $('#tb-search-widget-location').attr("data-lp");
        var lt = $('#tb-search-widget-location').attr("data-lt");

        if (location.length > 0 && ( lat === "undefined" || lat=="" )) {



        $('#search-location-error').removeAttr("hidden");
        $('#tb-search-widget-location').attr("aria-describedby", "search-location-error").focus();

        return false;

      }

      var sRadius = "35";

      if ($('#tb-search-widget-radius').val() != "") {

        sRadius = $('#tb-search-widget-radius').val();

      }

      var redURL = "https://jobs.target.com/search-jobs"

      if (typeof keyword !== "undefined" && keyword.length > 0) {

        redURL += "/" + keyword;

      }

      if (location.length > 0 && keyword.length > 0) {

        redURL += "/" + location + "/1118/1/" + lt + "/" + lp + "/" + lat.replace(".", "x") + "/" + lon.replace(".", "x") + "/" + sRadius + "/2";

      } else if(location.length > 0){

        redURL += "/" + location + "/1118/" + lt + "/" + lp + "/" + lat.replace(".", "x") + "/" + lon.replace(".", "x") + "/" + sRadius + "/2";

      }

      window.location.href = redURL;

    })

  });

}
