import { ZeroDivisionError } from "../errors/zeroDivisionError";
import { Executor } from "../executors/executor";
import { CalculationState } from "../state/calculationState";
import { Command } from "./abstractCommand";

export class EqualsClickedCommand extends Command {
  constructor(
    calcState: CalculationState,
    output: HTMLElement,
    executor: Executor
  ) {
    super(calcState, output, executor);
  }

  execute() {
    this.saveBackup();

    /**
     * If there were incorrect operation before
     */
    if (this.calcState.x === "Error") return false;

    if (this.calcState.y === "") this.calcState.y = this.calcState.x;

    try {
      this.calcState.x = this.executor
        .countBinaryOperation(
          +this.calcState.x,
          +this.calcState.y,
          this.calcState.sign
        )
        .toString();
    } catch (err) {
      if (err instanceof ZeroDivisionError) {
        this.calcState.x = "Error";
        this.output.textContent = this.calcState.x;
      }
    } finally {
      this.calcState.sign = "";
      this.calcState.y = "";
      this.calcState.isFirstCalculation = false;
    }

    this.output.textContent = this.resultFormatter.stringCropping(
      this.calcState.x
    );

    return true;
  }
}