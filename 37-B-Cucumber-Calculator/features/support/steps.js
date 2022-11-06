/* eslint-disable func-names */

/* eslint-disable import/no-extraneous-dependencies */

const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const Calculator = require('../../src/Calculator');

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
    this.errorMessage = error.message;
  }
});

Then('the result must be {float}', function (expectedResponse) {
  assert.equal(this.result, expectedResponse);
});

Then('should receive this error: You can not divide by zero!', function () {
  assert.equal(this.errorMessage, 'You can not divide by zero!');
});
