---
layout: doc.html
description: >
 Set a key in a collection to a new value.
see-also:
  - unset
  - setIn
  - merge
  - update
---

The `set` function returns a new collection, after setting the `key` property to `value`.

### Examples
`set` is the immutable alternative to directly setting a property with syntax.

```js
const foo = { bar: 'baz' };
foo.qux = 'quz';
```

Use `set` to change a property inside an object.

```js
import { set } from 'tsaphod';

const foo = { bar: 'baz' };

set(foo, 'qux', 'quz');
// => { bar: 'baz' }
```

`set` also works with arrays.

```js
import { set } from 'tsaphod';

const xs = [1, 2, 3];

set(xs, 0, 5);
// => [5, 2, 3]
```

