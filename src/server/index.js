/*
 * ===========================================================================
 * File: index.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import ExpressServer from './express_server';
import Game from './game';
import socketio from 'socket.io';

var start = function() {
    // create the express app and http server
    var expressServer = new ExpressServer();
    expressServer.listen();

    // begin socket communication on the express http server
    var io = socketio.listen(expressServer.server);
    var game = new Game(io);
};

start();

