gameApp.config(function($routeProvider){
	$routeProvider
	.when("/galaxy", {
		templateUrl: "gameviews/galaxy.html"
	})
	.otherwise({redirectTo: '/galaxy'});
});