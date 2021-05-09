import { LastArrayElement } from 'type-fest';
import { GetWithPath } from './get';

type Falsy = undefined | null | false | 0 | -0 | 0n | '';
type UList = readonly unknown[];
type RKey = string | number;
type URecord = {
  [P in string | number]: unknown;
};
type URoL = URecord | UList;

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

type NotFalsyR<T extends URecord | Falsy> = T extends Falsy
  ? Record<string, never>
  : T;

export function set<
  That extends UList,
  Key extends number,
  Value extends unknown
>(that: That, key: Key, value: Value): That & { [key in Key]: Value };
export function set<
  That extends URecord,
  Key extends RKey,
  Value extends unknown
>(that: That, key: Key, value: Value): That & { [key in Key]: Value };

export function setIn<
  That extends UList,
  Keys extends RKey[],
  Value extends unknown
>(that: That, keys: Keys, value: Value): That & { [key in Keys[0]]: unknown };
export function setIn<
  That extends URecord,
  Keys extends RKey[],
  Value extends unknown
>(that: That, keys: Keys, value: Value): That & { [key in Keys[0]]: unknown };

export function unset<That extends UList, Key extends number>(
  that: That,
  key: Key
): That & { [key in Key]: undefined };
export function unset<That extends URecord, Key extends RKey>(
  that: That,
  key: Key
): Omit<That, Key>;

export function get<
  That extends UList,
  Key extends number,
  NotFound extends unknown
>(
  that: That,
  key: Key,
  notFound?: NotFound
): Key extends keyof That
  ? That[Key] extends undefined
    ? NotFound
    : That[Key]
  : NotFound;
export function get<
  That extends URecord,
  Key extends RKey,
  NotFound extends unknown
>(
  that: That,
  key: Key,
  notFound?: NotFound
): Key extends keyof That
  ? That[Key] extends undefined
    ? NotFound
    : That[Key]
  : NotFound;

export function getIn<
  That extends UList,
  Keys extends RKey[],
  NotFound extends unknown
>(
  that: That,
  keys: Keys,
  notFound?: NotFound
): GetWithPath<That, Keys> | NotFound;
export function getIn<
  That extends URecord,
  Keys extends RKey[],
  NotFound extends unknown
>(
  that: That,
  keys: Keys,
  notFound?: NotFound
): GetWithPath<That, Keys> | NotFound;

export function update<
  That extends URoL,
  Key extends keyof That,
  Func extends (value: That[Key], ...args: Args) => unknown,
  Args extends UList
>(
  that: That,
  key: Key,
  value: Func,
  ...args: Args
): Omit<That, Key> & { [key in Key]: ReturnType<Func> };

export function updateIn<
  That extends URoL,
  Keys extends keyof That,
  Func extends (value: unknown, ...args: Args) => unknown,
  Args extends UList
>(
  that: That,
  keys: Keys,
  value: Func,
  ...args: Args
): Omit<That, Keys> & { [key in Keys]: unknown };

export function merge<First extends URecord | Falsy>(
  first: First
): NotFalsyR<First>;
export function merge<
  First extends URecord | Falsy,
  Second extends URecord | Falsy
>(first: First, second: Second): NotFalsyR<First> & NotFalsyR<Second>;
export function merge<
  First extends URecord | Falsy,
  Second extends URecord | Falsy,
  Third extends URecord | Falsy
>(
  first: First,
  second: Second,
  third: Third
): NotFalsyR<First> & NotFalsyR<Second> & NotFalsyR<Third>;
export function merge<
  First extends URecord | Falsy,
  Second extends URecord | Falsy,
  Third extends URecord | Falsy,
  Fourth extends URecord | Falsy
>(
  first: First,
  second: Second,
  third: Third,
  fourth: Fourth
): NotFalsyR<First> & NotFalsyR<Second> & NotFalsyR<Third> & NotFalsyR<Fourth>;
export function merge<Objects extends URecord[]>(
  ...objects: Objects
): Objects[number];

export function keys(that: Falsy): [];
export function keys<That extends UList>(that: That): string[];
export function keys<That extends URecord>(that: That): (keyof That)[];

export function vals(that: Falsy): [];
export function vals<That extends URoL>(that: That): That[keyof That][];

export function size(that: unknown): number;

export function equals(first: unknown, second: unknown): boolean;

export function isEmpty(that: URoL): boolean;

export function first<That extends UList>(that: That): That[0];

export function rest(that: []): [];
export function rest<That extends UList>(that: [unknown, ...That]): That;

export function take<That extends UList>(that: That, n: number): That[number][];

export function takeWhile<
  That extends UList,
  Func extends (value: That[number]) => boolean
>(that: That, func: Func): That[number][];

export function drop<That extends UList>(that: That, n: number): That[number][];

export function dropWhile<
  That extends UList,
  Func extends (value: That[number]) => boolean
>(that: That, func: Func): That[number][];

export function flatten(that: Falsy): [];
export function flatten<That extends UList>(that: That): unknown[];

export function distinct<That extends UList>(that: That): That[number][];

export function groupBy<
  That extends UList,
  Func extends (value: That[number]) => string
>(that: That, func: Func): Record<string, That[number]>;

export function interpose<That extends UList, Sep extends unknown>(
  that: That,
  sep: Sep
): That | Sep[];

export function push<That extends UList, Values extends unknown[]>(
  that: That,
  ...values: Values
): [...That, ...Values];

export function peek<That extends UList>(
  that: That
): LastArrayElement<Writeable<That>>;

export function pop<That extends UList>(that: That): That[number][];

export function reverse<That extends UList>(that: That): That[number][];

export function sort<
  That extends UList,
  Func extends (a: That[number], b: That[number]) => number
>(that: That, func?: Func): That[number][];

export function zip<That extends UList, Values extends UList>(
  that: That,
  values: Values
): Record<string, Values[number]>;

export function constantly<That extends unknown>(that: That): () => That;

export function identity<That extends unknown>(
  that: That,
  ...rest: unknown[]
): That;

export function inc(n: number): number;

export function dec(n: number): number;

export function range(n: number): number[];

export function repeat<That extends unknown>(n: number, that: That): That[];

export function repeatedly<That extends unknown>(
  n: number,
  func: () => That
): That[];

export function transient<That extends URoL>(
  that: That,
  func: (that: That) => void
): unknown;
