---
layout: default.html
title: Getting Started
---

# Getting Started

This guide runs through the process of adding Tsaphod to a project.

## Install Tsaphod
Start by installing the latest version of Tsaphod from npm.

```
$ npm install tsaphod
```

Then create the following `hello.js` file.

```js
import { set, remove } from 'tsaphod';

let greeting = { goodbye: 'world' };

greeting = set(
  unset(greeting, 'goodbye'),
  'hello',
  'world'
);

console.log(greeting);
```
