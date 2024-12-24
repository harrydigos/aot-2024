declare function DynamicParamsCurrying<
  Input extends unknown[],
  Output extends unknown,
>(
  fn: (...args: Input) => Output,
): <T extends unknown[]>(
  ...args: T
) => Input extends [...T, ...infer Last]
  ? Last["length"] extends 0
    ? Output
    : ReturnType<typeof DynamicParamsCurrying<Last, Output>>
  : never;
