/*
 * ===========================================================================
 * File: network.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Const from 'const';

class Network {
    constructor() {
        this.host = window.location.hostname;
        this.port = window.location.port;
        this.peer = new Peer({ host: this.host, port: this.port, path: '/'});
        this.id = 0;
        this.peers = {};

        this._signals = {};
        this._addEventListeners();
    }

    addListeners(listeners) {
        for (var listener of listeners) {
            this._signals[listener.event] = new Phaser.Signal();
            this._signals[listener.event].add(listener.fn, listener.ctx);
        }
    }

    _addEventListeners() {
        this.peer.on(Const.PeerJsEvents.OPEN, (id) => { this._handleOpen(id); });
        this.peer.on(Const.PeerJsEvents.CONNECTION, (conn) => { this._handleConnection(conn); });
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
        conn.on(Const.PeerJsEvents.CLOSE, () => { this._handleClose(); });
    }

    _handleData(data) {
        var type = Const.PeerJsMsgType[data.type];

        if (!type) {
            console.log(`Error: unrecognised message with ${data}`);
            return;
        }

        this._signals[Const.PeerJsEvents.DATA].dispatch(data);
    }

    _handleClose() {
        console.log('Connection closed');
        this._signals[Const.PeerJsEvents.CLOSE].dispatch();
    }

    _connectToPeer(id) {
        if (!_.has(this.peers, id)) {
            this.peers[id] = this.peer.connect(id);
        }

        //TODO: send hello to peer

        console.log(`Connecting to peer: ${id}`);
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

                    this._connectToPeer(peer);
                }
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

export default Network;

