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
    GOLD: 0xFFD700,

    /**
     * physics constants
     */
    NORMAL_GRAVITY: 960.0,
    PLAYER_MAX_SPEED: 120.0,
    PLAYER_MAX_SPRINT_SPEED: 180.0,
    PLAYER_ACCEL: 182.0,
    PLAYER_DRAG: 165,
    PLAYER_JUMP_SPEED: -385.0,
    PLAYER_MAX_FALL_SPEED: 320,

    /**
     * asset constants
     */
    GAME_FONT: 'carrier_command',

    /**
     * size constants
     */
    BLOCK_SIZE: 16,

    /**
     * in game text strings
     */
    MAINMENU_DIALOG_TITLE: 'Mult-player Mario',
    MAINMENU_DIALOG_MSG: [
        'This is a very early alpha.',
        'Most images, logos, characters',
        'dialog, plot, and other assets',
        'taken from the original Super Mario',
        'Bros are copyrights of Nintendo.'
    ].join('\n\n'),
    MULTIPLAYER_DIALOG_TITLE: 'Welcome to multiplayer mode',
    MULTIPLAYER_DIALOG_MSG: [
        'Players can join at any point.',
        'A maximum of 4 players are allowed.'
    ].join('\n\n'),
    MULTIPLAYER_DIALOG_CLOSE: 'Ok I get it!',

    /**
     * networking constants
     */
    PeerJsEvents: {
        OPEN: 'open',
        CONNECTION: 'connection',
        CLOSE: 'close',
        DATA: 'data',
        ERROR: 'error'
    },
    PeerJsMsgType: {
        HELLO: 'hello',
        BODY: 'body',
        BLOCK_BUMP: 'block_bump'
    }
};
