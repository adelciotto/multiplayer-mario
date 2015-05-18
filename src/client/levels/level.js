/*
 * ===========================================================================
 * File: level.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import State from 'client/states/state';
import Block from 'client/entities/block';
import Player from 'client/entities/player';
import Network from 'client/network';
import * as util from 'common/util/util';

class Level extends State {
    constructor(game, gravity) {
        super(game);

        this.gravity = gravity;
        this.mapKey = '';

        this._localPlayer = null;
        this._remotePlayers = null;
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

        this._connectionStatusText = this.add.bitmapText(16, 16, 'carrier_command',
            '', 10);
        this._connectionStatusText.fixedToCamera = true;

        // create a local player
        this._localPlayer = new Player(this.game, 32, 0);
        this._localPlayer.setup(this);
        this.add.existing(this._localPlayer);

        // if we are in a multiplayer game, connect to server
        if (this.game.inMultiplayerMode) {
            this._initNetwork();
        } else {
            this._createLevel();
        }

        this.camera.follow(this._localPlayer, Phaser.FOLLOW_PLATFORMER);
        this.physics.arcade.gravity.y = this.gravity;
    }

    shutdown() {
        super.shutdown();

        this.camera.unfollow();
    }

    update() {
        this.physics.arcade.collide(this._localPlayer, this._collisionLayer);
        this.physics.arcade.collide(this._localPlayer, this._blocks, this._onBlockBump,
                                    null, this);

        if (this.game.inMultiplayerMode) {
            this.physics.arcade.collide(this._localPlayer, this._remotePlayers);
            this.physics.arcade.collide(this._remotePlayers, this._collisionLayer);
        }

        this._blocks.callAll('update');
        this._localPlayer.update();
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

    _createLevel() {
        this._createMap();
        this._createMapObjects();
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

    _initNetwork() {
        this.network = new Network();
        this._connectionStatusText.setText('connecting...');
        this._remotePlayers = this.add.group();

        this.network.onConnect.add(this._onConnect, this);
        this.network.onDisconnect.add(this._onDisconnect, this);
        this.network.onNewPlayer.add(this._onNewPlayer, this);
        this.network.onRemovePlayer.add(this._onRemovePlayer, this);

        this._createLevel();
    }

    _onConnect(data) {
        this.network.socket.emit('new_player', {
            x: this._localPlayer.position.x,
            y: this._localPlayer.position.y
        });

        this._connectionStatusText.setText('connected');
        window.setTimeout(() => { this._connectionStatusText.setText('waiting...'); }, 3000);
    }

    _onDisconnect(data) {
        // TODO: notify the user if they disconnected
        // we can probz just return to single player here
    }

    _onNewPlayer(data) {
        console.log(`player: ${data.id} connected`);

        var newPlayer = new Player(this.game, data.x, data.y, data.id);
        newPlayer.setup(this);
        this._remotePlayers.add(newPlayer);
    }

    _onRemovePlayer(data) {
        var removePlayer = util.searchObjArray(this._remotePlayers.children, 'id', data.id);

        if (!removePlayer) {
            console.log(`Player: ${data.id} not found`);
            return;
        }

        removePlayer.destroy();
        //this._remotePlayers.removeChild(removePlayer);
    }

    _handleKeyboard(key, active) {
        switch(key) {
            // JUMP
            case this._keymap.keyboard.jump:
                this._localPlayer.jump();
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

    _onBlockBump(player, block) {
        if (player.body.touching.up) {
            block.bump();
        }
    }
}

export default Level;

