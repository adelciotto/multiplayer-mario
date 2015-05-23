/*
 * ===========================================================================
 * File: network.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Const from 'const';

class Network {
    constructor(gameWorld) {
        this.host = window.location.hostname;
        this.port = window.location.port;
        this.peer = new Peer({ host: this.host, port: this.port, path: '/'});
        this.id = 0;
        this.peers = {};

        this._signals = {};
        this._gameWorld = gameWorld;
    }

    addListeners(listeners) {
        for (var listener of listeners) {
            this._signals[listener.event] = new Phaser.Signal();
            this._signals[listener.event].add(listener.fn, listener.ctx);
        }

        this._addEventListeners();
    }

    broadcastToPeers(msgType, data) {
        for (var peer in this.peers) {
            this.peers[peer].send(_.extend(data, {
                id: this.id,
                type: msgType
            }));
        }
    }

    sendToPeer(id, msgType, data = {}) {
        var peer = this.peers[id];

        if (_.isNull(peer) || _.isUndefined(peer)) {
            console.log(`Error: unrecognised peer ${id}`);
        }

        peer.send(_.extend(data, {
            id: this.id,
            type: msgType
        }));
    }

    connectToPeer(id) {
        if (!_.has(this.peers, id)) {
            this.peers[id] = this.peer.connect(id);
            console.log(`Connecting to peer: ${id}`);
        }

        this.peers[id].on(Const.PeerJsEvents.OPEN, () => {
            this.sendToPeer(id, Const.PeerJsMsgType.HELLO, {
                x: this._gameWorld.localPlayer.x,
                y: this._gameWorld.localPlayer.y
            });
        });
    }

    _addEventListeners() {
        this.peer.on(Const.PeerJsEvents.OPEN, (id) => { this._handleOpen(id); });
        this.peer.on(Const.PeerJsEvents.CONNECTION, (conn) => { this._handleConnection(conn); });
        this.peer.on(Const.PeerJsEvents.ERROR, (err) => { this._handleError(err); });
    }

    _handleOpen(id) {
        console.log(`Connected to peer server with id: ${id}`);
        this.id = id;
        this._signals[Const.PeerJsEvents.OPEN].dispatch(id);

        this._connectToExistingPeers();
    }

    _handleConnection(conn) {
        console.log(`New connection`);
        this._signals[Const.PeerJsEvents.CONNECTION].dispatch(conn);

        conn.on(Const.PeerJsEvents.DATA, (data) => { this._handleData(data); });
        conn.on(Const.PeerJsEvents.CLOSE, () => { this._handleClose(conn.peer); });
        conn.on(Const.PeerJsEvents.ERROR, (err) => { this._handleError(err); });
    }

    _handleError(err) {
        console.log(err);
    }

    _handleData(data) {
        var type = data.type;

        if (_.isUndefined(type)) {
            console.log(`Error: unrecognised message with ${data}`);
            return;
        }

        this._signals[Const.PeerJsEvents.DATA].dispatch(type, data);
    }

    _handleClose(peer) {
        console.log('Connection closed');
        this._signals[Const.PeerJsEvents.CLOSE].dispatch(peer);
    }

    _connectToExistingPeers() {
        var xmlhttp = new XMLHttpRequest();
        var url = `${window.location.protocol}//${this.host}:${this.port}/peerjs/peers`;

        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let peers = JSON.parse(xmlhttp.responseText);
                for (var peer of peers) {
                    if (peer === this.id) {
                        return; // don't connect to self
                    }

                    this.connectToPeer(peer);
                }
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

export default Network;

