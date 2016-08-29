"use strict";

export function _copy(object) {
  const keys = Object.keys(object);
  const clone = object instanceof Array ? [] : {};
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    clone[key] = object[key];
  }
  return clone;
}

export function set(key, value) {
  // cheap return if not enough args passed
  if(arguments.length < set.length) {
    return this;
  }

  // cheap return if key is already set
  if(this[key] === value) {
    return this;
  }

  const clone = _copy(this);
  clone[key] = value;
  return clone;
}

export function setIn(keys, value) {
  if(!(keys instanceof Array)) {
    throw new TypeError(`setIn needs keys to be an array, not ${typeof this}!`);
  }

  if(keys.length === 0) {
    return this;
  }

  const clone = _copy(this || {});
  let ref = clone;
  let index = 0;

  while(index < (keys.length - 1)) {
    const key = keys[index];

    // make sure we create the path if needed
    if(ref[key] === undefined) {
      const nextKey = keys[index + 1];
      ref[key] = typeof nextKey === 'number' ? [] : {};
    } else {
      ref[key] = _copy(ref[key]);
    }

    ref = ref[key]
    index += 1
  }

  ref[keys[index]] = value;

  return clone;
}

export function remove(key) {
  // forgiving return if no arguments are passed
  if(arguments.length < remove.length) {
    return this;
  }

  // forgiving return for removing missing key
  if(!this.hasOwnProperty(key)) {
    return this;
  }

  const clone = _copy(this);
  delete clone[key];
  return clone;
}

export function get(key, notFound) {
  if(this === undefined || this === null) {
    return notFound;
  }

  if(this[key] !== undefined) {
    return this[key];
  } else {
    return notFound;
  }
}

export function getIn(keys, notFound) {
  if(!(keys instanceof Array)) {
    throw new TypeError(`getIn needs keys to be an array, not ${typeof this}!`);
  }

  if(keys.length === 0) {
    return notFound;
  }

  if(this === undefined || this === null) {
    return notFound;
  }

  let ref = this;
  let index = 0

  while(index < keys.length) {
    const key = keys[index]

    if(ref[key] === undefined) {
      return notFound;
    } else {
      ref = ref[key];
    }

    index += 1
  }

  return ref;
}

export function update(key, func, ...args) {
  const clone = _copy(this);
  const val = clone[key];
  clone[key] = func(val, ...args);
  return clone;
}

export function updateIn(keys, func, ...args) {
  const current = this::getIn(keys);
  const updated = func(current, ...args);
  return this::setIn(keys, updated);
}

export function merge(...objects) {
  if(objects.length === 0) {
    return this;
  }

  // filter out falsy values
  const values = objects.filter(object => object);

  return Object.assign({}, this, ...values);
}

export function keys() {
  // forgive calls for null/undefined
  if(this === null || this === undefined) {
    return [];
  }

  return Object.keys(this);
}

export function vals() {
  // forgive calls for null/undefined
  if(this === null || this === undefined) {
    return [];
  }

  // cheap return if getting vals of an array
  if(this instanceof Array) {
    return this;
  }

  const ks = Object.keys(this);
  const vs = new Array(ks.length);
  for(let i = 0; i < ks.length; i++) {
    vs[i] = this[ks[i]];
  }

  return vs;
}

export function size() {
  if(this instanceof Array) {
    return this.length;
  }

  if(typeof this === 'string') {
    return this.length;
  }

  // forgive calls for null/undefined
  if(this === null || this === undefined) {
    return 0;
  }

  return Object.keys(this).length;
}

export function equals(val) {
  if(this === val) {
    return true;
  }

  if(typeof this !== typeof val) {
    return false;
  }

  if(typeof this === 'number') {
    return isNaN(this) && isNaN(val);
  }

  if(this instanceof Date && val instanceof Date) {
    return this.getTime() === val.getTime();
  }

  if(this instanceof RegExp && val instanceof RegExp) {
    return this.toString() === val.toString();
  }

  const ownKeys = keys(this);
  const altKeys = keys(val);
  if(ownKeys.length !== altKeys.length) {
    return false;
  }

  for(let i = 0; i < ownKeys.length; i++) {
    const key = ownKeys[i];
    if(!equals(this[key], val[key])) {
      return false;
    }
  }

  return true;
}

