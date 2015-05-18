/*
 * ===========================================================================
 * File: main_menu.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Menu from 'client/states/menu';

class MainMenuState extends Menu {
    constructor(game) {
        super(game);
    }

    create() {
        super.create();

        this._addMenuItems([
            { text: 'Single-Player', onInputDown: this._singlePlayerSelected  },
            { text: 'Multi-Player', onInputDown: this._multiPlayerSelected  },
            { text: 'Credits', onInputDown: this._creditsSelected  }
        ]);
    }

    _singlePlayerSelected() {
        this.state.start('play');
    }

    _multiPlayerSelected() {
        this.game.inMultiplayerMode = true;
        this.state.start('play');
    }

    _creditsSelected() {

    }
}

export default MainMenuState;

