import * as PIXI from "pixi.js";
import Field from "../field";
const app = global.app;

const WIDTH = 64;
const HEIGHT = 55;

class Cell {
  toCube() {
    this.x = this.col - (this.row + (this.row & 1)) / 2;
    this.z = this.row;
    this.y = -x - z;
  }

  toDec() {
    this.col = this.x + (this.z + (this.z & 1)) / 2;
    this.row = this.z;
  }
}

class Cube extends Cell {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;
    this.z = -x - y;
    this.toDec();
  }
  get xy() {
    let x = this.x;
    const y = this.y;
    if (this.y & 1) {
      x += 0.5;
    }
    return { x, y };
  }
}

class Hex extends Cell {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;
  }
}

export default class Hexagone extends PIXI.Container {
  constructor({ x: hexX, y: hexY }) {
    super();

    const visualModel = app.visual.grounds[21];

    const grid = [
      new Hex(0, -1),
      new Hex(+1, -1),
      new Hex(-1, 0),
      new Hex(0, 0),
      new Hex(+1, 0),
      new Hex(+1, +1),
      new Hex(0, +1),
    ];

    this.sprites = grid.map((cube) => {
      const { x, y } = cube;
      const sprite = new Field(visualModel.texture, x, y);
      sprite.x = hexX + (this.x + x - (y & 1) / 2) * WIDTH;
      sprite.y = hexY + (this.y + y) * HEIGHT;
      return sprite;
    });

    // this.sprites.forEach((s, i) => (s.pivot.x = 63 * i));
    this.interactive = true;
    this.on("mouseup", console.log);
    this.mouseover = this.mouseover.bind(this);
    this.addChild(...this.sprites);
  }

  mouseover(evt) {
    console.log(evt);
    // this.texture = this.textures.hover;
  }
}

// # преобразование кубических в смещение чёт-r
// col = x + (z + (z&1)) / 2
// row = z

// # преобразование чёт-r в кубические
// x = col - (row + (row&1)) / 2
// z = row
// y = -x-z

function offset_neighbor(hex, direction) {
  const parity = hex.row & 1;
  const dir = directions[parity][direction];
  return Hex(hex.col + dir.col, hex.row + dir.row);
}
