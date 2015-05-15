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

        this._menuItems = [];
        this._counter = 0;
    }

    create() {
        this.stage.backgroundColor = Const.SKY_BLUE;

        this._title = this.add.sprite(this.world.centerX, this.world.centerY/4, 'title');
        this._title.anchor.set(0.5);
        this._title.scale.set(0.8);
        this._title.smoothed = true;
    }

    update() {
        var tStep = Math.sin(this._counter) ;
        this._title.y = (this.game.height/4) + tStep * 15 ;
        this._title.rotation += Phaser.Math.degToRad( 0.1 * tStep ) ;
        this._counter += Step ;
    }

    _addMenuItems(items) {
        var yPos = this.game.height / 1.75;

        for (var i = 0, l = items.length; i < l; i++) {
            let item = items[i];

            let itemText = this.add.bitmapText(this.world.centerX, yPos, 'carrier_command',
                item.text, 12);
            itemText.anchor.set(0.5);
            itemText.inputEnabled = true;
            itemText.tint = 0xFFFFFF;
            itemText.events.onInputOver.add(() => { itemText.tint = 0x994E00; });
            itemText.events.onInputOut.add(() => { itemText.tint = 0xFFFFFF; });
            itemText.events.onInputDown.add(item.onInputDown, this);

            yPos += itemText.height * 2;
        }
    }
}

export default MenuState;

