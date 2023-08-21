const Crawler = require("crawler");

const c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      console.log($("body").text().trim());
      // $("span").filter(function (_) {
      //   const className = this.attribs.class;
      //   if (className && className.match(/^price_num[\w]+$/)) {
      //     return true;
      //   }
      //   return false;
      // });
    }
    done();
  },
});

c.queue("https://thevc.kr/momit");
