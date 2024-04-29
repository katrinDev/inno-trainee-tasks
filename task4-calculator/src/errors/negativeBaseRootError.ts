import { RootOperationError } from "./rootOperationError";

export class NegativeBaseRootError extends RootOperationError {
  constructor() {
    super("Can't get even root of negative number");
  }
}
