import * as PIXI from "pixi.js";
import Sector from "../sector/sector";
import { makeHexagonalShape } from "../../../../utils/hexGenerator";
const app = global.app;

export default class City extends PIXI.Container {
  constructor(radius = 5) {
    super();
    // TODO: Refactor
    this.sectors = makeHexagonalShape(radius).map((hex) => {
      let { x, y } = hex.evenCol();
      x = x;
      y = y + (y - (x & 1)) / 2;
      const sector = new Sector(x, y);
      sector.x = x * 500;
      sector.y = y * 350;
      return sector;
    });
    this.addChild(...this.sectors);
  }
}
