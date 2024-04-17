export class ZeroDivisionError extends Error {
  constructor() {
    super("Can't divide by 0");
    this.name = "ZeroDivisionError";
  }
}
