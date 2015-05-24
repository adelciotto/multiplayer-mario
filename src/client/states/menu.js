/*
 * ===========================================================================
 * File: menu.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import State from 'client/states/state';
import Const from 'const';
import TextButton from 'client/gui/text_button';

const Step = Math.PI * 2 / 360;

class MenuState extends State {
    constructor(game) {
        super(game);

        this._menuItems = [];
        this._menuItemsGroup = null;
        this._counter = 0;
    }

    create() {
        this.stage.backgroundColor = Const.SKY_BLUE;
        this._menuItemsGroup = this.add.group();

        this._title = this.add.sprite(this.world.centerX, this.world.centerY/4, 'title');
        this._title.anchor.set(0.5);
        this._title.scale.set(0.8);
        this._title.smoothed = true;
    }

    update() {
        var tStep = Math.sin(this._counter);

        this._title.y = (this.game.height/4) + tStep * 15 ;
        this._title.rotation += Phaser.Math.degToRad( 0.1 * tStep ) ;
        this._counter += Step ;
    }

    setInputEnabled(enabled) {
        this._menuItemsGroup.setAll('tint', 0x000000);
        this._menuItemsGroup.setAll('inputEnabled', enabled);
    }

    _addMenuItems(items) {
        var yPos = this.game.height / 1.8;

        for (var i = 0, l = items.length; i < l; i++) {
            let item = items[i];

            let textButton = new TextButton(this.game, this.world.centerX, yPos,
                item.text, { fn: item.onInputDown, ctx: this }, true, 'center', 12);
            this._menuItemsGroup.add(textButton);

            yPos += textButton.height * 2;
        }
    }
}

export default MenuState;

