import { RootOperationError } from "./rootOperationError";

export class NegativeRootError extends RootOperationError {
  constructor() {
    super("Root can't be negative");
  }
}
