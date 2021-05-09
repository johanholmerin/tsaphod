import { expectType, expectAssignable } from 'tsd';
import {
  set, setIn, unset, get, getIn, update, updateIn, merge,
  keys, vals, size, equals, push, first, rest, flatten, distinct,
  dropWhile, drop, groupBy, interpose, isEmpty, peek, pop,
  reverse, sort, take, takeWhile, zip, constantly, identity,
  inc, dec, range, repeat, repeatedly, transient
} from './index';

expectAssignable<{ bar: 'baz'; qux: 'quz' }>(set({ bar: 'baz' }, 'qux', 'quz'));
expectAssignable<[5, 2, 3]>(set([1, 2, 3], 0, 5));

// expectType<{ a: { b: 2 }}>(setIn({ a: { b: 1 } }, ['a', 'b'], 2))
// expectType<{ z: { b: 'me' } }>(setIn({}, ['z', 'b'], 'me'));

expectAssignable<Record<string, never>>(unset({ bar: 'baz' }, 'bar'));
expectAssignable<[undefined, 2, 3]>(unset([1, 2, 3], 0));

expectType<1>(get({ a: 1 } as const, 'a'));
expectType<0>(get({ a: 1 } as const, 'b', 0));
expectType<3>(get({ a: undefined } as const, 'a', 3));
expectType<3>(get([1, 2, 3] as const, 2));
expectType<'foo'>(get([1] as const, 2, 'foo'));

expectType<1>(getIn({ a: { b: 1 } }, ['a', 'b']));

expectAssignable<{ meaning: number }>(
  update({ meaning: 41 }, 'meaning', (n) => n + 1)
);

// expectType<{ earth: { harmless: boolean } }>(
//   updateIn(
//     { earth: { harmless: true } },
//     ['earth', 'harmless'],
//     (bool) => !bool
//   )
// );

expectAssignable<{ hello: 'earth', goodbye: 'betelgeuse' }>(
  merge({ hello: 'earth' } as const, { goodbye: 'betelgeuse' } as const)
);
expectAssignable<{ hello: 'damogran', goodbye: 'magrathea' }>(
  merge({ hello: 'damogran' } as const, undefined, { goodbye: 'magrathea' } as const)
);

expectType<('a' | 'f' | 't')[]>(
  keys({ a: 'dent', f: 'prefect', t: 'mcmillan' } as const)
);
expectType<string[]>(keys(['arthur', 'ford', 'trillian']));
expectType<[]>(keys(null));
expectType<[]>(keys(undefined));

expectType<('dent' | 'prefect' | 'mcmillan')[]>(
  vals({ a: 'dent', f: 'prefect', t: 'mcmillan' } as const)
);
expectType<[]>(vals(null));
expectType<[]>(vals(undefined));

expectType<number>(size([1, 2, 3]));
expectType<number>(size({ a: 1, b: 2 }));
expectType<number>(size(undefined));
expectType<number>(size(null));
expectType<number>(size(2));

expectType<boolean>(equals({ a: 1 }, { a: 1 }))

expectType<boolean>(isEmpty([1, 2, 3]));
expectType<boolean>(isEmpty({ a: 1 }));

expectType<1>(first([1, 2, 3] as const));
expectType<undefined>(first([] as const));

expectType<[2, 3]>(rest([1, 2, 3]));
expectType<[]>(rest([]));

expectType<number[]>(take([1, 2, 3], 2));

expectType<number[]>(takeWhile([-3, -2, -1, 0, 1, 2, 3], () => true));

expectType<number[]>(drop([0, 1, 2, 3], 1));

expectType<number[]>(dropWhile([-3, -2, -1, 0, 1, 2, 3], () => true));

expectType<unknown[]>(flatten([1, [2, 3], 4]));
expectType<[]>(flatten(undefined));
expectType<[]>(flatten(null));

expectType<number[]>(distinct([1, 2, 2, 3, 4, 4]));

expectType<Record<string, 'arthur' | 'alicia' | 'zaphod'>>(
  groupBy(['arthur', 'alicia', 'zaphod'] as const, (name) => name[0])
);

expectAssignable<(number | '+')[]>(interpose([1, 2, 3], '+'));

expectType<(number | string)[]>(push([1], '2'));

expectType<3>(peek([1, 2, 3] as const));

expectType<number[]>(pop([1, 2, 3]));

expectType<number[]>(reverse([1, 2, 3]));

expectType<number[]>(sort([1, 2, 3]));

expectType<Record<string, 'dent' | 'prefect'>>(
  zip(['a', 'f'] as const, ['dent', 'prefect'] as const)
);

expectType<1>(constantly(1 as const)());

expectType<1>(identity(1 as const, 2, 3));

expectType<number>(inc(1));

expectType<number>(dec(1));

expectType<number[]>(range(1));

expectType<'z'[]>(repeat(5, 'z'));

expectType<number[]>(repeatedly(3, Math.random));

expectType<unknown>(transient({ bar: 1 }, foo => {
  foo.bar = 2;
}));
