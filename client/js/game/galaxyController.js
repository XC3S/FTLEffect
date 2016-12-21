var galaxyController = function($scope,$galaxy,$player){
	$scope.getGalaxyName = function(){
		return $galaxy.getGalaxyName();
	};

	$scope.getGalaxyBackgroundImage = function(){
		return $galaxy.getGalaxyBackgroundImage();
	};

	$scope.getSectorList = function(){
		return $galaxy.getSectorList();
	};

	$scope.isCurrentSector = function(sector){
		return sector.id == $player.getCurrentSector();
	};

	$scope.travelToSection = function(sector){
		$player.travelToSection(sector);
	}
}

gameApp.controller("galaxyController",galaxyController);
galaxyController.$inject = ["$scope","$galaxy","$player"];