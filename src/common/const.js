/*
 * ===========================================================================
 * File: constants.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

module.exports = {
    /**
     * color constants
     */
    SKY_BLUE: 0x6D93FC,

    /**
     * physics constants
     */
    NORMAL_GRAVITY: 960.0,
    PLAYER_MAX_SPEED: 120.0,
    PLAYER_ACCEL: 182.0,
    PLAYER_DRAG: 165,
    PLAYER_JUMP_SPEED: -385.0,

    /**
     * size constants
     */
    BLOCK_SIZE: 16,

    /**
     * in game text strings
     */
    MULTIPLAYER_DIALOG_WELCOME: 'Welcome to multiplayer mode',
    MULTIPLAYER_DIALOG_MSG: [
        'This is the waiting room.',
        'Feel free to jump around.',
    ].join('\n\n'),
    MULTIPLAYER_DIALOG_CLOSE: 'Ok I get it!',

    /**
     * networking constants
     */
    SocketEvents: {
        SERVER_INIT: 'serverinit',
        CLIENT_INIT: 'clientinit',
        DISCONNECT: 'disconnect'
    }
};
