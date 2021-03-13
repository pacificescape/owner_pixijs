import * as PIXI from "pixi.js";
import Field from "../field";
import {
  makeHexagonalShape,
  makeDownTriangularShape,
} from "../../../../utils/hexGenerator";

const app = global.app;

const WIDTH = 100;
const HEIGHT = 80;

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

// class Hex extends Cell {
//   constructor(x, y) {
//     super();

//     this.x = x;
//     this.y = y;
//   }
// }

const SPACE_BETWEEN_SECTORS = 500;
const SECTOR_RADIUS = 2;
const s = (d) => d * 2 * SECTOR_RADIUS * WIDTH + d * SPACE_BETWEEN_SECTORS;
export default class Hexagone extends PIXI.Container {
  constructor(secX, secY) {
    super();
    this.x = secX;
    this.y = secY;

    this.visualModel = app.visual.grounds[21];

    this.grid = makeHexagonalShape(SECTOR_RADIUS);

    this.makeSector(secX, secY);

    this.makeInteractive();

    this.addChild(...this.sprites);
  }

  makeSector() {
    this.sprites = this.grid.map((Hex) => {
      const { x, y } = Hex;
      const sprite = new Field(this.visualModel.texture, x, y);
      sprite.x = (this.x + x - (y & 1) / 2) * WIDTH;
      sprite.y = (this.y + y) * HEIGHT;
      sprite.alpha = 0.9;
      return sprite;
    });
  }

  makeInteractive() {
    this.interactive = true;
    this.on("mouseup", console.log);
    this.mouseover = this.mouseover.bind(this);
  }

  mouseover(evt) {
    // console.log(evt);
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
