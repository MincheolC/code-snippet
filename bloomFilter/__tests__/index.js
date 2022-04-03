const { test, expect } = require('@jest/globals')
const { BloomFilter } = require('..')

test("BloomFilter", () => {
  const bloomFilter = new BloomFilter(200);

  expect(bloomFilter.hasValue("0")).toBe(false)
  expect(bloomFilter.hasValue("0")).toBe(true)
  expect(bloomFilter.hasValue("0")).toBe(true)
})