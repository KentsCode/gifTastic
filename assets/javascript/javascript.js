$(document).ready(function() {


	var buttonArray = [];

   

    //Button Maker Function
    $("#newButtonSubmit").click(function buttonMaker(event) {
		event.preventDefault();
		var newButton = $("#buttonTextInput").val().trim(); //add code to make sure only one word or add + signs
		buttonArray.push(newButton);
		console.log(buttonArray);

		$("#buttonDiv").empty();
    	for (var i = 0; i < buttonArray.length; i++) {
    		var buttonBeingCreated = $("<button>");
    		buttonBeingCreated.addClass("gifButton");
    		buttonBeingCreated.attr("id", buttonArray[i]);
    		buttonBeingCreated.text(buttonArray[i]);
    		$("#buttonDiv").append(buttonBeingCreated);
    	}
	});


    //change event listener to listen to "body" and .click to .on
    $("body").on("click", ".gifButton", function gifGetter() { //gets the gifs
	    console.log(this.id);
	    var APIKey = "rbChO7KcZGNEHG6cO2fEduqmG7LUC6sG";
    	var searchTerm = this.id; //need to update this! it should be equal to the value of the button that gets pushed
    	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm +"&api_key=" + APIKey +"&limit=10";
    	console.log(queryURL);

	    $.ajax({
	      url: queryURL,
	      method: "GET"
	    }).done(function(response) {
	    	console.log(response);

	    	$("#gifDiv").empty();
	    	for (var i = 0; i < 9.5; i++) {	  
		    	var gifBeingAdded = $("<img>");
		    	gifBeingAdded.attr("src", response.data[i].images.original_still.url);
		    	gifBeingAdded.attr("class", "gifClass");
		    	gifBeingAdded.attr("id", i);						//try making a new ID generator that continuously makes new IDs. Or use a data attribute for grabbing
		    	gifBeingAdded.attr("data-state", "still");
		    	$("#gifDiv").append("<p>"+response.data[i].rating+"</p>");
		    	$("#gifDiv").append(gifBeingAdded);
	    	}
	    	
	    	$("body").on("click", ".gifClass", function makeItMove(){
		    	var state = $(this).attr("data-state");
		    	console.log($(this).attr("id"));
		    	console.log(response);
		    	var gifNumberClicked = $(this).attr("id");
		    	if (state == "still") {
		    		$(this).attr("src", response.data[gifNumberClicked].images.original.url);
		    		$(this).attr("data-state", "animate");
		    	} else {
		    		$(this).attr("src", response.data[gifNumberClicked].images.original_still.url);
		    		$(this).attr("data-state", "still");
		    	}
    		});
	 	});
	});	

    

	//gifGetter();

});