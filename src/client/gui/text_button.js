/*
 * ===========================================================================
 * File: text_button.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Const from 'const';
import TextLabel from 'client/gui/text_label';

class TextButton extends TextLabel {
    constructor(game, x, y, text, parent, callbackObj, centerText, align, size,
                overTint = Const.GOLD, outTint = 0xFFFFFF) {
        super(game, x, y, text, parent, centerText, align, size);

        // enable input and setup callback events
        this.inputEnabled = true;
        this.events.onInputOver.add(f => this.tint = overTint);
        this.events.onInputOut.add(f => this.tint = outTint);
        this.events.onInputDown.add(callbackObj.fn, callbackObj.ctx);
    }
}

export default TextButton;

