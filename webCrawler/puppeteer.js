// https://velog.io/@jinuku/Puppeteer%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9B%B9-%ED%81%AC%EB%A1%A4%EB%A7%81-%ED%95%B4%EB%B3%B4%EA%B8%B0-%EC%98%88%EC%A0%9C-1

// puppeteer을 가져온다.
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async() => {
  // 브라우저를 실행한다.
  // 옵션으로 headless모드를 끌 수 있다.
  const browser = await puppeteer.launch({
    headless: false
  });

  // 새로운 페이지를 연다.
  const page = await browser.newPage();
  // 페이지의 크기를 설정한다.
  await page.setViewport({
    width: 1366,
    height: 20000
  });
  // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
  await page.goto('https://smartstore.naver.com/ursweethome/products/6489252704?NaPm=ct%3Dl1xjt8ko%7Cci%3D2b8abfa42204932e95d987836961c4276dc8f6c9%7Ctr%3Dslsl%7Csn%3D5594875%7Chk%3Dacaab97cd4867fdfe59d6388863f88e86111a529');

  // 페이지의 HTML을 가져온다.
  const content = await page.content();
  // $에 cheerio를 로드한다.
  const $ = cheerio.load(content);

  const lists = $('.price_num__2WUXn').text();

  // .each((_, s) => s.replace(/\D/g, ""))
  
  console.log(lists.split("원").map(s => s.replace(/\D/g, "")).filter(s => s).map(s => parseInt(s, 10)).sort())

  browser.close()
})();

