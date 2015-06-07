/*
 * ===========================================================================
 * File: level_manager.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Player from 'client/entities/player';
import Block from 'client/entities/block';
import ItemBlock from 'client/entities/item_block';

class LevelManager {
    constructor(level) {
        this.localPlayer = null;
        this.map = null;
        this.blocksGroup = null;
        this.itemBlocksGroup = null;

        this._level = level;
        this._game = level.game;
        this._physics = level.physics;
        this._inputHandler = level.inputHandler;
        this._timer = level.timer;
        this._mainGroup = null;
        this._entitiesGroup = null;
        this._collisionLayer = null;
        this._staticLayer = null;
    }

    create() {
        this._mainGroup = this._level.add.group();
        this._entitiesGroup = this._level.add.group();
        this._mainGroup.add(this._entitiesGroup);

        this._createWorld();
        this.localPlayer = new Player(this._game, 32, this._game.height - 64);
        this.localPlayer.setup(this._level);
        this._entitiesGroup.add(this.localPlayer);

        // make sure the entities group is rendered on top
        this._mainGroup.bringToTop(this._entitiesGroup);

        this._level.camera.follow(this.localPlayer, Phaser.FOLLOW_PLATFORMER);
        this._physics.arcade.gravity.y = this._level.gravity;
    }

    shutdown() {
        this._mainGroup.destroy();
    }

    update() {
        this._updateCollision();
        this._updateEntities();
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

    _createWorld() {
        this._createMap();
        this._createMapObjects();
    }

    _createMap() {
        this.map = this._level.add.tilemap(this._level.mapKey);
        this.map.addTilesetImage('tiles', 'tiles');

        this._collisionLayer = this.map.createLayer('collision_layer');
        this._collisionLayer.visible = false;
        this._staticLayer = this.map.createLayer('static_layer');
        this._collisionLayer.resizeWorld();

        this.map.setCollision(475, true, this._collisionLayer);
        this._mainGroup.add(this._staticLayer);
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

        this._mainGroup.addMultiple([this.blocksGroup, this.itemBlocksGroup]);
    }

    _updateCollision() {
        this._physics.arcade.collide(this.localPlayer, this._collisionLayer);
        this._physics.arcade.collide(this.localPlayer, this.blocksGroup, this._onBlockBump,
                                    null, this);
        this._physics.arcade.collide(this.localPlayer, this.itemBlocksGroup, this._onItemBlockBump,
                                    null, this);
    }

    _updateEntities() {
        this.blocksGroup.callAll('update');
        this.itemBlocksGroup.callAll('update');
        this._entitiesGroup.callAll('update');
    }

    /**
     * level event listeners
     */
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

export default LevelManager;


