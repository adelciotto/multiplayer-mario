/*
 * ===========================================================================
 * File: msg_dialog.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Dialog from 'client/gui/dialog';
import TextLabel from 'client/gui/text_label';

class MsgDialog extends Dialog {
    constructor(level, titleText, msgText, closeText, onCloseCallback) {
        super(level, titleText, closeText, onCloseCallback);

        this.msgText = msgText;
    }

    _setupText(centerX, centerY) {
        super._setupText(centerX, centerY);

        var msgLabel = new TextLabel(this._level.game, centerX,
            centerY, this.msgText, true, 'center');
        this._dialogGroup.add(msgLabel);
    }
}

export default MsgDialog;

