import test from 'tape';
import {
  set, setIn, unset, get, getIn, update, updateIn, merge,
  keys, vals, size, equals, push, first, rest, flatten, distinct,
  dropWhile, drop, groupBy, interpose, isEmpty, peek, pop,
  reverse, sort, take, takeWhile, zip, constantly, identity,
  inc, dec, range, repeat, repeatedly, transient
} from './index.js';

test('set', (assert) => {
  assert.plan(6);

  assert.deepEqual(
    set(({ damogran: 5 }), 'zaphod', 'beeblebrox'),
    { damogran: 5, zaphod: 'beeblebrox' },
    'should set a new key/value in an object'
  );

  assert.deepEqual(
    set(({ damogran: 4 }), 'damogran', 5),
    { damogran: 5 },
    'should overwrite existing key'
  );

  assert.deepEqual(
    set(undefined, 'damogran', 5),
    { damogran: 5 },
    'should return fresh object if called on undefined'
  );

  const computer = { deep: 'thought' };
  assert.is(
    set(computer, 'deep', 'thought'),
    computer,
    'should return original object when key/value will not change'
  );

  const arthur = { name: 'dent' };
  assert.not(
    set(arthur, 'age', 34),
    arthur,
    'should not mutate original object'
  );

  assert.deepEqual(
    set([42, 42, 42], 0, 5),
    [5, 42, 42],
    'should work with arrays too'
  );
});

test('setIn', (assert) => {
  assert.plan(10);

  assert.throws(
    () => setIn({}, 2),
    TypeError,
    'should throw for non-array path'
  );

  assert.deepEquals(
    setIn(({ trisha: { mc: 'millan' }}), ['trisha', 'mc'], 4),
    ({ trisha: { mc: 4 }}),
    'should update nested property'
  );

  assert.deepEqual(
    setIn([1, [2], 3], [1, 0], 'a'),
    [1, ['a'], 3],
    'should work with arrays'
  );

  const earth = { harmless: true };
  assert.not(
    setIn(earth, ['harmless'], 'mostly'),
    earth,
    'should not mutate original reference'
  );

  assert.is(
    setIn(earth, []),
    earth,
    'should return original reference for empty key array'
  );

  assert.deepEquals(
    setIn(({}), ['guide', 'to', 'the'], 'galaxy'),
    ({ guide: { to: { the: 'galaxy' }}}),
    'should create the path if its not there'
  );

  assert.deepEquals(
    setIn(({ guide: null }), ['guide', 'to', 'the'], 'galaxy'),
    ({ guide: { to: { the: 'galaxy' }}}),
    'should create the path if it finds a null'
  );

  assert.deepEquals(
    setIn(({ guide: undefined }), ['guide', 'to', 'the'], 'galaxy'),
    ({ guide: { to: { the: 'galaxy' }}}),
    'should create the path if it finds an undefined'
  );

  assert.ok(
    Array.isArray(setIn(({}), ['lucky', 0], 'galaxy').lucky),
    'should create arrays for numerical indexes'
  );

  assert.deepEquals(
    setIn(undefined, ['guide', 'to', 'the'], 'galaxy'),
    ({ guide: { to: { the: 'galaxy' }}}),
    'should create whole path if called on undefined'
  );
});

test('unset', (assert) => {
  assert.plan(5);

  const jeltz = { vogon: 'captain' };
  assert.is(
    unset(jeltz, 'poetry'),
    jeltz,
    'should return original object when key does not exist'
  );

  assert.deepEqual(
    unset(undefined, 'poetry'),
    {},
    'should return empty object when called on undefined'
  );

  assert.deepEqual(
    unset(({ damogran: 5, zaphod: 'beeb' }), 'zaphod'),
    { damogran: 5 },
    'should unset a key from an object'
  );

  const arthur = { name: 'dent' };
  assert.not(
    unset(arthur, 'name'),
    arthur,
    'should not mutate original object'
  );

  assert.not(
    unset(['pan', 'galactic', 'gargle', 'blaster'], 0),
    [ , 'galactic', 'gargle', 'blaster'],
    'should work with arrays too'
  );
});

