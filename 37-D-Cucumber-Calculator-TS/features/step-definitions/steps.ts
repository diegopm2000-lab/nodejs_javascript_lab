import assert from "assert";

import { Given, When, Then } from "@cucumber/cucumber";
import { Calculator } from '../../src/Calculator'

interface MyWorld {
  whatIHeard: string;
}

Given('a calculator', function () {
  this.calculator = new Calculator();
});

When('we want to execute {float} plus {float}', function (x, y) {
  this.result = this.calculator.sum(x, y);
});

When('we want to execute {float} minus {float}', function (x, y) {
  this.result = this.calculator.substract(x, y);
});

When('we want to execute {float} multiplied by {float}', function (x, y) {
  this.result = this.calculator.multiply(x, y);
});

When('we want to execute {float} divided by {float}', function (x, y) {
  try {
    this.result = this.calculator.divide(x, y);
  } catch (error) {
    if (error instanceof Error) {
      this.errorMessage = error.message;
    }
  }
});

Then('the result must be {float}', function (expectedResponse) {
  assert.strictEqual(this.result, expectedResponse);
});

Then('should receive this error: You can not divide by zero!', function () {
  assert.strictEqual(this.errorMessage, 'You can not divide by zero!');
});
