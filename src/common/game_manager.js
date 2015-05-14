/*
 * ===========================================================================
 * File: game.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Const from 'common/const';

class GameManager {
    constructor(game) {
        this._game = game;
    }

    update() {
        throw "Error: GameManager::Update not implemented";
    }
}

export default GameManager;

