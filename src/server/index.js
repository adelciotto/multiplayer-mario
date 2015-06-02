/*
 * ===========================================================================
 * File: index.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

var ExpressPeerServer = require('peer').ExpressPeerServer;

import ExpressServer from './express_server';
import Log from 'log';

var expressServer;
var log;

export function start(dirname, userPort = 8080) {
    log = new Log('info');
    expressServer = new ExpressServer().listen(dirname);

    var options = {
        debug: true,
        allow_discovery: true
    };
    expressServer.app.use('/', ExpressPeerServer(expressServer.server, options));

    expressServer.server.on('connection', onConnection);
    expressServer.server.on('disconnect', onDisconnect);
};

var onConnection = function(id) {
    log.info(`Client connected with id: ${id}`);
};

var onDisconnect = function(id) {
    log.info(`Client disconnected with id: ${id}`);
};

