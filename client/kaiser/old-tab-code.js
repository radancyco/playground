

//  PRODUCT CODE - INDEPENDENT SCRIPT
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
      var context = this, args = arguments;
      var later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
  };
}

// PRODUCT CODE tabs-to function
var tmpTabsToAccordion = {
  init: function () {
      // setup each of the tab sets with their own ID system
      $(".prod-tabs").each(function (i) {
          // create global reference used throughout
          var dTab = "[data-tab-list-id='" + i + "']";
          // if this tab set is responsive type setup preview areas
          tmpTabsToAccordion.setupGlobal(this, i, dTab);
          tmpTabsToAccordion.openOnLoad(this, i, dTab);            
      });

      // tab button click event
      $(".prod-tabs__button").on("click", function (e) {
          e.preventDefault();
          var type = $(this).closest(".prod-tabs").attr("data-tabs-dir");
          if (type === "responsive") {
              tmpTabsToAccordion.clickResponsive(this);
          } else {
              tmpTabsToAccordion.clickNormal(this);
          }
      });
    
    
      $(document).on("click",".return-to-tabs",function(e){
        e.preventDefault();
        var getId = $(this).attr("data-tabs-list");
        $("[data-tab-list-id='" + getId + "'] .prod-tabs__button[aria-expanded='true']").focus();
      })
  },
  setupGlobal: function (thisTabList,i,dTab){
      // give this list a unique identifier
      $(thisTabList).attr("data-tab-list-id", i);

      // apply unique identifier to the button and content container
      $(dTab + " .prod-tabs__button, " + dTab + " .prod-tabs__content, " + dTab + " .prod-tabs__viewer").attr("data-tab-list-id", i);
    
      // give each button and content area it's accessibility
      $(dTab + " .prod-tabs__list").attr("role","tablist");
      $(dTab + " .prod-tabs__item").each(function (x) {
          $(this).find(".prod-tabs__button").attr({
              id: "tabs-" + i + "-btn-" + x
          });
          $(this).find(".prod-tabs__content").attr({ 
              id: "tabs-" + i + "-prev-" + x
          });
      });

      // create preview areas
      if ($(dTab + "[data-tabs-dir='responsive']").length) {
          tmpTabsToAccordion.responsivePreviewSetup(i);
      } else {
          tmpTabsToAccordion.normalPreviewSetup(i);
      }
  },
  openOnLoad: function(thisTabList,i,dTab){
    // setup first-active tab
          var tabDirType = $(dTab).attr("data-tabs-dir"),
              enabledParams = $(thisTabList).attr("data-tabs-enable-params"),
              getPreview,
              isSet = false;
          // ---------------------------------
          // SETTING UP FIRST ON LOAD
          // if data-tabs-enable-params attribute is set to true it will look for query string
          if (enabledParams === "true") {
              var tabSet = tmpQueryString("tab-id");
              if (tabSet.length) {
                  // tab-id query param is returned see if that item exists on page
                  if ($(dTab + " #" + tabSet + ".prod-tabs__button").length) {
                      // if it exists set the aria-expanded and also set the isSet to true so that it skips next check
                      $("#" + tabSet + ".prod-tabs__button").attr("aria-expanded", "true");
                      // setup preview area
                      getPreview = $("#" + tabSet + ".prod-tabs__button").next(".prod-tabs__content").html();
                      $(dTab + " .prod-tabs__preview").append(getPreview);
                      // set parameter so that we skip next step
                      isSet = true;
                  }
              }
          }
          // if no query param is used or found, it will leverage the data attributes for data-tabs-first-active
          if (isSet === false) {
              var setActive = parseInt($(thisTabList).attr("data-tabs-first-active"));

              if (tabDirType === "responsive") {
                  // setting up first responive based on attribute
                  var thisBTN = $(dTab + " .prod-tabs__item:nth-of-type(" + setActive + ") .prod-tabs__button");
                  var getID = thisBTN.attr("data-tab-list-id");
                  var getGroup = thisBTN.parent().attr("data-tabs-group");
                  // set current tab to active
                  thisBTN.attr("aria-expanded", "true");
                  // setup preview pane
                  getPreview = $(thisBTN).next(".prod-tabs__content").html();
                  var getThis = dTab + " .prod-tabs-group-" + getGroup;

                  $(getThis).addClass("active");
                  $(getThis + " .prod-tabs__preview").html(getPreview);
              } else {
                  $(dTab + " .prod-tabs__item:nth-of-type(" + setActive + ") .prod-tabs__button").attr("aria-expanded", "true");
                  // setup preview content area        
                  getPreview = $(dTab + " .prod-tabs__item:nth-of-type(" + setActive + ") .prod-tabs__content").html();
                  $(dTab + " .prod-tabs__preview").append(getPreview);
              }
          }

          //----------------------------------
          //CALLBACK Feature
          var customCallback = $(dTab).attr("data-tabs-callback");
          tmpTabsToAccordion.callBackCheck(i, customCallback);
  },
  clickNormal: function (btnClicked){
      var curState = $(btnClicked).attr('aria-expanded');
      var getID = $(btnClicked).attr("data-tab-list-id");
      
      if (curState === "false") {
          // reset tabs
          $("[data-tab-list-id='" + getID + "'] .prod-tabs__button").attr("aria-expanded", "false");
          // set current tab to active
          if ($(btnClicked).attr("aria-expanded") == true) {
              // in collapse all below
          } else {
              $(btnClicked).attr("aria-expanded", "true");
          }
          
          // setup preview pane
          var getPreview = $(btnClicked).next(".prod-tabs__content").html();
          $("[data-tab-list-id='" + getID + "'] .prod-tabs__preview").html("").append(getPreview);
          // check callback function
          var customCallback = $("[data-tab-list-id='" + getID + "']").attr("data-tabs-callback");
          $("#prod-tabs__preview-" + getID).focus();
          
          tmpTabsToAccordion.callBackCheck(getID, customCallback);
              
      } else {
          // collapse all
          $(".prod-tabs__preview").html("");
          $("prod-tabs__viewer").removeClass("active");
          $("prod-tabs__button").attr("aria-expanded", "false");
          
      }      
  },
  clickResponsive: function (btnClicked){// here
      var getID = $(btnClicked).attr("data-tab-list-id");
      var getGroup = $(btnClicked).parent().attr("data-tabs-group");
      var thisList = "[data-tab-list-id='" + getID + "']";
      var collapseAll = $(btnClicked).attr('aria-expanded') === "true";
      
      // reset tabs
      $(thisList + " .prod-tabs__viewer").removeClass("active");
      $(thisList + " .prod-tabs__button").attr("aria-expanded", "false");
      $(thisList + " .prod-tabs__preview").html("");

      if(!collapseAll) {
          // set current tab to active
          $(btnClicked).attr("aria-expanded", "true");
          // setup preview pane
          var getPreview = $(btnClicked).next(".prod-tabs__content").html();
          var getThis = thisList + " .prod-tabs-group-" + getGroup;
  
          $(getThis).addClass("active");
          var setFocusHere = $(getThis + " .prod-tabs__preview").attr("id"); 
          $(getThis + " .prod-tabs__preview").html(getPreview);
          
          
          // add close button and attach event
          // here
          $(".prod-tabs__preview").prepend("<button class=\"js-close-tab-preview\" aria-label=\"close panel\"><img src=\"https://tbcdn.talentbrew.com/company/641/v3_0/img/close-icon.svg\" alt=\"close panel\"></button>");
          
          if(!$(".prod-tabs__content .js-close-tab-preview").length) {
              $(".prod-tabs__content").prepend("<button class=\"js-close-tab-preview\" aria-label=\"close panel\"><img src=\"https://tbcdn.talentbrew.com/company/641/v3_0/img/close-icon.svg\" alt=\"close panel\"></button>");
          }
          
          $(".js-close-tab-preview").click(function() {
              $(this).addClass('has-event');
              // reset tabs
              $(thisList + " .prod-tabs__viewer").removeClass("active");
              $(thisList + " .prod-tabs__button").attr("aria-expanded", "false");
              $(thisList + " .prod-tabs__preview").html("");
          });
          
          $("#" + setFocusHere).focus({ preventScroll: true });
  
          // check callback function
          var customCallback = $(thisList).attr("data-tabs-callback");
          tmpTabsToAccordion.callBackCheck(getID, customCallback);
      } else {
          /* 
              When all else fails -- set timeout 
              despite putting breakpoitns on every line that had 
              anything to do with aria-expanded, I was unalbe to 
              figure out why the button would be set to fase in 
              the lines above, but would reset to aria-expanded="true"
              eveyr time on mobile
          */
          setTimeout(function(){ 
              $(btnClicked).attr("aria-expanded", "false");
          }, 250); 
      }
      
      
  },
  normalPreviewSetup: function (e){
      var thisSel = document.querySelector("[data-tab-list-id='" + e + "']");
      var newViewer = document.createElement("div");
      var newPreview = document.createElement("div");
      var returnToTabs = document.createElement("a");
      newViewer.setAttribute("class", "prod-tabs__viewer");
      newPreview.setAttribute("class", "prod-tabs__preview");
      newPreview.setAttribute("id","prod-tabs__preview-" + e);
      newPreview.setAttribute("tabindex","-1");
      returnToTabs.setAttribute("href","#");
      returnToTabs.setAttribute("class","return-to-tabs");
      returnToTabs.setAttribute("data-tabs-list",e);
      returnToTabs.text = "Return to tabs";
      newViewer.appendChild(newPreview);
      newViewer.appendChild(returnToTabs);
      thisSel.appendChild(newViewer);
  }, 
  responsivePreviewSetup: function (e){
      var thisSel = document.querySelector("[data-tab-list-id='" + e + "']");
      var newSel = thisSel.getElementsByClassName('prod-tabs__item');
      var thisGroup = 0;
      var curY = 0;
      var checkMax = newSel.length - 1;
      for (index = 0; index < newSel.length; ++index) {
          var getY = newSel[index].offsetTop;
          if (index !== 0) {
              if (getY !== curY) {
                  thisGroup++;
                  var prevDivA = document.createElement("div");
                  var contentDivA = document.createElement("div");
                  var returnToTabs = document.createElement("a");
                  var thisIndex = index - 1;
                  var newGroup = thisGroup - 1;
                  newSel[index].setAttribute('data-tabs-group', thisGroup);
                  prevDivA.setAttribute("class", "prod-tabs__viewer prod-tabs-group-" + newGroup);
                  contentDivA.setAttribute("class", "prod-tabs__preview");
                  contentDivA.setAttribute("id","resp-" + e + "-group-" + newGroup);
                  contentDivA.setAttribute("tabindex","-1");
                  returnToTabs.setAttribute("href","#");
                  returnToTabs.setAttribute("data-tabs-group", newGroup);
                  returnToTabs.setAttribute("data-tabs-list",e);
                  returnToTabs.setAttribute("class","return-to-tabs");
                  returnToTabs.text = "return to tabs";
                  prevDivA.appendChild(contentDivA);
                  prevDivA.appendChild(returnToTabs);
                  newSel[thisIndex].after(prevDivA);
                  curY = getY;
              } else {
                  newSel[index].setAttribute('data-tabs-group', thisGroup);
              }
              if (index === checkMax) {
                  var prevDivB = document.createElement("div");
                  var contentDivB = document.createElement("div");                    
                  var returnToTabs = document.createElement("a");
                  returnToTabs.setAttribute("href","#");
                  returnToTabs.setAttribute("data-tabs-group", thisGroup);
                  returnToTabs.setAttribute("class","return-to-responsive");
                  returnToTabs.setAttribute("data-tabs-list",e);
                  returnToTabs.text = "return to tabs";
                  newSel[index].setAttribute('data-tabs-group', thisGroup);
                  prevDivB.setAttribute("class", "prod-tabs__viewer prod-tabs-group-" + thisGroup);
                  contentDivB.setAttribute("class", "prod-tabs__preview");
                  contentDivB.setAttribute("id","resp-" + e + "-group-" + thisGroup);
                  contentDivB.setAttribute("tabindex","-1");
                  prevDivB.appendChild(contentDivB);
                  prevDivB.appendChild(returnToTabs);
                  newSel[index].after(prevDivB);
              }

          } else {
              newSel[index].setAttribute('data-tabs-group', thisGroup);
              curY = getY;
          }
      }

      // Add listener for resize and fire debounce
      if ($("[data-tabs-dir='responsive']").length) {
          var delayResponsive = debounce(function () {
              windowWidth = $(window).width();
              $("[data-tabs-dir='responsive'] .prod-tabs__viewer").remove();
              $("[data-tabs-dir='responsive'] .prod-tabs__item").attr("data-tabs-group", "");
              $("[data-tabs-dir='responsive']").each(function () {
                  var w = $(this).attr('data-tab-list-id');
                  tmpTabsToAccordion.responsivePreviewSetup(w);
                  var thisBTN = $("[data-tab-list-id='" + w + "'] .prod-tabs__button[aria-expanded='true']");
                  var getGroup = thisBTN.parent().attr("data-tabs-group");
                  var getPreview = thisBTN.next(".prod-tabs__content").html();
                  var getThis = "[data-tab-list-id='" + w + "'] .prod-tabs-group-" + getGroup;
                  $(getThis).addClass("active");
                  $(getThis + " .prod-tabs__preview").html(getPreview);
                  
                  // re-add close button and attach event
                  $(".prod-tabs__preview").prepend("<button class=\"js-close-tab-preview\" aria-label=\"close panel\"><img src=\"https://tbcdn.talentbrew.com/company/641/v3_0/img/close-icon.svg\" alt=\"close panel\"></button>");
          
                  $(".js-close-tab-preview").click(function() {
                      // reset tabs
                      $(".prod-tabs__viewer").removeClass("active");
                      $(".prod-tabs__button").attr("aria-expanded", "false");
                      $( ".prod-tabs__preview").html("");
                  });
              });
          }, 300);

          window.addEventListener('resize', delayResponsive);
      }
  },
  callBackCheck: function (thisList, customCall){
      // callBack check
      if (customCall.length) {
          // console.log("callback for " + thisList);
          window[customCall](thisList);
      }

  }
};

// PRODUCT CODE - INDEPENDENT SCRIPT
var tmpQueryString = function tmpQueryString(sParam) {
  var thisHash = location.hash,
      thisQString = location.search,
      sPageURL;

  // console.log(thisHash + " // " + thisQString + " // " + sParam);
  if (sParam === "get_hash") {
      alert("getting hash");
      if (thisHash.length) {
          if (thisHash.includes("?")) {
              return thisHash.split("?")[0].replace("#", "");
          } else {
              return thisHash.replace("#", "");
          }
      } else {
          return "";
      }
  } else {
      if (thisHash.length) {
          sPageURL = thisHash.split('?')[1];
          // console.log("hash " + sPageURL);
      } else if (thisQString.length) {
          sPageURL = thisQString.replace("?", "");
          // console.log("no Hash " + sPageURL);
      } else {
          return "";
      }
  }

  var sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      // console.log("stuff " + sParameterName[0]);
      if (sParameterName[0] === sParam) {
          // console.log("success");
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      } else {
          // console.log("failure");
          return "";
      }
  }
};

// PRODUCT CODE
// onload event calls function if list exists on page  
if ($(".prod-tabs").length) {
  tmpTabsToAccordion.init();
}