// index.js

const calculadora = require('./calculadora');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question(`Introduce el número a: `, strA => {
    readline.question(`Introduce el número b: `, strB => {
        const a = parseInt(strA, 10);
        const b = parseInt(strB, 10);
        console.log(`La suma de ${a} + ${b} es: ${calculadora.sumar(a, b)}`);
        console.log(`La resta de ${a} - ${b} es: ${calculadora.restar(a, b)}`);
        console.log(`La multiplicación de ${a} * ${b} es: ${calculadora.multiplicar(a, b)}`);
        console.log(`La división de ${a} / ${b} es: ${calculadora.dividir(a, b)}`);
        readline.close()
    })
})
