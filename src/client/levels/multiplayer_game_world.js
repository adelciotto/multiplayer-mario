/*
 * ===========================================================================
 * File: multiplayer_game_world.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import GameWorld from 'client/levels/game_world';
import Player from 'client/entities/player';
import Const from 'common/const';
import MsgDialog from 'client/gui/msg_dialog';
import TextLabel from 'client/gui/text_label';
import Network from 'client/network';

class MultiplayerGameWorld extends GameWorld {
    constructor(level) {
        super(level);

        this.network = null;
        this.remotePlayers = null;

        this._connectionStatusText = null;
        this._welcomeDialog = null;
    }

    _createWorld() {
        this.network = new Network();

        this._connectionStatusText = new TextLabel(this._level.game, 16, 16,
            'connecting...', false, 'left', 10);
        this._level.add.existing(this._connectionStatusText);
        this.remotePlayers = this._level.add.group();

        this.network.onConnect.add(this._onConnect, this);
        this.network.onDisconnect.add(this._onDisconnect, this);
        this.network.onNewPlayer.add(this._onNewPlayer, this);
        this.network.onSyncPlayers.add(this._onSyncPlayers, this);
        this.network.onPlayerDisconnected.add(this._onPlayerDisconnected, this);

        this._createMap();
        this._createMapObjects();
    }

    _updateWorld() {
        this._physics.arcade.collide(this.localPlayer, this.remotePlayers);
        this._physics.arcade.collide(this.remotePlayers, this._collisionLayer);

        this.remotePlayers.callAll('update');
    }

    _onConnect(data) {
        this.network.socket.emit('client_start', {
            name: 'player'
        });

        this._connectionStatusText.setText('connected');
        this._welcomeDialog = new MsgDialog(this._level, Const.MULTIPLAYER_DIALOG_TITLE,
            Const.MULTIPLAYER_DIALOG_MSG);
        window.setTimeout(() => { this._connectionStatusText.setText('waiting...'); }, 3000);
    }

    _onDisconnect(data) {
        // TODO: notify the user if they disconnected
        // we can probz just return to single player here
    }

    _onNewPlayer(data) {
        console.log(`player: ${data.player.id} connected`);

        this._connectionStatusText.setText('player joined');
        window.setTimeout(() => { this._connectionStatusText.setText('waiting...'); }, 3000);

        var newPlayer = new Player(this._level.game, 0, 0, data.player.id);
        newPlayer.setup(this._level);
        this.remotePlayers.add(newPlayer);
    }

    _onSyncPlayers(data) {
        for (var player of data.players) {
            console.log(player);
        }
    }

    _onPlayerDisconnected(data) {
        var removePlayer = _.find(this.remotePlayers.children, (player) => {
            return (player.id === data.player.id);
        });

        if (!removePlayer) {
            console.log(`Player: ${data.player.id} not found`);
            return;
        }

        console.log(`Player: ${data.player.id} disconnected`);
        removePlayer.destroy();
    }
}

export default MultiplayerGameWorld;

