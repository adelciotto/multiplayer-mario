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
import * as util from 'common/util/util';

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
        this.network.onRemovePlayer.add(this._onRemovePlayer, this);

        this._createMap();
        this._createMapObjects();
    }

    _updateWorld() {
        this._physics.arcade.collide(this.localPlayer, this.remotePlayers);
        this._physics.arcade.collide(this.remotePlayers, this._collisionLayer);

        this.remotePlayers.callAll('update');
    }

    _onConnect(data) {
        this.network.socket.emit('new_player', {
            x: this.localPlayer.position.x,
            y: this.localPlayer.position.y
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
        console.log(`player: ${data.id} connected`);

        this._connectionStatusText.setText('player joined');
        window.setTimeout(() => { this._connectionStatusText.setText('waiting...'); }, 3000);

        var newPlayer = new Player(this._level.game, data.x, data.y, data.id);
        newPlayer.setup(this);
        this.remotePlayers.add(newPlayer);
    }

    _onRemovePlayer(data) {
        var removePlayer = util.searchObjArray(this.remotePlayers.children, 'id', data.id);

        if (!removePlayer) {
            console.log(`Player: ${data.id} not found`);
            return;
        }

        removePlayer.destroy();
    }
}

export default MultiplayerGameWorld;

