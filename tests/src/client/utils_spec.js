/*
 * ===========================================================================
 * File: utils_spec.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

var Util = require('common/utils');

describe('Util', () => {
    var testObj = {
        fn: function() {},
        prop: 0
    };
    var testFn = function() { };

    describe('#isFunction()', () => {
        it('should return true if obj is of function type', () => {
            Util.isFunction(testFn).should.equal(true);
        });

        it('should return false if obj is not of function type', () => {
            Util.isFunction(testObj).should.equal(false);
        });
    });

    describe('#isPlainObject', () => {
        it('should return true if obj is a plain object', () => {
            Util.isPlainObject(testObj).should.equal(true);
        });

        it('should return false if obj is not a plain object', () => {
            Util.isPlainObject(testFn).should.equal(false);
        });
    });

    describe('#hasProperty', () => {
        it('should return true if obj contains property', () => {
            Util.hasProperty(testObj, 'prop').should.equal(true);
        });

        it('should return false if obj does not contain property', () => {
            Util.hasProperty(testObj, 'foo').should.equal(false);
        });
    });


    describe('#hasFunction', () => {
        class TestClass {
            constructor() {}
            fn() {}
        }
        var inst = new TestClass();

        it('should return true if obj contains function', () => {
            Util.hasFunction(testObj, 'fn').should.equal(true);
        });

        it('should return true if es6 class instance contains function', () => {
            Util.hasFunction(inst, 'fn').should.equal(true);
        });

        it('should return false if obj does not contain function', () => {
            Util.hasFunction(testObj, 'foo').should.equal(false);
        });
    });
});
