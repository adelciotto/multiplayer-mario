/*
 * ===========================================================================
 * File: main_menu.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Menu from 'client/states/menu';
import MsgDialog from 'client/gui/msg_dialog';
import MainOptionsDialog from 'client/gui/main_options_dialog';
import Const from 'const';

class MainMenuState extends Menu {
    constructor(game) {
        super(game);

        this._menuItemsActive = false;
    }

    create() {
        super.create();

        var msgDialog = new MsgDialog(this, Const.MAINMENU_DIALOG_TITLE,
            Const.MAINMENU_DIALOG_MSG, 'close', () => {
                this._addMenuItems([
                    { text: 'Single-Player', onInputDown: this._singlePlayerSelected  },
                    { text: 'Multi-Player', onInputDown: this._multiPlayerSelected  },
                    { text: 'Options', onInputDown: this._optionsSelected  },
                    { text: 'Credits', onInputDown: this._creditsSelected  }
                ]);
            }
        );
    }

    _singlePlayerSelected() {
        this.state.start('play');
    }

    _multiPlayerSelected() {
        this.game.inMultiplayerMode = true;
        this.game.stage.disableVisibilityChange = true;
        this.state.start('play');
    }

    _optionsSelected() {
        this._setInputEnabled(false);
        var optionsDialog = new MainOptionsDialog(this, 'Options', 'Close', () => {
            this._setInputEnabled(true);
        });
    }

    _creditsSelected() {

    }
}

export default MainMenuState;

