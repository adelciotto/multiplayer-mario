/*
 * ===========================================================================
 * File: play.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import State from 'client/states/state';
import Player from 'client/entities/player';

class PlayState extends State {
    constructor(game) {
        super(game);
    }

    create() {
        super.create();

        this.game.pauseSound = this.game.add.audio('pause');
        this.game.bumpSound = this.game.add.audio('bump');
        this.game.jumpSound = this.game.add.audio('jump');

        this.game.inMultiplayerMode = true;
        this.state.start('testlevel');
    }
}

export default PlayState;
