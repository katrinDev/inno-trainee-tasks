/**
 * @module main
 * @description Contains main logic for handling document events
 */

import {
  anyPowerOptn,
  clearAll,
  cubePower,
  cubeRoot,
  equalsClicked,
  operandsChange,
  percentOptn,
  reciprocal,
  signChangeOptn,
  arithmSignClicked,
  squarePower,
  squareRoot,
  tenInPowerOptn,
  anyRootOptn,
  factorial,
  memoryAdd,
  memoryClear,
  memorySubstact,
  memoryRecall,
  undo,
} from "./app";
import { DIGITS, ARITHMETIC_OPERATORS } from "./static/textContentArrays";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.remove("hidden");
});

document.querySelector("#undo")?.addEventListener("click", () => {
  undo();
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
    arithmSignClicked(key);
    return;
  }

  /**
   * If a power operation was clicked
   */
  if (target.classList.contains("power-oprtn")) {
    switch (target.id) {
      case "square":
        squarePower();
        break;
      case "cube":
        cubePower();
        break;
      case "any-power":
        anyPowerOptn();
        break;
      case "ten-in-power":
        tenInPowerOptn();
        break;
    }

    return;
  }

  /**
   * If a root operation was clicked
   */
  if (target.classList.contains("root-oprtn")) {
    switch (target.id) {
      case "square-root":
        squareRoot();
        break;
      case "cube-root":
        cubeRoot();
        break;
      case "any-root":
        anyRootOptn();
        break;
    }

    return;
  }

  /**
   * If a reciprocal operation button was clicked
   */
  if (target.id === "reciprocal") {
    reciprocal();
    return;
  }

  /**
   * If a factorial operation button was clicked
   */
  if (target.id === "factorial") {
    factorial();
    return;
  }

  /**
   * If either sign change operation or
   * getting percent operation was clicked
   */
  if (target.classList.contains("convert-operator")) {
    switch (target.id) {
      case "sign-change":
        signChangeOptn();
        break;
      case "percent":
        percentOptn();
        break;
    }

    return;
  }

  /**
   * If a memory operation was clicked
   */
  if (target.classList.contains("memory-operation")) {
    switch (target.id) {
      case "mc":
        memoryClear();
        break;
      case "m+":
        memoryAdd();
        break;
      case "m-":
        memorySubstact();
        break;
      case "mr":
        memoryRecall();
        break;
    }
    return;
  }

  /**
   * If an equels button was clicked
   */
  if (key === "=") {
    equalsClicked();
  }
});
