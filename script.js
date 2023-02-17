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
    if (numberTwo == 0) {
        return result = "You know better than to divide by zero. Use your head.";
    } else {
        return result = numberOne / numberTwo;
    }
}

function operate(operator, numberOne, numberTwo) {
    switch(operator) {
        case 0:
            add(numberOne, numberTwo);
            break;
        case 1:
            subtract(numberOne, numberTwo);
            break;
        case 2:
            multiply(numberOne, numberTwo);
            break;
        case 3:
            divide(numberOne, numberTwo);
            break;
        default: 
            break;
    }
}

operate(0, 10, 5);
console.log(result);
