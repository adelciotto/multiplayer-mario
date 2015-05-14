/*
 * ===========================================================================
 * File: server.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import errorHandler from 'errorhandler';
import path from 'path';
import http from 'http';
import * as routes from './routes';
import socketio from 'socket.io';

class Server {
    constructor() {
        this.app = express();
        console.log(routes);

        this._server = null;
        this._initExpress();
    }

    listen(port = 8000) {
        this.port = process.env.PORT || port;

        // create the HTTP Server and start listening.
        this._server = http.createServer(this.app);
        this._server.listen(port, () => {
          console.log('Express server listening on port: ' + port);
        });
    }

    _initExpress() {
        this.app.use(bodyParser());
        this.app.use(methodOverride());
        this.app.use(cookieParser('your secret here'));
        this.app.use(session());
        this.app.use(express.static(path.join(__dirname, '../../dist')));

        // url routing
        this.app.get('/', routes.index);

        // enable development mode by default to aid with debugging.
        var env = process.env.NODE_ENV || 'development';
        if ('development' == env) {
          this.app.use(errorHandler());
        }
    }
}

export default Server;

