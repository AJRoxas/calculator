let eqVarOne = '0';
let eqOperation = '';
let eqVarTwo = '';
let isEqVarOneDecimalUsed = false;
let isEqVarTwoDecimalUsed = false;
let eqAns = '';

const CLEAR_ALL = 'AC';
const SIGN = '±';
const PERCENT = '%';
const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = '×';
const DIVIDE = '÷';
const DECIMAL = '.';
const EQUAL = '=';


const STATE1 = 'State triggers when eqVarOne is set (default state)';
const STATE2 = 'State triggers when eqOperation is set';
const STATE3 = 'State triggers when eqVarTwo is set';
const STATE4 = 'State triggers wehn equals button is pressed in state 3';

//Operations
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    let floatNum = 1.0 * x / y
    return Math.round( floatNum * 100000000) / 100000000;
}

function operate(x, y, operation) {
    switch(operation) {
        case ADD:
            return add(x,y);
        case SUBTRACT:
            return subtract(x,y);
        case MULTIPLY:
            return multiply(x,y);
        case DIVIDE:
            return divide(x,y);
    }
}

//Other functions
function populateCalculatorScreen(str) {
    const calculatorScreen = document.querySelector('.calculator-screen');
    if (!(str instanceof String)) {
        str = str.toString();
    }
    let split = str.toString().split('');
    let out = '';

    for (let i = 0; i < (str.length < 11 ? str.length : 11); i++) {
        out += split[i];

        if ((i == 10) && !(out.includes('.'))) {
            out = 'TOO LONG :(';
        }
    }
    calculatorScreen.textContent = out;
}

function setEquationValues(varOne, operation, varTwo, varOneDec, varTwoDec, ans) {
    eqVarOne = varOne;
    eqOperation = operation;
    eqVarTwo = varTwo;
    isEqVarOneDecimalUsed = varOneDec;
    isEqVarTwoDecimalUsed = varTwoDec;
    eqAns = ans;
}

function clearAll() {
    setEquationValues('0', '', '', false, false, '');
    const calculatorScreen = document.querySelector('.calculator-screen');
    calculatorScreen.textContent = 0;
}

function changeSign(state) {
    if (state == STATE1) {
        eqVarOne = `${Number(eqVarOne)*(-1)}`;
        populateCalculatorScreen(eqVarOne);
    } else if (state == STATE2) {
        eqVarTwo = `${Number(eqVarTwo)*(-1)}`;
        populateCalculatorScreen(eqVarTwo);
    }
}

function varToPercent(state) {
    if (state == STATE1) {
        eqVarOne = `${Number(eqVarOne) *1.0 / 100}`;
        populateCalculatorScreen(eqVarOne);
    } else if (state == STATE2) {
        eqVarTwo = `${Number(eqVarOne) *1.0 / 100}`;
        populateCalculatorScreen(eqVarTwo);
    }
}

function setOperation(operation, state) {
    if (state == STATE1 || state == STATE2 || state == STATE4) {
        eqOperation = operation;
        populateCalculatorScreen(eqOperation);

        eqAns = '';
    } else if (state == STATE3) {
        calculateEquation(STATE3);
        setEquationValues(eqVarOne, operation, eqVarTwo, true, false, '');
    }
}

function appendNum(num, state) {
    if (state == STATE1 || state == STATE4) {
        if (state == STATE4) {
            clearAll();
        }
        eqVarOne += num;
        populateCalculatorScreen(eqVarOne);
    } else if (state == STATE2 || state == STATE3) {
        eqVarTwo += num;
        populateCalculatorScreen(eqVarTwo);
    }
}

function appendDecimal(state) {
    if (state == STATE1 && !isEqVarOneDecimalUsed) {
        eqVarOne += '.';
        populateCalculatorScreen(eqVarOne);
        isEqVarOneDecimalUsed = true;
    } else if (state == STATE3 && !isEqVarTwoDecimalUsed) {
        eqVarTwo += '.';
        populateCalculatorScreen(eqVarTwo);
        isEqVarTwoDecimalUsed = true;
    }
}

function calculateEquation(state) {
    if (state == STATE2) {
        let x = Number(eqVarOne);
        let operation = eqOperation;

        setUpOperation(x, x, operation);
        
    } else if (state == STATE3) {
        let x = Number(eqVarOne);
        let y = Number(eqVarTwo);
        let operation = eqOperation;
        
        setUpOperation(x, y, operation);
    }
}

function setUpOperation(x, y, operation) {
    if (y == 0 && operation == DIVIDE) {
        clearAll();
        populateCalculatorScreen("Ayy LMAO!");
    } else {
        let ans = operate(x, y, operation);
        setEquationValues(ans, '', '', true, false, ans);
        populateCalculatorScreen(ans);
    }
}

function analyzeInput(input) {
    let state = eqAns != '' ? STATE4 : eqVarTwo != '' ? STATE3 : eqOperation != '' ? STATE2 : STATE1;

    console.log(eqVarOne);
    console.log(eqOperation);
    console.log(eqVarTwo);
    console.log(isEqVarOneDecimalUsed);
    console.log(isEqVarTwoDecimalUsed);
    console.log(state);

    if (input == CLEAR_ALL) {
        clearAll();
    } else if (input == SIGN) {
        changeSign(state);
    } else if (input == PERCENT) {
        varToPercent(state);
    } else if (new RegExp(`^(\\${ADD}|\\${SUBTRACT}|${MULTIPLY}|${DIVIDE})`).test(input)) {
        setOperation(input, state);
    } else if (/^\d/.test(input)) {
        appendNum(input, state);
    } else if (input == DECIMAL) {
        appendDecimal(state)
    } else if (input == EQUAL) {
        calculateEquation(state);
    }

    console.log(eqVarOne);
    console.log(eqOperation);
    console.log(eqVarTwo);
    console.log(isEqVarOneDecimalUsed);
    console.log(isEqVarTwoDecimalUsed);
    console.log("FUNCTION OVER");
}

const anchorInputs = document.querySelectorAll('a');
anchorInputs.forEach((anchorInput) => {
    anchorInput.addEventListener('click', function(e) {
        analyzeInput(e.target.textContent);
    });
})