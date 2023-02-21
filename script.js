const display = document.querySelector('.display');
const buttons = document.getElementsByTagName("button");
const clearButton = document.getElementById("clear");
let displayValue = 0;
display.textContent = displayValue;
var firstOperand = undefined;
let secondOperand = undefined;
let operator;
var result = undefined;
var equalsActive = false;
var operatorActive = false;

// Receives function call from an HTML button, calls subsequent function based on buttonID.

function buttonPress(buttonId) {
    if (buttonId == "zerozero") {
        zeroZeroPress();
    } else if (buttonId == "clear") { 
        clear();
    } else if (buttonId == "add" || buttonId === "subtract" || buttonId === "divide" || buttonId === "multiply") { 
        operatorPress(buttonId);
    } else if (buttonId == ".") {
        decimalPress();
    } else if (buttonId == "equals") {
        equalsPress();
    } else if (buttonId === "+/-") {
        plusMinusPress();
    } else if (buttonId === "%") {
        percentPress();
    } else if (buttonId >= 0 && buttonId < 10) {
        numberPress(buttonId);
    }
}

// Button-press functions.

function clear() {
    displayValue = 0;
    updateDisplay(displayValue);
    firstOperand = undefined;
    secondOperand = undefined;
    operator = undefined;
    result = undefined;
    equalsActive = false;
    operatorActive = false;
    display.style.cssText += "font-size: 30px;padding: 7px;";
    for (const button of buttons) {
        button.disabled = false;
    }
}

function operatorPress(buttonId) {
    firstOperand = displayValue;
    operator = buttonId;
    operatorActive = true;
    equalsActive = false;
}

function numberPress(buttonId) {
    if (operatorActive === true || displayValue == 0) {
        displayValue = buttonId;
        updateDisplay(displayValue);
        operatorActive = false;
    } else if (operatorActive === false) {
        displayValue += buttonId;
        updateDisplay(displayValue);
    }
}

function decimalPress() {
    if (!displayValue.toString().includes(".")) {
        displayValue += ".";
        updateDisplay(displayValue);
    }
}

function equalsPress() {
    if (equalsActive === false) {
        equalsActive = true;
        secondOperand = displayValue;
        operate(operator, firstOperand, secondOperand);
    } else if (equalsActive === true) {
        firstOperand = displayValue;
        operate(operator, firstOperand, secondOperand);
    }
}

function plusMinusPress() {
    operator = "multiply";
    firstOperand = displayValue;
    secondOperand = -1;
    operate(operator, firstOperand, secondOperand);
}

function percentPress() {
    operator = "multiply";
    firstOperand = displayValue;
    secondOperand = 0.01;
    operate(operator, firstOperand, secondOperand);
}

function zeroZeroPress() {
    buttonPress(0);
    buttonPress(0);
}

// Updates display, shows error if the value is too long.

function updateDisplay(displayValue) {

    if (displayValue.toString().includes("e")) {
        display.style.cssText += "font-size: 30px;padding: 7px;";
        displayValue = "error";
        display.textContent = displayValue;
        for (const button of buttons) {
            button.disabled = true;
        }
        clearButton.disabled = false;
    } else if (displayValue.toString().length > 10) {
        display.style.cssText += "font-size: 10px;padding: 18.5px;";
        display.textContent = displayValue
    } else {
        display.textContent = displayValue;
    }
}

// Mathematical functions.

function add(firstOperand, secondOperand) {
    return result = parseFloat(firstOperand) + parseFloat(secondOperand);
}

function subtract(firstOperand, secondOperand) {
    return result = parseFloat(firstOperand) - parseFloat(secondOperand);
}

function multiply(firstOperand, secondOperand) {
    return result = parseFloat(firstOperand) * parseFloat(secondOperand);
}

function divide(firstOperand, secondOperand) {
    // First checks to see if the divisor is zero, chastises the user if so. 
    if (secondOperand === 0) {
        alert("You know better than to divide by zero. Use your head.");
        return result = 0;
    } else {
        return result = parseFloat(firstOperand) / parseFloat(secondOperand);
    }
}

// Performs operation, updates display with result.

function operate(operator, firstOperand, secondOperand) {
    switch(operator) {
        case "add":
            displayValue = add(firstOperand, secondOperand);
            updateDisplay(displayValue);
            break;
        case "subtract":
            displayValue = subtract(firstOperand, secondOperand);
            updateDisplay(displayValue);
            break;
        case "multiply":
            displayValue = multiply(firstOperand, secondOperand);
            updateDisplay(displayValue);
            break;
        case "divide": 
            displayValue = divide(firstOperand, secondOperand);
            updateDisplay(displayValue);
            break;
    }
}