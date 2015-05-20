/*
 * ===========================================================================
 * File: index.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

require('./polyfills');

import BootState from 'client/states/boot';
import PreloadState from 'client/states/preload';
import SplashState from 'client/states/splash';
import MainMenuState from 'client/states/main_menu';
import PlayState from 'client/states/play';
import TestLevel from 'client/levels/test_level';

class Game extends Phaser.Game {
    constructor() {
        super(400, 240, Phaser.AUTO, 'game', false, false);
    }

    boot() {
        super.boot();

        // set custom resize strategy
        this.scale.minWidth = this.width;
        this.scale.minHeight = this.height;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.scale.scaleMode = this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setScreenSize();

        this.renderer.renderSession.roundPixels = true;
        this.stage.smoothed = false;

        // capture certain keys to prevent their default actions in the browser.
        // this is only necessary because this is an HTML5 game.
        this.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.time.advancedTiming = true;
        this.input.maxPointers = 1;

        this.add.plugin(Phaser.Plugin.Debug);
    }

    start() {
        this.state.add('boot', BootState, true);
        this.state.add('preload', PreloadState, false);
        this.state.add('splash', SplashState, false);
        this.state.add('mainmenu', MainMenuState, false);
        this.state.add('play', PlayState, false);
        this.state.add('testlevel', TestLevel, false);

        return this;
    }
}

export default Game;
