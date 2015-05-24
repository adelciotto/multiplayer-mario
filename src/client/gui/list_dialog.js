/*
 * ===========================================================================
 * File: list_dialog.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Dialog from 'client/gui/dialog';
import TextLabel from 'client/gui/text_label';
import TextButton from 'client/gui/text_button';

class ListDialog extends Dialog {
    constructor(level, titleText, onCloseCallback, closeText, tweenTime) {
        super(level, titleText, onCloseCallback, closeText, tweenTime);

        this._items = [];
        this.setupText.add(this._setupItems, this);
    }

    addItem(item) {
        if (_.isArray(item)) {
            this._items = item;
        } else {
            this._items.push(item);
        }
    }

    _onClose() {
        this.hide(false);
    }

    _setupItems(centerX, centerY) {
        var yPos = centerY * 0.76;
        var xPos = centerX;
        var center = false;
        for (var i = 0, l = this._items.length; i < l; i++) {
            let option = this._items[i];

            if (option.label) {
                var optionLabel = new TextLabel(this._level.game, centerX/2, yPos, option.label, true);
                xPos = centerX * 1.5;
                this.add(optionLabel);
                center = false;
            } else {
                xPos = centerX;
                center = true;
            }

            let optionButton = new TextButton(this._level.game, xPos, yPos, option.button,
                { fn: () => { option.callbackFn(optionButton); }, ctx: option.callbackCtx }, center);
            this.add(optionButton);

            yPos += 16;
        }
    }
}

export default ListDialog;

