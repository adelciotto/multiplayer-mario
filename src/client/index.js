/*
 * ===========================================================================
 * File: client_game_manager.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

require('babel/polyfill');

import Game from 'client/game';

window.onload = () => {
    var game = new Game().start();
};
