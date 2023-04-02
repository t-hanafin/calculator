const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons');
const clearButton = document.getElementById('clear');
var displayValue = 0;
updateDisplay(displayValue);
var firstOperand = undefined;
var secondOperand = undefined;
var operator = '';
var result = undefined;
var buttonId = '';
var equalsActive = false; // Changes the mode of the equals button.
var operatorActive = false; // Changes the mode of the operator buttons.

// Listens for click events on the HTML buttons, 
// calls subsequent function based on buttonID.

buttons.forEach((button) => {
    button.addEventListener('mouseup', (e) => {
        buttonId = e.target.id;
        buttonPress(buttonId);
    })
})

function buttonPress(buttonId) {
    switch (buttonId) {
        case 'clear':
            clear();
            break;
        case '.':
            decimalPress();
            break;
        case 'equals':
            equalsPress();
            break;
        case 'plusminus':
            plusMinusPress();
            break;
        case 'backspace':
            backspacePress(buttonId);
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            numberPress(buttonId);
            break;
        case 'zero':
            numberPress(0);
            break;
        default:
            operatorPress(buttonId);
            break;
    }
}

function clear() {
    if (displayValue === 'error') {
        clearError();
    } else if (displayValue != 0) {
        displayValue = 0;
        updateDisplay(displayValue);
    }
    firstOperand = undefined;
    secondOperand = undefined;
    operator = '';
    result = undefined;
    equalsActive = false;
    operatorActive = false;
    display.style.setProperty('font-size', '3rem');
}

function clearError() {
    for (const button of buttons) { 
        button.disabled = false;
    }
    clearButton.textContent = "c";
    displayValue = 0;
    updateDisplay(displayValue);
}

function decimalPress() {
    if (operatorActive) {
        updateDisplay(displayValue = "0" + buttonId);
        operatorActive = false;
    } else if (!displayValue.toString().includes('.') && !equalsActive) {
        displayValue += '.';
        updateDisplay(displayValue);        
    }
}

function plusMinusPress() {
    if (equalsActive) {
        var plusMinusHolder = displayValue * -1;
        clear();
        displayValue = plusMinusHolder;
        updateDisplay(displayValue);
    } else {
        updateDisplay(displayValue *= -1);
    }
}

function backspacePress(buttonId) {
    // positiveDisplayValue allows the backspace button to work on integers between -9 and -1.  
    positiveDisplayValue = Math.sqrt(parseFloat(displayValue) * parseFloat(displayValue));
    if (positiveDisplayValue.toString().length === 1) {
        updateDisplay(displayValue = 0);
    } else {
        updateDisplay(displayValue = displayValue.toString().substring(0, (displayValue.toString().length - 1)));
    }
    // This covers a weird rare case where the display shows '-0.' This happens when deleting
    // values between -1 and 0. '-0.' resolves to the number -0, which is an actual specific
    // number in Javascript. No idea why. Instead of backspacing through -0., this
    // option just zeroes the display before it can show '-0.'
    if (1 / displayValue === -Infinity || displayValue == 0) {
        updateDisplay(displayValue = 0);
    }
}

function numberPress(buttonId) {
    if (displayValue === 0 && equalsActive) {
        clear();
        updateDisplay(displayValue = buttonId);
    } else if (displayValue === 0) {
        updateDisplay(displayValue = buttonId);
    } else if (equalsActive || operatorActive) {
        updateDisplay(displayValue = buttonId);
        operatorActive = false;
        equalsActive = false;
    } else {
        updateDisplay(displayValue += buttonId);
    }
}

// The equals button has two modes: 
// In the first, the equals button performs an operation on the two 
// operands entered. In the second, the equals button continues the
// last operation using the last operand entered and the previous result. 

function equalsPress() {
    if (equalsActive === false && operator != '') {
        equalsActive = true;
        secondOperand = displayValue;
        operate(operator, firstOperand, secondOperand);
        displayValue = result;
        updateDisplay(displayValue);
    } else if (equalsActive === true && operator != '') {
        firstOperand = displayValue;
        operate(operator, firstOperand, secondOperand);
        displayValue = result;
        updateDisplay(displayValue);
    } else if (operator != '' && (!isNaN(firstOperand) && !isNaN(secondOperand))) {
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
    } else if (!isNaN(firstOperand) && !isNaN(secondOperand)) { 
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

function updateDisplay() {
    if (displayValue.toString().length <= 9) {
        display.textContent = displayValue;
    } else if (displayValue.toString().length > 14) {
        errorMode();
    } else if (displayValue.toString().length > 9) {
        display.style.setProperty('font-size', '1.9rem');
        display.textContent = displayValue;
    }
}

// This puts the calculator into error mode and stops input. It also
// changes the clear button into a clear-error button.

function errorMode() {
    display.style.setProperty('font-size', '3rem');
    displayValue = 'error';
    display.textContent = displayValue;
    for (const button of buttons) { 
        button.disabled = true;     
    }
    clearButton.disabled = false;            
    clearButton.textContent = "ce";
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
        clear();
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

// Keypress event listener.

document.addEventListener('keydown', (event) => {
    let keyboardOperator = {
		'+': 'add',
		'-': 'subtract',
		'/': 'divide',
		'x': 'multiply',
        'X': 'multiply',
		'*': 'multiply'
	}
    if(!isNaN(event.key)){
        buttonPress(event.key);
	}
    if (event.key == 'Backspace') {
        buttonPress('backspace');
	}
    if (event.key == 'c' || event.key == 'C' || event.key == 'Escape') {
        buttonPress('clear');
    }
	if (event.key === '=' || event.key === 'Enter') {
        event.key = '=';
        buttonPress('equals');	
	}
	if (event.key === '.') {
		buttonPress(event.key);	
	}
    if (['+', '-', '/', 'x', 'X', '*'].includes(event.key)) {
        buttonPress(keyboardOperator[event.key]);
    }
});