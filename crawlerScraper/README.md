# References

- https://www.zenrows.com/blog/javascript-web-crawler-nodejs#is-javascript-good-for-web-crawling
- https://www.zenrows.com/blog/web-scraping-javascript-nodejs#prerequisites

# Web Crawler

## Library

- Axios: Axios는 URL에서 HTML을 가져오는 데 사용할 "약속 기반 HTTP 클라이언트"
- Cheerio: "빠르고 유연하며 간결하게 핵심 jQuery를 구현한" 자바스크립트 라이브러리입니다. 선택기를 사용해 DOM 노드를 찾고, 텍스트나 속성을 가져오는 등 다양한 작업을 수행할 수 있음. HTML을 Cheerio에 전달한 다음 쿼리하여 데이터를 추출함
- Playwright: "단일 API로 크롬, 파이어폭스, 웹킷을 자동화하는 Node.js 라이브러리"입니다. Axios로 충분하지 않은 경우 headless 브라우저를 사용하여 HTML을 가져옵니다. 그런 다음 콘텐츠를 파싱하고 JavaScript를 실행한 다음 **비동기 콘텐츠가 로드될 때까지 기다립**니다.

## Best Practices

### 1. 웹 스파이더를 사용하여 모든 URL 검색하기

크롤링하는 동안 웹 페이지의 전체 링크 목록을 검색하는 것을 고려해야 합니다. 결국 URL은 웹 스파이더가 사이트를 계속 크롤링할 수 있게 해주는 요소입니다.
사용자가 관심을 가질 만한 링크는 일부에 불과할 수 있지만 모두 저장해 두면 향후 반복 작업을 더 쉽게 수행할 수 있습니다.
또한 사이트 사이트맵(site sitemap)을 사용하여 색인된 모든 URL의 목록을 찾는 것도 고려해 보세요.

### 2. 크롤링을 병렬로 수행

각 웹페이지를 한 번에 하나씩 분석하는 것은 효율적인 프로세스가 아닙니다. 웹사이트를 순차적으로 웹 크롤링하는 데는 많은 시간이 걸립니다.

다행히도 웹 스파이더를 병렬로 실행하도록 조정하여 프로세스 속도를 높일 수 있습니다. 자바스크립트는 비동기 로직을 지원합니다. 하지만 이를 구현하려면 추가 로직이 필요하다는 점에 유의하세요.

### 3. 웹 스파이더를 사람처럼 동작하게 만들기

자바스크립트 웹 크롤러는 웹사이트에 봇이 아닌 사람으로 표시되어야 합니다.
**적절한 HTTP 헤더**와 **타임아웃**을 설정하면 이를 달성할 수 있습니다.
목표는 Node.js 웹 스파이더가 실제 사용자처럼 웹 페이지를 방문하도록 하는 것입니다.

### 4. 웹 크롤링 로직을 단순하게 유지하세요

웹 스파이더가 타겟팅하는 웹사이트의 레이아웃은 시간이 지남에 따라 많이 바뀔 수 있습니다.
따라서 Node.js 웹 크롤러를 과도하게 엔지니어링해서는 안 됩니다.
새로운 레이아웃이나 사이트에 쉽게 적용할 수 있도록 단순하게 유지하세요.

### 5. 웹 크롤러 계속 실행

Node.js에서 수행되는 웹 크롤링은 시스템 리소스를 많이 소비하지 않습니다.
따라서 특히 새 페이지를 지속적으로 추가하는 대규모 웹사이트를 타겟팅할 때는 웹 스파이더를 계속 실행하는 것을 고려해야 합니다.

## 작업 방법

1. 채용 상세 페이지의 href를 css selector로 뽑아낸다.
2. 상세 페이지를 로드하여 지원하기 페이지의 href를 css selector로 뽑아낸다.

# Web Scraping

## Library

- Axios
- Cheerio
- Playwright: "단일 API로 크롬, 파이어폭스, 웹킷을 자동화하는 Node.js 라이브러리"입니다. Axios로 충분하지 않은 경우 headless 브라우저를 사용하여 HTML을 가져옵니다. 그런 다음 콘텐츠를 파싱하고 JavaScript를 실행한 다음 **비동기 콘텐츠가 로드될 때까지 기다립**니다.

## Tips

- 페이지의 모든 링크를 추출하기 (class selector 활용하기)
  - `#main > div:nth-child(2) > nav > ul > li:nth-child(2) > a` 이런 식의 작업은 HTML에 매우 강결합 되어있어 작은 변경에도 멈추게 되어 안 좋음
- 페이지의 필요한 모든 정보를 추출하기 (class selector 활용하기)
- 이미 방문한 링크 관리하기
- 크롤링 최대 링크 수 관리하기
- Blocks, captchas, login wall과 같은 방어 기술을 피하기 위해 **adding proxies**와 **full-set header** 전략을 사용하기
  - Proxy: IP 로테이션
  - HTTP Request Header: 실제 사용자 에이전트 (크롬, 파폭) 등의 요청 헤더를 동일하게 적용해서 사용하기
- 마우스나 키보드를 통한 브라우저 로드, 실행, 상호작용과 같은 Dynamic HTML을 위해 Selenium, Puppeteer, and Playwright 같은 라이브러리 활용
