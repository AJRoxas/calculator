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
        case '+':
            console.log(add(x,y));
            break;
        case '-':
            console.log(subtract(x,y));
            break;
        case '&times':
            console.log(multiply(x,y));
            break;
        case '&divide':
            console.log(divide(x,y));
    }
}