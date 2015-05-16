/*
 * ===========================================================================
 * File: app.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

// enable es6 features using babel
require('babel/register');

var ServerGameManager = require('./src/server/server_game_manager');

var gameServer = new ServerGameManager();
