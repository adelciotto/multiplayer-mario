/*
 * ===========================================================================
 * File: utils.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

export function isFunction(obj) {
    return (typeof obj === 'function') || false;
}

export function isPlainObject(obj) {
    return ((obj).toString() === '[object Object]') || false;
}

export function hasProperty(obj, prop) {
    return (obj !== null && hasOwnProperty.call(obj, prop));
}

export function hasFunction(obj, fn) {
    return (obj !== null) && (typeof obj[fn] === 'function');
}

