/*
 * ===========================================================================
 * File: main_menu.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Menu from 'client/states/menu';

const Step = Math.PI * 2 / 360 ;

class MainMenuState extends Menu {
    constructor(game) {
        super(game);
    }

    create() {
        super.create();

        this._addMenuItems([
            { text: 'Single Player', hoverFill: '#FFFFFF', onInputDown: this._singlePlayerSelected  },
            { text: 'Multi Player', hoverFill: '#FFFFFF', onInputDown: this._multiPlayerSelected  },
            { text: 'Credits', hoverFill: '#FFFFFF', onInputDown: this._creditsSelected  }
        ]);
    }

    _singlePlayerSelected() {
        this.state.start('play');
    }

    _multiPlayerSelected() {

    }

    _creditsSelected() {

    }
}

export default MainMenuState;

