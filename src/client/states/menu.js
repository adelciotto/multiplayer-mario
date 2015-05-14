/*
 * ===========================================================================
 * File: menu.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import State from 'client/states/state';
import Const from 'common/const';

const Step = Math.PI * 2 / 360 ;

class MenuState extends State {
    constructor(game) {
        super(game);

        this._counter = 0;
    }

    create() {
        this.stage.backgroundColor = Const.SKY_BLUE;

        this._title = this.add.sprite(this.world.centerX, this.world.centerY/4, 'title');
        this._title.anchor.set(0.5, 0.5);
        this._title.scale.set(0.8);
        this._title.smoothed = true;
    }

    update() {
        var tStep = Math.sin(this._counter) ;
        this._title.y = (this.game.height/4) + tStep * 15 ;
        this._title.rotation += Phaser.Math.degToRad( 0.1 * tStep ) ;
        this._counter += Step ;
    }
}

export default MenuState;

