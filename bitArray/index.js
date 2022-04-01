const BitArray = function (size) {
  this.size = size;
  this.values = new Array(Math.ceil(size / 32));

  // Methods
  this.length = () => this.size;

  // 비트 연산
  // 1 << -1 === 1 << 31
  this.get = (index) => {
    const i = Math.floor(index / 32);
    const idx = index % 32;
    return !!(this.values[i] & (1 << (32 - idx)));
  };

  this.set = (index, value) => {
    const i = Math.floor(index / 32);
    const idx = index % 32;
    const val = 1 << (32 - idx);
    if (value) {
      this.values[i] |= val;
    } else {
      this.values[i] &= ~val;
    }
  };

  this.toString = () => {
    return this.toArray()
      .map((v) => {
        if (v) {
          return "1";
        } else {
          return "0";
        }
      })
      .join("");
  };

  this.toArray = () => {
    const result = [];
    for (let i = 0; i < this.values.length * 32; i += 1) {
      result.push(this.get(i));
    }
    return result;
  };

  this.reset = () => {
    this.values = new Array(Math.ceil(size / 32));
  }
};

module.exports = {
  BitArray,
};
