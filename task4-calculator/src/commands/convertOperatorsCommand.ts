import { Executor } from "../executors/executor";
import { CalculationState } from "../state/calculationState";
import { Command } from "./abstractCommand";
/**
 * Specifies the type of the operation
 * @enum
 */
export enum ConvertOprtnType {
  percent,
  signChange,
}

/**
 * Command that processes convert operations
 * @class
 */
export class ConvertOperatorsCommand extends Command {
  type: ConvertOprtnType;

  constructor(
    calcState: CalculationState,
    output: HTMLElement,
    executor: Executor,
    operationType: ConvertOprtnType
  ) {
    super(calcState, output, executor);
    this.type = operationType;
  }

  execute() {
    /**
     * If there were incorrect operation before
     */
    if (this.calcState.x === "Error") return false;

    this.saveBackup();
    let result: string = "";

    switch (this.type) {
      case ConvertOprtnType.percent:
        const { x, y, sign } = this.calcState;
        if (sign === "" && y === "") {
          this.calcState.y = "1";
        } else if (sign !== "" && y === "") {
          this.calcState.y = x;
        }

        this.calcState.y = this.executor
          .percentCount(+this.calcState.x, +this.calcState.y)
          .toString();
        result = this.calcState.y;
        break;
      case ConvertOprtnType.signChange:
        if (this.calcState.y !== "") {
          this.calcState.y = this.executor
            .signChange(+this.calcState.y)
            .toString();

          result = this.calcState.y;
        } else if (this.calcState.x !== "") {
          this.calcState.x = this.executor
            .signChange(+this.calcState.x)
            .toString();

          result = this.calcState.x;
        }

        break;
    }

    this.output.textContent = this.resultFormatter.stringCropping(result);

    return true;
  }
}
