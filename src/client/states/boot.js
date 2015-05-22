/*
 * ===========================================================================
 * File: boot.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Const from 'const';
import State from 'client/states/state';

class BootState extends State {
    constructor(game) {
        super(game);
    }

    create() {
        super.create();

        this.stage.backgroundColor = 0xFFFFFF;
        this.state.start('preload');
    }
}

export default BootState;
