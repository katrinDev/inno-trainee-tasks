import { RootOperationError } from "./rootOperationError";

/**
 * Custom error for negative base in root operations handling
 * @class
 */
export class NegativeBaseRootError extends RootOperationError {
  constructor() {
    super("Can't get even root of negative number");
  }
}
