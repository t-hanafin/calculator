const display = document.querySelector('.display');
var displayValue = 0;
display.textContent = displayValue;
var firstValue = null;
let secondValue = null;
let operator;
var result = null;
operatorLastPressed = false;
equalsLastPressed = false;

// Receives function call from a button, calls subsequent function based on buttonID.

function buttonPressed(buttonId) {
    if (buttonId >= 0 && buttonId < 10) {
        numberPressed(buttonId);
    } else if (buttonId == "zerozero") {
        zeroZeroPressed();
    } else if (buttonId === "clear") { 
        clear();
    } else if (buttonId === "add" || buttonId === "subtract" || buttonId === "divide" || buttonId === "multiply") { 
        operatorPressed(buttonId);
    } else if (buttonId === ".") {
        decimalPressed();
    } else if (buttonId === "equals") {
        equalsPressed();
    } else if (buttonId === "+/-") {
        plusMinusPressed();
    } else if (buttonId === "%") {
        percentPressed();
    }
}

// Button-press functions.

function clear() {
    displayValue = 0;
    updateDisplay(displayValue);
    firstValue = undefined;
    operator = undefined;
    result = null;
    operatorLastPressed = false;
    equalsLastPressed = false;
}

function operatorPressed(buttonId) {
    firstValue = displayValue;
    operator = buttonId;
    operatorLastPressed = true;
    equalsLastPressed = false;
}

function numberPressed(buttonId) {
    if (operatorLastPressed === true || displayValue === 0) {
        displayValue = buttonId;
        updateDisplay(displayValue);
        operatorLastPressed = false;
    } else {
        displayValue += buttonId;
        updateDisplay(displayValue);
    }
    operatorLastPressed = false;
    equalsLastPressed = false;
}

function decimalPressed() {
    operatorLastPressed = false;
    equalsLastPressed = false;
    let addDecimal = displayValue.includes(".");
    if (addDecimal == false) {
        displayValue += ".";
        updateDisplay(displayValue);
    }
}

function equalsPressed() {
    operatorLastPressed = false;
    if (equalsLastPressed === false) {
        equalsLastPressed = true;
        secondValue = displayValue;
        operate(operator, firstValue, secondValue);
    } else if (equalsLastPressed === true) {
        firstValue = displayValue;
        operate(operator, firstValue, secondValue);
    }
    equalsLastPressed = true;
}

function plusMinusPressed() {
    displayValue = parseFloat(displayValue) * -1;
    updateDisplay(displayValue);
}

function percentPressed() {
    displayValue = parseFloat(displayValue) * 0.01;
    updateDisplay(displayValue);
}

// Updates display.

function updateDisplay(displayValue) {
    display.textContent = displayValue;
}

// Mathematical functions.

function add(firstValue, secondValue) {
    return result = parseFloat(firstValue) + parseFloat(secondValue);
}

function subtract(firstValue, secondValue) {
    return result = parseFloat(firstValue) - parseFloat(secondValue);
}

function multiply(firstValue, secondValue) {
    return result = parseFloat(firstValue) * parseFloat(secondValue);
}

function divide(firstValue, secondValue) {
    // First checks to see if the divisor is zero, chastises the user if so. 
    if (secondValue === 0) {
        alert("You know better than to divide by zero. Use your head.");
        return result = 0;
    } else {
        console.log(firstValue, secondValue);
        return result = parseFloat(firstValue) / parseFloat(secondValue);
    }
}

function zeroZeroPressed() {
    buttonPressed(0);
    buttonPressed(0);
}


// Performs operation, updates display with result.

function operate(operator, firstValue, secondValue) {
    switch(operator) {
        case "add":
            displayValue = add(firstValue, secondValue);
            updateDisplay(displayValue);
            break;
        case "subtract":
            displayValue = subtract(firstValue, secondValue);
            updateDisplay(displayValue);
            break;
        case "multiply":
            displayValue = multiply(firstValue, secondValue);
            updateDisplay(displayValue);
            break;
        case "divide": 
            displayValue = divide(firstValue, secondValue);
            updateDisplay(displayValue);
            break;
    }
}