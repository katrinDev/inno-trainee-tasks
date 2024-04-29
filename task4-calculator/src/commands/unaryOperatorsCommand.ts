import { FactorialError } from "../errors/factorialError";
import { RootOperationError } from "../errors/rootOperationError";
import { ZeroDivisionError } from "../errors/zeroDivisionError";
import { Executor } from "../executors/executor";
import { CalculationState } from "../state/calculationState";
import { Command } from "./abstractCommand";

export enum UnaryOprtnType {
  squarePower,
  cubePower,
  tenInPower,
  squareRoot,
  cubeRoot,
  reciprocal,
  factorial,
}

export class UnaryOperatorsCommand extends Command {
  type: UnaryOprtnType;

  constructor(
    calcState: CalculationState,
    output: HTMLElement,
    executor: Executor,
    operationType: UnaryOprtnType
  ) {
    super(calcState, output, executor);
    this.type = operationType;
  }

  execute() {
    try {
      /**
       * If there were incorrect operation before
       */
      if (this.calcState.x === "Error") return false;

      this.saveBackup();

      let argument =
        this.calcState.y === "" ? +this.calcState.x : +this.calcState.y;
      let result: number = +this.calcState.x;

      switch (this.type) {
        case UnaryOprtnType.squarePower:
          result = this.executor.squarePower(argument);
          break;
        case UnaryOprtnType.cubePower:
          result = this.executor.cubePower(argument);
          break;
        case UnaryOprtnType.tenInPower:
          result = this.executor.tenInPower(argument);
          break;
        case UnaryOprtnType.squareRoot:
          result = this.executor.nthRoot(argument, 2);
          break;
        case UnaryOprtnType.cubeRoot:
          result = this.executor.nthRoot(argument, 3);
          break;
        case UnaryOprtnType.reciprocal:
          result = this.executor.reciprocal(argument);
          break;
        case UnaryOprtnType.factorial:
          result = this.executor.factorial(argument);
          break;
      }

      this.calcState.x = result.toString();

      this.output.textContent = this.resultFormatter.stringCropping(
        this.calcState.x
      );

      this.calcState.isFirstCalculation = false;

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
    }
  }
}
