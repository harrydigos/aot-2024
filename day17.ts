const compose =
  <A, B, C, D>(f: (arg: A) => B, g: (arg: B) => C, h: (arg: C) => D) =>
  (arg: A): D =>
    h(g(f(arg)));

const upperCase = <T extends string>(x: T) => x.toUpperCase() as Uppercase<T>;
const lowerCase = <T extends string>(x: T) => x.toLowerCase() as Lowercase<T>;
const firstChar = <T extends string>(x: T) =>
  x[0] as T extends `${infer F}${string}` ? F : never;
const firstItem = <T extends unknown[]>(x: T) => x[0] as T[0];
const makeTuple = <T extends unknown>(x: T) => [x];
const makeBox = <T extends unknown>(value: T) => ({ value });
