/*
 * ===========================================================================
 * File: splash.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import State from 'client/states/state';

class SplashState extends State {
    constructor(game) {
        super(game);
    }

    create() {
        this.stage.backgroundColor = 0xFFFFFF;

        this._htmlLogo = this.add.sprite(this.world.centerX, this.world.centerY, 'html');
        this._htmlLogo.smoothed = true;
        this._htmlLogo.anchor.set(0.5, 0.5);
        this._htmlLogo.scale.set(0.5);
        this._htmlLogo.alpha = 0;

        this._createHtmlTween();
    }

    _createHtmlTween() {
        var htmlTween = this.add.tween(this._htmlLogo).to({alpha: 1}, 1000,
            Phaser.Easing.Cubic.In, true, 0, 0, true);
        htmlTween.onComplete.add(() => { this.state.start('play'); });
    }
}

export default SplashState;

