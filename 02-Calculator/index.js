// index.js

const calculator = require('./calculator');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question(`Introduce number a: `, strA => {
    readline.question(`Introduce number b: `, strB => {
        const a = parseInt(strA, 10);
        const b = parseInt(strB, 10);
        console.log(`The sum of ${a} + ${b} is: ${calculator.add(a, b)}`);
        console.log(`The substraction of ${a} - ${b} is: ${calculator.substract(a, b)}`);
        console.log(`The multiplication of ${a} * ${b} is: ${calculator.multiply(a, b)}`);
        console.log(`the division of ${a} / ${b} is: ${calculator.divide(a, b)}`);
        readline.close()
    })
})
