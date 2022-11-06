// Calculator.js

/* eslint-disable class-methods-use-this */

class Calculator {
  sum(x, y) {
    return x + y;
  }

  substract(x, y) {
    return x - y;
  }

  multiply(x, y) {
    return x * y;
  }

  divide(x, y) {
    if (y === 0) {
      throw new Error('You can not divide by zero!');
    }
    return x / y;
  }
}

module.exports = Calculator;
