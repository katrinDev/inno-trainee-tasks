import { Executor } from "../executors/executor";
import { CalculationState } from "../state/calculationState";
import { ResultFormatter } from "../utils/resultFormatter";

type Backup = {
  calcState: CalculationState;
  outputText: string;
};

export abstract class Command {
  protected backup?: Backup;
  protected calcState: CalculationState;
  protected output: HTMLElement;
  protected executor: Executor;
  protected resultFormatter: ResultFormatter;

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

  abstract execute(): boolean;

  saveBackup() {
    this.backup = {
      calcState: new CalculationState(),
      outputText: this.output.textContent ?? "0",
    };

    Object.assign(this.backup.calcState, this.calcState);
  }

  undo() {
    this.output.textContent =
      this.backup?.outputText ?? this.output.textContent;

    Object.assign(this.calcState, this.backup?.calcState ?? this.calcState);
  }
}
