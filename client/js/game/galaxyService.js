gameApp.factory('$galaxy', function($socket){
	var galaxy = null;

	$socket.on('receiveCurrentGalaxy',function(data){
		galaxy = data;
		console.log("Received Galaxy Informations: ", galaxy);
	});

	return {
		getGalaxyId: function(){
			if (!galaxy) return null;
			return galaxy.name;
		},
		getGalaxyName: function(){
			if (!galaxy) return null;
			return galaxy.name;
		},
		getGalaxyBackgroundImage: function(){
			if (!galaxy) return null; //blank or loading image as default?!
			return galaxy.background; 
		},
		getSectorList: function(){
			if (!galaxy) return [];
			return galaxy.sector;
		}
	}
});