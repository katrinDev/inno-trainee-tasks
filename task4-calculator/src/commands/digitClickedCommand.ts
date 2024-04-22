import { CalculationState } from "../state/calculationState";
import { Command } from "./abstractCommand";

export class DigitClickedCommand extends Command {
  private key: string;

  constructor(calcState: CalculationState, output: HTMLElement, key: string) {
    super(calcState, output);
    this.key = key;
  }

  execute() {
    this.saveBackup();

    if (
      this.calcState.y === "" &&
      this.calcState.sign === "" &&
      this.calcState.isFirstCalculation
    ) {
      this.calcState.x += this.key;
      this.output.textContent = this.calcState.x;
    } else if (this.calcState.x !== "" && this.calcState.sign !== "") {
      this.calcState.y += this.key;
      this.output.textContent = this.calcState.y;
    } else {
      this.calcState.x = this.key;
      this.output.textContent = this.calcState.x;
    }
    return true;
  }
}
