import { advantageTypes } from "./constants/index.constants";
import { RollResult } from "./models/index.models";

function getStrongerRandomRoll(dieType: number): number {
  const entropy = Math.random();
  const timeEntropy = (Date.now() % 1_000_000) / 1_000_000;
  const mixedEntropy = (entropy + timeEntropy) % 1;

  return Math.floor(mixedEntropy * dieType) + 1;
}

/**
 * Rolls dice based on a notation string and returns detailed roll information.
 *
 * Input format: [numberOfDice]d[dieType][h|l]? [+-modifier]
 *
 * Examples:
 * - "1d20 + 5"
 * - "2d6 + 3"
 * - "1d20h + 5" (advantage)
 * - "1d20l - 1" (disadvantage)
 *
 * Notes:
 * - Advantage/disadvantage is only allowed with one die.
 * - Rolls are generated with mixed entropy (`Math.random()` + `Date.now()`).
 * - `total` is the sum of all generated rolls plus the modifier.
 *
 * @param input Dice expression string.
 * @returns The roll result object.
 * @throws Error when input format is invalid, modifier is missing, or advantage/disadvantage is used with multiple dice.
 */
function rollDice(input: string): RollResult {
  const dicePattern = /(\d*)d(\d+)(h|l)?/;
  const modifierPattern = /([+-]\s*\d+)/;

  const diceMatch = input.match(dicePattern);
  const modifierMatch = input.match(modifierPattern);

  if (!diceMatch) {
    throw new Error("Invalid input format");
  }

  if (!modifierMatch) {
    throw new Error("Modifier is required");
  }

  const numDice = diceMatch[1] ? parseInt(diceMatch[1]) : 1;
  const dieType = parseInt(diceMatch[2]);
  const advantageType = diceMatch[3] || null;
  const modifier = parseInt(modifierMatch[1].replace(/\s+/g, ""));

  if (advantageType && numDice > 1) {
    throw new Error("Advantage/Disadvantage can only be applied to a single die");
  }

  const rollCount = advantageType ? 2 : 1;
  const rolls: number[] = [];

  for (let r = 0; r < rollCount; r++) {
    for (let d = 0; d < numDice; d++) {
      rolls.push(getStrongerRandomRoll(dieType));
    }
  }

  const result = {
    input,
    rolls,
    modifier,
    advantageType: advantageType
      ? advantageTypes[advantageType as keyof typeof advantageTypes]
      : null,
    advantageRoll: advantageType
      ? advantageType === "h"
        ? Math.max(...rolls)
        : Math.min(...rolls)
      : null,
    total: rolls.reduce((a, b) => a + b, 0) + modifier,
    hasCritical: rolls.includes(dieType),
    hasCriticalFailure: rolls.includes(1),
  };

  return result;
}

export { rollDice, RollResult };
