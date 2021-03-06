var _ = require('underscore');
var provider = require("../../server/misc/provider.js");

// @todo: refactor export, provide some getter and setter functions to manage player and access player informations

var connectedPlayers = [];

module.exports = function(io,fs){
	bindListeners(io);
}

function bindListeners(io){
	io.on('connection',function(socket){
		console.log("user connected : ", socket.id);

		createPlayer(socket.id);
		replicatePlayerInformation(socket);

		socket.on('disconnect', function(){
			removePlayer(getPlayerByConnectionID(socket.id));
			console.log('user disconnected');
		});

		socket.on('travelToSection',function(sectorId){
			var galaxyManager = provider.getManager("galaxyManager");

			var player = getPlayerByConnectionID(socket.id);
			//console.log("test:",player.currentSector,"@",player.galaxy);
			if(galaxyManager.isValidTravelRoute(player.galaxy,player.currentSector,sectorId)){
				player.currentSector = sectorId;
				replicatePlayerInformation(socket);
				console.log("player ",socket.id," traveled to ", sectorId);
			}

			//console.log(socket.id,': travel request to ', sectorId);
		});
	});
};

function replicatePlayerInformation(socket){
	var player = getPlayerByConnectionID(socket.id);
	socket.emit("receiveOwnPlayerInformations",player);
}

function getPlayerByConnectionID(connectionId){
	return _.findWhere(connectedPlayers,{connectionId: connectionId});
}

function removePlayer(player){
	connectedPlayers = _.without(connectedPlayers,player);
}

function createPlayer(connectionId){
	var player = {
		galaxy: "atlas",
		currentSector: "atlas_sector_1",
		connectionId: connectionId
	}
	console.log("created player for : ",connectionId);
	connectedPlayers.push(player);
}

/* player state

{
	isTraveling: false,
	isFighting: false,
	travel: {
		destination: 
	}
}

*/