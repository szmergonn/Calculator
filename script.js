let display = document.querySelector("#display");
let keys = document.querySelector("#keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

keys.addEventListener("click", (evt) => {
  const action = evt.target.dataset.action;
  if (!action) {
    return;
  }
  if (displayValue === "Error" && (action === "operator" || action === "equals")) {
    return;
  }
  if (action === "number") {
    if (waitingForSecondValue === true) {
      displayValue = evt.target.value;
      waitingForSecondValue = false;
    } else if (displayValue === "0") {
      displayValue = evt.target.value;
    } else {
      displayValue += evt.target.value;
    }
  } else if (action === "clear") {
    displayValue = "0";
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
  } else if (action === "decimal") {
    if (waitingForSecondValue === true) {
      displayValue = "0.";
      waitingForSecondValue = false;
    } else if (displayValue.includes(".")) {
      return;
    } else if (displayValue === "0") {
      displayValue = "0.";
    } else {
      displayValue += ".";
    }
  } else if (action === "operator") {
    if (operator !== null && waitingForSecondValue === false) {
      let secondValue = Number(displayValue);
      let result = calculate(firstValue, operator, secondValue);
      displayValue = String(result);
      firstValue = result;
      operator = evt.target.value;
      waitingForSecondValue = true;
    } else if (firstValue === null) {
      firstValue = Number(displayValue);
      operator = evt.target.value;
      waitingForSecondValue = true;
    } else if (waitingForSecondValue === true) {
      operator = evt.target.value;
    }
  } else if (action === "equals") {
    if (operator === null || firstValue === null) {
      return;
    }
    let secondValue = Number(displayValue);
    if (operator === "/" && secondValue === 0) {
      displayValue = "Error";
      waitingForSecondValue = true;
      firstValue = null;
      operator = null;
    } else {
      let result = calculate(firstValue, operator, secondValue);
      displayValue = String(result);
      firstValue = result;
      operator = null;
      waitingForSecondValue = true;
    }
  }
  display.value = displayValue;
});

function calculate(first, operator, second) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }
}
