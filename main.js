// should we declare globals here? seems there's some serious scope issues going on...
var progressTier, resources;

$(document).ready(function() {
	
	// / / / / / / / / / / / / / / / //
	//                               //
	// FUNCTIONS! THEY'RE GRRRRREAT! //
	//                               //
	// / / / / / / / / / / / / / / / //
	
	
	function createNewGame() {
		// Set up the player with all the variables they will need to begin playing
		
		// track and cap the player's progress via tiers
		progressTier = "tier1";

		// the player's resources
		resources = {"food": 0, "wood": 0, "stone": 0.0, "houses": 0};
		
		// time to save!
		var data = {};
		data["progressTier"] = progressTier;
		data["resources"] = resources;
		saveData(data);
	}
	
	function deleteSave() {
		localStorage.removeItem("progressTier");
		localStorage.removeItem("resources");
	}

	function stupidDecimal(number) {
		var output = Math.round(number * 1000000)/1000000;
		return output;
	}

	function saveData(data) {
		localStorage.setItem("progressTier", JSON.stringify(data["progressTier"]));
		localStorage.setItem("resources", JSON.stringify(data["resources"]));
	}

	function loadData() {
		var data = {};
		data["progressTier"] = JSON.parse(localStorage.getItem("progressTier"));
		data["resources"] = JSON.parse(localStorage.getItem("resources"));
		return data;
	}
	


	// / / / / / / / / / / //
	//                     //
	// VARIABLES! YAAAAAY! //
	//                     //
	// / / / / / / / / / / //
	
	
	// STATICS - THESE ARE THE FACTS, JACK!
	
	var DEBUG = 1; // 1 = true, 0 = false. disable before pushing live!
	
	// this will be a save timer for the main loop
	// at 60 seconds, we auto-save the game's data
	var saveTimer = 1;
	
	// create default values for resource gains per click
	var gains = {"food": 1, "wood": 1, "stone": 0.1};
	
	// max number of buildings allowed per progress tier
	var buildingTiers = {"tier1": 25, "tier2": 50, "tier3": 75, "tier4": 100, "tier5": 125,
						 "tier6": 150, "tier7": 175, "tier8": 200, "tier9": 225};
	
	
	// DYNAMICS - THE STUFF THAT CHANGES AND GETS SAVED/LOADED
	
	// Check for the existence of saved data.
	// If the data does not exist, we set default values then create the save data.
	if (localStorage.getItem("progressTier") === null) {
		// no save data yet. it's a new game!
		
		console.log('creating data for new game...');
		createNewGame();
		console.log('new game data created!');
		
	} else {
		// save data exists - let's load it!
		console.log('save data found');

		var data = loadData();
		progressTier = data["progressTier"];
		resources    = data["resources"];
	}
	
	
	
	
	// / / / / / / / / / / / / / / / / / //
	//                                   //
	// ELEMENT STYLING AND INTERACTIVITY //
	//                                   //
	// / / / / / / / / / / / / / / / / / //
	
	
	// STYLING
	
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
	
	$("#houseBtn").hover(function() {
		$(this).css("background-color", "blue");
		$(this).css("color", "white");
	}, function() {
		$(this).css("background-color", "white");
		$(this).css("color", "black");
	});
	
	$("#deleteSaveBtn").hover(function() {
		$(this).css("background-color", "red");
		$(this).css("color", "white");
	}, function() {
		$(this).css("background-color", "white");
		$(this).css("color", "black");
	});
	
	
	// INTERACTIVITY
	
	// handle button clicks
	$("#foodBtn").click(function() {
		resources["food"] += gains["food"];
		foodCount = stupidDecimal(resources["food"]);
		$("#foodCount").text(foodCount);
	});
	
	$("#woodBtn").click(function() {
		resources["wood"] += gains["wood"];
		woodCount = stupidDecimal(resources["wood"]);
		$("#woodCount").text(woodCount);
	});
	
	$("#stoneBtn").click(function() {
		resources["stone"] += gains["stone"];
		stoneCount = stupidDecimal(resources["stone"]);
		$("#stoneCount").text(stoneCount);
	});
	
	$("#houseBtn").click(function() {
		if (resources["wood"] >= 10 && resources["stone"] >= 3.0) {
			resources["houses"] += 1;
			resources["wood"] -= 10;
			resources["stone"] -= 3.0;
		};
	});
	
	$("#deleteSaveBtn").click(function() {
		console.log('delete button pressed...');
		deleteSave();
		createNewGame();
		saveTimer = 1;
	});
	
	
	// DEBUGGING STUFF
	if (DEBUG === 1) {
	
		// show the delete save button
		$("#deleteSaveBtn").css("visibility", "visible");
	
	}
	
	
	
	// / / / / / / / / / / / / / / //
	//                             //
	// OH SHIT, IT'S THE GAME LOOP //
	//                             //
	// / / / / / / / / / / / / / / //
	
	
	window.setInterval(function() {
	
		resources["food"] += 1;
		
		// can we un-hide the house button?
		if (resources["wood"] >= 10 && resources["stone"] >= 3.0) {
			$("#houseBtn").css("visibility", "visible");
		};
		
		// keep our values up to date
		$("#foodCount").text(resources["food"]);
		$("#woodCount").text(resources["wood"]);
		$("#stoneCount").text(resources["stone"].toPrecision(2));
		
		// update saveTime by 1
		// when it hits 60, auto-save the game data
		if (saveTimer === 5) {
			var data = {};
			data["progressTier"] = progressTier;
			data["resources"] = resources;
			saveData(data);
			saveTimer = 1;
		} else { saveTimer += 1 };
		
	}, 1000); // game loop is in ms, 1000 = 1 second ~_~_~* the more you knoooooow

});
