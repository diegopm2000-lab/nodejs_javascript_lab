// calculadora.js

function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) {
        throw new Error('Error: División por cero no permitida!');
    } else {
        return a / b;
    }
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    dividir,
};
