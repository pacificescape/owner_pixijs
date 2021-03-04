import * as PIXI from "pixi.js";
import Map from "./entities/world/map.js";
import Ground from "./entities/world/grounds/ground";
import Building from "./entities/world/buildings/building.js";
import Road from "./entities/road.js";
const app = global.app;
const viewport = global.viewport;

export default class World extends PIXI.Container {
  constructor() {
    super();
    this.map = new Map();

    const textLayer = new PIXI.display.Layer(window.textGroup);
    app.textLayer = textLayer;

    const darkSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    darkSprite.tint = 0x9090c0;
    darkSprite.width = app.screen.width;
    darkSprite.height = app.screen.height;
    darkSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;

    app.stage.on("loaded", () => {
      const sea = new PIXI.TilingSprite(app.visual.sea.texture, 33, 33);
      sea.wrapMode = PIXI.WRAP_MODES.REPEAT;
      // sea.width = window.innerWidth;
      // sea.height = window.innerHeight;
      this.populate();
      viewport.addChild(this);
      viewport.addChild(textLayer);
      app.stage.addChild(viewport);
      // app.stage.addChild(darkSprite);
    });
  }

  populate() {
    const SIZE = 50;
    // Create a SIZExSIZE grid of bunnies
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        let ind = 0;
        if ((row + col) % 4) {
          ind = 1;
        }
        if ((row - col + 4) % 4) {
          ind += 2;
        }

        let offsetX = 0;
        if (row % 2) {
          offsetX = 33;
        }

        let element = null;
        const y = ((row - SIZE / 2) ** 2 + (col - SIZE / 2) ** 2) * -0.15 + 30;
        if (ind === 0 && row % 4 === 0) {
          element = new Building(app.visual.grounds[6], y);
          element.x = (col + 1) * 65 + offsetX;
          element.y = (row + 1) * 54;
          this.addChild(element);
        } else {
          element = new Road(app.visual.grounds[18], y);
          element.x = (col + 1) * 65 + offsetX;
          element.y = (row + 1) * 54;
          this.addChild(element);
        }
      }
    }
  }
}

app.world = new World();
