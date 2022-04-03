const _ = require("lodash");
const { createHash } = require("crypto");

// 단축 url을 제공해야 함
// - 매일 1억 개의 단축 URL 생성
// - 1160 req/sec
// - URL avg length = 100

// In-memory Store로 대체
const store = {};
const urlLength = 8;
const baseUrl = "https://my-tiny-url.com";

/* 
 # 해시 후 충돌 해소
 해시 값은 [a-z,A-Z,0-9]의 문자열로 구성됨. 사용할 수 있는 문자 62개. 62^n의 경우 수
 - e.g. 7개 문자면 = 3.5조 경우 수 가 있음.
    
 # hash function
 - crc32
 - md5
 - sha-1
 잘 알려진 해시 함수를 사용하자니, 너무 길다. 앞 7개만 이용하면, 충돌할 확률이 높아진다.
 충돌 여부를 확인하기 위해 DB 조회는 오버헤드가 크니 "블룸 필터"를 활용하자.
 */

function hash(alg, value) {
  return createHash(alg).update(value).digest("hex");
}

function sha256(value) {
  return hash("sha256", value);
}

function md5(value) {
  return hash("md5", value);
}

function save(tinyUrl, url) {
  if (store[tinyUrl]) {
    throw "Already Exists";
  }
  store[tinyUrl] = url;
}

function shorten(url) {
  return sha256(url).slice(0, urlLength);
}

function getTinyUrl(url) {
  const tinyUrl = shorten(url);
  save(tinyUrl, url);
  return `${baseUrl}/${tinyUrl}`;
}

function getOriginUrl(tinyUrl) {
  const regex = new RegExp(`${baseUrl}/(?<keyUrl>[\\w]+)`);
  const key = tinyUrl.match(regex).groups.keyUrl;
  return store[key];
}

/*
 # base-62 변환
 62진법을 사용하기 
 */

module.exports = {
  getTinyUrl,
  getOriginUrl,
};
