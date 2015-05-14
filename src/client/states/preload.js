/*
 * ===========================================================================
 * File: preload.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import State from 'client/states/state';

class PreloadState extends State {
    constructor(game) {
        super(game);
    }

    preload() {
        super.preload();

        this.load.spritesheet(
            'playersheet',
            'res/img/mario_sheet.png',
            16, 16, -1, 0, 15);
        this.load.tilemap('testmap', 'res/tilemaps/testmap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'res/tilemaps/tile_sheet.png');
        this.load.spritesheet('tilesheet', 'res/tilemaps/tile_sheet.png', 16, 16);
        this.load.image('html', 'res/img/html.png');
        this.load.image('phaser', 'res/img/phaser.png');
        this.load.image('title', 'res/img/title.png');

        this.load.audio('bump', 'res/sounds/smb_bump.wav');
        this.load.audio('jump', 'res/sounds/smb_jump-small.wav');
        this.load.audio('pause', 'res/sounds/smb_pause.wav');
    }

    create() {
        super.create();

        this.state.start('splash');
    }
}

export default PreloadState;
