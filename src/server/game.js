/*
 * ===========================================================================
 * File: game.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Log from 'log';
import _ from 'underscore';

class Game {
    constructor(io) {
        this.log = new Log('info');

        this._io = io;
        this._players = {};
        this._addEventListeners();
    }

    _addEventListeners() {
        this._io.on('connection', (data) => {
            this._onClientConnection(data);
        });
    }

    _onClientConnection(socket) {
        if (_.isUndefined(socket.id) || !_.isString(socket.id) || socket.id === '') {
            return;
        }

        this.log.info(`Player connected with id: ${socket.id}`);

        // wait for client to start and then sync their data
        socket.on('client_start', (data) => {
            this._onClientStart(socket, data);
        });
    }

    _onClientStart(socket, data) {
        //TODO: do some player name validation

        if (!_.has(this._players, socket.id)) {
            this._players[socket.id] = {
                x: 0.0, y: 0.0,
                name: data.name,
                id: socket.id
            };

            this.log.info(`Player: ${socket.id} started playing`);
        }

        // notify the player the server has initialised them
        var player = this._players[socket.id];
        socket.emit('player_can_start', {
            'player': player
        });

        // notify other clients of the new player
        socket.broadcast.emit('new_player_connected', {
            player: player,
            at: Date.now()
        });

        // global sync

        // sync players
        this._syncPlayers(socket);

        // listen to other events
        socket.on('disconnect', (data) => {
            this._onClientDisconnect(socket, data);
        });
        socket.on('game_ping', (data) => {
            this._onGamePing(socket, data);
        });
    }

    _onClientDisconnect(socket, data) {
        //clearInterval(this._syncPlayerInterval);

        if (_.has(this._players, socket.id)) {
            socket.broadcast.emit('player_disconnected', {
                player: this._players[socket.id],
                at: Date.now()
            });

            delete this._players[socket.id];
        }

        this.log.info(`Player: ${socket.id} disconnected`);
    }

    _onGamePing(data) {

    }

    _syncPlayers(socket) {
        var at = Date.now();

        var playerList = _.map(this._players, (val, key) => {
            return val;
        });
        var msg = { players: playerList, at: at };

        if (_.isUndefined(socket)) {
            this._io.emit('sync_players', msg);
        } else {
            socket.emit('sync_players', msg);
        }
    }
}

export default Game;

