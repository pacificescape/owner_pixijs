import * as PIXI from "pixi.js";
import Field from "../field";
import { Hex, makeHexagonalShape } from "../../../../utils/hexGenerator";

const app = global.app;

const WIDTH = 100;
const HEIGHT = 80;

const SECTOR_RADIUS = 2;
const s = (d) => d * SECTOR_RADIUS * 2;
export default class Sector extends PIXI.Container {
  constructor(secX, secY) {
    super();
    this.x = s(secX);
    this.y = s(secY);
    this.visualModel = {};
    this.radius = SECTOR_RADIUS;
    this.grid = makeHexagonalShape(SECTOR_RADIUS);
    this.makeSector(secX, secY);
    this.makeInteractive();

    this.addChild(...this.sprites);
    this.makeLabel(secX, secY);
  }

  getFieldModel(x, y) {
    // if (y < 0) {
    //   return app.visual.grounds[8];
    // }

    if (new Hex(x, y, -x - y).len() <= this.radius - 1) {
      return app.visual.grounds[8];
    }

    return app.visual.grounds[1];
  }

  makeSector() {
    this.sprites = this.grid.map((hex) => {
      const { x, y } = hex;
      const sprite = new Field(this.getFieldModel(x, y).texture, x, y);
      sprite.x = (x - (y & 1) / 2) * WIDTH;
      sprite.y = y * HEIGHT;
      return sprite;
    });
  }

  makeLabel(x, y) {
    const text = new PIXI.Text(`{${x}, ${y}}`);
    const sprite = new PIXI.Sprite();
    sprite.addChild(text);
    sprite.x += this.x + 20;
    sprite.y += this.y + 25;
    this.addChild(sprite);
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
