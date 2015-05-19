/*
 * ===========================================================================
 * File: dialog.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import TextLabel from 'client/gui/text_label';
import TextButton from 'client/gui/text_button';

class Dialog {
    constructor(level, titleText, closeText = 'Close', onCloseCallback = () => {}) {
        this.titleText = titleText;
        this.closeText = closeText;

        this._level = level;
        this._dialogSprite = null;
        this._dialogGroup = null;
        this._onCloseCallback = onCloseCallback;
        this._setupBackgroundBox();
    }

    _setupBackgroundBox() {
        this._dialogSprite = this._level.add.sprite(this._level.game.width/2, this._level.game.height/2, 'dialog');
        this._dialogSprite.fixedToCamera = true;
        this._dialogSprite.anchor.set(0.5, 0.5);
        this._dialogSprite.scale.set(0);
        this._dialogSprite.alpha = 0.8;

        this._dialogGroup = this._level.add.group();
        this._setupOpeningTween();

    }

    _setupOpeningTween() {
        var tween = this._level.add.tween(this._dialogSprite.scale);
        var centerX = this._dialogSprite.x;
        var centerY = this._dialogSprite.y;

        tween.to({x: 1.8, y: 1.5}, 1000, Phaser.Easing.Sinusoidal.Out, true);
        tween.onComplete.add(() => { this._setupText(centerX, centerY); }, this);
    }

    _setupClosingTween() {
        this._dialogGroup.destroy();

        var tween = this._level.add.tween(this._dialogSprite.scale);
        tween.to({x: 0, y: 0}, 1000, Phaser.Easing.Sinusoidal.Out, true);
        tween.onComplete.add(() => {
            this._dialogSprite.destroy();
            this._onCloseCallback();
        });
    }

    _setupText(centerX, centerY) {
        var titleLabel = new TextLabel(this._level.game, centerX,
            centerY - this._dialogSprite.height * 0.4, this.titleText, true);
        var closeButton = new TextButton(this._level.game, centerX,
            centerY + this._dialogSprite.height * 0.4, this.closeText, { fn: this._setupClosingTween, ctx: this }, true);
        this._dialogGroup.addMultiple([titleLabel, closeButton]);
    }
}

export default Dialog;


