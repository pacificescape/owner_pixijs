import * as PIXI from "pixi.js";
import Map from "./Map.js";
import Ground from "./entities/ground";
import Building from "./entities/building.js";
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
    // Create a 5x5 grid of bunnies
    for (let row = 0; row < 50; row++) {
      for (let col = 0; col < 50; col++) {
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
        const y = ((row - 25) ** 2 + (col - 25) ** 2) * -0.15 + 30;
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
