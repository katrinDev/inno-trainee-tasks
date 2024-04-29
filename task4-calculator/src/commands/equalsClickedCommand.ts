import { FactorialError } from "../errors/factorialError";
import { RootOperationError } from "../errors/rootOperationError";
import { ZeroDivisionError } from "../errors/zeroDivisionError";
import { Executor } from "../executors/executor";
import { CalculationState } from "../state/calculationState";
import { Command } from "./abstractCommand";

/**
 * Command that processes equals button click
 * @class
 */
export class EqualsClickedCommand extends Command {
  constructor(
    calcState: CalculationState,
    output: HTMLElement,
    executor: Executor
  ) {
    super(calcState, output, executor);
  }

  execute() {
    try {
      this.saveBackup();

      /**
       * If there were incorrect operation before
       */
      if (this.calcState.x === "Error") return false;

      if (this.calcState.y === "") this.calcState.y = this.calcState.x;
      this.calcState.x = this.executor
        .countBinaryOperation(
          +this.calcState.x,
          +this.calcState.y,
          this.calcState.sign
        )
        .toString();

      this.output.textContent = this.resultFormatter.stringCropping(
        this.calcState.x
      );

      return true;
    } catch (err) {
      if (
        err instanceof ZeroDivisionError ||
        err instanceof RootOperationError ||
        err instanceof FactorialError
      ) {
        this.calcState.x = "Error";
        this.output.textContent = this.calcState.x;
      }

      return false;
    } finally {
      this.calcState.sign = "";
      this.calcState.y = "";
      this.calcState.isFirstCalculation = false;
    }
  }
}
