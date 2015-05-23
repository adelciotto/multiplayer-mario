/*
 * ===========================================================================
 * File: item_block.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Block from 'client/entities/block';

class ItemBlock extends Block {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this._addAnimations([
                { name: 'blink', frames: [24, 25, 26] }],
            4, true);

        this._anim = this.animations.getAnimation('blink');
        this._anim.onLoop.add(this._onAnimUpdate, this);
        this._anim.play();
    }

    _onAnimUpdate() {
        this._anim.paused = true;
        setTimeout(() => { this._anim.paused = false; }, 1000);
    }
}

export default ItemBlock;

