/*
 * ===========================================================================
 * File: util.js
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

export function searchObjArray(arr, prop, val) {
    for (var i = 0, l = arr.length; i < l; i++) {
        let item = arr[i];

        if (item[prop] === val) {
            return item;
        }
    }
}
