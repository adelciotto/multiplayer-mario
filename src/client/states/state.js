/*
 * ===========================================================================
 * File: state.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

class State extends Phaser.State {
    constructor(game) {
        super(game);

        this.onInputDown = new Phaser.Signal();
        this.onInputUp = new Phaser.Signal();
    }

    create() {
        this.input.keyboard.addCallbacks(this, this.onKeyboardDown, this.onKeyboardUp);
    }

    shutdown() {
        this.onInputDown.removeAll();
        this.onInputUp.removeAll();
        this.sound.stopAll();
    }

    onKeyboardDown(event) {
        this.onInputDown.dispatch(event.keyCode, 1, event);
    }

    onKeyboardUp(event) {
        this.onInputUp.dispatch(event.keyCode, 1, event);
    }
}

export default State;

