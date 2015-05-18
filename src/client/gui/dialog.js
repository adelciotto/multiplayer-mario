/*
 * ===========================================================================
 * File: prompt.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

class Dialog {
    constructor(level, title, msg, close = 'Ok') {
        this.title = title;
        this.msg = msg;
        this.close = close;

        this._level = level;
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
        tween.to({x: 1.5, y: 1.5}, 1000, Phaser.Easing.Sinusoidal.Out, true);
        tween.onComplete.add(this._setupText, this);
    }

    _setupClosingTween() {
        this._dialogGroup.destroy();

        var tween = this._level.add.tween(this._dialogSprite.scale);
        tween.to({x: 0, y: 0}, 1000, Phaser.Easing.Sinusoidal.Out, true);
        tween.onComplete.add(() => { this._dialogSprite.destroy(); });
    }

    _setupTextSprite(text, x, y) {
        var textObj = new Phaser.BitmapText(this._level.game, x, y,
            'carrier_command', text, 8);

        textObj.anchor.set(0.5);
        textObj.fixedToCamera = true;
        textObj.align = 'center';
        this._dialogGroup.add(textObj);

        return textObj;
    }

    _setupText() {
        var halfW = this._level.game.width/2;
        var halfH = this._level.game.height/2;
        var xpos = this._dialogSprite.position.x;

        this._titleText = this._setupTextSprite(this.title, xpos, halfH - this._dialogSprite.height * 0.35);
        this._msgText = this._setupTextSprite(this.msg, xpos, halfH);
        this._closeText = this._setupTextSprite(this.close, xpos, halfH + this._dialogSprite.height * 0.35);
        this._closeText.inputEnabled = true;
        this._closeText.events.onInputOver.add(() => { this._closeText.tint = 0x994E00; });
        this._closeText.events.onInputOut.add(() => { this._closeText.tint = 0xFFFFFF; });
        this._closeText.events.onInputDown.add(this._setupClosingTween, this);
    }
}

export default Dialog;


