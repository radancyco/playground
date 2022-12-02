var heroBanner = document.querySelectorAll(".hero-banner"); // Get all hero banners on page

// For each banner...

for (var i = 0; i < heroBanner.length; i++) {

	var heroContent = heroBanner[i].querySelectorAll(".hero-content"); // count of items in ech banner
	var randomNumber = Math.floor(Math.random() * heroContent.length); // Random * count of items in ech banner
	var bannerNumber = i; // total number of banners (starts at zero)

	// Hide all items in each banner...

	for (var x = 0; x < heroContent.length; x++) {

		heroContent[x].classList.add("hidden");
		heroContent[x].removeAttribute("hidden");
		heroContent[x].setAttribute("data-count", x);

	}

	// Remove "hidden" attribute from selected banner item(s)

	heroContent[randomNumber].classList.remove("hidden");
	heroContent[randomNumber].setAttribute("tabindex", -1);

	// Create banner navigation...

	var heroNavigation = document.createElement("nav");
	heroNavigation.setAttribute("class", "hero-banner-nav");
	heroNavigation.setAttribute("aria-label", "banner " + (bannerNumber + 1));

	// Create banner list

	var bannerList = document.createElement("ul");

	// Append navigation to banner

	heroBanner[i].appendChild(heroNavigation);

	// Append banner list to navigation

	heroNavigation.appendChild(bannerList);

	// Create/append list items and buttons to navigation

	for (var y = 0; y < heroContent.length; y++) {

		var bannerListItemCount = y;    
		var bannerListItem = document.createElement('li');
    	var bannerItemButton = document.createElement("button");

    	bannerList.appendChild(bannerListItem);
		bannerListItem.appendChild(bannerItemButton);
		bannerItemButton.innerHTML = "View Banner " + (bannerListItemCount + 1);

		// Button functionality

		(function(bannerNumber, bannerListItemCount){
	
			bannerItemButton.onclick = function(){

				// Item to be hidden

				var heroTarget = heroBanner[bannerNumber].querySelectorAll(".hero-content");

        		for (var x = 0; x < heroTarget.length; x++) {

        			// Hide all item elements within selected banner

        			heroTarget[x].classList.add("hidden");
        			heroTarget[x].removeAttribute("tabindex");

        			// Show selected item within banner

        			heroTarget[bannerListItemCount].classList.remove("hidden");
        			heroTarget[bannerListItemCount].setAttribute("tabindex", -1)
        			heroTarget[bannerListItemCount].focus();

        			//var heroBannerCurrent = Number(heroBanner[i].querySelector("[tabindex]").dataset.count);
					//var heroPreviousButton = heroBanner[i].querySelector(".hero-button-left");
					//var heroNextButton = heroBanner[i].querySelector(".hero-button-right");

        		}

        		// Navigation to be selected

        		var heroNavSelected = heroBanner[bannerNumber].querySelectorAll(".selected");

				for (var x = 0; x < heroNavSelected.length; x++) {

					heroNavSelected[x].classList.remove("selected");

				}

				this.classList.add("selected");	

    		}

		})(bannerNumber, bannerListItemCount);
    
	}

	// Select navigation button

	var heroHighlight = heroBanner[bannerNumber].querySelectorAll("button");

	heroHighlight[randomNumber].classList.add("selected");

	// Forward and backward arrows...

	var bannerNavLeftButton = document.createElement("button");
	bannerNavLeftButton.setAttribute("class", "hero-button-left");
	bannerNavLeftButton.textContent = "Previous";

	heroBanner[i].appendChild(bannerNavLeftButton);

	// Button functionality

	(function(bannerNumber){

		bannerNavLeftButton.onclick = function(){

			var heroBannerCurrent = heroBanner[bannerNumber].querySelector("[tabindex]");
			var heroBannerSelect = 	Number(heroBannerCurrent.dataset.count) - 1;
			var heroLeftTarget = heroBanner[bannerNumber].querySelectorAll(".hero-content");

    		// Hide all item elements within selected banner

			heroBannerCurrent.classList.add("hidden");
			heroBannerCurrent.removeAttribute("tabindex");

			// Show selected item within banner

			heroLeftTarget[heroBannerSelect].classList.remove("hidden");
			heroLeftTarget[heroBannerSelect].setAttribute("tabindex", -1)
			heroLeftTarget[heroBannerSelect].focus();

			// Navigation to be selected

			var heroNavSelected = heroBanner[bannerNumber].querySelectorAll(".selected");

			//heroNavSelected[heroBannerCurrent + 1].classList.remove("selected");
			//heroNavSelected[heroBannerSelect].classList.add("selected");

			this.nextSibling.disabled = false;

			if(heroBannerSelect === 0) {

    			this.disabled = true;

    		} 

		}

	})(bannerNumber);

	var bannerNavRightButton = document.createElement("button");
	bannerNavRightButton.setAttribute("class", "hero-button-right");
	bannerNavRightButton.textContent = "Next";

	heroBanner[i].appendChild(bannerNavRightButton);

	// Button functionality

	(function(bannerNumber, bannerListItemCount){

		bannerNavRightButton.onclick = function(){

			var heroBannerCurrent = heroBanner[bannerNumber].querySelector("[tabindex]");
			var heroBannerSelect = 	Number(heroBannerCurrent.dataset.count) + 1;
			var heroRightTarget = heroBanner[bannerNumber].querySelectorAll(".hero-content");

    		// Hide all item elements within selected banner

    		heroBannerCurrent.classList.add("hidden");
    		heroBannerCurrent.removeAttribute("tabindex");

    		// Show selected item within banner

    		heroRightTarget[heroBannerSelect].classList.remove("hidden");
    		heroRightTarget[heroBannerSelect].setAttribute("tabindex", -1)
    		heroRightTarget[heroBannerSelect].focus();

    		// Navigation to be selected

    		//var heroNavSelected = heroBanner[bannerNumber].querySelectorAll(".selected");

			//heroNavSelected[heroBannerCurrent + 1].classList.remove("selected");
			//heroNavSelected[heroBannerSelect].classList.add("selected");

			this.previousSibling.disabled = false;

			if(heroBannerSelect === bannerListItemCount) {

    			this.disabled = true;

    		} 	

		}

	})(bannerNumber, bannerListItemCount);

	// Now that previous and next buttons have been created, we need to disable them depending on selection.

	var heroBannerCurrent = Number(heroBanner[i].querySelector("[tabindex]").dataset.count);
	var heroPreviousButton = heroBanner[i].querySelector(".hero-button-left");
	var heroNextButton = heroBanner[i].querySelector(".hero-button-right");

	if(heroBannerCurrent === 0) {

    	heroPreviousButton.disabled = true;

    } 

    if(heroBannerCurrent === bannerListItemCount) {

    	heroNextButton.disabled = true;

    } 

}
