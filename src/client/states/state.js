/*
 * ===========================================================================
 * File: state.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import KeyboardHandler from 'client/input/keyboard_handler';

class State extends Phaser.State {
    constructor(game) {
        super(game);

        this.inputHandler = new KeyboardHandler();
    }

    create() {
        super.create();
        this.inputHandler.create(this.input);
    }

    shutdown() {
        this.sound.stopAll();
    }
}

export default State;

