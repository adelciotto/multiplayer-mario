/*
 * ===========================================================================
 * File: vec2.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

class Vec2 extends PIXI.Point {
    constructor(x, y) {
        super(x, y);
    }

    set(v) {
        this.x = v.x;
        this.y = v.y;

        return this;
    }

    neg() {
        return this.scl(-1);
    }

    dot(v) {
        return (this.x * v.x + this.y * v.y);
    }

    len2() {
        return (this.x * this.x + this.y * this.y);
    }

    len() {
        return Math.sqrt(this.len2());
    }

    norm() {
        return this.divScl(this.len());
    }

    mulScl(x) {
        this.x *= x;
        this.y *= x;

        return this;
    }

    divScl(x) {
        this.x /= x;
        this.y /= x;

        return this;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;

        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    }

    mul(v) {
        this.x *= v.x;
        this.y *= v.y;

        return this;
    }

    div(v) {
        this.x /= v.x;
        this.y /= v.y;

        return this;
    }
}

export default Vec2;
