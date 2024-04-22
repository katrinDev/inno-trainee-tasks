/**
 * @module main
 * @description Contains main logic for handling document events */

import {
  anyPowerOptn,
  clearAll,
  cubeOptn,
  equalsClicked,
  operandsChange,
  output,
  signClicked,
  squareOptn,
  tenInPowerOptn,
} from "./app";
import { calcData } from "./state/calculationState";
import {
  DIGITS,
  ARITHMETIC_OPERATORS,
  SPECIAL_OPERATORS,
} from "./static/textContentArrays";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.remove("hidden");
});

document.querySelector(".buttons")?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  /**
   * If an empty space was clicked
   */
  if (target.tagName.toLowerCase() !== "button") {
    return;
  }

  /**
   * If a "clear all" button was clicked
   */
  if (target.id === "ac") {
    clearAll();
    return;
  }

  output.textContent = "";

  /**
   * Get clicked button text
   */
  const key = target.textContent ?? "";

  /**
   * If a digit button was clicked
   */
  if (DIGITS.includes(key)) {
    operandsChange(key);
    return;
  }

  /**
   * If an arithmetic operator button was clicked
   */
  if (ARITHMETIC_OPERATORS.includes(key)) {
    signClicked(key);
    return;
  }

  if (target.classList.contains("power-oprtn")) {
    switch (target.id) {
      case "square":
        squareOptn();
        break;
      case "cube":
        cubeOptn();
        break;
      case "any-power":
        anyPowerOptn();
        break;
      case "ten-in-power":
        tenInPowerOptn();
        break;
      default:
        return;
    }

    return;
  }

  if (key === "=") {
    /**
     * If an equels button was clicked
     */
    equalsClicked();
  }
});
