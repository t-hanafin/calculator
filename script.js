const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons');
const clearButton = document.getElementById('clear');
let displayValue = 0;
display.textContent = displayValue;
var firstOperand = undefined;
let secondOperand = undefined;
let operator = '';
var result = undefined;
var equalsActive = false;
var operatorActive = false;

// Listens for click events on the HTML buttons, 
// calls subsequent function based on buttonID.

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        buttonId = e.target.id;
        buttonPress(buttonId);
    })
})

function buttonPress(buttonId) {
    if (buttonId == 'zerozero') {
        zeroZeroPress();
    } else if (buttonId == 'clear') { 
        clear();
    } else if (
            buttonId == 'add' || 
            buttonId === 'subtract' || 
            buttonId === 'divide' || 
            buttonId === 'multiply') { 
        operatorPress(buttonId);
    } else if (buttonId == '.') {
        decimalPress();
    } else if (buttonId == 'equals') {
        equalsPress();
    } else if (buttonId === '+/-') {
        plusMinusPress();
    } else if (buttonId == 'backspace') {
        backspacePress();
    } else if (parseInt(buttonId) >= 0 && parseInt(buttonId) < 10) {
        numberPress(buttonId);
    }
}

// Button-press functions.

function clear() {
    displayValue = 0;
    updateDisplay(displayValue);
    firstOperand = undefined;
    secondOperand = undefined;
    operator = '';
    result = undefined;
    equalsActive = false;
    operatorActive = false;
    for (const button of buttons) { // This recovers from error.
        button.disabled = false;
    }
}

function numberPress(buttonId) {
    if (displayValue == 0 || displayValue === 0) {
        displayValue = buttonId;
        updateDisplay(displayValue);
        operatorActive = false;
        equalsActive = false;
    } else if (operatorActive == true || equalsActive == true) {
        displayValue = buttonId;
        updateDisplay(displayValue);
        operatorActive = false;
        equalsActive = false;
    } else if (operatorActive === false && displayValue.length < 11) {
        displayValue += buttonId;
        updateDisplay(displayValue);
    }
}

function decimalPress() {
    if (!displayValue.toString().includes('.')) {
        displayValue += '.';
        updateDisplay(displayValue);
    }
}

function plusMinusPress() {
    displayValue *= -1;
    updateDisplay(displayValue);
}

function backspacePress() {
    if (displayValue == 0) {
        displayValue = 0;
        updateDisplay(displayValue);
    } else if (displayValue.length <= 1) {
        displayValue = 0;
        updateDisplay(displayValue);
    } else {
        displayValue = displayValue.substring(0, (displayValue.length - 1));
        updateDisplay(displayValue);
    }
}

function zeroZeroPress() {
    buttonPress(0);
    buttonPress(0);
}

// The equals button has two modes: 
// In the first, the equals button performs an operation on the two 
// operands entered. In the second, the equals button continues the
// last operation using the last operand entered and the previous result. 

function equalsPress() {
    if (equalsActive == false && operator != '') {
        equalsActive = true;
        secondOperand = displayValue;
        operate(operator, firstOperand, secondOperand);
        displayValue = result;
        updateDisplay(displayValue);
    } else if (equalsActive == true && operator != '') {
        firstOperand = displayValue;
        operate(operator, firstOperand, secondOperand);
        displayValue = result;
        updateDisplay(displayValue);
    }
}

// The operator buttons have three modes: the first time one is pressed, it 
// writes the displayed value to the firstOperand variable. In the second mode, 
// if there is no secondOperand value then the operator button performs 
// the given operation just using firstOperand (i.e. 1 ++ will result in 2).
// The third mode allows for continuous operations with a running total. 

function operatorPress(buttonId) {
    if (equalsActive) {
        displayValue = secondOperand;
        updateDisplay(displayValue);
        equalsActive = false;
    } else if (firstOperand === undefined) {
        firstOperand = displayValue;
    } else {
        secondOperand = displayValue;
    }
    if (operatorActive) {
        // Performs an operation on the second operator-button-press 
        // if there's only been one operand entered. 
        updateDisplay(operate(operator, firstOperand, secondOperand)); 
    } else if (!isNaN(operate(operator, firstOperand, secondOperand))) { 
        // Does the math if there are two operands. 
        operate(operator, firstOperand, secondOperand);
        displayValue = result;
        updateDisplay(displayValue);
        firstOperand = displayValue;
        operatorActive = true;
    } else { // Sets the operator to active if there's only one operand. 
        operatorActive = true;
    }
    operator = buttonId;
}

// Updates display, shows error if the value is too long.

function updateDisplay(displayValue) {
    displayValue = displayValue.toString();
    if (displayValue.includes('+') || displayValue.length > 123452343) {
        displayValue = 'error';
        display.textContent = displayValue;
        for (const button of buttons) {
            button.disabled = true;
        }
        clearButton.disabled = false;
    } else {
        display.textContent = displayValue;
    }
    displayValue = parseFloat(displayValue);
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
    // First checks to see if the divisor is zero, chastises the user and 
    // returns 'error' if so. 
    if (secondOperand == 0) {
        alert('Don\'t divide by zero. Use your head next time.');
        firstOperand = undefined;
        secondOperand = undefined;
        return result = 0;
    } else {
        return result = parseFloat(firstOperand) / parseFloat(secondOperand);
    }
}

// Performs operation, returns result.

function operate(operator, firstOperand, secondOperand) {
    switch(operator) {
        case 'add':
            return result = add(firstOperand, secondOperand);
            break;
        case 'subtract':
            return result = subtract(firstOperand, secondOperand);
            break;
        case 'multiply':
            return result = multiply(firstOperand, secondOperand);
            break;
        case 'divide': 
            return result = divide(firstOperand, secondOperand);
            break;
    }
}