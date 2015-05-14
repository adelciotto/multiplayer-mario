/*
 * ===========================================================================
 * File: index.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

/*
 * GET home page.
 * For now this is where the game is loaded
 */
export function index(req, res) {
    res.sendFile(__dirname + 'index.html');
}
