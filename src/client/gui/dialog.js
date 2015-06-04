/*
 * ===========================================================================
 * File: dialog.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import TextLabel from 'client/gui/text_label';
import TextButton from 'client/gui/text_button';

class Dialog extends Phaser.Group {
    constructor(game, parent, title, close, onClose = null, autoShow = false, tweenTime = 500) {
        super(game);

        this._parent = parent;
        this._title = title;
        this._close = close;
        this._onClose = onClose;
        this._autoShow = autoShow;

        this.fixedToCamera = true;
    }

    setup(bodyTextItems) {
        this._bodyTextItems = bodyTextItems;
        this._init();

        if (this._autoShow) {
            this.show();
        }
    }

    show() {
        if (this._parent.setInputEnabled) {
            this._parent.setInputEnabled(false);
        }

        this.visible = true;
        this._textItemsGroup.visible = false;
        this._startOpenTween();
    }

    hide() {
        if (this._parent.setInputEnabled) {
            this._parent.setInputEnabled(true);
        }

        this._textItemsGroup.visible = false;
        this._startCloseTween();

        // if user defined a onclose callback, invoke it
        if (this._onClose) {
            this._onClose();
        }
    }

    _init() {
        // setup the dialog background sprite
        this.visible = false;
        this._dialogSprite = this.create(this.game.width/2, this.game.height/2, 'dialog');
        this._dialogSprite.anchor.set(0.5, 0.5);
        this._dialogSprite.alpha = 0.8;

        // setup all the text items
        var centerX = this._dialogSprite.x;
        var centerY = this._dialogSprite.y;
        this._textItemsGroup = new Phaser.Group(this.game, this);
        this._initOpenAndCloseText(centerX, centerY);
        this._initBodyText(centerX, centerY);

        // set scale to zero after so the width and height calculations are correct
        this._dialogSprite.scale.set(0);
    }

    _initOpenAndCloseText(centerX, centerY) {
        var titleLabel = new TextLabel(this.game, centerX, centerY - this._dialogSprite.height/2 - 7,
            this._title, this._textItemsGroup);
        var closeLabel = new TextButton(this.game, centerX, centerY + this._dialogSprite.height/2 + 7,
            this._close, this._textItemsGroup, false, { fn: this.hide, ctx: this });
    }

    _initBodyText(centerX, centerY) {
        var size = _.size(this._bodyTextItems);
        var yPos = (size > 1 ? centerY - size * 3 : centerY);

        _.each(this._bodyTextItems, (v, k) => {
            let xPos = centerX;

            if (v.pos === 'left') {
                xPos = centerX - this._dialogSprite.width/2;
            } else if (v.pos === 'right') {
                xPos = centerX + this._dialogSprite.width/2;
            }

            let item = (v.type === 'label' ? new TextLabel(this.game, xPos, yPos, v.text, this._textItemsGroup) :
                new TextButton(this.game, xPos, yPos, v.text, this._textItemsGroup, false, { fn: v.fn, ctx: v.ctx }));

            if (v.newLine) {
                yPos += item.height*2;
            }
        });
    }

    _startOpenTween() {
        var tween = this._createTween(1.8, 1.5);

        tween.onComplete.add(f => this._textItemsGroup.visible = true);
        tween.start();
    }

    _startCloseTween() {
        var tween = this._createTween(0, 0);

        tween.onComplete.add(f => this.visible = false);
        tween.start();
    }

    _createTween(scaleX, scaleY) {
        var tween = this._parent.add.tween(this._dialogSprite.scale)
            .to({ x: scaleX, y: scaleY }, this._tweenTime,
                Phaser.Easing.Quintic.Out);

        return tween;
    }
}

export default Dialog;