test('get', (assert) => {
  assert.plan(7);

  assert.is(
    get(({ paranoid: 'android' }), 'paranoid'),
    'android',
    'should return the value for the key'
  );

  assert.is(
    get(['life', 'universe', 'everything'], 0),
    'life',
    'should also work with arrays'
  );

  assert.is(
    get('zaphod', 0),
    'z',
    'should also work with strings'
  );

  assert.is(
    get(({}), 'jeltz', 4),
    4,
    'should return notFound value for missing key'
  );

  assert.is(
    get(({ jeltz: undefined }), 'jeltz', 4),
    4,
    'should return notFound value for undefined keys'
  );

  const marvin = Object.create({ type: 'android' });
  assert.is(
    get(marvin, 'type'),
    'android',
    'should work for properties on the protoype chain'
  );

  assert.is(
    get(undefined, 'meaning', 42),
    42,
    'should return notFound when called on undefined'
  );
});

test('getIn', (assert) => {
  assert.plan(8);

  assert.throws(
    () => getIn(({}), 2),
    TypeError,
    'should throw for non-array keys'
  );

  assert.is(
    getIn(({ bee: { ble: 'brox' } }), ['bee', 'ble']),
    'brox',
    'should get nested key'
  );

  assert.is(
    getIn(({ bee: ['ble', 'brox'] }), ['bee', 1, 2]),
    'o',
    'should work in mixed type collections'
  );

  assert.is(
    getIn(({ beeble: 'brox' }) ,['bobble'], 'brix'),
    'brix',
    'should use notFound if top-level key does not exist'
  );

  assert.is(
    getIn(({ bee: { ble: 'brox' } }), ['bee', 'bee'], 'zaphod'),
    'zaphod',
    'should use notFound if nested key does not exist'
  );

  assert.is(
    getIn(({ beeble: undefined }), ['beeble'], 'betelgeuse'),
    'betelgeuse',
    'should use notFound if value is undefined'
  );

  assert.is(
    getIn(({ beeble: undefined }), [], 'betelgeuse'),
    'betelgeuse',
    'should use notFound if passed empty array of keys'
  );

  assert.is(
    getIn(undefined, ['meaning'], 42),
    42,
    'should return notFound when called on undefined'
  );
});

test('update', (assert) => {
  assert.plan(3);

  const inc = n => n + 1;

  assert.deepEquals(
    update(({ life: 41 }), 'life', inc),
    ({ life: 42 }),
    'should apply func to value at key'
  );

  const add = (a, b) => a + b;

  assert.deepEquals(
    update(({ life: 2 }), 'life', add, 40),
    ({ life: 42 }),
    'should apply with any additional arguments'
  );

  assert.deepEquals(
    update(({ life: 2 }), 'death', undefined),
    ({ life: 2, death: undefined }),
    'should set value to undefined when func is missing'
  );
});

test('updateIn', (assert) => {
  assert.plan(5);

  assert.throws(
    () => updateIn(({}), 2),
    TypeError,
    'should throw for non-array path'
  );

  const inc = n => n + 1;

  assert.deepEquals(
    updateIn(({ a: { b: 3 }}), ['a', 'b'], inc),
    ({ a: { b: 4 }}),
    'should apply func to nested value'
  );

  assert.deepEquals(
    updateIn(({}), ['a', 'b'], () => 3),
    ({ a: { b: 3 }}),
    'should create path if it not there'
  );

  const add = (a, b) => a + b;

  assert.deepEquals(
    updateIn(({ state: { count: 2 } }), ['state', 'count'], add, 40),
    ({ state: { count: 42 } }),
    'should apply with any additional arguments'
  );

  assert.deepEquals(
    update(({ count: 2 }), 'score', undefined),
    ({ count: 2, score: undefined }),
    'should set value to undefined when func is missing'
  );
});

test('merge', (assert) => {
  assert.plan(3);

  assert.deepEquals(
    merge(({ a: 1 }), { b: 2 }, { c: 3 }),
    ({ a: 1, b: 2, c: 3 }),
    'should merge together multiple objects'
  );

  const foo = { a: 1 };
  assert.not(
    merge(foo, { b: 2 }),
    foo,
    'should not mutate original reference'
  );

  assert.deepEquals(
    merge(({ a: 1 }), null, { b: 2 }, undefined),
    ({ a: 1, b: 2 }),
    'should silently ignore falsy values'
  );
});

