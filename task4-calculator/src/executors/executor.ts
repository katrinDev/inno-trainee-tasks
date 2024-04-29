import { FactorialError } from "../errors/factorialError";
import { NegativeBaseRootError } from "../errors/negativeBaseRootError";
import { NegativeRootError } from "../errors/negativeRootError";
import { RootOperationError } from "../errors/rootOperationError";
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
      case "√":
        return this.nthRoot(x, y);
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

  percentCount(x: number, y: number) {
    return (x * y) / 100;
  }

  signChange(value: number) {
    return -1 * value;
  }

  reciprocal(value: number) {
    if (value === 0) {
      throw new ZeroDivisionError();
    }

    return 1 / value;
  }

  factorial(value: number): number {
    if (value < 0 || !Number.isInteger(value)) {
      throw new FactorialError();
    }

    if (value === 0 || value === 1) {
      return 1;
    } else {
      return value * this.factorial(value - 1);
    }
  }

  protected nthRoot(value: number, root: number) {
    if (root < 0) {
      throw new NegativeRootError();
    }

    if (root === 0) {
      if (value === 0) {
        throw new RootOperationError("0-th root of 0 is undefined");
      }
      return 1;
    }

    if (value < 0 && root % 2 === 0) {
      throw new NegativeBaseRootError();
    }

    let x = value;
    let prevX = 0;
    let precision = 0.001;

    while (this.abs(x - prevX) > precision) {
      prevX = x;
      x = ((root - 1) * x + value / this.pow(x, root - 1)) / root;
    }

    return x;
  }

  private abs(value: number) {
    return value < 0 ? -value : value;
  }

  private pow(base: number, exponent: number) {
    let result = 1;
    for (let i = 0; i < exponent; i++) {
      result *= base;
    }
    return result;
  }
}
