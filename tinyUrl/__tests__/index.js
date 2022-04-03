const { test, expect } = require("@jest/globals");
const { getOriginUrl, getTinyUrl } = require("../");

test("getTinyUrl and getOriginUrl", () => {
  const sampleUrl =
    "https://jamboard.google.com/d/1mGQzQ4JzHBzR1VkFSUGzSYe4v3E5CZPI2-WRZoYYi24/viewer";
  
  const tinyUrl = getTinyUrl(sampleUrl);
  expect(getOriginUrl(tinyUrl)).toEqual(sampleUrl);
});
