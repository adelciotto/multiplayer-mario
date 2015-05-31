/*
 * ===========================================================================
 * File: options_dialog.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Dialog from 'client/gui/dialog';

class OptionsDialog extends Dialog {
    constructor(game, parent, onClose, autoStart, tweenTime) {
        super(game, parent, 'Options', 'Close', onClose, autoStart, tweenTime);

        this.setup();
    }

    setup() {
        super.setup([
            { type: 'label', pos: 'left', text: 'fullscreen', newLine: false },
            { type: 'button', pos: 'right', text: 'off', fn: this._onFullscreenToggle, ctx: this, newLine: true },
            { type: 'label', pos: 'left', text: 'audio', newLine: false },
            { type: 'button', pos: 'right', text: 'on', fn: this._onAudioToggle, ctx: this, newLine: true }
        ]);
    }

    _onFullscreenToggle(button) {
        if (this._parent.scale.isFullScreen) {
            this._parent.scale.stopFullScreen();
            button.setText('off');
        } else {
            this._parent.scale.startFullScreen(false);
            this._parent.scale.setScreenSize();
            button.setText('on');
        }
    }

    _onAudioToggle(button) {
        var isMuted = this._parent.sound.mute;
        var status = (isMuted ? 'on' : 'off');

        this._parent.sound.mute = !this._parent.sound.mute;
        button.setText(status);
    }
}

export default OptionsDialog;

