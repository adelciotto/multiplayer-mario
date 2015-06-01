/*
 * ===========================================================================
 * File: level.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import State from 'client/states/state';
import Const from 'const';
import LevelManager from 'client/levels/level_manager';
import MultiplayerGameWorld from 'client/levels/multiplayer_level_manager';
import OptionsDialog from 'client/gui/options_dialog';

class Level extends State {
    constructor(game, gravity) {
        super(game);

        this.gravity = gravity;
        this.mapKey = '';
        this.levelManager = null;

        this._localPlayer = null;
    }

    preload() {
        super.preload();

        // TODO: get tilemap from cache, this should be loaded in the
        // preload state
    }

    create() {
        super.create();

        this.inputHandler.setInputMap({
            jump: Phaser.Keyboard.C,
            sprint: Phaser.Keyboard.X,
            pause: Phaser.Keyboard.ENTER
        });
        this.inputHandler.addListener('left', this, this._onMove);
        this.inputHandler.addListener('right', this, this._onMove);
        this.inputHandler.addListener('jump', this, null, this._onJump, this._onJumpReleased);
        this.inputHandler.addListener('sprint', this, this._onSprint);
        this.inputHandler.addListener('pause', this, this._onPause);

        // if we are in a multiplayer game, connect to server
        if (this.game.inMultiplayerMode) {
            this.levelManager = new MultiplayerLevelManager(this);
        } else {
            this.levelManager = new LevelManager(this);
        }

        this.levelManager.create();
        this._localPlayer = this.levelManager.localPlayer;
        this._optionsDialog = new OptionsDialog(this.game, this, f => this.resume());
    }

    shutdown() {
        super.shutdown();
        this.levelManager.shutdown();
    }

    update() {
        this.levelManager.update();
    }

    pause() {
        if (!this.game.isPaused) {
            this._optionsDialog.show();
            this.levelManager.pause();
            this.game.isPaused = true;
        }
    }

    resume() {
        if (this.game.isPaused) {
            this.levelManager.resume();
            this.game.isPaused = false;
        }
    }

    _onMove(keycode, active) {
        var dir = (keycode === Phaser.Keyboard.LEFT ? Phaser.LEFT : Phaser.RIGHT);
        this._localPlayer.move(dir, active);
    }

    _onJump(keycode) {
        this._localPlayer.jump();
    }

    _onJumpReleased(keycode) {
        this._localPlayer.jumpReleased = true;
    }

    _onSprint(keycode, active) {
        this._localPlayer.sprint(active);
    }

    _onPause(keycode) {
        this.pause();
    }
}

export default Level;

