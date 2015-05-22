/*
 * ===========================================================================
 * File: test_level.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Level from 'client/levels/level';
import Const from 'const';

class TestLevel extends Level {
    constructor(game) {
        super(game, Const.NORMAL_GRAVITY);

        this.mapKey = 'testmap';
    }

    create() {
        super.create();

        this.stage.backgroundColor = Const.SKY_BLUE;
    }
}

export default TestLevel;

