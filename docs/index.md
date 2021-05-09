---
layout: default.html
title: Tsaphod
---

<center class="hero">
# Tsaphod
</center>
<hr />

[Clojure's][2] immutable data API for JavaScript's own data structures.

```js
import { inc, update } from 'tsaphod';

const state = { count: 0 };

update(state, 'count', inc)
// => { count: 1 }
```

However, you don't need to know Clojure to make the most of Tsaphod. This library is just a set of JavaScript functions that make working with immutable data more fun!

Try [the tutorial](/tutorial/), check out [the cheatsheet](/cheatsheet/), or explore [the code][11].

## Rationale
Working with JavaScript's data structures as though they were immutable is a challenge. Although arrays have some methods which return new array instances, the only way to update objects without mutating them is to use unwieldy functions like `Object.assign`.

Some libraries reimplement these data structures with persistent interfaces, but they don't really integrate well with existing code.

The new structures need to be converted back into native structures at the edges of the project, or the code outside needs to be rewritten to work with them.

Tsaphod takes the tried and tested functions from the core of Clojure's immutable data API and rewrites them so that they work with JavaScript's own data structures.

## Usage
Tsaphod is available through npm.

```sh
npm install tsaphod
```

Or you can get it from a CDN.

```sh
https://unpkg.com/tsaphod
```

[1]: https://en.wikipedia.org/wiki/Tsaphod_Beeblebrox
[2]: https://clojure.org/
[8]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/rest_parameters
[11]: https://github.com/johanholmerin/tsaphod
[16]: https://github.com/sebmarkbage/ecmascript-immutable-data-structures