test('keys', (assert) => {
  assert.plan(5);

  assert.deepEquals(
    keys(({ arthur: 'd', ford: 'p', zaphod: 'b' })),
    ['arthur', 'ford', 'zaphod'],
    'should return keys for an object'
  );

  assert.deepEquals(
    keys(['arthur', 'ford', 'zaphod']),
    ['0', '1', '2'],
    'should return indices for an array'
  );

  assert.deepEquals(
    keys('zaphod'),
    ['0', '1', '2', '3', '4', '5'],
    'should work with strings'
  );

  assert.deepEquals(
    keys(undefined),
    [],
    'should return empty array for undefined'
  );

  assert.deepEquals(
    keys(null),
    [],
    'should return empty array for null'
  );
});

test('vals', (assert) => {
  assert.plan(4);

  assert.deepEquals(
    vals(({ arthur: 'd', ford: 'p', zaphod: 'b' })),
    ['d', 'p', 'b'],
    'should return vals for an object'
  );

  const xs = ['trillian', 'marvin', 'eddie'];
  assert.is(
    vals(xs),
    xs,
    'should return original reference for an array'
  );

  assert.deepEquals(
    vals('zaphod'),
    ['z', 'a', 'p', 'h', 'o', 'd'],
    'should work with strings'
  );

  assert.deepEquals(
    vals(undefined),
    [],
    'should return empty array for undefined'
  );
});

test('size', (assert) => {
  assert.plan(6);

  assert.is(
    size(['ursa', 'minor', 'beta']),
    3,
    'should get size from array types'
  );

  assert.is(
    size(null),
    0,
    'should treat null as an empty object'
  );

  assert.is(
    size(undefined),
    0,
    'should treat undefined as an empty object'
  );

  assert.is(
    size(({ name: 'Trillian' })),
    1,
    'should get key count from objects'
  );

  assert.is(
    size('megadodo'),
    8,
    'should work with strings'
  );

  assert.is(
    size(({ length: 6 })),
    1,
    'should not be tripped up by array-likes'
  );
});

test('equals', (assert) => {
  assert.plan(15);

  assert.ok(
    equals(2, 2),
    'should find equality between primitives'
  );

  assert.notOk(
    equals(2, 3),
    'should not find equality between different primitives'
  );

  assert.notOk(
    equals(2, '2'),
    'should only use strict equality'
  );

  assert.notOk(
    equals(false, 0),
    'should not find disparate falsy types to be equal'
  );

  assert.notOk(
    equals(true, 1),
    'should not find disparate truthy types to be equal'
  );

  assert.ok(
    equals({ a: 1, b: 2 }, { a: 1, b: 2 }),
    'should find equality between objects'
  );

  assert.ok(
    equals([1, 2, 3], [1, 2, 3]),
    'should find equality between arrays'
  );

  const d1 = new Date('Sat Aug 13 2016 09:01:14 GMT+0100 (BST)');
  const d2 = new Date(1471075274000);
  const d3 = new Date();

  assert.ok(
    equals(d1, d2),
    'should find equality between dates'
  );

  assert.notOk(
    equals(d1, d3),
    'should not find false positives with dates'
  );

  assert.ok(
    equals(/hello/, /hello/),
    'should find equality between regexes'
  );

  assert.notOk(
    equals(/hello/, /hollo/),
    'should not find equality between false regexes'
  );

  assert.ok(
    equals(NaN, NaN),
    'should find equality between NaNs'
  );

  assert.notOk(
    equals({ a: 1, b: 2 }, { a: 1 }),
    'should not find equality between objects with different keys'
  );

  assert.notOk(
    equals({ a: 1 }, { a: 2 }),
    'should not find equality between objects with different props'
  );

  assert.ok(
    equals({ a: { b: [d1, NaN, true] } }, { a: { b: [d1, NaN, true] } }),
    'should find equality between deep structures'
  );
});

