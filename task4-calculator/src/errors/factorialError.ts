/**
 * Custom error for incorrect factorial input
 * @class
 */
export class FactorialError extends Error {
  constructor() {
    super("Incorrect number for factorial");
    this.name = "FactorialError";
  }
}
