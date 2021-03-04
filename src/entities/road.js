import * as PIXI from "pixi.js";

export default class Road extends PIXI.Container {
  constructor(visualModel, y) {
    super();

    this.sprite = new PIXI.Sprite(visualModel.texture);
    this.sprite.pivot.y = y;
    this.addChild(this.sprite);
    // this.sprite.pivot.copyFrom(visualModel.pivot || { x: 32, y: 33 });
  }
}
