import * as PIXI from 'pixi.js';
import { Hex, makeHexagonalShape } from '@/utils/hex-generator';

import Field from '../field';


const WIDTH = 100;
const HEIGHT = 75; // @TODO get w h from tile config
const PADDING = 600;

const SECTOR_RADIUS = 2;
const s = (d) => d * SECTOR_RADIUS * 2;

export default class Sector extends PIXI.Container {
  secX: number;

  secY: number;

  visualModel: any;

  radius: number;

  grid: Hex[];

  sprites?: Field[];

  constructor (secX, secY, position) {
    super();
    this.secX = secX;
    this.secY = secY;
    this.x = secX * PADDING + position.x;
    this.y = secY * PADDING - (PADDING * (secX & 1)) / 2 + position.y;

    this.visualModel = {};
    this.radius = SECTOR_RADIUS;
    this.grid = makeHexagonalShape(this.radius);
    this.sprites = this.makeSector();
    this.makeInteractive();

    this.addChild(...this.sprites);
    this.makeLabel(secX, secY);
  }

  makeSector () {
    return this.grid.map((hex) => {
      const { x, y } = hex;
      const sprite = new Field(
        this.getFieldModel(hex),
        { x, y },
        {
          x: this.secX,
          y: this.secY,
        },
      );

      if (x === 0 && y === 0) {
        sprite.addPic('https://tx.me/i/userpic/320/quotafbot.jpg');
      }

      sprite.x = (x - (y & 1) / 2) * WIDTH;
      sprite.y = y * HEIGHT;
      return sprite;
    });
  }

  getFieldModel (hex) {
    const visualModels = {
      main: window.app.visual?.grounds[8],
      hover: window.app.visual?.grounds[23],
    };

    if (hex.y < 0) {
      return visualModels;
    }

    if (hex.len() <= this.radius - 1) {
      return visualModels;
    }

    return {
      main: window.app.visual?.grounds[6],
      hover: window.app.visual?.grounds[24],
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
