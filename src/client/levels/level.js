/*
 * ===========================================================================
 * File: level.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import State from 'client/states/state';
import Const from 'const';
import GameWorld from 'client/levels/game_world';
import MultiplayerGameWorld from 'client/levels/multiplayer_game_world';
import OptionsDialog from 'client/gui/options_dialog';

class Level extends State {
    constructor(game, gravity) {
        super(game);

        this.gravity = gravity;
        this.mapKey = '';
        this.gameWorld = null;

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
            this.gameWorld = new MultiplayerGameWorld(this);
        } else {
            this.gameWorld = new GameWorld(this);
        }

        this.gameWorld.create();
        this._localPlayer = this.gameWorld.localPlayer;
        this._optionsDialog = new OptionsDialog(this, 'Paused', () => { this.resume(); }, 'Resume');
    }

    shutdown() {
        super.shutdown();
        this.gameWorld.shutdown();
    }

    update() {
        this.gameWorld.update();
    }

    pause() {
        if (!this.game.isPaused) {
            this._optionsDialog.show();
            this.gameWorld.pause();
            this.game.isPaused = true;
        }
    }

    resume() {
        if (this.game.isPaused) {
            this.gameWorld.resume();
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

