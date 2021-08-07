import * as PIXI from 'pixi.js';

import field2d from '../field2d';


export default class Ground extends field2d {
  constructor (value) {
    super();
    const viewport = window.viewport;

    const { width } = viewport.hitArea;

    this.firstTexture = window.app.visual.grounds[value === 0 ? 6 : 10];
    // width > 2000
    //   ? window.app.visual.grounds[value === 0 ? 29 : 16]
    //   : window.app.visual["grounds@0.5x"][value === 0 ? 29 : 16];

    this.secondTexture = window.app.visual.grounds[10];
    this.generalTexture = this.firstTexture;
    // this.sprite = new PIXI.Sprite(this.firstTexture.texture);
    this.sprite = new field2d();
    // this.sprite.pivot.y = value * 150;

    this.sprite.interactive = true;
    this.sprite.mouseover = this.mouseover.bind(this);
    this.sprite.mouseout = this.mouseout.bind(this);
    // this.sprite.on("pointerdown", this.toggleTexture.bind(this));
    // this.sprite.on("pointertap", this.toggleTexture.bind(this));
    // this.sprite.on("mousedown", this.toggleTexture.bind(this));
    // this.sprite.on("tap", this.toggleTexture.bind(this));
    // this.sprite.on("touchstart", this.toggleTexture.bind(this));
    this.sprite.mouseup = this.sprite.touchend = this.sprite.touchendoutside = this.sprite.mouseupoutside = this.toggleTexture.bind(
      this,
    );
    this.addChild(this.sprite);
  }

  // toggleTexture() {
  //   this.generalTexture = window.app.visual.grounds[12];
  //   this.mouseout();
  // }

  // mouseover() {
  //   this.sprite.texture = this.secondTexture.texture;
  // }

  // mouseout() {
  //   this.sprite.texture = this.generalTexture.texture;
  // }
}
