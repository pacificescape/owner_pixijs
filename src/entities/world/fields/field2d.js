import * as PIXI from "pixi.js";
const RESOLUTION = 2;

// let hexGraph = new PIXI.Graphics();
// hexGraph.drawRegularPolygon = drawRegularPolygon;

// hexGraph.beginTextureFill(0xee0000);
// hexGraph.drawRegularPolygon(0, 0, 35, 6, 0);
// hexGraph.endFill();
// // hexGraph.beginTextureFill(0xee0000);
// // hexGraph.lineStyle(0x111000);
// hexGraph.moveTo(0, 0);
// hexGraph.drawRegularPolygon(0, 0, 25, 6, 0);
// hexGraph.endFill();

// const hexTexture = app.renderer.generateTexture(
//   hexGraph,
//   PIXI.SCALE_MODES.LINEAR,
//   RESOLUTION
// );

// let hexGraphHover = new PIXI.Graphics();
// hexGraphHover.drawRegularPolygon = drawRegularPolygon;

// hexGraphHover.beginFill(0xee0000);
// hexGraphHover.drawRegularPolygon(0, 0, 25, 6, 0);
// hexGraphHover.endFill();
// hexGraphHover.beginFill(0x000000);
// hexGraphHover.drawRegularPolygon(1, 1, 35, 6, 0);
// hexGraphHover.endFill();

// const hexTextureHover = app.renderer.generateTexture(
//   hexGraphHover,
//   PIXI.SCALE_MODES.LINEAR,
//   RESOLUTION
// );

const hexs = 7;

export default class Field extends PIXI.Sprite {
  constructor(texture, x, y) {
    super(app.visual.hexagons2d[texture].texture);

    this.textures = {
      hover: app.visual.hexagons2d[7].texture,
      main: app.visual.hexagons2d[texture].texture,
    };

    // const label = new PIXI.Text(`x:${x}, y:${y}`, { fontSize: 14 });
    // label.y += 20;
    // label.x += 10;
    // this.addChild(label);

    // let pol = new PIXI.Graphics();
    // pol.beginFill(0xee0000);
    // pol.drawRegularPolygon = drawRegularPolygon;
    // pol.drawRegularPolygon(0, 0, 25, 6, 0);
    // pol.endFill();

    // const textureHex = app.renderer.generateTexture(
    //   pol,
    //   PIXI.SCALE_MODES.LINEAR,
    //   app.renderer.resolution * 2
    // );
    // this.addChild(pol);

    // this.texture = textureHex;
    // this.tint = 0xffaaaa;
    this.interactive = true;
    this.hitArea = new PIXI.Polygon([
      0,
      20,
      33,
      0,
      64,
      20,
      64,
      56,
      33,
      64,
      0,
      56,
    ]);
    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.mouseup = this.touchend = this.touchendoutside = this.mouseupoutside = this.toggleTexture.bind(
      this
    );
  }

  toggleTexture() {
    // this.generalTexture = app.visual.grounds[12];
    this.generalTexture = this.textures.main;
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

function drawRegularPolygon(x, y, radius, sides, rotation) {
  if (rotation === void 0) {
    rotation = 0;
  }
  sides = Math.max(sides | 0, 3);
  var startAngle = (-1 * Math.PI) / 2 + rotation;
  var delta = (Math.PI * 2) / sides;
  var polygon = [];
  for (var i = 0; i < sides; i++) {
    var angle = i * delta + startAngle;
    polygon.push(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
  }
  return this.drawPolygon(polygon);
}
