import * as PIXI from "pixi.js";
import Sector from "../sector/sector";
import { makeHexagonalShape } from "../../../../utils/hexGenerator";
const app = global.app;

const WIDTH = 10;
const HEIGHT = 10;
export default class City extends PIXI.Container {
  constructor(radius = 3) {
    super();

    this.sectors = makeHexagonalShape(radius).map(({ x, y }) => {
      x = (this.x + x - (y & 1) / 2) * WIDTH;
      y = (this.y + y) * HEIGHT;
      return new Sector(x, y);
    });

    this.addChild(...this.sectors);
  }
}
