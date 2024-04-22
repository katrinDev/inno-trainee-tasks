/**
 * Class for storing the state of the calculator.
 * @class
 */
export class CalculationState {
  x: string;
  y: string;
  sign: string;
  isFirstCalculation: boolean;
  /**
   * Initializes all properties to their default values.
   * @constructor
   */
  constructor() {
    /**
     * The left operand.
     */
    this.x = "";
    /**
     * The right operand.
     */
    this.y = "";
    /**
     * The operator.
     */
    this.sign = "";

    /**
     * Flag indicating whether the current operation is new.
     */
    this.isFirstCalculation = true;
  }

  /**
   * Clears all calculator values
   */
  clearAll() {
    this.x = "";
    this.y = "";
    this.sign = "";
    this.isFirstCalculation = true;
  }
}

export const calcData = new CalculationState();
