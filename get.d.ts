/*
MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

type StringDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

/**
Like the `Get` type but receives an array of strings as a path parameter.
*/
export type GetWithPath<
  BaseType,
  Keys extends (string | number)[]
> = Keys extends []
  ? BaseType
  : Keys extends [infer Head, ...infer Tail]
  ? GetWithPath<
      PropertyOf<BaseType, Extract<Head, string>>,
      Extract<Tail, string[]>
    >
  : never;

/**
Returns true if `LongString` is made up out of `Substring` repeated 0 or more times.

@example
```
ConsistsOnlyOf<'aaa', 'a'> //=> true
ConsistsOnlyOf<'ababab', 'ab'> //=> true
ConsistsOnlyOf<'aBa', 'a'> //=> false
ConsistsOnlyOf<'', 'a'> //=> true
```
*/
type ConsistsOnlyOf<
  LongString extends string,
  Substring extends string
> = LongString extends ''
  ? true
  : LongString extends `${Substring}${infer Tail}`
  ? ConsistsOnlyOf<Tail, Substring>
  : false;

/**
Convert a type which may have number keys to one with string keys, making it possible to index using strings retrieved from template types.

@example
```
type WithNumbers = {foo: string; 0: boolean};
type WithStrings = WithStringKeys<WithNumbers>;

type WithNumbersKeys = keyof WithNumbers;
//=> 'foo' | 0
type WithStringsKeys = keyof WithStrings;
//=> 'foo' | '0'
```
*/
type WithStringKeys<BaseType extends Record<string | number, any>> = {
  [Key in `${Extract<keyof BaseType, string | number>}`]: BaseType[Key];
};

/**
Get a property of an object or array. Works when indexing arrays using number-literal-strings, for example, `PropertyOf<number[], '0'> = number`, and when indexing objects with number keys.

Note:
- Returns `unknown` if `Key` is not a property of `BaseType`, since TypeScript uses structural typing, and it cannot be guaranteed that extra properties unknown to the type system will exist at runtime.
- Returns `undefined` from nullish values, to match the behaviour of most deep-key libraries like `lodash`, `dot-prop`, etc.
*/
type PropertyOf<BaseType, Key extends string> = BaseType extends
  | null
  | undefined
  ? undefined
  : Key extends keyof BaseType
  ? BaseType[Key]
  : BaseType extends {
      [n: number]: infer Item;
      length: number; // Note: This is needed to avoid being too lax with records types using number keys like `{0: string; 1: boolean}`.
    }
  ? ConsistsOnlyOf<Key, StringDigit> extends true
    ? Item
    : unknown
  : Key extends keyof WithStringKeys<BaseType>
  ? WithStringKeys<BaseType>[Key]
  : unknown;
