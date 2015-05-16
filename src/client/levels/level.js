/*
 * ===========================================================================
 * File: level.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import State from 'client/states/state';
import Block from 'client/entities/block';
import Const from 'common/const';

class Level extends State {
    constructor(game, gravity) {
        super(game);

        this.gravity = gravity;
        this.mapKey = '';

        this._collisionLayer = null;
        this._staticLayer = null;
        this._keymap = {
            keyboard: {
                down: Phaser.Keyboard.DOWN,
                left: Phaser.Keyboard.LEFT,
                right: Phaser.Keyboard.RIGHT,

                jump: Phaser.Keyboard.C,
                sprint: Phaser.Keyboard.X
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

        // TODO general level initialisation
        this._createMap();
        this._createMapObjects();

        this.camera.follow(this.game.player, Phaser.FOLLOW_PLATFORMER);
        this.physics.arcade.gravity.y = this.gravity;
    }

    shutdown() {
        super.shutdown();

        this.camera.unfollow();
        this.game.player.parent.removeChild(this.game.player);
    }

    update() {
        this.physics.arcade.collide(this.game.player, this._collisionLayer);
        this.physics.arcade.collide(this.game.player, this._blocks, this._onBlockBump,
                                    null, this);

        this._blocks.callAll('update');
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

    _createMap() {
        this.map = this.add.tilemap(this.mapKey);
        this.map.addTilesetImage('tiles', 'tiles');

        this._collisionLayer = this.map.createLayer('collision_layer');
        this._staticLayer = this.map.createLayer('static_layer');
        this._collisionLayer.resizeWorld();

        this.map.setCollision(475, true, this._collisionLayer);
    }

    _createMapObjects() {
        this._blocks = this.add.group();
        this._itemBlocks = this.add.group();

        this.map.createFromObjects('object_layer', 2, 'tilesheet', 1, true,
                                    false, this._blocks, Block);
        this._blocks.callAll('setup', null, this);
    }

    _handleKeyboard(key, active) {
        switch(key) {
            // JUMP
            case this._keymap.keyboard.jump:
                this.game.player.jump();
                break;

            // DOWN i.e ducking
            case this._keymap.keyboard.down:
                //this.game.player.move(Phaser.DOWN, 1, active);
                break;

            // LEFT
            case this._keymap.keyboard.left:
                this.game.player.move(Phaser.LEFT, 1, active);
                break;

            // RIGHT
            case this._keymap.keyboard.right:
                this.game.player.move(Phaser.RIGHT, 1, active);
                break;
        }
    }

    _handleKeyboardUp(key) {
        switch(key) {
            // JUMP released
            case this._keymap.keyboard.jump:
                this.game.player.jumpReleased = true;
                break;
        }
    }

    _onBlockBump(player, block) {
        if (player.body.touching.up) {
            block.bump();
        }
    }
}

export default Level;

