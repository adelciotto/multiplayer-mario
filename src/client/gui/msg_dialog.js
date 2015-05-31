/*
 * ===========================================================================
 * File: msg_dialog.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Dialog from 'client/gui/dialog';

class MsgDialog extends Dialog {
    constructor(game, parent, title, close, msg, onClose, autoShow) {
        super(game, parent, title, close, onClose, autoShow);

        this._msg = msg;
        this.setup();
    }

    setup() {
        super.setup([
            { type: 'label', pos: 'center', text: this._msg }
        ]);
    }
}

export default MsgDialog;

