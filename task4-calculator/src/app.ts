import { Command } from "./commands/abstractCommand";
import { BinaryOperatorsCommand } from "./commands/binaryOperatorsCommand";
import { ClearAllCommand } from "./commands/clearAllCommand";
import { DigitClickedCommand } from "./commands/digitClickedCommand";
import { Executor } from "./executors/executor";
import { calcData } from "./state/calculationState";
import { EqualsClickedCommand } from "./commands/equalsClickedCommand";
import { Power, PowerOptnCommand } from "./commands/powerCommand";

const commandsHistory: Command[] = [];
const output = document.getElementById("output") as HTMLElement;
const currentExecutor = new Executor();

const equalsClicked = function () {
  executeCommand(new EqualsClickedCommand(calcData, output, currentExecutor));
};

const signClicked = function (key: string) {
  executeCommand(
    new BinaryOperatorsCommand(calcData, output, currentExecutor, key)
  );
};

const anyPowerOptn = function () {
  executeCommand(
    new BinaryOperatorsCommand(calcData, output, currentExecutor, "^")
  );
};

const clearAll = function () {
  executeCommand(new ClearAllCommand(calcData, output));
};

const operandsChange = function (key: string) {
  executeCommand(new DigitClickedCommand(calcData, output, key));
};

const squareOptn = function () {
  executeCommand(
    new PowerOptnCommand(calcData, output, currentExecutor, Power.square)
  );
};

const cubeOptn = function () {
  executeCommand(
    new PowerOptnCommand(calcData, output, currentExecutor, Power.cube)
  );
};

const tenInPowerOptn = function () {
  executeCommand(
    new PowerOptnCommand(calcData, output, currentExecutor, Power.tenInPower)
  );
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
  squareOptn,
  cubeOptn,
  anyPowerOptn,
  tenInPowerOptn,
};