test('push', (assert) => {
  assert.plan(4);

  assert.throws(
    () => push(false, 3),
    TypeError,
    'should throw when called on non-array type'
  );

  assert.deepEquals(
    push([1, 2], 3),
    [1, 2, 3],
    'should be able to push onto end of array'
  );

  assert.deepEquals(
    push([1], 2, 3),
    [1, 2, 3],
    'should be able to push multiple values'
  );

  const xs = [1, 2, 3];
  assert.not(
    push(xs, 4),
    xs,
    'should not mutate reference'
  );
});

test('first', (assert) => {
  assert.plan(4);

  assert.is(
    first([1, 2, 3]),
    1,
    'should get first item from array'
  );

  assert.is(
    first({ 0: 1, 1: 2, 2: 3 }),
    1,
    'should work with array-likes'
  );

  assert.is(
    first([]),
    undefined,
    'should return undefined for empty list'
  );

  assert.is(
    first(undefined),
    undefined,
    'should return undefined when called on undefined'
  );
});

test('rest', (assert) => {
  assert.plan(5);

  assert.throws(
    () => rest(false),
    TypeError,
    'should throw when called on non-array type'
  );

  assert.deepEquals(
    rest([1, 2, 3]),
    [2, 3],
    'should get subsequent items from array'
  );

  assert.deepEquals(
    rest([]),
    [],
    'should return empty list for empty list'
  );

  assert.deepEquals(
    rest([1]),
    [],
    'should return empty list for one element list'
  );

  assert.deepEquals(
    rest(undefined),
    [],
    'should return empty list when called on undefined'
  );
});

test('flatten', (assert) => {
  assert.plan(5);

  assert.deepEquals(
    flatten([1, 2, 3, 4]),
    [1, 2, 3, 4],
    'should not affect flat lists'
  );

  assert.deepEquals(
    flatten([1, [2, 3], 4]),
    [1, 2, 3, 4],
    'should flatten nested vectors in order'
  );

  assert.deepEquals(
    flatten([1, [[2], [[3], 4]]]),
    [1, 2, 3, 4],
    'should flatten deep nested vectors in order'
  );

  assert.deepEqual(
    flatten(undefined),
    [],
    'should return empty array when flattening undefined'
  );

  assert.throws(
    () => flatten(({ })),
    TypeError,
    'should throw on attempt to flatten non-array'
  );
});

test('distinct', (assert) => {
  assert.plan(3);

  assert.throws(
    () => distinct(5),
    TypeError,
    'should throw when called on non-array'
  );

  assert.deepEquals(
    distinct([1, 2, 2, 3, 4]),
    [1, 2, 3, 4],
    'should remove all duplicate values'
  );

  assert.deepEquals(
    distinct(undefined),
    [],
    'should return empty array when called on undefined'
  );
});

test('groupBy', (assert) => {
  assert.plan(1);

  assert.deepEquals(
    groupBy(['arthur', 'ford', 'zaphod', 'trillian'], str => str[0]),
    { a: ['arthur'], f: ['ford'], z: ['zaphod'], t: ['trillian'] },
    'should group items by a given key'
  );
});

test('interpose', (assert) => {
  assert.plan(2);

  assert.deepEquals(
    interpose([1, 2, 3], 0),
    [1, 0, 2, 0, 3],
    'should interpose separator between vals in coll'
  );

  assert.deepEquals(
    interpose([1], 0),
    [1],
    'should have no effect on length 1 arrays'
  );
});

test('isEmpty', (assert) => {
  assert.plan(7);

  assert.ok(
    isEmpty([]),
    'should recognize empty array as empty'
  );

  assert.notOk(
    isEmpty([1, 2]),
    'should not recognize filled array as empty'
  );

  assert.ok(
    isEmpty({}),
    'should recognize empty object as empty'
  );

  assert.notOk(
    isEmpty({ a: 1 }),
    'should not recognize keyed object as empty'
  );

  assert.ok(
    isEmpty(''),
    'should recognize empty string as empty'
  );

  assert.notOk(
    isEmpty('viscinity'),
    'should not recognize filled string as empty'
  );

  assert.notOk(
    isEmpty({ length: 3 }),
    'should not be tricked by array-likes'
  );
});

test('peek', (assert) => {
  assert.plan(3);

  assert.is(
    peek([1, 2, 3]),
    3,
    'should return final array element'
  );

  assert.is(
    peek([]),
    undefined,
    'should return undefined for empty array'
  );

  assert.is(
    peek([1]),
    1,
    'should return only element for 1-length array'
  );
});

