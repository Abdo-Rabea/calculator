//
const calculatorDisplay = document.querySelector("h1");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.getElementById("clear-btn");
const decimalBtn = document.querySelector(".decimal");
const numberBtns = document.querySelectorAll(".number");

let isOperatorJustClicked = true; // make false after an any number - decimal - clear clicked
let currentNumber = ""; // mapped with displayedCalc.
let result = "0";
let operator = "=";
//* functions

// helpers
function initialize() {
  isOperatorJustClicked = true;
  currentNumber = "";
  result = "0";
  operator = "=";
  display(currentNumber);
}

function display(number) {
  if (!number) number = "0";
  calculatorDisplay.textContent = number;
}
// numbers

function handleNumber(e) {
  isOperatorJustClicked = false;
  const num = e.target.value;
  currentNumber += num;
  if (!Number(currentNumber) && !currentNumber.includes("."))
    currentNumber = "";
  display(currentNumber);
}

function handleDecimal() {
  isOperatorJustClicked = false;
  if (currentNumber.includes(".")) return;
  if (!currentNumber) currentNumber = "0.";
  else currentNumber += ".";
  display(currentNumber);
}
// return the new result after apply operation resutl op current with returing currentNumber if no valid operator given
function applyOperation(operator, result, currentNumber) {
  const n1 = Number(result),
    n2 = Number(currentNumber);
  let res = Number(result);
  switch (operator) {
    case "+":
      res = n1 + n2;
      break;
    case "-":
      res = n1 - n2;
      break;
    case "*":
      res = n1 * n2;
      break;
    case "/":
      res = n1 / n2;
      break;
    default:
      res = n2;
  }
  return String(res);
}
function handleOperator(e) {
  const newOperator = e.target.value;
  if (isOperatorJustClicked) {
    operator = newOperator;
    return;
  }
  // save currentNumber into previous number

  // update result, currentNumber values
  result = applyOperation(operator, result, currentNumber);
  display(result);
  currentNumber = "";

  operator = newOperator;
  isOperatorJustClicked = true;
}
// evetn listenres
numberBtns.forEach((number) => {
  number.addEventListener("click", handleNumber);
});

operatorBtns.forEach((operator) => {
  operator.addEventListener("click", handleOperator);
});

decimalBtn.addEventListener("click", handleDecimal);

clearBtn.addEventListener("click", initialize);

// on load
initialize();

// constants
// calculatorDisplay
// all operators (+,-,*,/, =)
// clear button
// all numbers (0-9,.)

// variables
// displayed number -> string
// isOperatorClicked -> boolean

// big bang
// on operator click -> click operator
// on number click -> append number or clear and append
