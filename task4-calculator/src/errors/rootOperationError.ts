/**
 * Parent error class for all root operations errors
 * @class
 */
export class RootOperationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RootOperationError";
  }
}
