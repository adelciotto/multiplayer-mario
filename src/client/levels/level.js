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
        this._keymap = {
            keyboard: {
                down: Phaser.Keyboard.DOWN,
                left: Phaser.Keyboard.LEFT,
                right: Phaser.Keyboard.RIGHT,

                jump: Phaser.Keyboard.C,
                sprint: Phaser.Keyboard.X,
                pause: Phaser.Keyboard.ENTER
            }
        };
    }

    preload() {
        super.preload();

        // TODO: get tilemap from cache, this should be loaded in the
        // preload state
    }

    create() {
        super.create();

        // if we are in a multiplayer game, connect to server
        if (this.game.inMultiplayerMode) {
            this.gameWorld = new MultiplayerGameWorld(this);
        } else {
            this.gameWorld = new GameWorld(this);
        }

        this.gameWorld.create();
        this._localPlayer = this.gameWorld.localPlayer;
        this.game.isPaused = false;
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

    onKeyboardDown(event) {
        super.onKeyboardDown(event);

        this._handleKeyboard(event.keyCode, true);
    }

    onKeyboardUp(event) {
        super.onKeyboardUp(event);

        this._handleKeyboard(event.keyCode, false);
        this._handleKeyboardUp(event.keyCode);
    }

    _handleKeyboard(key, active) {
        switch(key) {
            // JUMP
            case this._keymap.keyboard.jump:
                this._localPlayer.jump();
                break;

            // SPRINT
            case this._keymap.keyboard.sprint:
                this._localPlayer.sprint(active);
                break;

            // DOWN i.e ducking
            case this._keymap.keyboard.down:
                //this._localPlayer.move(Phaser.DOWN, 1, active);
                break;

            // LEFT
            case this._keymap.keyboard.left:
                this._localPlayer.move(Phaser.LEFT, 1, active);
                break;

            // RIGHT
            case this._keymap.keyboard.right:
                this._localPlayer.move(Phaser.RIGHT, 1, active);
                break;

            // RIGHT
            case this._keymap.keyboard.pause:
                this.pause();
                break;
        }
    }

    _handleKeyboardUp(key) {
        switch(key) {
            // JUMP released
            case this._keymap.keyboard.jump:
                this._localPlayer.jumpReleased = true;
                break;
        }
    }

}

export default Level;

