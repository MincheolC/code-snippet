const Crawler = require('crawler');

const c = new Crawler({
  maxConnections : 10,
  // This will be called for each crawled page
  callback : function (error, res, done) {
      if(error){
          console.log(error);
      }else{
          var $ = res.$;
          // $ is Cheerio by default
          //a lean implementation of core jQuery designed specifically for the server
          console.log($(".price_num__2WUXn").text());
          $('span').filter(function (_) {
            const className = this.attribs.class;
            if (className && className.match(/^price_num[\w]+$/)) {
              return true
            }
            return false
          })
      }
      done();
  }
});

c.queue("https://search.shopping.naver.com/search/all?query=%EC%B9%B4%EC%8A%A40.0&frm=NVSHATC&prevQuery=%EC%87%BC%ED%95%91");