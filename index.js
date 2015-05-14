/*
 * ===========================================================================
 * File: app.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

// enable es6 features using babel
require('babel/register');

var Server = require('./src/server/server');
var server = new Server().listen();
