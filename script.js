const display = document.querySelector('.display');
let displayValue = 0;
display.textContent = displayValue;
var firstValue = null;
let secondValue = null;
let operator;
var result = null;
lastPressed = false;

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
    lastPressed = false;
    display.style.cssText += "font-size: 2.5rem";
}

function operatorPressed(buttonId) {
    firstValue = displayValue;
    operator = buttonId;
    lastPressed = "operator";
}

function numberPressed(buttonId) {
    if (lastPressed === "operator" || displayValue === 0) {
        displayValue = buttonId;
        updateDisplay(displayValue);
        operatorLastPressed = false;
    } else {
        displayValue += buttonId;
        updateDisplay(displayValue);
    }
    lastPressed = "number";
}

function decimalPressed() {
    lastPressed = "decimal";
    let addDecimal = displayValue.includes(".");
    if (addDecimal === false) {
        displayValue += ".";
        updateDisplay(displayValue);
    }
}

function equalsPressed() {
    if (lastPressed != "equals") {
        lastPressed = "equals";
        secondValue = displayValue;
        operate(operator, firstValue, secondValue);
    } else if (lastPressed === "equals") {
        firstValue = displayValue;
        operate(operator, firstValue, secondValue);
    }
}

function plusMinusPressed() {
    displayValue = parseFloat(displayValue) * -1;
    updateDisplay(displayValue);
}

function percentPressed() {
    displayValue = parseFloat(displayValue) * 0.01;
    updateDisplay(displayValue);
}

// Updates display, shows error if the value is too long.

function updateDisplay(displayValue) {
    const shouldBeError = displayValue.toString().includes("+");
    if (shouldBeError) {
        displayValue = "error";
        display.textContent = displayValue;
    } else if (displayValue.toString().length > 9) {
        display.style.cssText += "font-size: 1rem";
        display.textContent = displayValue
    } else {
        display.textContent = displayValue;
    }
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