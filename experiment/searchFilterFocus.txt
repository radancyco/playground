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

	setFilterFocus();

	$(document).ajaxStop(function() {

		setFilterFocus();

	});

}