/*
 * ===========================================================================
 * File: client_game_manager.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

require('./polyfills');
require('babel/polyfill');

import Game from 'client/game';

class ClientGameManager {
    constructor() {
        this.game = new Game().start();
    }
}

window.onload = () => {
    var gameManager = new ClientGameManager();
};
