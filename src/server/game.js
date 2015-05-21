/*
 * ===========================================================================
 * File: game.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import * as util from '../common/util/util';
import log from 'npmlog';

class Game {
    constructor(io) {
        this._io = io;

        log.enableColor();
        this._addEventListeners();
    }

    _addEventListeners() {
        this._io.on('connection', this._onClientConnection);
    }

    _onClientConnection(socket) {
        var userId = socket.handshake.query.userId;

        if (typeof userId === 'undefined'  || typeof userId !== 'string' || userId === '') {
            return;
        }

        log.info('socket', 'Player connected with id: %j', userId);

        // wait for client to start and then sync their data
        socket.on('client_ready', (data) => {
            this._onClientStart(userId, data);
        });
    }

    _onClientStart(userId, data) {
        //TODO: do some player name validation

        //if (!util.hasProperty(this._players, userId)) {
            //this._players[userId] = {
                //position:
            //}
        //}
    }
}

export default Game;

