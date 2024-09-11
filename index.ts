export const isDefined = <T>(value: T): value is NonNullable<T> =>
  value !== undefined && value !== null;

export const maybe = <Input, Output>(
  value: Input,
  operation: (value: NonNullable<Input>) => Output,
): Output | Extract<Input, null | undefined> => {
  if (!isDefined(value)) {
    return value as Output | Extract<Input, null | undefined>;
  }

  return operation(value);
};
