/*
 * ===========================================================================
 * File: block.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Entity from 'client/entities/entity';

class Block extends Entity {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this._bumped = false;
        this._lockedPos = y;
    }

    setup(level) {
        super.setup(level);

        this.body.allowGravity = false;
        this.body.immovable = true;
    }

    bump() {
        if (!this._bumped) {
            let tween = this.game.add.tween(this);
            tween.to({y: this._lockedPos - 24}, 100,
                     Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            tween.onComplete.add(this._onBumpComplete, this);
            this._bumped = true;
            this.game.bumpSound.play();
        }
    }

    _onBumpComplete() {
        this._bumped = false;
    }
}

export default Block;

