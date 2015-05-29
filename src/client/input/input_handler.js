/*
 * ===========================================================================
 * File: input_handler.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

class InputHandler {
    constructor() {
        this._inputMap =  {};
        this._listenerMap = {};
    }

    setInputMap(inputMap = {}) {
        this._inputMap = inputMap;
    }

    addListener(key, ctx = null, handler = null, onDown = null, onUp = null) {
        if (_.has(this._inputMap, key)) {
            this._listenerMap[key] = {
                handler: handler,
                ctx: ctx,
                onDown: onDown,
                onUp: onUp
            };
        } else {
            console.log(`Error: ${key} not found in input map`);
        }
    }

    _getListenerByInputCode(code) {
        var key;
        var listener = null;

        // get the inputMap key via a phaser input code (i.e Phaser.Keyboard.UP)
        _.each(this._inputMap, (v, k) => {
            if (v === code) {
                key = k;
            }
        });

        // use this key to retrieve the listener
        if (_.has(this._listenerMap, key)) {
            listener = this._listenerMap[key];
        }

        return listener;
    }
}

export default InputHandler;

