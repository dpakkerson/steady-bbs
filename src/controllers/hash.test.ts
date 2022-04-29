import { calculateHashId } from "./hash";

describe("calculateHashId", () => {
  test("it returns string", () => {
    expect(typeof calculateHashId({} as any)).toBe("string");
  });
});
