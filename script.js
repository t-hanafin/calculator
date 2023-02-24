const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons');
const clearButton = document.getElementById('clear');
let displayValue = 0;
display.textContent = displayValue;
var firstOperand = undefined;
let secondOperand = undefined;
let operator = '';
var result = undefined;
let buttonId = ' ';
var equalsActive = false; // Changes the mode of the equals button.
var operatorActive = false; // Changes the mode of the operator buttons. 

// Listens for click events on the HTML buttons, 
// calls subsequent function based on buttonID.

buttons.forEach((button) => {
    button.addEventListener('mouseup', (e) => {
        buttonId = e.target.id;
        buttonPress(buttonId);
        console.log(buttonId);
    })
})

function buttonPress(buttonId) {
    if (buttonId == 'zerozero') {
        zeroZeroPress();
    } else if (buttonId == 'clear') { 
        clear();
    } else if (
            buttonId == 'add' || buttonId === "+" ||
            buttonId === 'subtract' || buttonId === "-" ||
            buttonId === 'divide' || buttonId === "/" ||
            buttonId === 'multiply' || buttonId === "*" || buttonId === "x" || buttonId === "X"
            ) { 
        operatorPress(buttonId);
    } else if (buttonId == '.') {
        decimalPress();
    } else if (buttonId == 'equals' || buttonId === 'equals') {
        equalsPress();
    } else if (buttonId === '+/-') {
        plusMinusPress();
    } else if (buttonId == 'backspace') {
        backspacePress(buttonId);
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
    clearButton.textContent = "c";
}

function decimalPress() {
    if (displayValue == 0) {
        displayValue += '.';
        updateDisplay(displayValue);
    } else if (equalsActive || operatorActive) {
        displayValue = '0.';
        updateDisplay(displayValue);
        equalsActive = false;
        operatorActive = false;
    } else if (displayValue != 0 && !displayValue.toString().includes('.')) {
        displayValue += '.';
        updateDisplay(displayValue);
    }
}

function plusMinusPress() {
    displayValue *= -1;
    updateDisplay(displayValue);
}

function zeroZeroPress() {
    buttonPress(0);
    buttonPress(0);
}

function backspacePress(buttonId) {
    if (displayValue == 0) {
        displayValue = 0;
        updateDisplay(displayValue);
    } else if (displayValue.length <= 1) {
        displayValue = 0;
        updateDisplay(displayValue);
    } else if (displayValue >= -9 && displayValue <= -1) {
        displayValue = 0;
        updateDisplay(displayValue);
    } else if (operatorActive == false && equalsActive == false) {
        displayValue = displayValue.toString()
        displayValue = displayValue.substring(0, (displayValue.length - 1));
        updateDisplay(displayValue);
    }
}

function numberPress(buttonId) {
    if (displayValue === 0) {
        displayValue = buttonId;
        updateDisplay(displayValue);
        operatorActive = false;
        equalsActive = false;
    } else if (operatorActive == true || equalsActive == true) {
        displayValue = buttonId;
        updateDisplay(displayValue);
        operatorActive = false;
        equalsActive = false;
    } else if (operatorActive === false && displayValue.length < 9) {
        displayValue += buttonId;
        updateDisplay(displayValue);
    }
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
        // Does the math if there are two operands. Tests for this by 
        // trying to call operate using both operands. If one is
        // undefined (i.e. in the initial state or after pressing clear)
        // then it'll return NaN.
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
    displayValue = parseFloat(displayValue);
    if (Number.isInteger(displayValue) && displayValue.toString().length <= 9) {
        display.textContent = displayValue;
    } else if (!Number.isInteger(displayValue)) {
        displayValue = (Math.round(displayValue * 100000) / 100000);
        display.textContent = displayValue;
    } else if ((displayValue.toString().length) > 9) {
        displayValue = "error";
        display.textContent = displayValue;
        // This puts the calculator into error mode and stops input. It also
        // changes the clear button into a clear-error button (does not change)
        // the HTML text on the clear button though.
        for (const button of buttons) { 
            button.disabled = true;     
        }
        clearButton.disabled = false;            
        clearButton.textContent = "ce";
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