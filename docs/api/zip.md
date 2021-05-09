---
layout: doc.html
description: >
  Combines arrays of keys and values to create an object.
---

The `zip` function should be called on an array of keys, with an array of values as the first argument. It returns a new object that uses these keys and values together.


### Examples

```js
import { zip } from 'tsaphod';

zip(['a', 'f'], ['dent', 'prefect'])
// => { a: 'dent', f: 'prefect' }
```

`zip` will ignore keys without values.

```js
import { zip } from 'tsaphod';

zip(['z', 't', 'm'], ['beeblebrox', 'mcmillan'])
// => { z: 'beeblebrox', t: 'mcmillan' }
```

It will also ignore values without keys.

```js
import { zip } from 'tsaphod';

zip(['z', 't'], ['beeblebrox', 'mcmillan', 'marvin'])
// => { z: 'beeblebrox', t: 'mcmillan' }
```

Keys with corresponding values of `undefined` will not be included either.

```js
import { zip } from 'tsaphod';

zip(['blagulon'], [undefined])
// => { }
```

