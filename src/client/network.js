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
        this.onMovePlayer = new Phaser.Signal();
        this.onRemovePlayer = new Phaser.Signal();

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
        this.socket.on('new_player', (data) => { this._handleNewPlayer(data); });
        this.socket.on('move_player', (data) => { this._handleMovePlayer(data); });
        this.socket.on('remove_player', (data) => { this._handleRemovePlayer(data); });
        this.socket.on('error', (error) => { this._handleError(error); });
    }

    _handleConnected(data) {
        console.log('connected to socket server');

        this.onConnect.dispatch(data);
    }

    _handleDisconnect(data) {
        console.log('disconnected from socket server');

        this.onDisconnect.dispatch(data);
    }

    _handleError(error) {
        console.log(`Error: ${error}`);
    }

    _handleNewPlayer(data) {
        this.onNewPlayer.dispatch(data);
    }

    _handleMovePlayer(data) {
        this.onMovePlayer.dispatch(data);
    }

    _handleRemovePlayer(data) {
        this.onRemovePlayer.dispatch(data);
    }
}

export default Network;

