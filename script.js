var tvShows = ["the Office",
			   "Parks & Rec",
			   "it's Always Sunny",
			   "Family Guy",
			   "Seinfield",
			   "South Park",
			   "Everybody Loves Raymond"];

var borderColors = ["#FC00BD",
					"#FF3232",
					"#B63BF9",
					"#36DFFF",
					"#4873FF",
					"#9A71FD",
					"#31FFAC",
					"#3FA8FF",
					"#FFD631",
					"#FF8E31"];


var buttonGroup = $("#buttonGroup");
var gifGroup = $("#gifGroup");


// $(document).ready(function() {

	for (var i = 0; i < tvShows.length; i++) {
		
		var button = $("<input type='button'/>" );
		button.attr("class", "gifSelect animated fadeInUpBig");
		button.attr("value", tvShows[i]);
		var urlString = tvShows[i].split(" ");
		urlString = urlString.join("+");
		console.log(urlString);
		button.attr("show", urlString);
		buttonGroup.append(button);

		var random = Math.floor(Math.random() * borderColors.length);
		button.css("border-color", borderColors[random]);

	} //end of dynamic button loop
 // end of generate shows


// }) //end of doc ready function



$("#tvSubmit").on("click", function(){

	event.preventDefault();

	var newShowValue = $("#tvInput").val();
	var newShowString = newShowValue.split(" ");
	newShowString = newShowString.join("+");

	var newShowButton = $("<input type='button'>");
	newShowButton.attr("value", newShowValue);
	newShowButton.attr("show", newShowString);
	newShowButton.attr("class", "gifSelect animated fadeInUpBig");

	tvShows.push(newShowValue);
	buttonGroup.append(newShowButton);

	var random = Math.floor(Math.random() * borderColors.length);
	newShowButton.css("border-color", borderColors[random]);


	console.log("hello");

})

$(document.body).on("click", ".gifSelect", function(){

	

	var show = $(this).attr("show");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show 
	+ "&api_key=dc6zaTOxFJmzC&limit=10";

	

	$.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
        	var response = response.data;
        	// console.log(response);
        	
        	for (var i = tvShows.length - 1; i >= 0; i--) {


        	
        	var random = Math.floor(Math.random() * borderColors.length);
        	var gifImg = $("<img>");
        	gifImg.attr("data-img", "img-" + i);
        	gifImg.attr("class", "gifs animated bounce");
        	gifImg.attr("data-still", response[i].images.original_still.url);
        	gifImg.attr("data-animate", response[i].images.original.url);
        	var state = gifImg.attr("data-state", "still");
        	gifImg.css("border-color", borderColors[random]);
        	console.log(response[i].images.original_still.url);
			gifImg.attr("src", response[i].images.original_still.url);
			gifGroup.prepend(gifImg);


			$(document.body).on("click", ".gifs", function(){
				
				if ($(this).attr("data-state") === "still") {
					
				        $(this).attr("src", $(this).attr("data-animate"));
				        $(this).attr("data-state", "animate");
				      } else {
				        $(this).attr("src", $(this).attr("data-still"));
				        $(this).attr("data-state", "still");
				      }

		})

		}

        })

})// on click function







setInterval(colorBlink, 2000);

function colorBlink(){

	var random = Math.floor(Math.random() * borderColors.length);
	$("h1").css("text-shadow", "0 0 20px" + borderColors[random]);
	$("#tvSubmit").css("border-color", borderColors[random])

}









