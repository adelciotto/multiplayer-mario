/*
 * ===========================================================================
 * File: msg_dialog.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Dialog from 'client/gui/dialog';
import * as GuiUtils from 'client/gui/utils';

class MsgDialog extends Dialog {
    constructor(level, titleText, msgText, closeText) {
        super(level, titleText, closeText);

        this.msgText = msgText;
    }

    _setupText(centerX, centerY) {
        super._setupText(centerX, centerY);

        var msgLabel = GuiUtils.createTextLabel(this._level.game, this.msgText, centerX,
            centerY, true, 'center');
        this._dialogGroup.add(msgLabel);
    }
}

export default MsgDialog;

