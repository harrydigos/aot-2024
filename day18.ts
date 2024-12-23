const createStreetLight = <C extends string>(
  _colors: C[],
  defaultColor: NoInfer<C>,
) => {
  return defaultColor;
};
