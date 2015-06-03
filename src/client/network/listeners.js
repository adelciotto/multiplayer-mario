/*
 * ===========================================================================
 * File: listeners.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */
import Const from 'const';

export function handleOpen(id) {
    console.log(`Connected to PeerServer with id: ${id}`);

    // set our assigned id and call user listener
    this._id = id;
    this._signals[Const.PeerJsEvents.OPEN].dispatch(id);

    // connect to all existing peers (for now..)
    this.getAllPeers((peers) => {
        for (var peer of peers) {
            this.connectToPeer(peer);
        }
    });
}

export function handleConnection(conn) {
    console.log(`${conn.peer} connected to us`);

    // begin listening to events for this connected peer
    conn.on(Const.PeerJsEvents.DATA, (data) => handleData.call(this, data));
    conn.on(Const.PeerJsEvents.CLOSE, () => handleClose.call(this, conn.peer));
    conn.on(Const.PeerJsEvents.ERROR, (err) => handleError.call(this, err));

    // call the user listener
    this._signals[Const.PeerJsEvents.CONNECTION].dispatch(conn.peer);
}

export function handleError(err) {
    console.log(err);
}

function handleData(data) {
    var type = data.type;

    if (!_.isUndefined(type)) {
        this._signals[Const.PeerJsEvents.DATA].dispatch(type, data);
    } else {
        console.log(`Error: unrecognised message with type: ${type}`);
    }
}

function handleClose(peer) {
    if (this.hasConnectedToPeer(peer)) {
        delete this.connectedPeers[peer];
        this._signals[Const.PeerJsEvents.CLOSE].dispatch(peer);
    }
}

