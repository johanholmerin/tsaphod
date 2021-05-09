# Tsaphod

*Tsaphod is a TypeScript fork of [Zaphod][11], without the stalled [bind operator][9] proposal*

[Clojure's][2] immutable data API for JavaScript's own data structures.

```js
import { inc, update } from 'tsaphod';

const state = { count: 0 };

update(state, 'count', inc)
// => { count: 1 }
```

However, you don't need to know Clojure to make the most of Tsaphod. This library is just a set of JavaScript functions that make working with immutable data more fun!

Find the [docs][4], [cheatsheet][5] and [rationale][6] at [the website][3].

```sh
npm install tsaphod
```

*Note: Tsaphod is an ES module and requires Node >= 12.20*

[1]: https://en.wikipedia.org/wiki/Zaphod_Beeblebrox
[2]: https://clojure.org/
[3]: https://tsaphod.surge.sh
[4]: https://tsaphod.surge.sh/api
[5]: https://tsaphod.surge.sh/cheatsheet
[6]: https://tsaphod.surge.sh/tutorial
[8]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/rest_parameters
[9]: https://github.com/tc39/proposal-bind-operator
[11]: https://github.com/danprince/zaphod
[15]: https://github.com/danprince/zaphod/issues/6
[16]: https://github.com/sebmarkbage/ecmascript-immutable-data-structures
