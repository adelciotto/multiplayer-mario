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
    constructor(level, titleText, onCloseCallback = () => {}, closeText = 'Close', tweenTime = 500)  {
        this.titleText = titleText;
        this.closeText = closeText;
        this.setupText = new Phaser.Signal();
        this.tweenTime = tweenTime;

        this._level = level;
        this._dialogSprite = null;
        this._dialogGroup = null;
        this._onCloseCallback = onCloseCallback;
        this._initialised = false;

        this._setupBackgroundBox();
    }

    add(text) {
        if (_.isArray(text)) {
            this._dialogGroup.addMultiple(text);
        } else {
            this._dialogGroup.add(text);
        }
    }

    hide(destroy) {
        this._dialogGroup.visible = false;

        var tween = this._setupClosingTween();
        tween.onComplete.add(() => {
            if (destroy) {
                this._dialogGroup.destroy();
                this._dialogSprite.destroy();
                this._initialised = false;
            }

            if (this._level.setInputEnabled) {
                this._level.setInputEnabled(true);
            }

            this._onCloseCallback();
        });
    }

    show() {
        if (this._level.setInputEnabled) {
            this._level.setInputEnabled(false);
        }

        this._setupOpeningTween();
    }

    _onClose() {
        this.hide(true);
    }

    _setupBackgroundBox() {
        this._dialogSprite = this._level.add.sprite(this._level.game.width/2, this._level.game.height/2, 'dialog');
        this._dialogSprite.fixedToCamera = true;
        this._dialogSprite.anchor.set(0.5, 0.5);
        this._dialogSprite.scale.set(0);
        this._dialogSprite.alpha = 0.8;

        this._dialogGroup = this._level.add.group();
    }

    _setupOpeningTween() {
        var tween = this._level.add.tween(this._dialogSprite.scale);
        var centerX = this._dialogSprite.x;
        var centerY = this._dialogSprite.y;

        tween.to({x: 1.8, y: 1.5}, this.tweenTime, Phaser.Easing.Sinusoidal.Out, true);
        tween.onComplete.add(() => {
            if (this._initialised) {
                this._dialogGroup.visible = true;
            } else {
                this._setupText(centerX, centerY);
            }
        }, this);
    }

    _setupClosingTween() {
        var tween = this._level.add.tween(this._dialogSprite.scale);
        tween.to({x: 0, y: 0}, this.tweenTime, Phaser.Easing.Sinusoidal.Out, true);

        return tween;
    }

    _setupText(centerX, centerY) {
        var titleLabel = new TextLabel(this._level.game, centerX,
            centerY - this._dialogSprite.height * 0.4, this.titleText, true);
        var closeButton = new TextButton(this._level.game, centerX,
            centerY + this._dialogSprite.height * 0.4, this.closeText, { fn: this._onClose, ctx: this }, true);
        this.add([titleLabel, closeButton]);

        this.setupText.dispatch(centerX, centerY);
        this._initialised = true;
    }
}

export default Dialog;

