import * as PIXI from "pixi.js";

export default class Field extends PIXI.Sprite {
  constructor(texture, x, y) {
    super(texture);

    this.textures = {
      hover: app.visual.grounds[0].texture,
      main: texture,
    };

    // const label = new PIXI.Text(`x:${x}, y:${y}`, { fontSize: 14 });
    // label.y += 20;
    // label.x += 10;
    // this.addChild(label);

    this.interactive = true;
    this.hitArea = new PIXI.Polygon([
      0,
      25,
      50,
      0,
      100,
      25,
      100,
      112,
      50,
      137,
      0,
      112,
    ]);

    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.mouseup = this.touchend = this.touchendoutside = this.mouseupoutside = this.toggleTexture.bind(
      this
    );
  }

  toggleTexture() {
    this.generalTexture = app.visual.grounds[12];
    this.mouseout();
  }

  mouseover(evt) {
    // console.log(evt);
    this.texture = this.textures.hover;
  }

  mouseout() {
    this.texture = this.textures.main;
  }
}
