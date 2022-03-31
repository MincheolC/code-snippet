const { test, expect } = require("@jest/globals");
const { hash } = require('../')

test('test', () => {
  expect(hash(7).length).toEqual(7)
});