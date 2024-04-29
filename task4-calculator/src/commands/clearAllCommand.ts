import { CalculationState } from "../state/calculationState";
import { Command } from "./abstractCommand";

/**
 * Command that processes `clear all` operation
 * @class
 */
export class ClearAllCommand extends Command {
  constructor(calcState: CalculationState, output: HTMLElement) {
    super(calcState, output);
  }

  execute() {
    this.saveBackup();

    this.calcState.clearAll();
    this.output.textContent = "0";
    return true;
  }
}
