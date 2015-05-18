/*
 * ===========================================================================
 * File: player.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Entity from 'client/entities/entity';
import Const from 'common/const';

let PlayerStates = {
    Idle: 'idle',
    Walking: 'walk',
    Jumping: 'jump',
    Turning: 'turn',
    Ducking: 'ducking'
};

class Player extends Entity {
    constructor(game, x, y, id = 0) {
        super(game, x, y, 'playersheet', 0, Const.PLAYER_ACCEL);

        this.id = id;
        this.maxSpeed = Const.PLAYER_MAX_SPEED;
        this.currentState = PlayerStates.IDLE;
        this.jumpReleased = true;
        this.facing = Phaser.RIGHT;

        this._jumping = false;
        this._grounded = false;
        this._turning = false;
        this._moving = [];

        this._addAnimations([
                { name: 'idle', frames: [0] },
                { name: 'jump', frames: [5] },
                { name: 'turn', frames: [4] },
                { name: 'walk', frames: [1, 2, 3] }],
            8, true);
    }

    setup(level) {
        super.setup(level);

        this.body.maxVelocity.set(this.maxSpeed, this.maxSpeed * 10);
        this.body.drag.set(Const.PLAYER_DRAG, 0);
    }

    update() {
        this._updateAnimations();

        this._grounded = this.body.onFloor() || this.body.touching.down;

        if (this._moving[Phaser.LEFT] ) {
            this.body.acceleration.x = -this.moveSpeed;
        } else if (this._moving[Phaser.RIGHT]) {
            this.body.acceleration.x = this.moveSpeed;
        } else {
            // set back to idle state if we are completely still and on the ground
            this.body.acceleration.x = 0;
            if (this.body.velocity.x === 0 && this._grounded) {
                this.currentState = PlayerStates.Idle;
            }
        }

        // check if we are turning sharply
        if (this._grounded) {
            if ( (this.body.velocity.x < -(Const.PLAYER_MAX_SPEED/2) && this.body.acceleration.x > 0) ||
                 (this.body.velocity.x > Const.PLAYER_MAX_SPEED/2 && this.body.acceleration.x < 0) ) {
                this._turning = true;
                this.currentState = PlayerStates.Turning;
                this.body.drag.x = Const.PLAYER_DRAG * 2;
            }
        }

        // if we are on the ground and moving at all set
        // the player state to walking. we need this as if we land from
        // a jump still moving horizontally it needs to look like mario
        // is running to a halt.
        if (Math.abs(this.body.velocity.x) > 0 && this._grounded && !this._turning) {
            this.currentState = PlayerStates.Walking;
        }

        // if we land on the ground while jumping, we are clearly
        // not jumping anymore
        if (this._grounded && this._jumping && !this._turning) {
            this._jumping = false;
            this.currentState = PlayerStates.Idle;
        }

        // perform variable jump height check
        if (this._jumping && this.jumpReleased) {
            if (this.body.velocity.y < Const.PLAYER_JUMP_SPEED/4) {
                this.body.velocity.y = Const.PLAYER_JUMP_SPEED/4;
            }
        }
    }

    jump() {
        if (this._grounded && !this._jumping && this.jumpReleased) {
            // we have not released the key yet
            this.jumpReleased = false;

            // set the appropriate state
            this._jumping = true;
            this._turning = false;
            this.currentState = PlayerStates.Jumping;
            this.body.velocity.y = Const.PLAYER_JUMP_SPEED;
            this.game.jumpSound.play();
        }
    }

    move(direction, value, active) {
        // if we are currently jumping then don't change our
        // facing direction and don't play the walking animation
        if (!this._jumping) {
            this.currentState = PlayerStates.Walking;
            this.facing = direction;
        }

        this._turning = false;
        this.body.drag.x = Const.PLAYER_DRAG;
        this._moving[direction] = active ? value: 0;
    }

    _updateAnimations() {
        // flip the player in the correct facing direction and play
        // the current state animation
        this.flip();
        switch (this.currentState) {
            case PlayerStates.Walking:
                // set the walking / running animation based on the current x velocity
                let currentAnim = this.animations.currentAnim;
                let delay = Math.min(200, (Const.PLAYER_MAX_SPEED / (Math.abs(this.body.velocity.x) / 80)));
                currentAnim.delay = delay;
                this.animations.play('walk');
                break;
            case PlayerStates.Jumping:
                this.frame = 5;
                break;
            case PlayerStates.Turning:
                this.frame = 4;
                break;
            case PlayerStates.Idle:
            default:
                this.frame = 0;
                break;
        }
    }
}

export default Player;

