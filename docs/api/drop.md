---
layout: doc.html
description: >
  Removes the first n items from an array.
see-also:
  - dropWhile
  - take
---

The `drop` function returns a new array with the first `n` items omitted.

### Examples

```js
import { drop } from 'tsaphod';

drop([0, 1, 2, 3], 1)
// => [1, 2, 3]
```

