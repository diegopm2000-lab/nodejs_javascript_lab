import assert from "assert";
import superagent from 'superagent'

import { Given, When, Then } from "@cucumber/cucumber";

// Loading the index main
import { init, stop } from '../../src/index'

enum OPERATIONS {
  SUM = 'sum',
  SUBSTRACT = 'substract',
  MULTIPLY = 'multiply',
  DIVIDE = 'divide'
}

interface MyWorld {
  x: number,
  y: number,
  operation: OPERATIONS
  initiated: boolean,
}

Given('an API REST Calculator', function () {
  init()
});

When('we want to sum {float} and {float}', function (this: MyWorld, x: number, y: number) {
  this.x = x
  this.y = y
  this.operation = OPERATIONS.SUM
});

When('we want to execute {float} minus {float}', function (this: MyWorld, x: number, y: number) {
  this.x = x
  this.y = y
  this.operation = OPERATIONS.SUBSTRACT
});

When('we want to execute {float} multiplied by {float}', function (this: MyWorld, x: number, y: number) {
  this.x = x
  this.y = y
  this.operation = OPERATIONS.MULTIPLY
});

When('we want to execute {float} divided by {float}', function (this: MyWorld, x: number, y: number) {
  this.x = x
  this.y = y
  this.operation = OPERATIONS.DIVIDE
});

When('we want to stop the server', function () {
  // Nothing to do
});


Then('the result must be {float}', async function (this: MyWorld, expectedResult: number) {
  const result = await superagent.get(`http://localhost:3000/${this.operation}?a=${this.x}&b=${this.y}`)
  return assert.equal(result.body.result, expectedResult);
});

Then('the result must have the next error message {string}', async function (this: MyWorld, expectedResult: string) {
    const uri = `http://localhost:3000/${this.operation}?a=${this.x}&b=${this.y}`
    // Handle the 400 responses as valid responses
    const result = await superagent.get(uri).ok(res => res.status === 400)
    return assert.equal(result.body.message, expectedResult);
});

Then('the server must be stopped', function () {
  // Write code here that turns the phrase above into concrete actions
  stop();
});


