var _ = require('underscore');

module.exports = function(io,fs){
	var galaxys = importGalaxys(fs);
	console.log("import galaxys...", galaxys.length);

	bindListeners(io,galaxys);

	return {
		getGalaxyById: function(galaxyId){
			return _.findWhere(galaxys,{id: galaxyId});
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