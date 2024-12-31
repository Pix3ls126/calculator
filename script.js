let firstNumber = "";
let secondNumber = "";
let operator = null;
let shouldResetDisplay = false;

const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector(".decimal");

// Update the display
function updateDisplay(value) {
    if (shouldResetDisplay) {
        display.textContent = value;
        shouldResetDisplay = false;
    } else {
        display.textContent = display.textContent === "0" ? value : display.textContent + value;
    }
}

// Clear the calculator
function clearCalculator() {
    firstNumber = "";
    secondNumber = "";
    operator = null;
    shouldResetDisplay = false;
    display.textContent = "0";
}

// Handle digit button clicks
function handleDigitClick(e) {
    updateDisplay(e.target.textContent);
}

// Handle operator button clicks
function handleOperatorClick(e) {
    if (operator !== null) {
        evaluate();
    }
    firstNumber = display.textContent;
    operator = e.target.textContent;
    shouldResetDisplay = true;
}

// Perform the calculation
function evaluate() {
    if (operator === null || shouldResetDisplay) return;

    secondNumber = display.textContent;
    const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
    display.textContent = result;
    firstNumber = result;
    secondNumber = "";
    operator = null;
    shouldResetDisplay = true;
}

// Perform the appropriate operation
function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return b === 0 ? "Error" : a / b;
        default:
            return null;
    }
}

// Handle decimal button click
function handleDecimalClick() {
    if (shouldResetDisplay) {
        display.textContent = "0.";
        shouldResetDisplay = false;
        return;
    }

    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}

// Add event listeners
digitButtons.forEach(button => button.addEventListener("click", handleDigitClick));
operatorButtons.forEach(button => button.addEventListener("click", handleOperatorClick));
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clearCalculator);
decimalButton.addEventListener("click", handleDecimalClick);
