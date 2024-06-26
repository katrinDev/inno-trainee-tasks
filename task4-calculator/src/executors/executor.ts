/**
 * @module executor
 */
import { FactorialError } from "../errors/factorialError";
import { NegativeBaseRootError } from "../errors/negativeBaseRootError";
import { NegativeRootError } from "../errors/negativeRootError";
import { RootOperationError } from "../errors/rootOperationError";
import { ZeroDivisionError } from "../errors/zeroDivisionError";

/**
 * Handles arithmetic operations
 * @class
 */
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

  /**
   * Calculates factorial of the input number
   * @param value - number to get a factorial from
   * @returns factorial
   */
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

  /**
   * Calculates any root of the number
   * @param value Number to change
   * @param root Root value
   * @returns The result of root operation
   */
  nthRoot(value: number, root: number) {
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

  /**
   * Calculates the absolute number
   * @param value number to change
   * @returns absolute number
   */
  private abs(value: number) {
    return value < 0 ? -value : value;
  }

  /**
   * Calculates the power of a number
   * @param base
   * @param exponent
   * @returns the result of power operation
   */
  private pow(base: number, exponent: number) {
    let result = 1;
    for (let i = 0; i < exponent; i++) {
      result *= base;
    }
    return result;
  }
}
