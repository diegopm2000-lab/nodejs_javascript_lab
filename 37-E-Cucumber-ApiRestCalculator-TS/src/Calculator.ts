export class Calculator {
  sum(x: number, y: number) {
    return x + y;
  }

  substract(x: number, y: number) {
    return x - y;
  }

  multiply(x: number, y: number) {
    return x * y;
  }

  divide(x: number, y: number) {
    if (y === 0) {
      throw new Error('You can not divide by zero!');
    }
    return x / y;
  }
}
