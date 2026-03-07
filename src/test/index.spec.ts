import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { rollDice } from "../";

describe("rollDice", () => {
  beforeEach(() => {
    vi.spyOn(Date, "now").mockReturnValue(0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should perform a normal roll with modifier", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.4);

    const result = rollDice("1d20 + 5");

    expect(result).toEqual({
      input: "1d20 + 5",
      rolls: [9],
      modifier: 5,
      advantageType: null,
      advantageRoll: null,
      total: 14,
      hasCritical: false,
      hasCriticalFailure: false,
    });
  });

  it("should perform a roll with advantage (h)", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.1).mockReturnValueOnce(0.8);

    const result = rollDice("1d20h + 2");

    expect(result.rolls).toEqual([3, 17]);
    expect(result.advantageType).toBe("advantage");
    expect(result.advantageRoll).toBe(17);
    expect(result.total).toBe(22);
  });

  it("should perform a roll with disadvantage (l)", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.9).mockReturnValueOnce(0.2);

    const result = rollDice("1d20l - 1");

    expect(result.rolls).toEqual([19, 5]);
    expect(result.advantageType).toBe("disadvantage");
    expect(result.advantageRoll).toBe(5);
    expect(result.total).toBe(23);
  });

  it("should flag critical success and critical failure", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0).mockReturnValueOnce(0.9999);

    const result = rollDice("2d20 + 0");

    expect(result.rolls).toEqual([1, 20]);
    expect(result.hasCritical).toBe(true);
    expect(result.hasCriticalFailure).toBe(true);
  });

  it("should throw an error for input without valid dice", () => {
    expect(() => rollDice("+ 5")).toThrowError("Invalid input format");
  });

  it("should throw an error when modifier is not provided", () => {
    expect(() => rollDice("1d20")).toThrowError("Modifier is required");
  });

  it("should throw an error when using advantage/disadvantage with multiple dice", () => {
    expect(() => rollDice("2d20h + 5")).toThrowError(
      "Advantage/Disadvantage can only be applied to a single die",
    );
  });
});