test('pop', (assert) => {
  assert.plan(4);

  assert.deepEquals(
    pop([1, 2, 3]),
    [1, 2],
    'should remove final element from array'
  );

  const xs = [1, 2, 3];
  assert.not(
    pop(xs),
    xs,
    'should not mutate original array'
  );

  assert.throws(
    () => pop(5),
    TypeError,
    'should throw when called on non-array'
  );

  assert.is(
    pop(undefined),
    undefined,
    'should return undefined when called on undefined'
  );
});

test('reverse', (assert) => {
  assert.plan(4);

  assert.throws(
    () => reverse(4),
    TypeError,
    'should throw when called on non-array'
  );

  assert.deepEquals(
    reverse([1, 2, 3]),
    [3, 2, 1],
    'should reverse array'
  );

  const xs = [1, 2, 3];
  assert.not(
    reverse(xs),
    xs,
    'should not mutate original array'
  );

  assert.deepEquals(
    reverse(undefined),
    [],
    'should return empty array when called on undefined'
  );
});

test('sort', (assert) => {
  assert.plan(5);

  assert.throws(
    () => sort(4),
    TypeError,
    'should throw when called on non-array'
  );

  assert.deepEquals(
    sort([3, 2, 1]),
    [1, 2, 3],
    'should sort array'
  );

  const xs = [2, 1, 3];
  assert.not(
    sort(xs),
    xs,
    'should not mutate original array'
  );

  assert.deepEquals(
    sort([1, 2, 3], (a, b) => b - a),
    [3, 2, 1],
    'should allow custom compare function'
  );

  assert.deepEquals(
    sort(undefined, (a, b) => b - a),
    [],
    'should return empty array when called on undefined'
  );
});

test('take', (assert) => {
  assert.plan(5);

  assert.throws(
    () => take([1, 2, 3], false),
    TypeError,
    'should throw if called with non-numeric value for n'
  );

  assert.throws(
    () => take(4, 10),
    TypeError,
    'should throw if called on non-array'
  );

  assert.deepEquals(
    take([1, 2, 3], 1),
    [1],
    'should take items from start of array'
  );

  assert.deepEquals(
    take([], 2),
    [],
    'should return empty array when taking from empty array'
  );

  assert.deepEquals(
    take(undefined, 1),
    [],
    'should return empty array if called on undefined'
  );
});

test('takeWhile', (assert) => {
  assert.plan(6);

  assert.throws(
    () => takeWhile([1, 2, 3], false),
    TypeError,
    'should throw if called with non-function value for func'
  );

  const odd = n => (n % 2 !== 0);

  assert.throws(
    () => takeWhile(4, odd),
    TypeError,
    'should throw if called on non-array'
  );

  assert.deepEquals(
    takeWhile([1, 3, 5, 6], odd),
    [1, 3, 5],
    'should take predicated values'
  );

  assert.deepEquals(
    takeWhile([], odd),
    [],
    'should return empty array for takeWhile on empty array'
  );

  assert.deepEquals(
    takeWhile(undefined, odd),
    [],
    'should return empty array when called on undefined'
  );

  assert.deepEquals(
    takeWhile([1, 2, 3, 4, 5, 6], n => n < 10),
    [1, 2, 3, 4, 5, 6],
    'should not continue indefinitely'
  );
});

test('drop', (assert) => {
  assert.plan(5);

  assert.throws(
    () => drop([1, 2, 3], false),
    TypeError,
    'should throw if called with non-numeric value for n'
  );

  assert.throws(
    () => drop(4, 10),
    TypeError,
    'should throw if called on non-array'
  );

  assert.deepEquals(
    drop([1, 2, 3], 2),
    [3],
    'should drop items from the start of the array'
  );

  assert.deepEquals(
    drop([], 5),
    [],
    'should return empty array for drop on empty array'
  );

  assert.deepEquals(
    drop(undefined, 5),
    [],
    'should return empty array when called on undefined'
  );
});

