/*
 * ===========================================================================
 * File: game_world.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Player from 'client/entities/player';
import Block from 'client/entities/block';
import ItemBlock from 'client/entities/item_block';
import MsgDialog from 'client/gui/msg_dialog';

class GameWorld {
    constructor(level) {
        this.localPlayer = null;
        this.map = null;
        this.blocksGroup = null;
        this.itemBlocksGroup = null;

        this._level = level;
        this._game = level.game;
        this._physics = level.physics;
        this._entitiesGroup = null;
        this._collisionLayer = null;
        this._staticLayer = null;
    }

    create() {
        this._entitiesGroup = this._level.add.group();

        this._createWorld();
        this.localPlayer = new Player(this._game, 32, this._game.height - 64);
        this.localPlayer.setup(this._level);
        this._entitiesGroup.add(this.localPlayer);

        this._level.camera.follow(this.localPlayer, Phaser.FOLLOW_PLATFORMER);
        this._physics.arcade.gravity.y = this._level.gravity;
    }

    shutdown() {
        this._level.camera.unfollow();
        this._localPlayer.destroy();
    }

    update() {
        this._physics.arcade.collide(this.localPlayer, this._collisionLayer);
        this._physics.arcade.collide(this.localPlayer, this.blocksGroup, this._onBlockBump,
                                    null, this);
        this._physics.arcade.collide(this.localPlayer, this.itemBlocksGroup, this._onItemBlockBump,
                                    null, this);

        this._updateWorld();

        this.blocksGroup.callAll('update');
        this.itemBlocksGroup.callAll('update');
        this.localPlayer.update();
    }

    pause() {
        if (!this._game.inMultiplayerMode) {
            this._game.input.keyboard.enabled = false;
            this._entitiesGroup.callAll('pause');
        }
    }

    resume() {
        if (!this._game.inMultiplayerMode) {
            this._game.input.keyboard.enabled = true;
            this._entitiesGroup.callAll('resume');
        }
    }

    /**
     * this method is overridden completely in the multi-player
     * game world sub class.
     */
    _createWorld() {
        this._createMap();
        this._createMapObjects();
    }

    /**
     * this method is overridden completely in the multi-player
     * game world sub class.
     */
    _updateWorld() { }

    _createMap() {
        this.map = this._level.add.tilemap(this._level.mapKey);
        this.map.addTilesetImage('tiles', 'tiles');

        this._collisionLayer = this.map.createLayer('collision_layer');
        this._collisionLayer.visible = false;
        this._staticLayer = this.map.createLayer('static_layer');
        this._collisionLayer.resizeWorld();

        this.map.setCollision(475, true, this._collisionLayer);
    }

    _createMapObjects() {
        this.blocksGroup = this._level.add.group();
        this.itemBlocksGroup = this._level.add.group();

        this.map.createFromObjects('block_layer', 2, 'tilesheet', 1, true,
                                    false, this.blocksGroup, Block);
        this.map.createFromObjects('itemblock_layer', 25, 'tilesheet', 24, true,
                                    false, this.itemBlocksGroup, ItemBlock);
        this.blocksGroup.callAll('setup', null, this._level);
        this.blocksGroup.callAll('body.setSize', 'body', 10, 16);
        this.itemBlocksGroup.callAll('setup', null, this._level);
    }

    _onBlockBump(player, block) {
        if (player.body.touching.up) {
            block.bump();
        }
    }

    _onItemBlockBump(player, itemBlock) {
        if (player.body.touching.up) {
            itemBlock.bump();
        }
    }

}

export default GameWorld;


