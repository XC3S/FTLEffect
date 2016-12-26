var _ = require('underscore');
var provider = require("../../server/misc/provider.js");

module.exports = function(io,fs){
	var galaxys = importGalaxys(fs);
	console.log("import galaxys...", galaxys.length);

	bindListeners(io,galaxys);

	return {
		getGalaxyById: function(galaxyId){
			return _.findWhere(galaxys,{id: galaxyId});
		},
		isValidTravelRoute: function(galaxyId,startId,destinationId){
			var galaxy = this.getGalaxyById(galaxyId);
			var sector = _.findWhere(galaxy.sector,{id:startId});
			return !!_.findWhere(sector.transitions,{to:destinationId});
		}
	}
}

function bindListeners(io,galaxys){
	io.on('connection',function(socket){
		socket.emit("receiveCurrentGalaxy",galaxys[0]);
	});
};

function importGalaxys(fs){
	return JSON.parse(fs.readFileSync("./data/init/galaxys/galaxy.json"));
};