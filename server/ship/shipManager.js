var SHIP_GRID_X = 18;
var SHIP_GRID_Y = 12;

module.exports = function(io,fs){
	var ships = [];
	ships.push(importShip(fs,"./data/init/ships/ship_test.json"));

	console.log("import ships...");
}

function importShip(fs,path){
	return JSON.parse(fs.readFileSync(path));
}