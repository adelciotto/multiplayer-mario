/*
 * ===========================================================================
 * File: options_dialog.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Dialog from 'client/gui/dialog';
import TextLabel from 'client/gui/text_label';
import TextButton from 'client/gui/text_button';

class OptionsDialog extends Dialog {
    constructor(level, titleText, closeText, onCloseCallback, options = []) {
        super(level, titleText, closeText, onCloseCallback);
    }

    /**
     * to be overidden in sub class
     */
    setupOptions(options) {
        this._options = options;
    }

    _setupText(centerX, centerY) {
        super._setupText(centerX, centerY);

        var yPos = centerY * 0.76;
        var xPos = centerX;
        var center = false;
        for (var i = 0, l = this._options.length; i < l; i++) {
            let option = this._options[i];

            if (option.label) {
                var optionLabel = new TextLabel(this._level.game, centerX/2, yPos, option.label, true);
                xPos = centerX * 1.5;
                this._dialogGroup.add(optionLabel);
                center = false;
            } else {
                xPos = centerX;
                center = true;
            }

            let optionButton = new TextButton(this._level.game, xPos, yPos, option.button,
                { fn: () => { option.callbackFn(optionButton); }, ctx: option.callbackCtx }, center);
            this._dialogGroup.add(optionButton);

            yPos += 16;
        }
    }
}

export default OptionsDialog;

