type Excuse<T extends Record<string, string>> = {
  new (arr: Record<string, unknown>): `${keyof T & string}: ${T[keyof T]}`;
};
