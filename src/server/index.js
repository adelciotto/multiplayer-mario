/*
 * ===========================================================================
 * File: index.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import ExpressServer from './express_server';
import Player from './entities/player';
import * as util from '../common/util/util';
import socketio from 'socket.io';

var io;
var players = [];

var init = function() {
    // create the express app and http server
    var expressServer = new ExpressServer();
    expressServer.listen();

    // begin socket communication on the express http server
    io = socketio.listen(expressServer.server);
    io.on('connection', onClientConnect);
};

var onClientConnect = function(socket) {
    console.log(`User: ${socket.id} connected`);

    // listen for various client events
    socket.on('new_player', onNewPlayer);
    socket.on('move_player', onMovePlayer);
    socket.on('disconnect', onClientDisconnect);
};

var onClientDisconnect = function(data) {
    console.log(`User ${this.id} disconnected`);

    var removePlayer = util.searchObjArray(players, 'id', this.id);
	if (!removePlayer) {
        console.log(`Player: ${this.id} not found`);
		return;
	}

	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);

	// Broadcast removed player to connected socket clients
	this.broadcast.emit("remove_player", { id: this.id });
};

var onNewPlayer = function(data) {
    var newPlayer = new Player(data.x, data.y, this.id);

    // broadcast the new player to all connected clients
    this.broadcast.emit('new_player', {
        id: newPlayer.id,
        x: newPlayer.x,
        y: newPlayer.y
    });

    // send existing players to the new client
    for (var i = 0, l = players.length; i < l; i++) {
        let player = players[i];

        this.emit('new_player', {
            id: player.id,
            x: player.x,
            y: player.y
        });
    }

    players.push(newPlayer);
};

var onMovePlayer = function() {

};

init();
