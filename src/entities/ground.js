import * as PIXI from "pixi.js";

export default class Ground extends PIXI.Container {
  constructor(visualModel) {
    super();

    this.sprite = new PIXI.Sprite(visualModel.texture);
    this.addChild(this.sprite);
    // this.sprite.pivot.copyFrom(visualModel.pivot || { x: 65, y: 33 });
  }
}
