/*
 * ===========================================================================
 * File: utils.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Const from 'common/const';

export function centerTextAnchor(textObj) {
    textObj.anchor.x = Math.round(textObj.width * 0.5) / textObj.width;
    textObj.anchor.y = Math.round(textObj.height * 0.5) / textObj.height;
}

export function createTextLabel(game, text, x, y, centerText = false, align = 'left', size = 8)  {
    var textLabel = new Phaser.BitmapText(game, x, y, Const.GAME_FONT, text, size);

    // set various common properties
    textLabel.fixedToCamera = true;
    textLabel.align = align;

    if (centerText) {
        centerTextAnchor(textLabel);
    }

    return textLabel;
}

export function createTextButton(game, text, x, y, callbackObj, centerText, align, size,
                                 overTint = Const.GOLD, outTint = 0xFFFFFF) {
    var textButton = createTextLabel(game, text, x, y, centerText, align, size);

    // enable input and setup callback events
    textButton.inputEnabled = true;
    textButton.events.onInputOver.add(() => {
        textButton.tint = overTint;
    });
    textButton.events.onInputOut.add(() => {
        textButton.tint = outTint;
    });
    textButton.events.onInputDown.add(callbackObj.fn, callbackObj.ctx);

    return textButton;
}
