---
layout: doc.html
description: >
  Returns the length of a collection.
---

The `size` function returns the numeric "length" of the collection it is called upon.

### Examples
When called on an array or string, size will return the length property.

```js
import { size } from 'tsaphod';

size([1, 2, 3])
// => 3
```

When called on an object, `size` will return the number of keys.

```js
import { size } from 'tsaphod';

size({ a: 1, b: 2 })
// => 2
```

Calling `size` on a value without a logical length will return `0` rather than throwing an error.

```js
import { size } from 'tsaphod';

size(null)
// => 0
size(undefined)
// => 0
size(2)
// => 0
```

