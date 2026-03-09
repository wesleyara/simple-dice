export interface RollResult {
  input: string;
  rolls: number[];
  modifier: number;
  advantageType: null | string;
  advantageRoll: null | number;
  total: number;
  hasCritical: boolean;
  hasCriticalFailure: boolean;
}
