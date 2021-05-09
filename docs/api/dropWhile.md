---
layout: doc.html
description: >
  Removes leading array items whilst they pass a predicate function.
see-also:
  - drop
  - takeWhile
  - take
---

The `dropWhile` function iterates over an array, omitting the leading items until an item returns false, when passed to `func`.

### Examples

```js
import { dropWhile } from 'tsaphod';

const isNegative = (x) => x < 0;

dropWhile([-3, -2, -1, 0, 1, 2, 3], isNegative)
// => [0, 1, 2, 3]
```

