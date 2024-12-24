type Whitespace = " " | "\n" | "\t" | "\r";

type Trim<T extends string> = T extends
  | `${Whitespace}${infer Inner}`
  | `${infer Inner}${Whitespace}`
  ? Trim<Inner>
  : T;

type CleanAndSplit<T extends string> =
  T extends `${infer Statement};${infer Rest}`
    ? [Trim<Statement>, ...CleanAndSplit<Rest>]
    : T extends ""
      ? []
      : [T];

type Join<T extends string[]> = T extends [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? `${First};${Join<Rest>}`
  : "";

type Parse<
  T extends string,
  Declared extends string[] = [],
  Used extends string[] = [],
> =
  CleanAndSplit<T> extends [
    infer First extends string,
    ...infer Rest extends string[],
  ]
    ? First extends `${string} ${infer VarName} = ${string}`
      ? Parse<Join<Rest>, [...Declared, VarName], Used>
      : First extends `${string}(${infer Arg})`
        ? Parse<Join<Rest>, Declared, [...Used, Arg]>
        : Parse<Join<Rest>, Declared, Used>
    : { declared: Declared; used: Used };

type Unused<
  Declared extends string[],
  Used extends string[],
> = Declared extends [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? First extends Used[number]
    ? Unused<Rest, Used>
    : [First, ...Unused<Rest, Used>]
  : [];

type Lint<T extends string> =
  Parse<T> extends {
    declared: infer Declared extends string[];
    used: infer Used extends string[];
  }
    ? {
        scope: { declared: Declared; used: Used };
        unused: Unused<Declared, Used>;
      }
    : never;

export {};
