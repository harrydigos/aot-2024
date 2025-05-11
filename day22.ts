type Prettify<T> = {
  [K in keyof T]: Prettify<T[K]>;
} & {};

type Trim<
  T extends string,
  Delimiter extends string = " " | "\n" | "\t" | "\r" | ",",
> = T extends `${Delimiter}${infer Inner}` | `${infer Inner}${Delimiter}`
  ? Trim<Inner>
  : T;

type EscapeMap = { r: "\r"; n: "\n"; b: "\b"; f: "\f" };
type Unescape<S extends string> =
  S extends `${infer Head}\\${infer C extends keyof EscapeMap}${infer Tail}`
    ? `${Head}${EscapeMap[C]}${Unescape<Tail>}`
    : S;
type ParseString<S extends string> = S extends `"${infer Inner}"`
  ? Unescape<Inner>
  : S;

type ParsePrimitive<T extends string> =
  T extends `${infer Prim extends number | boolean | null}`
    ? Prim
    : ParseString<T>;

type ParseObjectContent<
  T extends string,
  _TT extends string = Trim<T>,
> = _TT extends ""
  ? {}
  : _TT extends `${Trim<infer Key>}:${infer Rest}`
    ? Trim<Rest> extends `[${infer Arr}],${infer Tail}`
      ? {
          [P in ParseString<Key>]: ParseArrayContent<Arr>;
        } & ParseObjectContent<Tail>
      : Trim<Rest> extends `[${infer Arr}]`
        ? { [P in ParseString<Key>]: ParseArrayContent<Arr> }
        : Trim<Rest> extends `${infer Val},${infer Tail}`
          ? {
              [P in ParseString<Key>]: Parse<Trim<Val>>;
            } & ParseObjectContent<Tail>
          : { [P in ParseString<Key>]: Parse<Trim<Rest>> }
    : {};

type ParseArrayContent<
  T extends string,
  _TT extends string = Trim<T>,
> = _TT extends ""
  ? []
  : _TT extends `{${infer Obj}}${infer Rest}`
    ? [ParseObjectContent<Obj>, ...ParseArrayContent<Rest>]
    : _TT extends `${Trim<infer Item>},${infer Rest}`
      ? [Parse<Item>, ...ParseArrayContent<Rest>]
      : [Parse<_TT>];

type Parse<T extends string, _TT extends string = Trim<T>> = Prettify<
  _TT extends `[${infer Content}]`
    ? ParseArrayContent<Content>
    : _TT extends `{${infer Content}}`
      ? ParseObjectContent<Content>
      : ParsePrimitive<_TT>
>;
