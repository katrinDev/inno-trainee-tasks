import { MemoryStore } from "../memoryStore/memoryStore";
import { CalculationState } from "../state/calculationState";
import { Command } from "./abstractCommand";

export enum MemoryOptnType {
  memoryAdd,
  memorySubstact,
  memoryRecall,
  memoryClear,
}

export class MemoryCommand extends Command {
  type: MemoryOptnType;

  constructor(
    calcState: CalculationState,
    output: HTMLElement,
    executor: MemoryStore,
    type: MemoryOptnType
  ) {
    super(calcState, output, executor);
    this.type = type;
  }

  execute() {
    /**
     * If there were incorrect operation before
     */
    if (this.calcState.x === "Error") return false;

    let argument =
      this.calcState.y === "" ? +this.calcState.x : +this.calcState.y;

    switch (this.type) {
      case MemoryOptnType.memoryAdd:
        (this.executor as MemoryStore).memoryAdd(argument);
        break;
      case MemoryOptnType.memorySubstact:
        (this.executor as MemoryStore).memorySubstract(argument);
        break;
      case MemoryOptnType.memoryRecall:
        this.saveBackup();

        this.calcState.x = (this.executor as MemoryStore)
          .memoryRecall()
          .toString();

        this.calcState.isFirstCalculation = false;
        console.log(JSON.stringify(this.calcState));
        this.output.textContent = this.calcState.x;
        return true;
      case MemoryOptnType.memoryClear:
        (this.executor as MemoryStore).memorySubstract(argument);
        break;
    }
    return false;
  }
}
