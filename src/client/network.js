/*
 * ===========================================================================
 * File: network.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

class Network {
    constructor() {
        this.socket = null;
        this.onConnect = new Phaser.Signal();
        this.onDisconnect = new Phaser.Signal();
        this.onNewPlayer = new Phaser.Signal();
        this.onSyncPlayers = new Phaser.Signal();
        this.onPlayerDisconnected = new Phaser.Signal();

        this._connect();
    }

    _connect() {
        var host = window.location.hostname;
        var port = window.location.port;

        this.socket = io.connect(`${host}:${port}`);
        this._addEventListeners();
    }

    _addEventListeners() {
        this.socket.on('connect', (data) => { this._handleConnected(data); });
        this.socket.on('new_player_connected', (data) => { this._handleNewPlayer(data); });
        this.socket.on('sync_players', (data) => { this._handleSyncPlayers(data); });
        this.socket.on('player_disconnected', (data) => { this._handlePlayerDisconnected(data); });
        this.socket.on('error', (error) => { this._handleError(error); });
    }

    _handleConnected(data) {
        console.log(`Connected to socket server`);

        this.onConnect.dispatch(data);
    }

    _handleDisconnect(data) {
        console.log('Disconnected from socket server');

        this.onDisconnect.dispatch(data);
    }

    _handleError(error) {
        console.log(`Error: ${error}`);
    }

    _handleNewPlayer(data) {
        this.onNewPlayer.dispatch(data);
    }

    _handleSyncPlayers(data) {
        this.onSyncPlayers.dispatch(data);
    }

    _handlePlayerDisconnected(data) {
        this.onPlayerDisconnected.dispatch(data);
    }
}

export default Network;

