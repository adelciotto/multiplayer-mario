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

        this._connectionStatusText = null;
        this._welcomeDialog = null;
    }

    _createWorld() {
        this.network = new Network();

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
        this._physics.arcade.collide(this.localPlayer, this.remotePlayers);
        this._physics.arcade.collide(this.remotePlayers, this._collisionLayer);

        this.remotePlayers.callAll('update');
    }

    _onOpen(id) {
        this._connectionStatusText.setText(`connected, id: ${id}`);
        this._welcomeDialog = new MsgDialog(this._level, Const.MULTIPLAYER_DIALOG_TITLE,
            Const.MULTIPLAYER_DIALOG_MSG);
        window.setTimeout(() => { this._connectionStatusText.setText('waiting...'); }, 3000);
    }

    _onConnection(conn) {

    }

    _onData(data) {

    }

    _onClose() {

    }

    //_onNewPlayer(data) {
        //console.log(`player: ${data.player.id} connected`);

        //this._connectionStatusText.setText('player joined');
        //window.setTimeout(() => { this._connectionStatusText.setText('waiting...'); }, 3000);

        //var newPlayer = new Player(this._level.game, 0, 0, data.player.id);
        //newPlayer.setup(this._level);
        //this.remotePlayers.add(newPlayer);
    //}

    //_onSyncPlayers(data) {
        //for (var player of data.players) {
            //console.log(player);
        //}
    //}

    //_onPlayerDisconnected(data) {
        //var removePlayer = _.find(this.remotePlayers.children, (player) => {
            //return (player.id === data.player.id);
        //});

        //if (!removePlayer) {
            //console.log(`Player: ${data.player.id} not found`);
            //return;
        //}

        //console.log(`Player: ${data.player.id} disconnected`);
        //removePlayer.destroy();
    //}
}

export default MultiplayerGameWorld;

