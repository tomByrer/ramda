var assert = require('assert');
var R = require('..');

describe('add', function() {
    it('adds together two numbers', function() {
        assert.strictEqual(R.add(3, 7), 10);
    });

    it('is automatically curried', function() {
        var incr = R.add(1);
        assert.strictEqual(incr(42), 43);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.add, TypeError);
    });
});

describe('multiply', function() {
    it('adds together two numbers', function() {
        assert.strictEqual(R.multiply(6, 7), 42);
    });

    it('is automatically curried', function() {
        var dbl = R.multiply(2);
        assert.strictEqual(dbl(15), 30);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.multiply, TypeError);
    });
});

describe('subtract', function() {
    it('subtracts two numbers', function() {
        assert.strictEqual(R.subtract(22, 7), 15);
    });

    it('is curried', function() {
        var ninesCompl = R.subtract(9);
        assert.strictEqual(ninesCompl(6), 3);
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var minus5 = R.subtract(void 0, 5);
        assert.strictEqual(minus5(17), 12);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.subtract, TypeError);
    });
});


describe('divide', function() {
    it('divides two numbers', function() {
        assert.strictEqual(R.divide(28, 7), 4);
    });

    it('is curried', function() {
        var into28 = R.divide(28);
        assert.strictEqual(into28(7), 4);
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var half = R.divide(void 0, 2);
        assert.strictEqual(half(40), 20);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.divide, TypeError);
    });
});


describe('modulo', function() {
    it('divides the first param by the second and returns the remainder', function() {
        assert.strictEqual(R.modulo(100, 2), 0);
        assert.strictEqual(R.modulo(100, 3), 1);
        assert.strictEqual(R.modulo(100, 17), 15);
    });

    it('is curried', function() {
        var hundredMod = R.modulo(100);
        assert.strictEqual(typeof hundredMod, 'function');
        assert.strictEqual(hundredMod(2), 0);
        assert.strictEqual(hundredMod(3), 1);
        assert.strictEqual(hundredMod(17), 15);
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var isOdd = R.modulo(void 0, 2);
        assert.strictEqual(typeof isOdd, 'function');
        assert.strictEqual(isOdd(3), 1);
        assert.strictEqual(isOdd(198), 0);
    });

    it('preserves javascript-style modulo evaluation for negative numbers', function() {
        assert.strictEqual(R.modulo(-5, 4), -1);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.modulo, TypeError);
    });
});


describe('mathMod', function() {
    it('requires integer arguments', function() {
        assert.notStrictEqual(R.mathMod('s', 3), R.mathMod('s', 3));
        assert.notStrictEqual(R.mathMod(3, 's'), R.mathMod(3, 's'));
        assert.notStrictEqual(R.mathMod(12.2, 3), R.mathMod(12.2, 3));
        assert.notStrictEqual(R.mathMod(3, 12.2), R.mathMod(3, 12.2));
    });

    it('behaves differently than JS modulo', function() {
        assert.notStrictEqual(R.mathMod(-17, 5), -17 % 5);
        assert.notStrictEqual(R.mathMod(17.2, 5), 17.2 % 5);
        assert.notStrictEqual(R.mathMod(17, -5), 17 % -5);
    });

    it('computes the true modulo function', function() {
        assert.strictEqual(R.mathMod(-17, 5), 3);
        assert.strictEqual(isNaN(R.mathMod(17, -5)), true);
        assert.strictEqual(isNaN(R.mathMod(17, 0)), true);
        assert.strictEqual(isNaN(R.mathMod(17.2, 5)), true);
        assert.strictEqual(isNaN(R.mathMod(17, 5.5)), true);
    });

    it('is curried', function() {
        var f = R.mathMod(29);
        assert.strictEqual(f(6), 5);
    });


    it('behaves right curried when passed `undefined` for its first argument', function() {
        var mod5 = R.modulo(void 0, 5);
        assert.strictEqual(mod5(12), 2);
        assert.strictEqual(mod5(8), 3);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.mathMod);
    });
});

describe('sum', function() {
    it('adds together the array of numbers supplied', function() {
        assert.strictEqual(R.sum([1, 2, 3, 4]), 10);
    });

    it('does not save the state of the accumulator', function() {
        assert.strictEqual(R.sum([1, 2, 3, 4]), 10);
        assert.strictEqual(R.sum([1]), 1);
        assert.strictEqual(R.sum([5, 5, 5, 5, 5]), 25);
    });
});

describe('product', function() {
    it('multiplies together the array of numbers supplied', function() {
        assert.strictEqual(R.product([1, 2, 3, 4]), 24);
    });
});

describe('lt', function() {
    var __ = void 0;
    it('reports whether one item is less than another', function() {
        assert(R.lt(3, 5));
        assert(!R.lt(6, 4));
        assert(!R.lt(7.0, 7.0));
        assert(R.lt('abc', 'xyz'));
        assert(!R.lt('abcd', 'abc'));
    });

    it('is curried', function() {
        var gt5 = R.lt(5);
        assert(gt5(10));
        assert(!gt5(5));
        assert(!gt5(3));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var lt5 = R.lt(__, 5);
        assert(!lt5(10));
        assert(!lt5(5));
        assert(lt5(3));
    });

    it('throws when given no arguments', function() {
        assert.throws(R.lt, TypeError);
    });
});

