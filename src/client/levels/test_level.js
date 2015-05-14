/*
 * ===========================================================================
 * File: test_level.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Level from 'client/levels/level';
import Const from 'common/const';

class TestLevel extends Level {
    constructor(game) {
        super(game, Const.NORMAL_GRAVITY);

        this.mapKey = 'testmap';
    }

    create() {
        super.create();

        this.stage.backgroundColor = Const.SKY_BLUE;
        this.game.add.existing(this.game.player);
        this.game.player.setup(this);
    }

    update() {
        super.update();

        this.game.player.update();
    }
}

export default TestLevel;

