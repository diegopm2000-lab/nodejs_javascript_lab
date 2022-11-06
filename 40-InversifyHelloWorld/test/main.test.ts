import { expect } from 'chai'

import { myContainer } from "../src/inversify.config";
import { TYPES } from "../src/types";
import { Warrior } from "../src/interfaces";

describe('Main - Tests', () => {
  it('Main - Tests', () => {
    const ninja = myContainer.get<Warrior>(TYPES.Warrior);
    
    expect(ninja.fight()).eql("cut!"); // true
    expect(ninja.sneak()).eql("hit!"); // true
  })
})
