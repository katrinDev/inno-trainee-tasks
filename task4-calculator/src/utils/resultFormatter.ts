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
    console.log(resultNumber);
    if (
      resultNumber !== 0 &&
      (Math.abs(resultNumber) > 1e6 || Math.abs(resultNumber) < 1e-6)
    ) {
      return resultNumber.toExponential(4);
    }

    if (!Number.isInteger(resultNumber)) {
      return result.slice(0, 8);
    }

    return result;
  }
}
