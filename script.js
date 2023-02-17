const display = document.querySelector('.display');
var displayValue = 0;
display.textContent = displayValue;
var firstValue = undefined;
var secondValue = undefined;
let operator;
let result = null;

function add(firstValue, secondValue) {
    return result = firstValue + secondValue;
}

function subtract(firstValue, secondValue) {
    return result = firstValue - secondValue;
}

function multiply(firstValue, secondValue) {
    return result = firstValue * secondValue;
}

function divide(firstValue, secondValue) {
    // First checks to see if the divisor is zero, chastises the user if so. 
    if (secondValue == 0) {
        return result = "You know better than to divide by zero. Use your head.";
    } else {
        return result = firstValue / secondValue;
    }
}

function operate(operator, firstValue, secondValue) {
    switch(operator) {
        case "add":
            result = displayValue = add(firstValue, secondValue);
            updateDisplay(result);
            break;
        case "subtract":
            result = subtract(firstValue, secondValue);
            updateDisplay(result);
            break;
        case "multiply":
            result = multiply(firstValue, secondValue);
            updateDisplay(result);
            break;
        case "divide": 
            result = divide(firstValue, secondValue);
            updateDisplay(result);
            break;
        default: 
            break;
    }
}

function updateDisplay(buttonId) {
    if (firstValue === undefined) {
        if (buttonId == "clear") {
            displayValue = 0;
            operator = undefined;
            result = null;
        } else if (buttonId == "zero" && display.textContent == 0) {
            displayValue = 0;
        } else if (display.textContent == 0 && buttonId != "zero") {
            displayValue = buttonId;
        } else if (buttonId == "." && displayValue.includes(".")) {
            console.log("this message is here because the decimal button was pressed more than once and i don't know how to make javascript just do nothing yet");
        } else {
            displayValue += buttonId;
        }
    } else if (firstValue != undefined) {
        displayValue = 0;
        if (buttonId == "clear") {
            displayValue = 0;
            firstValue = undefined;
            operator = undefined;
            result = null;
        } else if (buttonId == "zero" && display.textContent == 0) {
            displayValue = 0;
        } else if (display.textContent == 0 && buttonId != "zero") {
            displayValue = buttonId;
            secondValue = buttonId;
        } else if (buttonId == "." && displayValue.includes(".")) {
            console.log("this message is here because the decimal button was pressed more than once and i don't know how to make javascript just do nothing yet");
        } else {
            displayValue += buttonId;
        }
    }
    display.textContent = displayValue;
}

function operatorEntered(buttonId) {
    firstValue = displayValue;
    operator = buttonId;
}

function equals() {
    secondValue = displayValue;
    console.log(operator);
    operate(operator, firstValue, secondValue);
}

function clear(buttonId) {
    if (buttonId = "clear") {
        console.log(displayValue, firstValue, secondValue, operator, result);
        displayValue = 0;
        firstValue = undefined;
        secondValue = undefined;
        operator = undefined;
        result = undefined;
        console.log(displayValue, firstValue, secondValue, operator, result);        
    } else {
        console.log("this is weird");
    }
}