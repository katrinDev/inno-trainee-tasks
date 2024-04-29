import { FactorialError } from "../errors/factorialError";
import { RootOperationError } from "../errors/rootOperationError";
import { ZeroDivisionError } from "../errors/zeroDivisionError";
import { Executor } from "./executor";

const executor = new Executor();

describe("binary operations", () => {
  test("add", () => {
    expect(executor.countBinaryOperation(2, 3, "+")).toBe(5);

    expect(executor.countBinaryOperation(0, -1, "+")).toBe(-1);
  });

  test("subtract", () => {
    expect(executor.countBinaryOperation(6, 3, "-")).toBe(3);

    expect(executor.countBinaryOperation(0, -1, "-")).toBe(1);
  });

  test("multiply", () => {
    expect(executor.countBinaryOperation(6, 3, "x")).toBe(18);

    expect(executor.countBinaryOperation(0, -1, "x")).toBe(-0);

    expect(executor.countBinaryOperation(2, -2, "x")).toBe(-4);
  });

  test("divide", () => {
    expect(executor.countBinaryOperation(6, 3, "/")).toBe(2);

    expect(executor.countBinaryOperation(0, -1, "/")).toBe(-0);

    expect(() => executor.countBinaryOperation(2, 0, "/")).toThrow(
      ZeroDivisionError
    );
  });

  test("put in power", () => {
    expect(executor.countBinaryOperation(4, 2, "^")).toBe(16);

    expect(executor.countBinaryOperation(4, -2, "^")).toBe(0.0625);
  });

  test("power", () => {
    expect(executor.countBinaryOperation(4, 2, "^")).toBe(16);

    expect(executor.countBinaryOperation(4, -2, "^")).toBe(0.0625);
  });

  test("root", () => {
    expect(executor.countBinaryOperation(64, 2, "√")).toBeCloseTo(8, 5);

    expect(executor.countBinaryOperation(4, 0, "√")).toBe(1);

    expect(() => executor.countBinaryOperation(4, -5, "√")).toThrow(
      RootOperationError
    );

    expect(() => executor.countBinaryOperation(0, 0, "√")).toThrow(
      RootOperationError
    );

    expect(() => executor.countBinaryOperation(-3, 2, "√")).toThrow();
  });
});

describe("power unary operations", () => {
  test("square power", () => {
    expect(executor.squarePower(4)).toBe(16);

    expect(executor.squarePower(-3)).toBe(9);

    expect(executor.squarePower(0)).toBe(0);
  });

  test("cube power", () => {
    expect(executor.cubePower(2)).toBe(8);

    expect(executor.cubePower(-2)).toBe(-8);

    expect(executor.cubePower(0)).toBe(0);
  });

  test("ten in power", () => {
    expect(executor.tenInPower(2)).toBe(100);

    expect(executor.tenInPower(-1)).toBe(0.1);

    expect(executor.tenInPower(0)).toBe(1);
  });
});

test("percent count", () => {
  expect(executor.percentCount(5, 5)).toBe(0.25);

  expect(executor.percentCount(5, 0)).toBe(0);
});

test("reciprocal", () => {
  expect(executor.reciprocal(5)).toBe(0.2);

  expect(executor.reciprocal(-2)).toBe(-0.5);

  expect(() => executor.reciprocal(0)).toThrow(ZeroDivisionError);
});

test("sign change", () => {
  expect(executor.signChange(3)).toBe(-3);

  expect(executor.signChange(-3)).toBe(3);
});

test("factorial", () => {
  expect(executor.factorial(0)).toBe(1);

  expect(executor.factorial(5)).toBe(120);

  expect(() => executor.factorial(-3)).toThrow(FactorialError);
});
