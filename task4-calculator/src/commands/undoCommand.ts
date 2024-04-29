import { CalculationState } from "../state/calculationState";
import { Command } from "./abstractCommand";

/**
 * Command that processes undo operation
 * @class
 */
export class UndoCommand extends Command {
  private history: Command[];

  constructor(
    calcState: CalculationState,
    output: HTMLElement,
    history: Command[]
  ) {
    super(calcState, output);
    this.history = history;
  }

  execute() {
    let command = this.history.pop();
    if (command != null) {
      command.undo();
    }
    return false;
  }
}
