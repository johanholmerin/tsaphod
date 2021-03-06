---
layout: doc.html
description: >
  Combines objects to return a new one.
see-also:
  - set
  - update
---

The `merge` function is a wrapper around [`Object.assign`][1], but it always returns a new object and it ignores falsy values.

### Examples
```js
import { merge } from 'zahpod';

merge({ hello: 'earth' }, { goodbye: 'betelgeuse' })
// => { hello: 'earth', goodbye: 'betelgeuse' }
```

Falsy values will be ignored

```js
import { merge } from 'zahpod';

merge({ hello: 'damogran' }, undefined, { goodbye: 'magrathea' })
// => { hello: 'damogran', goodbye: 'magrathea' }
```

[1]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
