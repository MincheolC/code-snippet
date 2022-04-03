/*
 # 블룸 필터
 어떤 값이 집합에 속해 있는가?를 검사하는 필터 및 이를 구성하는 자료형.
 거짓 양성(false positive)는 반환할 수 있지만, 절대 거짓 음성(false negative)을 반환하지 않음.
 - “요소가 집합에 있다" -> 실제 DB, Redis 등을 확인
 - “요소가 집합에 없다" -> 무시

 # 알고리즘
 필요한 것
 - 0으로 초기화된 길이가 m인 비트 배열 (빈 블룸 필터)
 - k개의 서로 다른 hash 함수 (hash 함수 집합)
 동작
 - 요소 추가: k개의 해시 함수를 적용하여 얻은 결과(배열 위치)를 1로 설정
 - 요소 쿼리: k개의 해시 함수를 적용하여 얻은 결과(배열 위치)를 1로 설정 
   - 1개라도 0이면 요소는 집합에 없음
   - 모두가 1이면 요소는 집합에 있을 수 있음. 
 */

const _ = require('lodash');
const { createHash } = require ("crypto");
const { BitArray } = require("../bitArray");

function calculateIndex (hashValue, size) {
  const length = 5;
  const hexNumber = parseInt(hashValue.slice(0, length), 16)
  return hexNumber % size
}

class BloomFilter {
  /* 
   Node.js 내장 crypto 라이브러리 사용.
   The algorithm is dependent on the available algorithms supported by the version of OpenSSL on the platform.
   >> openssl list -digest-algorithms

   Default: sha256
   */
  constructor (size, hashAlgSet = ["sha256"]) {
    this.filter = new BitArray(size)
    this.hashAlgSet = hashAlgSet
  }

  hasValue (value) {
    const valueString = value.toString(); 
    const indexList = this.hashAlgSet.map(hashAlg => {
      const hash = createHash(hashAlg)
      hash.update(valueString);
      return calculateIndex(hash.copy().digest("hex"), this.filter.length());
    }) 
    
    const results = indexList.map(index => {
      const val = this.filter.get(index);
      if (!val) {
        this.filter.set(index, true)
      }
      return val
    }).filter(v => v);
    
    return results.length > 0;
  }
}

module.exports = {
  BloomFilter
}