/*
 * ===========================================================================
 * File: express_server.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import express from 'express';
import errorHandler from 'errorhandler';
import path from 'path';
import http from 'http';

class ExpressServer {
    constructor() {
        this.port = 0;
        this.app = express();
        this.server = null;
    }

    listen(dirname, httpPort = 8080) {
        this.port = process.env.PORT || httpPort;
        this._configureExpress(dirname);

        // create the HTTP Server and start listening.
        this.server = this.app.listen(this.port, () => {
          console.log('Express server listening on port: ' + this.port);
        });

        return this;
    }

    _configureExpress(dirname) {
        this.app.use(express.static(path.join(dirname, '/dist')));

        // enable development mode by default to aid with debugging.
        var env = process.env.NODE_ENV || 'development';
        if ('development' == env) {
          this.app.use(errorHandler());
        }
    }
}

export default ExpressServer;
