function add(numberOne, numberTwo) {
    return result = numberOne + numberTwo;
}

function subtract(numberOne, numberTwo) {
    return result = numberOne - numberTwo;
}

function multiply(numberOne, numberTwo) {
    return result = numberOne * numberTwo;
}

function divide(numberOne, numberTwo) {
    // First checks to see if the divisor is zero, chastises the user if so. 
    if (numberTwo == 0) {
        return result = "You know better than to divide by zero. Use your head.";
    } else {
        return result = numberOne / numberTwo;
    }
}

function operate(operator, numberOne, numberTwo) {
    switch(operator) {
        case 0: // Addition
            add(numberOne, numberTwo);
            break;
        case 1: // Subtraction
            subtract(numberOne, numberTwo);
            break;
        case 2: // Multiplication
            multiply(numberOne, numberTwo);
            break;
        case 3: // Division
            divide(numberOne, numberTwo);
            break;
        default: 
            break;
    }
}

operate(0, 10, 1);
console.log(result);

const display = document.querySelector('.display');
display.textContent = 0;

function updateDisplay(buttonId) {
    if (buttonId == "clear") {
        display.textContent = 0;
    } else if (buttonId == "zero" && display.textContent == 0) {
        display.textContent = 0;
    } else if (display.textContent == 0 && buttonId != "zero") {
        display.textContent = buttonId;
    } else {
        display.textContent += buttonId;
    }    
}