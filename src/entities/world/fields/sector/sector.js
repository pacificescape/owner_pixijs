import * as PIXI from 'pixi.js';

import Field from '../field';
import { Hex, makeHexagonalShape } from '../../../../utils/hex-generator';


const app = global.app;

const WIDTH = 100;
const HEIGHT = 80;

const SECTOR_RADIUS = 2;
const s = (d) => d * SECTOR_RADIUS * 2;

export default class Sector extends PIXI.Container {
  constructor (secX, secY, position) {
    super();
    this.secX = secX;
    this.secY = secY;
    this.x = secX * 600 + position.x;
    this.y = secY * 600 - (600 * (secX & 1)) / 2 + position.y;

    this.visualModel = {};
    this.radius = SECTOR_RADIUS;
    this.grid = makeHexagonalShape(this.radius);
    this.makeSector(secX, secY);
    this.makeInteractive();

    this.addChild(...this.sprites);
    // this.makeLabel(secX, secY);
  }

  makeSector () {
    this.sprites = this.grid.map((hex) => {
      const { x, y } = hex;
      const sprite = new Field(
        this.getFieldModel(hex),
        { x, y },
        {
          x: this.secX,
          y: this.secY,
        },
      );

      sprite.x = (x - (y & 1) / 2) * WIDTH;
      sprite.y = y * HEIGHT;
      return sprite;
    });
  }

  getFieldModel (hex) {
    const visualModels = {
      main: window.app.visual.grounds[8],
      hover: window.app.visual.grounds[23],
    };

    if (hex.y < 0) {
      return visualModels;
    }

    if (hex.len() <= this.radius - 1) {
      return visualModels;
    }

    return {
      main: window.app.visual.grounds[6],
      hover: window.app.visual.grounds[24],
    };
  }

  makeLabel (x, y) {
    const text = new PIXI.Text(`{${x}, ${y}}`);
    const sprite = new PIXI.Sprite();

    sprite.addChild(text);
    sprite.x += this.secX + 20;
    sprite.y += this.secY + 25;
    this.addChild(sprite);
  }

  makeInteractive () {
    this.interactive = true;
    this.on('mouseup', console.log);
    this.mouseover = this.mouseover.bind(this);
  }

  mouseover (evt) {
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
