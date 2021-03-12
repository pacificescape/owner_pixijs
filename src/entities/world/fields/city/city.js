import * as PIXI from "pixi.js";
import Sector from "../sector/sector";
const app = global.app;

export default class City extends PIXI.Container {
  constructor() {
    super();

    this.sectors = [
      [0, 700],
      [0, -700],
      [0, 0],
      [575, 350],
      [575, -350],
      [-575, 350],
      [-575, -350],
    ].map(([x, y]) => new Sector(x, y));

    this.addChild(this.getIsland());
    this.addChild(...this.sectors);
  }

  getIsland() {
    const texture = app.visual.hugeIsland;
    const island = new PIXI.Sprite(texture);
    island.scale = { x: 2.5, y: 2.5 };
    island.x = -1900;
    island.y = -1600;
    island.skew = { x: 0.1, y: 0 };
    return island;
  }
}
