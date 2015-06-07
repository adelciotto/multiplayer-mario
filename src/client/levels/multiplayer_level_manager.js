/*
 * ===========================================================================
 * File: multiplayer_level_manager.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import LevelManager from 'client/levels/level_manager';
import Player from 'client/entities/player';
import Const from 'const';
import MsgDialog from 'client/gui/msg_dialog';
import TextLabel from 'client/gui/text_label';
import Block from 'client/entities/block';
import ItemBlock from 'client/entities/item_block';
import PeerNetwork from 'client/network/peer_network';

class MultiplayerLevelManager extends LevelManager {
    constructor(level) {
        super(level);

        this.network = null;
        this.remotePlayers = null;

        this._connectionStatusText = null;

        // make sure to cleanup peerjs when window is closed
        window.onunload = window.onbeforeunload = f => this._disconnect();
    }

    shutdown() {
        super.shutdown();

        this.remotePlayers.destroy();
    }

    _createWorld() {
        this.network = new PeerNetwork(this);

        this._connectionStatusText = new TextLabel(this._level.game, 16, 16,
            'connecting...', null, true, false, 'left');
        this._level.add.existing(this._connectionStatusText);
        this.remotePlayers = this._level.add.group();
        this._entitiesGroup.add(this.remotePlayers);

        this.network.addListener(Const.PeerJsEvents.OPEN, this._onOpen, this);
        this.network.addListener(Const.PeerJsEvents.DATA, this._onData, this);
        this.network.addListener(Const.PeerJsEvents.CLOSE, this._onClose, this);

        this._createMap();
        this._createMapObjects();

        // testing broadcasting the player state at a slower interval
        //this._timer.loop(20, this._broadcastPlayerUpdate, this);
        //this._timer.start();
    }

    _updateCollision() {
        super._updateCollision();

        //this._physics.arcade.collide(this.localPlayer, this.remotePlayers,
                                     //null, this._onPlayerCollision, this);
        this._physics.arcade.collide(this.remotePlayers, this._collisionLayer);
    }

    _updateEntities() {
        super._updateEntities();

        this._broadcastPlayerUpdate();
    }

    _broadcastPlayerUpdate() {
        var body = this.localPlayer.body;
        this.network.broadcastToPeers(Const.PeerJsMsgType.PLAYER_UPDATE, {
            facing: this.localPlayer.facing,
            state: this.localPlayer.currentState,
            x: Math.round(this.localPlayer.x),
            y: Math.round(this.localPlayer.y),
            v: body.velocity.y.toFixed(2),
            a: body.acceleration.x.toFixed(2)
        });
    }

    _disconnect() {
        this.network.destroy();
    }

    /**
     * peer js event listeners
     */
    _onOpen(id) {
        this._connectionStatusText.setText(`connected, id: ${id}`);
        var welcome = new MsgDialog(this._level.game, this._level, Const.MULTIPLAYER_DIALOG_TITLE,
            'close', Const.MULTIPLAYER_DIALOG_MSG, null, true);
        this._timer.add(Const.NETWORK_STATUS_CLEAR_TIME, f => this._connectionStatusText.visible = false);
    }

    _onData(type, data) {
        var remotePlayer = _.find(this.remotePlayers.children, (player) => {
            return player.id === data.from;
        });

        switch (type) {
            case Const.PeerJsMsgType.HELLO:
                this._handleHello(data);
                break;
            case Const.PeerJsMsgType.PLAYER_UPDATE:
                this._handlePlayerUpdate(remotePlayer, data);
                break;
            case Const.PeerJsMsgType.BLOCK_BUMP:
                this._handleBlockBump(data);
                break;
            case Const.PeerJsMsgType.ITEM_BLOCK_BUMP:
                this._handleItemBlockBump(data);
                break;
        }
    }

    _onClose(peer) {
        var remotePlayer = _.find(this.remotePlayers.children, (player) => {
            return player.id === peer;
        });

        if (!_.isUndefined(remotePlayer)) {
            this.remotePlayers.removeChild(remotePlayer);
        }
    }

    /**
     * level event listeners
     */
    _onBlockBump(player, block) {
        super._onBlockBump(player, block);

        if (player.body.touching.up) {
            this.network.broadcastToPeers(Const.PeerJsMsgType.BLOCK_BUMP, {
                idx: this.blocksGroup.getChildIndex(block)
            });
        }
    }

    _onItemBlockBump(player, itemBlock) {
        super._onItemBlockBump(player, itemBlock);

        if (player.body.touching.up) {
            this.network.broadcastToPeers(Const.PeerJsMsgType.ITEM_BLOCK_BUMP, {
                idx: this.itemBlocksGroup.getChildIndex(itemBlock)
            });
        }
    }

    /**
     * msg handlers
     */
    _handleHello(data) {
        console.log(`hello from: ${data.from}`);
        this.network.connectToPeer(data.from);

        this._connectionStatusText.visible = true;
        this._connectionStatusText.setText('player joined');
        this._timer.add(Const.NETWORK_STATUS_CLEAR_TIME, f => this._connectionStatusText.visible = false);

        var newPlayer = new Player(this._level.game, data.x, data.y, data.from);
        newPlayer.setup(this._level);
        this.remotePlayers.add(newPlayer);
    }

    _handlePlayerUpdate(remotePlayer, data) {
        var body = remotePlayer.body;
        remotePlayer.facing = data.facing;
        remotePlayer.currentState = data.state;
        remotePlayer.x = data.x;
        remotePlayer.y = data.y;
        body.velocity.y = data.v;
        body.acceleration.x = data.a;
    }

    _handleBlockBump(data) {
        this.blocksGroup.getAt(data.idx).bump();
    }

    _handleItemBlockBump(data) {
        this.itemBlocksGroup.getAt(data.idx).bump();
    }
}

export default MultiplayerLevelManager;