describe('lte', function() {
    var __ = void 0;
    it('reports whether one item is less than another', function() {
        assert(R.lte(3, 5));
        assert(!R.lte(6, 4));
        assert(R.lte(7.0, 7.0));
        assert(R.lte('abc', 'xyz'));
        assert(!R.lte('abcd', 'abc'));
    });

    it('is curried', function() {
        var gte20 = R.lte(20);
        assert(!gte20(10));
        assert(gte20(20));
        assert(gte20(25));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var upTo20 = R.lte(__, 20);
        assert(upTo20(10));
        assert(upTo20(20));
        assert(!upTo20(25));
    });

    it('throws when given no arguments', function() {
        assert.throws(R.lte, TypeError);
    });
});

describe('gt', function() {
    var __ = void 0;
    it('reports whether one item is less than another', function() {
        assert(!R.gt(3, 5));
        assert(R.gt(6, 4));
        assert(!R.gt(7.0, 7.0));
        assert(!R.gt('abc', 'xyz'));
        assert(R.gt('abcd', 'abc'));
    });

    it('is curried', function() {
        var lt20 = R.gt(20);
        assert(lt20(10));
        assert(!lt20(20));
        assert(!lt20(25));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var gt20 = R.gt(__, 20);
        assert(!gt20(10));
        assert(!gt20(20));
        assert(gt20(25));
    });

    it('throws when given no arguments', function() {
        assert.throws(R.gt, TypeError);
    });
});

describe('gte', function() {
    it('reports whether one item is less than another', function() {
        assert(!R.gte(3, 5));
        assert(R.gte(6, 4));
        assert(R.gte(7.0, 7.0));
        assert(!R.gte('abc', 'xyz'));
        assert(R.gte('abcd', 'abc'));
    });

    it('is curried', function() {
        var lte20 = R.gte(20);
        assert(lte20(10));
        assert(lte20(20));
        assert(!lte20(25));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var __ = void 0;
        var gte20 = R.gte(__, 20);
        assert(!gte20(10));
        assert(gte20(20));
        assert(gte20(25));
    });

    it('throws when given no arguments', function() {
        assert.throws(R.gte, TypeError);
    });
});

describe('max', function() {
    it('calculates the largest value of a list', function() {
        assert.strictEqual(R.max([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]), 9);
        assert.strictEqual(R.max([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]), 52);
    });

    it('accepts negative numbers, decimals, and even strings', function() {
        assert.strictEqual(R.max([-6, -2, -4.3, -1.1, -5]), -1.1);
        assert.strictEqual(R.max([7, '22', 11, 34, 17, '52', 26, 13, 40, 20, '10', 5, 16, 8, 4, '2', '1']), 52);
    });

    it('finds max in any position', function() {
        assert.strictEqual(R.max([6, 2, 1, 3]), 6);
        assert.strictEqual(R.max([3, 6, 2, 1]), 6);
        assert.strictEqual(R.max([3, 1, 6, 2]), 6);
        assert.strictEqual(R.max([3, 1, 2, 6]), 6);
    });

    it('returns -Infinity for an empty list', function() {
        assert.strictEqual(R.max([]), -Infinity);
    });

    it('returns a number', function() {
        assert.strictEqual(R.max(['4', '1', '100', '10', '2']), 100);
    });
});

describe('min', function() {
    it('calculates the smallest value of a list', function() {
        assert.strictEqual(R.min([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]), 0);
        assert.strictEqual(R.min([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]), 1);
    });

    it('accepts negative numbers, decimals, and even strings', function() {
        assert.strictEqual(R.min([-6, -2, -4.3, -1.1, -5]), -6);
        assert.strictEqual(R.min([7, '22', 11, 34, 17, '52', 26, 13, 40, 20, '10', 5, 16, 8, 4, '2', '1']), 1);
    });

    it('finds min in any position', function() {
        assert.strictEqual(R.min([0, 2, 1, 3]), 0);
        assert.strictEqual(R.min([3, 0, 2, 1]), 0);
        assert.strictEqual(R.min([3, 1, 0, 2]), 0);
        assert.strictEqual(R.min([3, 1, 2, 0]), 0);
    });

    it('returns Infinity for an empty list', function() {
        assert.strictEqual(R.min([]), Infinity);
    });

    it('returns a number', function() {
        assert.strictEqual(R.min(['4', '1', '100', '10', '2']), 1);
    });
});

describe('maxBy', function() {
    it('calculates the largest value of a list using the supplied comparator', function() {
        assert.deepEqual(R.maxBy(R.prop('x'), [{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: 5, y: 10});
    });

    it('returns undefined for the empty list', function() {
        assert.strictEqual(R.maxBy(R.prop('x'), []), undefined);
    });

    it('is properly curried', function() {
        var highestX = R.maxBy(R.prop('x'));
        assert.deepEqual(highestX([{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: 5, y: 10});
    });
});

describe('minBy', function() {
    it('calculates the smallest value of a list using the supplied comparator', function() {
        assert.deepEqual(R.minBy(R.prop('x'), [{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: -2, y: 0});
    });

    it('returns null for the empty list', function() {
        assert.strictEqual(typeof(R.minBy(R.prop('x'), [])), 'undefined');
    });

    it('is properly curried', function() {
        var lowestX = R.minBy(R.prop('x'));
        assert.deepEqual(lowestX([{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: -2, y: 0});
    });
});
