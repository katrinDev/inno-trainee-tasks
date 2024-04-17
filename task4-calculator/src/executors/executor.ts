import { ZeroDivisionError } from "../errors/zeroDivisionError";

export class Executor {
  countArithmOptn(x: number, y: number, sign: string) {
    switch (sign) {
      case "+":
        return x + y;
      case "-":
        return x - y;
      case "x":
        return x * y;
      case "/":
        if (y === 0) {
          throw new ZeroDivisionError();
        }
        return x / y;
      default:
        return x;
    }
  }
}
