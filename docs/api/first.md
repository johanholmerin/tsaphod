---
layout: doc.html
description: >
  Returns the first item in an array.
see-also:
  - rest
---

Returns the "head" (or first item) from an array.

### Examples

```js
import { first } from 'tsaphod';

first([1, 2, 3])
// => 1
```

```js
import { first } from 'tsaphod';

first([])
// => undefined
```
