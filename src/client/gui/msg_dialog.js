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
    constructor(level, titleText, msgText, onCloseCallback, closeText, tweenTime) {
        super(level, titleText, onCloseCallback, closeText, tweenTime);

        this._msgText = msgText;
        this.setupText.add(this._setupMsg, this);
    }

    _setupMsg(centerX, centerY) {
        var msgLabel = new TextLabel(this._level.game, centerX,
            centerY, this._msgText, true, 'center');
        this.add(msgLabel);
    }
}

export default MsgDialog;

