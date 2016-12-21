module.exports = (function(){
	var managers = {};

	console.log("Provider: create Provider Instance");

	return {
		registerManager: function(name,manager){
			managers[name] = manager;
		},
		getManager: function(name){
			if(!managers[name]) return null;
			return managers[name];
		}
	}
})();