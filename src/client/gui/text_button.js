/*
 * ===========================================================================
 * File: text_button.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Const from 'common/const';
import TextLabel from 'client/gui/text_label';

class TextButton extends TextLabel {
    constructor(game, x, y, text, callbackObj, centerText, align, size,
                overTint = Const.GOLD, outTint = 0xFFFFFF) {
        super(game, x, y, text, centerText, align, size);

        // enable input and setup callback events
        this.inputEnabled = true;
        this.events.onInputOver.add(() => { this.tint = overTint; });
        this.events.onInputOut.add(() => { this.tint = outTint; });
        this.events.onInputDown.add(callbackObj.fn, callbackObj.ctx);
    }
}

export default TextButton;

