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
import Const from 'const';

class MainMenuState extends Menu {
    constructor(game) {
        super(game);

        this._menuItemsActive = false;
    }

    create() {
        super.create();

        this._addMenuItems([
            { text: 'Single-Player', fn: this._singlePlayerSelected, ctx: this  },
            { text: 'Multi-Player', fn: this._multiPlayerSelected, ctx: this  },
            { text: 'Options', fn: this._optionsSelected, ctx: this  },
            { text: 'Credits', fn: this._creditsSelected, ctx: this  }
        ]);

        var msgDialog = new MsgDialog(this.game, this, Const.MAINMENU_DIALOG_TITLE, 'close',
            Const.MAINMENU_DIALOG_MSG, null, true);
        this._optionsDialog = new OptionsDialog(this.game, this);
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

