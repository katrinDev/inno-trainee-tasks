import { ZeroDivisionError } from "../errors/zeroDivisionError";

export class Executor {
  countBinaryOperation(x: number, y: number, sign: string) {
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
      case "^":
        return x ** y;
      default:
        return x;
    }
  }

  squarePower(x: number) {
    return x ** 2;
  }

  cubePower(x: number) {
    return x ** 3;
  }

  tenInPower(x: number) {
    return 10 ** x;
  }
}
