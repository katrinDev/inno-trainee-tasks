import { CalculationState } from "../state/calculationState";
import { Command } from "./abstractCommand";

export class OperandsChangeCommand extends Command {
  private key: string;

  constructor(calcState: CalculationState, output: HTMLElement, key: string) {
    super(calcState, output);
    this.key = key;
  }

  execute() {
    this.saveBackup();

    if (this.calcState.y === "" && this.calcState.sign === "") {
      this.calcState.x += this.key;
      this.output.textContent = this.calcState.x;
    } else if (
      this.calcState.x !== "" &&
      this.calcState.y !== "" &&
      this.calcState.isNewCalculation
    ) {
      this.calcState.x = this.key;
      this.calcState.isNewCalculation = false;
      this.output.textContent = this.calcState.x;
    } else {
      this.calcState.y += this.key;
      this.output.textContent = this.calcState.y;
    }
    return true;
  }
}
