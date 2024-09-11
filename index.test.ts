import { describe, it, expect } from "vitest";
import { maybe } from "./index.js";

const expectType = <
  Expected = {
    error: "You must define an Expected type parameter";
    __brand: never;
  },
>(
  x: Expected,
) => undefined;

type IsEqual<Left, Right> = [Left] extends [Right]
  ? [Right] extends [Left]
    ? true
    : false
  : false;

describe("maybe", () => {
  describe("When value is undefined", () => {
    it("It returns undefined", () => {
      const value: number | undefined = undefined;

      const result = maybe(value, (x) => (x * 2).toString());

      expectType<IsEqual<string | undefined, typeof result>>(true);

      expect(result).toBeUndefined();
    });
  });

  describe("When value is null", () => {
    it("It returns null", () => {
      const value: number | null = null;

      const result = maybe(value, (x) => (x * 2).toString());

      expectType<IsEqual<string | null, typeof result>>(true);

      expect(result).toBeNull();
    });
  });

  describe("When value is defined", () => {
    it("It returns the result of the operation applied to the value", () => {
      const value: number | null | undefined = 10 as number | null | undefined;

      const result = maybe(value, (x) => (x * 2).toString());

      expectType<IsEqual<string | null | undefined, typeof result>>(true);

      expect(result).toBe("20");
    });
  });
});
