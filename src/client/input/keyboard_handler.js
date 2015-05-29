/*
 * ===========================================================================
 * File: keyboard_handler.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import InputHandler from 'client/input/input_handler';

class KeyboardHandler extends InputHandler {
    create(input) {
        input.keyboard.addCallbacks(this, this._onKeyDown, this._onKeyUp);
    }

    setInputMap(inputMap) {
        super.setInputMap(inputMap);

        // extend the inputMap with some default keys
        // that will generally be used in all states
        _.extend(this._inputMap, {
            up: Phaser.Keyboard.UP,
            down: Phaser.Keyboard.DOWN,
            left: Phaser.Keyboard.LEFT,
            right: Phaser.Keyboard.RIGHT
        });
    }

    _onKeyDown(event) {
        var keyCode = event.keyCode;
        var listener = this._getListenerByInputCode(keyCode);

        if (listener) {
            if (listener.onDown) {
                listener.onDown.call(listener.ctx, keyCode);
            }

            if (listener.handler) {
                listener.handler.call(listener.ctx, keyCode, true);
            }
        }
    }

    _onKeyUp(event) {
        var keyCode = event.keyCode;
        var listener = this._getListenerByInputCode(keyCode);

        if (listener) {
            if (listener.onUp) {
                listener.onUp.call(listener.ctx, keyCode);
            }

            if (listener.handler) {
                listener.handler.call(listener.ctx, keyCode, false);
            }
        }
    }
}

export default KeyboardHandler;

