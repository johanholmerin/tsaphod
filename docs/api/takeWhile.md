---
layout: doc.html
description: >
  Takes leading array items whilst they pass a predicate function.
see-also:
  - take
  - dropWhile
  - drop
---

The `takeWhile` function iterates over an array, taking the leading items until an item returns false, when passed to `func`.

### Examples

```js
import { takeWhile } from 'tsaphod';

const isNegative = (x) => x < 0;

takeWhile([-3, -2, -1, 0, 1, 2, 3], isNegative)
// => [-3, -2, -1]
```
