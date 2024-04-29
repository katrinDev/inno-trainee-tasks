import { Executor } from "../executors/executor";
import { CalculationState } from "../state/calculationState";
import { ResultFormatter } from "../utils/resultFormatter";

type Backup = {
  calcState: CalculationState;
  outputText: string;
};

/**
 * Main parent class for all specific commands
 * @class
 */
export abstract class Command {
  protected backup?: Backup;
  protected calcState: CalculationState;
  protected output: HTMLElement;
  protected executor: Executor;
  protected resultFormatter: ResultFormatter;

  /**
   * @constructor
   * @param calcState - current state of the calculator
   * @param output - output html element, needed for commands to change
   * the displayed number on the calculator
   * @param executor - class with business logic
   * @param formatter - class to format the result
   */
  constructor(
    calcState: CalculationState,
    output: HTMLElement,
    executor?: Executor,
    formatter?: ResultFormatter
  ) {
    this.calcState = calcState;
    this.output = output;
    this.executor = executor ?? new Executor();
    this.resultFormatter = formatter ?? new ResultFormatter();
  }

  /**
   * The most inportant method for commands that
   * handles their specific operation
   * @abstract
   */
  abstract execute(): boolean;

  /**
   * Saves the state of the calculator before
   * the command change
   */
  saveBackup() {
    this.backup = {
      calcState: new CalculationState(),
      outputText: this.output.textContent ?? "0",
    };

    Object.assign(this.backup.calcState, this.calcState);
  }

  /**
   * Method to undo the command effect
   */
  undo() {
    this.output.textContent =
      this.backup?.outputText ?? this.output.textContent;

    Object.assign(this.calcState, this.backup?.calcState ?? this.calcState);
  }
}
