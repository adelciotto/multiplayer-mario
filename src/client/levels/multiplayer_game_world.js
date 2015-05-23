/*
 * ===========================================================================
 * File: multiplayer_game_world.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import GameWorld from 'client/levels/game_world';
import Player from 'client/entities/player';
import Const from 'const';
import MsgDialog from 'client/gui/msg_dialog';
import TextLabel from 'client/gui/text_label';
import Network from 'client/network';

class MultiplayerGameWorld extends GameWorld {
    constructor(level) {
        super(level);

        this.network = null;
        this.remotePlayers = null;

        this._ready = false;
        this._connectionStatusText = null;
        this._welcomeDialog = null;
    }

    _createWorld() {
        this.network = new Network(this);

        this._connectionStatusText = new TextLabel(this._level.game, 16, 16,
            'connecting...', false, 'left', 10);
        this._level.add.existing(this._connectionStatusText);
        this.remotePlayers = this._level.add.group();

        this.network.addListeners([
            { event: Const.PeerJsEvents.OPEN, fn: this._onOpen, ctx: this},
            { event: Const.PeerJsEvents.CONNECTION, fn: this._onConnection, ctx: this},
            { event: Const.PeerJsEvents.DATA, fn: this._onData, ctx: this},
            { event: Const.PeerJsEvents.CLOSE, fn: this._onClose, ctx: this},
        ]);

        this._createMap();
        this._createMapObjects();
    }

    _updateWorld() {
        if (!this._ready) {
            return;
        }

        this._physics.arcade.collide(this.localPlayer, this.remotePlayers);
        this._physics.arcade.collide(this.remotePlayers, this._collisionLayer);
        this.remotePlayers.callAll('update');

        this._broadcastBody();
    }

    _onOpen(id) {
        this._connectionStatusText.setText(`connected, id: ${id}`);
        this._welcomeDialog = new MsgDialog(this._level, Const.MULTIPLAYER_DIALOG_TITLE,
            Const.MULTIPLAYER_DIALOG_MSG);
        setTimeout(() => { this._connectionStatusText.visible = false; }, 3000);
    }

    _onConnection(conn) {

    }

    _onData(type, data) {
        switch (type) {
            case Const.PeerJsMsgType.HELLO:
                this._handleHello(data);
                break;
            case Const.PeerJsMsgType.BODY:
                this._handleBody(data);
                break;
            case Const.PeerJsMsgType.BLOCK_BUMP:
                this._handleBlockBump(data);
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

    _onBlockBump(player, block) {
        super._onBlockBump(player, block);

        if (player.body.touching.up) {
            this.network.broadcastToPeers(Const.PeerJsMsgType.BLOCK_BUMP, {
                idx: this.blocksGroup.getChildIndex(block)
            });
        }
    }

    _handleHello(data) {
        console.log(`hello from: ${data.id}`);
        this.network.connectToPeer(data.id);
        this._ready = true;

        this._connectionStatusText.visible = true;
        this._connectionStatusText.setText('player joined');
        window.setTimeout(() => {
            this._connectionStatusText.setText('');
            this._connectionStatusText.visible = false;
        }, 3000);

        var newPlayer = new Player(this._level.game, data.x, data.y, data.id);
        newPlayer.setup(this._level);
        this.remotePlayers.add(newPlayer);
    }

    _handleBody(data) {
        var remotePlayer = _.find(this.remotePlayers.children, (player) => {
            return player.id === data.id;
        });

        if (!_.isUndefined(remotePlayer)) {
            remotePlayer.facing = data.facing;
            remotePlayer.setState(data.state);
            remotePlayer.body.acceleration.x = data.ax;
            remotePlayer.body.velocity.x = data.vx;
            remotePlayer.body.velocity.y = data.vy;
            remotePlayer.x = data.x;
            remotePlayer.y = Math.round(data.y);
        }
    }

    _handleBlockBump(data) {
        this.blocksGroup.getAt(data.idx).bump();
    }

    _broadcastBody() {
        this.network.broadcastToPeers(Const.PeerJsMsgType.BODY, {
            x: this.localPlayer.x,
            y: this.localPlayer.y,
            vx: this.localPlayer.body.velocity.x,
            vy: this.localPlayer.body.velocity.y,
            ax: this.localPlayer.body.acceleration.x,
            facing: this.localPlayer.facing,
            state: this.localPlayer.getState()
        });
    }
}

export default MultiplayerGameWorld;

