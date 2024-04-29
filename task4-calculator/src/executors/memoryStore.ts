/**
 * @module memoryStore
 */

import { Executor } from "./executor";
/**
 * Handles memory operations
 * @class
 */
export class MemoryStore extends Executor {
  memoryValue: number = 0;

  /**
   * Adds a new number to memory
   * @param value - number to add
   */
  memoryAdd(value: number) {
    this.memoryValue += value;
  }

  /**
   * Adds a new number with - sign to memory
   * @param value - number to subtract
   */
  memorySubtract(value: number) {
    this.memoryValue -= value;
  }

  /**
  / Retrieve the value in memory
  */
  memoryRecall() {
    return this.memoryValue;
  }

  /**
  / Clear the memory
  */
  memoryClear() {
    this.memoryValue = 0;
  }
}
