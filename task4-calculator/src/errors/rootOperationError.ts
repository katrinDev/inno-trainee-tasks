export class RootOperationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RootOperationError";
  }
}