test('dropWhile', (assert) => {
  assert.plan(6);

  assert.throws(
    () => dropWhile([1, 2, 3], false),
    TypeError,
    'should throw if called with non-function value for func'
  );

  const odd = n => (n % 2 !== 0);

  assert.throws(
    () => dropWhile(4, odd),
    TypeError,
    'should throw if called on non-array'
  );

  assert.deepEquals(
    dropWhile([1, 3, 5, 6], odd),
    [6],
    'should drop predicated values'
  );

  assert.deepEquals(
    dropWhile([], odd),
    [],
    'should return empty array for dropWhile on empty array'
  );

  assert.deepEquals(
    dropWhile(undefined, odd),
    [],
    'should return empty array when called on undefined'
  );

  assert.deepEquals(
    dropWhile([1, 2, 3, 4, 5, 6], n => n < 10),
    [],
    'should not continue indefinitely'
  );
});

test('zip', (assert) => {
  assert.plan(6);

  const ks = ['a', 'b', 'c'];
  const vs = [1, 2, 3];

  assert.deepEqual(
    zip(ks, vs),
    { a: 1, b: 2, c: 3 },
    'should zip together keys and values'
  );

  assert.deepEqual(
    zip(['a', 'b', 'c'], [1, 2, 3, 4]),
    { a: 1, b: 2, c: 3 },
    'should ignore values without keys'
  );

  assert.deepEqual(
    zip(['a', 'b'], [1, 2, 3]),
    { a: 1, b: 2 },
    'should ignore keys without values'
  );

  assert.deepEqual(
    zip(['a', 'b'], [undefined, 2, 3]),
    { b: 2 },
    'should ignore keys with undefined values'
  );

  assert.deepEqual(
    zip(undefined, [undefined, 2, 3]),
    {},
    'should return empty object if keys are undefined'
  );

  assert.deepEqual(
    zip(['a', 'b'], undefined),
    {},
    'should return empty object if vals are undefined'
  );
});

test('constantly', (assert) => {
  assert.plan(3);

  const make5 = constantly(5);
  assert.deepEqual(
    [make5(), make5(), make5()],
    [5, 5, 5],
    'should always return initial value'
  );

  assert.is(
    make5.call({ v: 5 }),
    5,
    'should ignore calling context'
  );

  const foo = { };
  assert.is(
    constantly(foo)(),
    foo,
    'should return original reference'
  );
});

test('identity', (assert) => {
  assert.plan(1);

  assert.is(
    identity(5),
    5,
    'should return first argument'
  );
});

test('inc', (assert) => {
  assert.plan(1);

  assert.is(
    inc(3),
    4,
    'should increment a number'
  );
});

test('dec', (assert) => {
  assert.plan(1);

  assert.is(
    dec(3),
    2,
    'should decrement a number'
  );
});

test('range', (assert) => {
  assert.plan(2);

  assert.deepEqual(
    range(5),
    [0, 1, 2, 3, 4],
    'should work with positive end index'
  );

  assert.deepEqual(
    range(-4),
    [0, -1, -2, -3],
    'should work with negative end index'
  );
});

test('repeat', (assert) => {
  assert.plan(3);

  assert.throws(
    () => repeat('a', 4),
    TypeError,
    'should throw when called with non-numeric n'
  );

  assert.deepEqual(
    repeat(4, 10),
    [10, 10, 10, 10],
    'should repeat value n times'
  );

  assert.deepEqual(
    repeat(-3, null),
    [],
    'should return empty array for n < 0'
  );
});

test('repeatedly', (assert) => {
  assert.plan(3);

  assert.throws(
    () => repeatedly('a', () => {}),
    TypeError,
    'should throw when called with non-numeric n'
  );

  let i = 0;
  const count = () => i += 1;

  assert.deepEqual(
    repeatedly(5, count),
    [1, 2, 3, 4, 5],
    'should call func n times'
  );

  assert.deepEqual(
    repeatedly(-3, count),
    [],
    'should return empty array for n < 0'
  );
});

test('transient', (assert) => {
  assert.plan(2);

  const marvin = { paranoid: true };

  assert.deepEquals(
    transient(marvin, android => {
      android.paranoid = false;
    }),
    { paranoid: false },
    'should allow for managed mutations'
  );

  assert.not(
    transient(marvin, android => {
      android.paranoid = false;
    }),
    marvin,
    'should not mutate original reference'
  );
});

