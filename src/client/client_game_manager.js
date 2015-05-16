/*
 * ===========================================================================
 * File: client_game_manager.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Const from 'common/const';
import Game from 'client/game';

class ClientGameManager {
    constructor() {
        this.socket = io.connect(`http://${window.location.hostname}:${window.location.port}`);

        this.socket.emit('clientinit', {
            gameid: 0
        });

        this.socket.on('serverinit', this._onServerInit);
        this.socket.on('disconnect', this._onDisconnect);
    }

    _onServerInit() {
        console.log('Connected to server');

        this.game = new Game().start();
    }

    _onDisconnect() {
        console.log('Disconnected from server');
    }
}

window.onload = () => {
    var gameManager = new ClientGameManager();
};
