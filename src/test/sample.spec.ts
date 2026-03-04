import { describe, expect, it } from "vitest";

describe("Sample Test", () => {
  it("should add two numbers correctly", () => {
    const sum = (a: number, b: number) => a + b;
    expect(sum(2, 3)).toBe(5);
  });
});
