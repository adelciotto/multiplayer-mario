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
}

export default RemotePeer;

