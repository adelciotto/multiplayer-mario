/*
 * ===========================================================================
 * File: game_world.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Player from 'client/entities/player';
import Block from 'client/entities/block';
import MsgDialog from 'client/gui/msg_dialog';

class GameWorld {
    constructor(level) {
        this.localPlayer = null;
        this.map = null;
        this.blocksGroup = null;
        this.itemBlocksGroup = null;

        this._level = level;
        this._physics = level.physics;
        this._collisionLayer = null;
        this._staticLayer = null;
    }

    create() {
        this.localPlayer = new Player(this._level.game, 32, 0);
        this.localPlayer.setup(this._level);
        this._level.add.existing(this.localPlayer);

        this._createWorld();

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

        this._updateWorld();

        this.blocksGroup.callAll('update');
        this.localPlayer.update();
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
        this._staticLayer = this.map.createLayer('static_layer');
        this._collisionLayer.resizeWorld();

        this.map.setCollision(475, true, this._collisionLayer);
    }

    _createMapObjects() {
        this.blocksGroup = this._level.add.group();
        this.itemBlocksGroup = this._level.add.group();

        this.map.createFromObjects('object_layer', 2, 'tilesheet', 1, true,
                                    false, this.blocksGroup, Block);
        this.blocksGroup.callAll('setup', null, this._level);
    }

    _onBlockBump(player, block) {
        if (player.body.touching.up) {
            block.bump();
        }
    }

}

export default GameWorld;