export function isEmpty() {
  if(this instanceof Array) {
    return this.length === 0;
  }

  if(typeof this === 'string') {
    return this.length === 0;
  }

  return this::keys().length === 0;
}

export function first() {
  return this[0];
}

export function rest() {
  if(!(this instanceof Array)) {
    throw new TypeError(`Can't get rest of ${typeof this}!`);
  }

  return this.slice(1);
}

export function take(n) {
  return this.slice(0, n);
}

export function takeWhile(func) {
  let index = 0;
  while(func(this[index]) && index < this.length) {
    index += 1;
  }
  return this.slice(0, index);
}

export function drop(n) {
  return this.slice(n);
}

export function dropWhile(func) {
  let index = 0;

  while(func(this[index]) && index < this.length) {
    index += 1;
  }

  return this.slice(index);
}

export function flatten() {
  // forgive calls on empty values
  if(this === undefined || this === null) {
    return [];
  }

  if(!(this instanceof Array)) {
    throw new TypeError(`Can't flatten a ${typeof this}!`);
  }

  const stack = [this];
  const flat = [];

  while(stack.length > 0) {
    const item = stack.pop();

    if(item instanceof Array) {
      for(let i = 0; i < item.length; i++) {
        stack.push(item[i]);
      }
    } else {
      flat.unshift(item);
    }
  }

  return flat;
}

export function distinct() {
  const unique = [];

  for(let i = 0; i < this.length; i++) {
    if(unique.indexOf(this[i]) < 0) {
      unique.push(this[i]);
    }
  }

  return unique;
}


export function groupBy(func) {
  const grouped = {};

  for(let i = 0; i < this.length; i++) {
    const key = func(this[i]);
    grouped[key] = grouped[key] || [];
    grouped[key].push(this[i]);
  }

  return grouped;
}

export function interpose(separator) {
  const interposed = [];
  for(let i = 0; i < this.length; i++) {
    interposed.push(this[i], separator);
  }

  // remove final separator
  return interposed.slice(0, -1);
}

export function push(...items) {
  if(!(this instanceof Array)) {
    throw new TypeError(`Can't push onto ${typeof this}!`);
  }

  if(items.length === 0) {
    return this;
  }

  return this.concat(items);
}

export function peek() {
  if(this.length) {
    return this[this.length - 1];
  } else {
    return undefined;
  }
}

export function pop() {
  return this.slice(0, -1);
}

export function reverse() {
  return _copy(this).reverse();
}

export function sort(func) {
  return _copy(this).sort(func);
}

export function zip(values) {
  const zipped = {};

  for(let i = 0; i < this.length; i++) {
    const key = this[i];
    const val = values[i];
    if(val !== undefined) {
      zipped[key] = val;
    }
  }

  return zipped;
}

export function constantly(any) {
  return function constant() {
    return any;
  };
}

export function identity(any) {
  return any;
}

export function inc(n) {
  return n + 1;
}

export function dec(n) {
  return n - 1;
}

export function range(end) {
  const nums = [];

  if(end > 0) {
    for(let i = 0; i < end; i++) {
      nums.push(i);
    }
  } else {
    for(let i = 0; i > end; i--) {
      nums.push(i);
    }
  }

  return nums;
}

export function repeat(n, any) {
  const list = [];

  // prevent infinite loops
  if(n < 0) return [];

  for(let i = 0; i < n; i++) {
    list[i] = any;
  }

  return list;
}

export function repeatedly(n, func) {
  const list = [];

  // prevent infinite loops
  if(n < 0) return [];

  for(let i = 0; i < n; i++) {
    list[i] = func();
  }

  return list;
}

export function transient(func) {
  const clone = _copy(this);

  // do side effects
  func(clone);

  return clone;
}

