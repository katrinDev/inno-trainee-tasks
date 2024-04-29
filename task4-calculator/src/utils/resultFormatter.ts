/**
 * Contains functions for formatting values
 * into suitable for output form
 * @class
 */

export class ResultFormatter {
  /**
   * Transforms the string result
   * @param result - Calculations result
   * @return Calculations result suitable for output
   */
  stringCropping(result: string) {
    const resultNumber = parseFloat(result);

    if (
      resultNumber !== 0 &&
      (Math.abs(resultNumber) > 1e6 || Math.abs(resultNumber) < 1e-6)
    ) {
      return resultNumber.toExponential(3);
    }

    if (!Number.isInteger(resultNumber)) {
      return this.effectivelyIntegerCheck(resultNumber.toString());
    }

    return result;
  }

  private effectivelyIntegerCheck(numStr: string): string {
    numStr = numStr.slice(0, 8);

    let decimalIndex = numStr.indexOf(".");

    let fractionalPart = numStr.slice(decimalIndex + 1);
    for (let i = 0; i < fractionalPart.length; i++) {
      if (fractionalPart[i] !== "0") {
        return numStr;
      }
    }
    return numStr.slice(0, decimalIndex);
  }
}
