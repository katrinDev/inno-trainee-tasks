import { RootOperationError } from "./rootOperationError";

/**
 * Custom error for negative root in root operations handling
 * @class
 */
export class NegativeRootError extends RootOperationError {
  constructor() {
    super("Root can't be negative");
  }
}
