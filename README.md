# smart-dice

`smart-dice` is a lightweight dice rolling library for JavaScript and TypeScript.

[![npm version](https://img.shields.io/npm/v/smart-dice.svg?style=flat-square)](https://www.npmjs.com/package/smart-dice)
[![npm downloads](https://img.shields.io/npm/dm/smart-dice.svg?style=flat-square)](https://www.npmjs.com/package/smart-dice)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

## Features

- Parses classic dice notation: `XdY +/- Z`
- Supports advantage (`h`) and disadvantage (`l`) in `1dYh` / `1dYl`
- Returns full roll details (`rolls`, `total`, critical flags)
- Uses mixed entropy (`Math.random()` + `Date.now()`) for roll generation

## Installation

```bash
npm install smart-dice
```

## Quick Start

```ts
import { rollDice } from "smart-dice";

const result = rollDice("2d6 + 3");

console.log(result);
```

## Input Format

The function accepts this pattern:

`[numberOfDice]d[dieType][h|l]? [+-modifier]`

Examples:

- `1d20 + 5`
- `2d6 + 3`
- `1d20h + 4` (advantage)
- `1d20l - 1` (disadvantage)

## API

### `rollDice(input: string): RollResult`

Parses a dice expression, performs the rolls, applies the modifier, and returns:

```ts
interface RollResult {
  input: string;
  rolls: number[];
  modifier: number;
  advantageType: null | string;
  advantageRoll: null | number;
  total: number;
  hasCritical: boolean;
  hasCriticalFailure: boolean;
}
```

### Behavior Notes

- Advantage/disadvantage is only valid with a single die (`1d20h`, `1d20l`)
- `total` is calculated from the sum of all `rolls` plus `modifier`
- `hasCritical` is `true` if any roll equals the die type (for example `20` on a `d20`)
- `hasCriticalFailure` is `true` if any roll equals `1`

## Error Cases

`rollDice` throws an error in these cases:

- `Invalid input format` when dice notation is invalid
- `Modifier is required` when `+N` or `-N` is missing
- `Advantage/Disadvantage can only be applied to a single die`

## Local Development

```bash
npm install
npm run test:run
npm run build
```

Available scripts:

- `npm test`
- `npm run test:run`
- `npm run lint`
- `npm run lint:fix`
- `npm run build`

## Contributing

Contributions are welcome.

- Open an [issue](https://github.com/wesleyara/smart-dice/issues)
- Open a [pull request](https://github.com/wesleyara/smart-dice/pulls)

## License

This project is licensed under the [MIT License](LICENSE).

