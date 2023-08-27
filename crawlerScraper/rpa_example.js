const playwright = require("playwright");

(async () => {
  // 브라우저를 열고, Google 검색 페이지를 로드합니다.
  const browser = await playwright.chromium.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://forms.gle/fFUrw2c84tXXG2SWA");

  // 검색어를 입력합니다.
  // await page.fill("input[name=query]", "playwright");

  // 검색 버튼을 클릭합니다.
  await page.click("div[id=i5]");
  await page.getByText("제출").click();

  // // 검색 결과를 확인합니다.
  // const results = await page.evaluate(() => {
  //   const results = document.querySelectorAll("div.g h3.r a");
  //   return results.map((result) => result.textContent);
  // });

  // console.log(results);

  // // 브라우저를 종료합니다.
  await browser.close();
})();
