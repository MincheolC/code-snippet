const axios = require("axios");
const cheerio = require("cheerio");

async function main(maxPages = 5) {
  // initialized with the first webpage to visit
  const rootURL =
    "https://greenlabs.co.kr/%ec%b1%84%ec%9a%a9%ec%a0%95%eb%b3%b4/%ec%9d%bc%eb%b0%98%ec%b1%84%ec%9a%a9/";
  const pageURLsToVisit = [rootURL];
  const visitedURLs = [];

  const applyURLs = new Set();

  while (pageURLsToVisit.length !== 0 && visitedURLs.length <= maxPages) {
    // the current webpage to crawl
    const pageURL = pageURLsToVisit.pop();

    // retrieving the HTML content from paginationURL
    const pageHTML = await axios.get(pageURL);

    // adding the current webpage to the
    // web pages already crawled
    visitedURLs.push(pageURL);

    // initializing cheerio on the current webpage
    const $ = cheerio.load(pageHTML.data);

    // 채용 상세페이지
    $(".jt-recruit-list__item a").each((index, element) => {
      const nextPageURL = $(element).attr("href");

      // adding the pagination URL to the queue
      // of web pages to crawl, if it wasn't yet crawled
      if (
        !visitedURLs.includes(nextPageURL) &&
        !pageURLsToVisit.includes(nextPageURL)
      ) {
        pageURLsToVisit.push(nextPageURL);
      }
    });

    // 지원하기 페이지
    $(".jt-single__recruit-btn-wrap a:first-child").each((index, element) => {
      const applyURL = $(element).attr("href");
      applyURLs.add(applyURL);
    });
  }

  // logging the crawling results
  console.log([...visitedURLs]);

  console.log([...applyURLs]);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    // logging the error message
    console.error(e);

    process.exit(1);
  });
