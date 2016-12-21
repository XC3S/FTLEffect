gameApp.factory('$player', function($socket){
	var player = null;

	$socket.on('receiveOwnPlayerInformations',function(data){
		player = data;
		console.log("Received Player Informations: ", player);
	});

	return {
		getCurrentSector: function(){
			if(!player) return null;
			return player.currentSector;
		},
		travelToSection(sector){
			$socket.emit("travelToSection",sector.id);
		}
	}
});