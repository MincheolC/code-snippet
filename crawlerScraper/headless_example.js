const playwright = require("playwright");
const axios = require("axios");
const cheerio = require("cheerio");

const extractContent = ($) =>
  $(".product")
    .map((_, product) => {
      const $product = $(product);
      return {
        id: $product.find("a[data-product_id]").attr("data-product_id"),
        title: $product.find("h2").text(),
        price: $product.find(".price").text(),
      };
    })
    .toArray();

const getHtmlPlaywright = async (url) => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  const html = await page.content();
  await browser.close();

  return html;
};

const getHtmlAxios = async (url) => {
  const { data } = await axios.get(url);

  return data;
};

(async () => {
  const html = await getHtmlPlaywright("https://scrapeme.live/shop/page/1/");
  const $ = cheerio.load(html);
  const content = extractContent($);
  console.log("getHtmlPlaywright", content);
})();

(async () => {
  const html = await getHtmlAxios("https://scrapeme.live/shop/page/1/");
  const $ = cheerio.load(html);
  const content = extractContent($);
  console.log("getHtmlAxios", content);
})();
