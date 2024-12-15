type Counter<
  S extends string,
  Count extends any[] = [],
> = S extends `-${infer Rest}` ? Counter<Rest, [...Count, 1]> : Count["length"];

type Split<
  S extends string,
  NextCount = 0,
> = S extends `${infer Route}${"-"}${infer Rest}`
  ? Route extends ""
    ? Split<Rest, NextCount>
    : [[Route, NextCount], ...Split<Rest, Counter<`-${Rest}`, []>>]
  : S extends ""
    ? []
    : [[S, NextCount]];

type GetRoute<T extends string> = Split<T>;
