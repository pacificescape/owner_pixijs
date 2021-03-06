import * as PIXI from "pixi.js";

export default class Ground extends PIXI.Container {
  constructor(value) {
    super();

    this.firstTexture = app.visual.grounds[value === 0 ? 29 : 16];
    this.secondTexture = app.visual.grounds[22];
    this.generalTexture = this.firstTexture;
    this.sprite = new PIXI.Sprite(this.firstTexture.texture);
    this.sprite.pivot.y = value * 150;
    this.sprite.interactive = true;

    this.sprite.mouseover = this.mouseover.bind(this);
    this.sprite.mouseout = this.mouseout.bind(this);
    this.sprite.click = this.toggleTexture.bind(this);
    this.addChild(this.sprite);
  }

  toggleTexture() {
    this.generalTexture = app.visual.grounds[Math.round(Math.random() * 30)];
  }

  mouseover() {
    this.sprite.texture = this.secondTexture.texture;
  }

  mouseout() {
    this.sprite.texture = this.generalTexture.texture;
  }
}
