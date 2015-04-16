
function stupidDecimal(number) {
    var output = Math.round(number * 1000000)/1000000;
	return output;
}

$(document).ready(function() {

	// create default values for resource gains per click
	var gains = {"food": 1, "wood": 1, "stone": 0.1};
	
	// set default resource values
	// this would actually be where we would check for the existence of a save file
	// if a save file is present, load it up, and if not, create it with default values
	// but we're just testing for now
	var resources = {"food": 0, "wood": 0, "stone": 0};
	
	
	
	// change button color styles on mouseover
	$("#foodBtn").hover(function() {
		$(this).css("background-color", "green");
		$(this).css("color", "white");
	}, function() {
		$(this).css("background-color", "white");
		$(this).css("color", "black");
	});
	
	$("#woodBtn").hover(function() {
		$(this).css("background-color", "#803300");
		$(this).css("color", "white");
	}, function() {
		$(this).css("background-color", "white");
		$(this).css("color", "black");
	});
	
	$("#stoneBtn").hover(function() {
		$(this).css("background-color", "grey");
		$(this).css("color", "white");
	}, function() {
		$(this).css("background-color", "white");
		$(this).css("color", "black");
	});
	
	
	
	// handle button clicks
	$("#foodBtn").click(function() {
		resources["food"] += gains["food"];
		fixedNum = stupidDecimal(resources["food"]);
		$("#foodCount").html(fixedNum);
	});
	
	$("#woodBtn").click(function() {
		resources["wood"] += gains["wood"];
		fixedNum = stupidDecimal(resources["wood"]);
		$("#woodCount").html(fixedNum);
	});
	
	$("#stoneBtn").click(function() {
		resources["stone"] += gains["stone"];
		fixedNum = stupidDecimal(resources["stone"]);
		$("#stoneCount").html(fixedNum);
	});

});
