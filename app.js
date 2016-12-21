var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var _ = require('underscore');


// start server
server.listen(3000,function(){
	console.log("server started");
});

// provide client entrypoint
app.get('/',function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});

// compile css files
app.use(sassMiddleware({
	src: __dirname + '/client/scss',
	dest: __dirname + '/client/css',
	debug: true,
	outputSyle: 'compressed',
	prefix: '/css',
	force: true
}));

// host client files
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/gameviews', express.static(__dirname + '/client/gameviews'));
app.use('/images', express.static(__dirname + '/client/images'));

// game logic
var provider = require("./server/misc/provider.js");
provider.registerManager("galaxyManager",require("./server/galaxy/galaxyManager.js")(io,fs));
provider.registerManager("playerManager",require("./server/player/playerManager.js")(io,fs));
provider.registerManager("shipManager",require("./server/ship/shipManager.js")(io,fs));
