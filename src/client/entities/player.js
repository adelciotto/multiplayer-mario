/*
 * ===========================================================================
 * File: player.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import Entity from 'client/entities/entity';
import Const from 'const';

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

        this._prevFacing = this.facing;
        this._sprinting = false;
        this._jumping = false;
        this._grounded = false;
        this._turning = false;
        this._moving = [];

        this._addAnimations([
                { name: 'walk', frames: [1, 2, 3] }],
            8, true);
    }

    setup(level) {
        super.setup(level);

        this._velocity = this.body.velocity;
        this._accel = this.body.acceleration;
        this.body.maxVelocity.set(this.maxSpeed, this.maxSpeed * 10);
        this.body.drag.set(Const.PLAYER_DRAG, 0);
    }

    getState() {
        return {
            isJumping: this._jumping,
            isGrounded: this._grounded,
            currState: this.currentState
        };
    }

    setState(state) {
        this._jumping = state.isJumping;
        this._grounded = state.isGrounded;
        this.currentState = state.currState;
    }

    update() {
        this._updateAnimations();

        this._grounded = this.body.onFloor() || this.body.touching.down;

        if (this._moving[Phaser.LEFT] ) {
            this._accel.x = -this.moveSpeed;
        } else if (this._moving[Phaser.RIGHT]) {
            this._accel.x = this.moveSpeed;
        } else {
            // set back to idle state if we are completely still and on the ground
            this._accel.x = 0;
            if (this._velocity.x === 0 && this._grounded) {
                this.currentState = PlayerStates.Idle;
            }
        }

        // check if we are turning sharply
        if (this._grounded && !this._turning) {
            if ( (this._velocity.x < -Const.PLAYER_MAX_SPEED*0.6 && this._accel.x > 0) ||
                 (this._velocity.x > Const.PLAYER_MAX_SPEED*0.6 && this._accel.x < 0) ) {
                this._turning = true;
                this.currentState = PlayerStates.Turning;
            }
        }

        // if we are on the ground and moving at all set
        // the player state to walking. we need this as if we land from
        // a jump still moving horizontally it needs to look like mario
        // is running to a halt.
        if (Math.abs(this._velocity.x) > 0 && this._grounded && !this._turning) {
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
            if (this._velocity.y < Const.PLAYER_JUMP_SPEED/4) {
                this._velocity.y = Const.PLAYER_JUMP_SPEED/4;
            }
        }

        // cap marios fall speed
        this._velocity.y = Math.min(this._velocity.y, Const.PLAYER_MAX_FALL_SPEED);
    }

    jump() {
        if (this._grounded && !this._jumping && this.jumpReleased) {
            // we have not released the key yet
            this.jumpReleased = false;

            // set the appropriate state
            this._jumping = true;
            this._turning = false;
            this.currentState = PlayerStates.Jumping;
            this._velocity.y = Const.PLAYER_JUMP_SPEED;
            this.game.jumpSound.play();
        }
    }

    sprint(active) {
        if (!this._jumping && Math.abs(this._accel.x) > 0 && active) {
            this.body.maxVelocity.x = Const.PLAYER_MAX_SPRINT_SPEED;
        } else if (!active) {
            this.body.maxVelocity.x = this.maxSpeed;
        }

        this._sprinting = active;
    }

    move(direction, value, active) {
        this._turning = false;
        this._moving[direction] = active ? value: 0;

        // if we are currently jumping then don't change our
        // facing direction and don't play the walking animation
        if (!this._jumping) {
            this.currentState = PlayerStates.Walking;
            this.facing = direction;
        }
    }

    _updateAnimations() {
        // flip the player in the correct facing direction and play
        // the current state animation
        if (this.facing !== this._prevFacing) {
            this.flip();
            this._prevFacing = this.facing;
        }

        switch (this.currentState) {
            case PlayerStates.Walking:
                // set the walking / running animation based on the current x velocity
                let currentAnim = this.animations.currentAnim;
                let delay = Math.min(200, (Const.PLAYER_MAX_SPEED / (Math.abs(this._velocity.x) / 80)));
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

