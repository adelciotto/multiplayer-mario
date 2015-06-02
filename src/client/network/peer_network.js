/*
 * ===========================================================================
 * File: peer_network.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import RemotePeer from 'client/network/remote_peer';
import * as Listeners from 'client/network/listeners';
import Const from 'const';

const Host = window.location.hostname;
const Port = window.location.port;
const Protocol = window.location.protocol;
const Path = '/multi';
const PeersUrl = `${Path}/peerjs/peers`;

class PeerNetwork {
    constructor() {
        this.peer = new Peer({ host: Host, port: Port, path: Path });

        this._id = '';
        this._connectedPeers = {};
        this._signals = {};

        this._addEventListeners();
    }

    addListener(event, listener, ctx = null) {
        this._signals[event] = new Phaser.Signal();
        this._signals[event].add(listener, ctx);
    }

    getAllPeers(fn, ctx = null) {
        var xmlhttp = new XMLHttpRequest();
        var url = `${Protocol}//${Host}:${Port}${PeersUrl}`;

        xmlhttp.onreadystatechange = f => {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                // get an array of peer id's excluding our own id
                let peers = _.reject(JSON.parse(xmlhttp.responseText), (peer) => {
                    return peer === this._id;
                });

                // pass the array to our callback
                fn.call(ctx, peers);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    broadcastToPeers(type, data) {
        _.each(this._connectedPeers, (v) => {
            v.dataConnection.send(_.extend(data, {
                from: this._id,
                type: type
            }));
        });
    }

    sendToPeer(id, type, data) {
        if (!_.has(this._connectedPeers, id)) {
            console.log(`Error: not connected to peer ${id}`);
            return;
        }

        var conn = this._connectedPeers[id].dataConnection;
        conn.send(_.extend(data, {
            from: this._id,
            type: type
        }));
    }

    connectToPeer(id) {
        // create a new Peer and connect to them
        if (!this.isConnectedToPeer(id)) {
            console.log(`Connecting to peer: ${id}`);
            var dataConn = this.peer.connect(id);
            this._connectedPeers[id] = new RemotePeer(id, dataConn);
        }

        this._connectedPeers[id].dataConnection.on(Const.PeerJsEvents.OPEN, f => {
            this.sendToPeer(id, Const.PeerJsMsgType.HELLO, { });
        });
    }

    isConnectedToPeer(id) {
        if (_.has(this._connectedPeers, id)) {
            console.log(`Already connected to peer: ${id}`);
            return true;
        }

        return false;
    }

    _addEventListeners() {
        this.peer.on(Const.PeerJsEvents.OPEN, (id) => Listeners.handleOpen.call(this, id));
        this.peer.on(Const.PeerJsEvents.CONNECTION, (peer) => Listeners.handleConnection.call(this, peer));
        this.peer.on(Const.PeerJsEvents.ERROR, (err) => Listeners.handleError(error));
    }
}

export default PeerNetwork;

