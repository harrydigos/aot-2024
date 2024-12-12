type FormatNames<T extends [string, string, string][]> = {
  [K in keyof T]: T[K] extends [infer Name extends string, string, infer Count]
    ? {
        name: Name;
        count: Count extends `${infer CountNum extends number}`
          ? CountNum
          : never;
        rating: Name extends "Liam" | "Aala" ? "naughty" : "nice";
      }
    : never;
};
