import { Command } from "./commands/abstractCommand";
import { SignClickedCommand } from "./commands/signClickedCommand";
import { ClearAllCommand } from "./commands/clearAllCommand";
import { OperandsChangeCommand } from "./commands/operandsChangeCommand";
import { Executor } from "./executors/executor";
import { calcData } from "./state/calculationState";
import { EqualsClickedCommand } from "./commands/equalsClickedCommand";

const commandsHistory: Command[] = [];
const output = document.getElementById("output") as HTMLElement;
const currentExecutor = new Executor();

const equalsClicked = function () {
  executeCommand(new EqualsClickedCommand(calcData, output, currentExecutor));
};

const signClicked = function (key: string) {
  executeCommand(
    new SignClickedCommand(calcData, output, currentExecutor, key)
  );
};

const clearAll = function () {
  executeCommand(new ClearAllCommand(calcData, output));
};

const operandsChange = function (key: string) {
  executeCommand(new OperandsChangeCommand(calcData, output, key));
};

function executeCommand(command: Command) {
  if (command.execute()) {
    commandsHistory.push(command);
  }
}

function undo() {
  let command = commandsHistory.pop();
  if (command != null) {
    command.undo();
  }
}

export {
  commandsHistory,
  output,
  currentExecutor,
  executeCommand,
  undo,
  signClicked,
  clearAll,
  operandsChange,
  equalsClicked,
};
