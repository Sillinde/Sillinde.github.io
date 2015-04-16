var food = 0;
var wood = 0;
var stone = 0;

function foodClick(number){
	food = food + number;
	document.getElementById("food").innerHTML = food
	document.getElementById('food').innerHTML = stupidDecimal(food)
};

function woodClick(number){
	wood = wood + number;
	document.getElementById("wood").innerHTML = wood
	document.getElementById('wood').innerHTML = stupidDecimal(wood)
};

function stoneClick(number){
	stone = stone + number;
	document.getElementById("stone").innerHTML = stone
	document.getElementById('stone').innerHTML = stupidDecimal(stone)
};

function stupidDecimal(number){
    var output = Math.round(number * 1000000)/1000000;
	return output;
}
