/*
 * ===========================================================================
 * File: express_server.js
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

class ExpressServer {
    constructor() {
        this.port = 0;
        this.app = null;
        this.server = null;
    }

    listen(httpPort = 3000) {
        this.port = process.env.PORT || httpPort;

        // create and configure express
        this.app = express();
        this._configureExpress();

        // create the HTTP Server and start listening.
        this.server = http.createServer(this.app);
        this.server.listen(this.port, () => {
          console.log('Express server listening on port: ' + this.port);
        });
    }

    _configureExpress() {
        this.app.use(bodyParser());
        this.app.use(methodOverride());
        this.app.use(cookieParser('your secret here'));
        this.app.use(session());
        this.app.use(express.static(path.join(__dirname, '../../dist')));

        this._configureRoutes();

        // enable development mode by default to aid with debugging.
        var env = process.env.NODE_ENV || 'development';
        if ('development' == env) {
          this.app.use(errorHandler());
        }
    }

    _configureRoutes() {
        this.app.get('/', routes.index);
    }
}

export default ExpressServer;

