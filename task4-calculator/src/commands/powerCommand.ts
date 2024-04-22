import { Executor } from "../executors/executor";
import { CalculationState } from "../state/calculationState";
import { Command } from "./abstractCommand";

export enum Power {
  square,
  cube,
  tenInPower,
}

export class PowerOptnCommand extends Command {
  power: Power;

  constructor(
    calcState: CalculationState,
    output: HTMLElement,
    executor: Executor,
    power: Power
  ) {
    super(calcState, output, executor);
    this.power = power;
  }

  execute() {
    /**
     * If there were incorrect operation before
     */
    if (this.calcState.x === "Error") return false;

    this.saveBackup();

    // let argument =
    //   this.calcState.y === "" || !this.calcState.isFirstCalculation
    //     ? +this.calcState.x
    //     : +this.calcState.y;
    let argument =
      this.calcState.y === "" ? +this.calcState.x : +this.calcState.y;
    let result: number = +this.calcState.x;

    switch (this.power) {
      case Power.square:
        result = this.executor.squarePower(argument);
        break;
      case Power.cube:
        result = this.executor.cubePower(argument);
        break;
      case Power.tenInPower:
        result = this.executor.tenInPower(argument);
        break;
    }

    this.calcState.x = result.toString();

    this.output.textContent = this.resultFormatter.stringCropping(
      this.calcState.x
    );

    this.calcState.isFirstCalculation = false;

    return true;
  }
}
