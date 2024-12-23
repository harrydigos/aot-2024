type Declarations = "let" | "const" | "var";
type FunctionCalls = "wrapGift" | "buildToy" | "assembleToy" | "addRibbon";
type Whitespace = " " | "\n" | "\t" | "\r";

type DeclarationType<T extends Declarations | FunctionCalls> =
  T extends Declarations ? "VariableDeclaration" : "CallExpression";

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

type Parse<T extends string, Parsed extends unknown[] = []> =
  CleanAndSplit<T> extends [
    infer First extends string,
    ...infer Rest extends string[],
  ]
    ? First extends `${infer Dec extends Declarations} ${infer VarName} = ${string}`
      ? Parse<
          Join<Rest>,
          [...Parsed, { id: VarName; type: DeclarationType<Dec> }]
        >
      : First extends `${infer FuncName extends FunctionCalls}(${infer Arg})`
        ? Parse<
            Join<Rest>,
            [
              ...Parsed,
              {
                type: DeclarationType<FuncName>;
                argument: Arg;
              },
            ]
          >
        : Parse<Join<Rest>, Parsed>
    : Parsed;
