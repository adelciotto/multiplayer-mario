/*
 * ===========================================================================
 * File: text_label.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Const from 'const';

class TextLabel extends Phaser.BitmapText {
    constructor(game, x, y, text, parent = null, fixedToCam = false, centerText = true,
            align = 'center', size = 7) {
        super(game, x, y, Const.GAME_FONT, text, size);

        if (parent) {
            parent.add(this);
        }

        this.align = align;
        this.fixedToCamera = fixedToCam;
        if (centerText) {
            this.anchor.x = Math.round(this.width * 0.5) / this.width;
            this.anchor.y = Math.round(this.height * 0.5) / this.height;
        }
    }
}

export default TextLabel;

