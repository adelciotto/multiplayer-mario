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

var start = function(userPort = 8080) {
    expressServer = new ExpressServer();
    log = new Log('info');
    expressServer.listen();

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

start();
