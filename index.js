function copy(object) {
  const keys = Object.keys(object);
  const clone = object instanceof Array ? [] : {};
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    clone[key] = object[key];
  }
  return clone;
}

export function set(that, key, value) {
  if(that == undefined) {
    return { [key]: value };
  }

  // cheap return if key is already set
  if(that[key] === value) {
    return that;
  }

  const clone = copy(that);
  clone[key] = value;
  return clone;
}

export function setIn(that, keys, value) {
  if(keys.length === 0) {
    return that;
  }

  const isNil = that == undefined;
  const clone = isNil ? {} : copy(that);

  let ref = clone;
  let index = 0;

  while(index < (keys.length - 1)) {
    const key = keys[index];

    // make sure we create the path if needed
    if(ref[key] == undefined) {
      const nextKey = keys[index + 1];
      ref[key] = typeof nextKey === 'number' ? [] : {};
    } else {
      ref[key] = copy(ref[key]);
    }

    ref = ref[key]
    index += 1
  }

  ref[keys[index]] = value;

  return clone;
}

export function unset(that, key) {
  if(that == undefined) {
    return {};
  }

  // forgiving return for removing missing key
  if(!that.hasOwnProperty(key)) {
    return that;
  }

  const clone = copy(that);
  delete clone[key];
  return clone;
}

export function get(that, key, notFound) {
  if(that == undefined) {
    return notFound;
  }

  if(that[key] !== undefined) {
    return that[key];
  } else {
    return notFound;
  }
}

export function getIn(that, keys, notFound) {
  if(keys.length === 0) {
    return notFound;
  }

  if(that == undefined) {
    return notFound;
  }

  let ref = that;
  let index = 0

  while(index < keys.length) {
    const key = keys[index]

    if(ref[key] == undefined) {
      return notFound;
    } else {
      ref = ref[key];
    }

    index += 1
  }

  return ref;
}

export function update(that, key, func, ...args) {
  const clone = copy(that);
  const val = clone[key];

  if(func == undefined) {
    clone[key] = undefined;
  } else {
    clone[key] = func(val, ...args);
  }

  return clone;
}

export function updateIn(that, keys, func, ...args) {
  const current = getIn(that, keys);
  const updated =
    (func == undefined)
      ? undefined
      : func(current, ...args);

  return setIn(that, keys, updated);
}

export function merge(that, ...objects) {
  // filter out falsy values
  const values = objects.filter(object => object);

  return Object.assign({}, that, ...values);
}

export function keys(that) {
  if(that == undefined) {
    return [];
  }

  return Object.keys(that);
}

export function vals(that) {
  if(that == undefined) {
    return [];
  }

  // cheap return if getting vals of an array
  if(that instanceof Array) {
    return that;
  }

  const ks = Object.keys(that);
  const vs = new Array(ks.length);
  for(let i = 0; i < ks.length; i++) {
    vs[i] = that[ks[i]];
  }

  return vs;
}

export function size(that) {
  if(that instanceof Array) {
    return that.length;
  }

  if(typeof that === 'string') {
    return that.length;
  }

  // forgive calls for null/undefined
  if(that == undefined) {
    return 0;
  }

  return keys(that).length;
}

export function equals(that, val) {
  if(that === val) {
    return true;
  }

  if(typeof that !== typeof val) {
    return false;
  }

  if(typeof that === 'number') {
    return isNaN(that) && isNaN(val);
  }

  if(that instanceof Date && val instanceof Date) {
    return that.getTime() === val.getTime();
  }

  if(that instanceof RegExp && val instanceof RegExp) {
    return that.toString() === val.toString();
  }

  const ownKeys = keys(that);
  const altKeys = keys(val);

  if(ownKeys.length !== altKeys.length) {
    return false;
  }

  for(let i = 0; i < ownKeys.length; i++) {
    const key = ownKeys[i];
    if(!equals(that[key], val[key])) {
      return false;
    }
  }

  return true;
}

export function isEmpty(that) {
  return size(that) === 0;
}

export function first(that) {
  if(that == undefined) {
    return undefined;
  }

  return that[0];
}

export function rest(that) {
  if(that == undefined) {
    return [];
  }

  return that.slice(1);
}

export function take(that, n) {
  if(that == undefined) {
    return [];
  }

  return that.slice(0, n);
}

export function takeWhile(that, func) {
  if(that == undefined) {
    return [];
  }

  let index = 0;
  while(func(that[index]) && index < that.length) {
    index += 1;
  }

  return that.slice(0, index);
}

export function drop(that, n) {
  if(that == undefined) {
    return [];
  }

  return that.slice(n);
}

export function dropWhile(that, func) {
  if(that == undefined) {
    return [];
  }

  let index = 0;

  while(func(that[index]) && index < that.length) {
    index += 1;
  }

  return that.slice(index);
}

export function flatten(that) {
  // forgive calls on empty values
  if(that == undefined) {
    return [];
  }

  const stack = [that];
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

export function distinct(that) {
  if(that == undefined) {
    return [];
  }

  const unique = [];

  for(let i = 0; i < that.length; i++) {
    if(unique.indexOf(that[i]) < 0) {
      unique.push(that[i]);
    }
  }

  return unique;
}


export function groupBy(that, func) {
  const grouped = {};

  for(let i = 0; i < that.length; i++) {
    const key = func(that[i]);
    grouped[key] = grouped[key] || [];
    grouped[key].push(that[i]);
  }

  return grouped;
}

export function interpose(that, separator) {
  const interposed = [];
  for(let i = 0; i < that.length; i++) {
    interposed.push(that[i], separator);
  }

  // remove final separator
  return interposed.slice(0, -1);
}

export function push(that, ...items) {
  return that.concat(items);
}

export function peek(that) {
  if(that.length) {
    return that[that.length - 1];
  } else {
    return undefined;
  }
}

export function pop(that) {
  if(that == undefined) {
    return undefined;
  }

  return that.slice(0, -1);
}

export function reverse(that) {
  if(that == undefined) {
    return [];
  }

  return copy(that).reverse();
}

export function sort(that, func) {
  if(that == undefined) {
    return [];
  }

  return copy(that).sort(func);
}

export function zip(that, values) {
  if(that == undefined || values == undefined) {
    return {};
  }

  const zipped = {};

  for(let i = 0; i < that.length; i++) {
    const key = that[i];
    const val = values[i];
    if(val != undefined) {
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

export function transient(that, func) {
  const clone = copy(that);

  // do side effects
  func(clone);

  return clone;
}

