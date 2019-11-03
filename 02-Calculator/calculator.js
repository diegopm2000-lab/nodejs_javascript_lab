// calculator.js

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error('Error: División by zero not allowed!');
    } else {
        return a / b;
    }
}

module.exports = {
    add,
    substract,
    multiply,
    divide,
};
