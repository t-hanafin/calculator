const display = document.querySelector('.display');
let displayValue = 0;
display.textContent = displayValue;
var firstOperand = undefined;
let secondOperand = undefined;
let operator;
var result = undefined;
var equalsActive = false;
var operatorActive = false;

// Receives function call from a button, calls subsequent function based on buttonID.

function buttonPress(buttonId) {
    if (buttonId >= 0 && buttonId < 10) {
        numberPress(buttonId);
    } else if (buttonId == "zerozero") {
        zeroZeroPress();
    } else if (buttonId === "clear") { 
        clear();
    } else if (buttonId === "add" || buttonId === "subtract" || buttonId === "divide" || buttonId === "multiply") { 
        operatorPress(buttonId);
    } else if (buttonId === ".") {
        decimalPress();
    } else if (buttonId === "equals") {
        equalsPress();
    } else if (buttonId === "+/-") {
        plusMinusPress();
    } else if (buttonId === "%") {
        percentPress();
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
}

function operatorPress(buttonId) {
    if (firstOperand == null) {
        firstOperand = displayValue;
        operator = buttonId;
        operatorActive = true;
    } else if (firstOperand != null) {
        equalsPress();
        equalsActive = false;
        firstOperand = displayValue;
        operator = buttonId;
        operatorActive = true;
    }
}

function numberPress(buttonId) {
    if (operatorActive === true || displayValue === 0) {
        displayValue = buttonId;
        updateDisplay(displayValue);
        operatorActive = false;
    } else if (operatorActive === false) {
        displayValue += buttonId;
        updateDisplay(displayValue);
    }
}

function decimalPress() {
    let addDecimal = displayValue.includes(".");
    if (addDecimal === false) {
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
    displayValue = parseFloat(displayValue) * -1;
    updateDisplay(displayValue);
}

function percentPress() {
    displayValue = parseFloat(displayValue) * 0.01;
    updateDisplay(displayValue);
}

function zeroZeroPress() {
    buttonPress(0);
    buttonPress(0);
}

// Updates display, shows error if the value is too long.

function updateDisplay(displayValue) {
    const shouldBeError = displayValue.toString().includes("+");
    if (shouldBeError) {
        displayValue = "error";
        display.textContent = displayValue;
    } else if (displayValue.toString().length > 10) {
        display.style.cssText += "font-size: 20px;padding: 12.75px;";
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
        console.log(firstOperand, secondOperand);
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