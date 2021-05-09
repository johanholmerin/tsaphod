---
layout: doc.html
description: >
  Returns a sorted copy of an array.
see-also:
  - reverse
---

The `sort` function copies, then sorts an array using [the native `sort` method][1].

The `func` parameter is optional, but when passed it will be forwarded on to `sort` and used as the custom comparison function.

### Examples

```js
import { sort } from 'tsaphod';

sort([3, 2, 1])
// => [1, 2, 3]

sort([2, 1, 3], (a, b) => b - a)
// => [3, 2, 1]
```

[1]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
