/*
 * ===========================================================================
 * File: remote_peer.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

class RemotePeer {
    constructor(id, dataConn, name = 'peer') {
        this.id = id;
        this.dataConnection = dataConn;
        this.name = name;
    }

    send(from, type, data) {
        this.dataConnection.send(_.extend(data, {
            from: from,
            type: type
        }));
    }

    on(event, fn) {
        this.dataConnection.on(event, fn);
    }

    destroy() {
        this.dataConnection.destroy();
    }
}

export default RemotePeer;

