import { Command } from "./commands/abstractCommand";
import { BinaryOperatorsCommand } from "./commands/binaryOperatorsCommand";
import { ClearAllCommand } from "./commands/clearAllCommand";
import { DigitClickedCommand } from "./commands/digitClickedCommand";
import { Executor } from "./executors/executor";
import { CalculationState, calcData } from "./state/calculationState";
import { EqualsClickedCommand } from "./commands/equalsClickedCommand";
import {
  UnaryOprtnType,
  UnaryOperatorsCommand,
} from "./commands/unaryOperatorsCommand";
import {
  ConvertOperatorsCommand,
  ConvertOprtnType,
} from "./commands/convertOperatorsCommand";
import { MemoryCommand, MemoryOptnType } from "./commands/memoryCommand";
import { MemoryStore } from "./memoryStore/memoryStore";
import { UndoCommand } from "./commands/undoCommand";

const commandsHistory: Command[] = [];
const output = document.getElementById("output") as HTMLElement;
const currentExecutor = new Executor();
const memoryExecutor = new MemoryStore();

const equalsClicked = function () {
  executeCommand(new EqualsClickedCommand(calcData, output, currentExecutor));
};

const arithmSignClicked = function (key: string) {
  executeCommand(
    new BinaryOperatorsCommand(calcData, output, currentExecutor, key)
  );
};

const anyPowerOptn = function () {
  executeCommand(
    new BinaryOperatorsCommand(calcData, output, currentExecutor, "^")
  );
};

const anyRootOptn = function () {
  executeCommand(
    new BinaryOperatorsCommand(calcData, output, currentExecutor, "√")
  );
};

const clearAll = function () {
  executeCommand(new ClearAllCommand(calcData, output));
};

const operandsChange = function (key: string) {
  executeCommand(new DigitClickedCommand(calcData, output, key));
};

const squareRoot = function () {
  executeCommand(
    new UnaryOperatorsCommand(
      calcData,
      output,
      currentExecutor,
      UnaryOprtnType.squareRoot
    )
  );
};

const cubeRoot = function () {
  executeCommand(
    new UnaryOperatorsCommand(
      calcData,
      output,
      currentExecutor,
      UnaryOprtnType.cubeRoot
    )
  );
};

const reciprocal = function () {
  executeCommand(
    new UnaryOperatorsCommand(
      calcData,
      output,
      currentExecutor,
      UnaryOprtnType.reciprocal
    )
  );
};

const factorial = function () {
  executeCommand(
    new UnaryOperatorsCommand(
      calcData,
      output,
      currentExecutor,
      UnaryOprtnType.factorial
    )
  );
};

const squarePower = function () {
  executeCommand(
    new UnaryOperatorsCommand(
      calcData,
      output,
      currentExecutor,
      UnaryOprtnType.squarePower
    )
  );
};

const cubePower = function () {
  executeCommand(
    new UnaryOperatorsCommand(
      calcData,
      output,
      currentExecutor,
      UnaryOprtnType.cubePower
    )
  );
};

const tenInPowerOptn = function () {
  executeCommand(
    new UnaryOperatorsCommand(
      calcData,
      output,
      currentExecutor,
      UnaryOprtnType.tenInPower
    )
  );
};

const percentOptn = function () {
  executeCommand(
    new ConvertOperatorsCommand(
      calcData,
      output,
      currentExecutor,
      ConvertOprtnType.percent
    )
  );
};

const signChangeOptn = function () {
  executeCommand(
    new ConvertOperatorsCommand(
      calcData,
      output,
      currentExecutor,
      ConvertOprtnType.signChange
    )
  );
};

/**
 * Memory operations
 */
const memoryAdd = function () {
  executeCommand(
    new MemoryCommand(
      calcData,
      output,
      memoryExecutor,
      MemoryOptnType.memoryAdd
    )
  );
};

const memorySubstact = function () {
  executeCommand(
    new MemoryCommand(
      calcData,
      output,
      memoryExecutor,
      MemoryOptnType.memorySubstact
    )
  );
};

const memoryRecall = function () {
  executeCommand(
    new MemoryCommand(
      calcData,
      output,
      memoryExecutor,
      MemoryOptnType.memoryRecall
    )
  );
};

const memoryClear = function () {
  executeCommand(
    new MemoryCommand(
      calcData,
      output,
      memoryExecutor,
      MemoryOptnType.memoryClear
    )
  );
};

function undo() {
  executeCommand(new UndoCommand(calcData, output, commandsHistory));
}

/**
 * Wraps all the commands execution to store
 * them in history if needed
 * @param command
 */
function executeCommand(command: Command) {
  if (command.execute()) {
    commandsHistory.push(command);
  }
}

export {
  commandsHistory,
  output,
  currentExecutor,
  executeCommand,
  undo,
  arithmSignClicked,
  clearAll,
  operandsChange,
  equalsClicked,
  squarePower,
  cubePower,
  anyPowerOptn,
  tenInPowerOptn,
  percentOptn,
  signChangeOptn,
  squareRoot,
  cubeRoot,
  anyRootOptn,
  reciprocal,
  factorial,
  memoryAdd,
  memorySubstact,
  memoryRecall,
  memoryClear,
};
