import { Executor } from "../executors/executor";

export class MemoryStore extends Executor {
  memoryValue: number = 0;

  memoryAdd(value: number) {
    this.memoryValue += value;
  }

  memorySubstract(value: number) {
    this.memoryValue -= value;
  }

  /**
  / Retrieve the value in memory
  */
  memoryRecall() {
    return this.memoryValue;
  }

  memoryClear() {
    this.memoryValue = 0;
  }
}
