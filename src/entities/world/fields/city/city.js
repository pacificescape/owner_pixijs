import * as PIXI from "pixi.js";
import Sector from "../sector/sector";
import { makeHexagonalShape } from "../../../../utils/hexGenerator";
const app = global.app;

export default class City extends PIXI.Container {
  constructor(radius = 5, addX, addY) {
    super();
    // TODO: Refactor
    this.sectors = makeHexagonalShape(radius).map((hex) => {
      let { x, y } = hex.evenCol();
      const sector = new Sector(x, y, { x: addX, y: addY });
      return sector;
    });
    this.addChild(...this.sectors);
  }
}
