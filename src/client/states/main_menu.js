/*
 * ===========================================================================
 * File: main_menu.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Menu from 'client/states/menu';
import MsgDialog from 'client/gui/msg_dialog';
import OptionsDialog from 'client/gui/options_dialog';
import ListDialog from 'client/gui/list_dialog';
import Const from 'const';

class MainMenuState extends Menu {
    constructor(game) {
        super(game);

        this._menuItemsActive = false;
    }

    create() {
        super.create();

        var msgDialog = new MsgDialog(this, Const.MAINMENU_DIALOG_TITLE, Const.MAINMENU_DIALOG_MSG);
        msgDialog.show();
        this._optionsDialog = new OptionsDialog(this, 'Options');

        this._addMenuItems([
            { text: 'Single-Player', onInputDown: this._singlePlayerSelected  },
            { text: 'Multi-Player', onInputDown: this._multiPlayerSelected  },
            { text: 'Options', onInputDown: this._optionsSelected  },
            { text: 'Credits', onInputDown: this._creditsSelected  }
        ]);
    }

    _singlePlayerSelected() {
        this.game.inMultiplayerMode = false;
        this.game.stage.disableVisibilityChange = false;
        this.state.start('play');
    }

    _multiPlayerSelected() {
        this.game.inMultiplayerMode = true;
        this.game.stage.disableVisibilityChange = true;
        this.state.start('play');
    }

    _optionsSelected() {
        this._optionsDialog.show();
    }

    _creditsSelected() {

    }
}

export default MainMenuState;

