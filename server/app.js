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

