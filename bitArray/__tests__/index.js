const { test, expect } = require('@jest/globals')
const { BitArray } = require('..')

test("Bit Array", () => {
  const bits = new BitArray(32)
  const expected = "10000000000000000000000000000001";
  
  bits.set(31, 1);
  bits.set(0, 1);

  expect(bits.size).toEqual(32)
  expect(bits.toString()).toEqual(expected)
})