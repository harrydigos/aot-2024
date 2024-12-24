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
  Parsed extends unknown[] = [],
  Declared extends string[] = [],
  Used extends string[] = [],
> =
  CleanAndSplit<T> extends [
    infer First extends string,
    ...infer Rest extends string[],
  ]
    ? First extends `${string} ${infer VarName} = ${string}`
      ? Parse<Join<Rest>, Parsed, [...Declared, Trim<VarName>], Used>
      : First extends `${string}(${infer Arg})`
        ? Parse<Join<Rest>, Parsed, Declared, [...Used, Trim<Arg>]>
        : Parse<Join<Rest>, Parsed, Declared, Used>
    : { declared: Declared; used: Used };

type AnalyzeScope<T extends string> = Parse<T>;

export {};
