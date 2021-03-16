const crypto = require("crypto");

const SIZE = 100;

const map = {
  elevation: crypto.randomFillSync(new Uint8Array(SIZE * SIZE), 0, SIZE * SIZE),
  width: SIZE,
  heigth: SIZE,
};

module.exports = map;
