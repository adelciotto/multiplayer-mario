/*
 * ===========================================================================
 * File: server_game_manager.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import ExpressServer from './express_server';
import socketio from 'socket.io';
import ntp from 'socket-ntp';

class ServerGameManager {
    constructor() {
        this.expressServer = new ExpressServer().listen();
        this.io = socketio.listen(this.expressServer.server);

        this.io.sockets.on('connection', (socket) => {
            this._onConnection(socket);
        });
    }

    _onConnection(socket) {
        console.log('Player connected');

        ntp.sync(socket);

        socket.on('clientinit', (data) => {
            this._onClientInit(socket, data);
        });

        socket.on('disconnect', this._onDisconnect);
    }

    _onDisconnect() {
        console.log('Player disconnected');
    }

    _onClientInit(socket, data) {
        console.log('Client initialised');

        socket.emit('serverinit', {
            startTime: 0
        });
    }
}

export default ServerGameManager;

