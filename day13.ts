type Demand<T> = {
  demand: Exclude<T, unknown> extends T ? T : unknown;
};
