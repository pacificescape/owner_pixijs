import * as PIXI from "pixi.js";
import WorldMap from "./entities/world/worldMap.js";
import Building from "./entities/world/buildings/building.js";
import Ground from "./entities/world/grounds/ground";
const app = global.app;
const viewport = global.viewport;

export default class World extends PIXI.Container {
  constructor() {
    super();
    this.worldMap = new WorldMap();

    const textLayer = new PIXI.display.Layer(window.textGroup);
    app.textLayer = textLayer;

    const darkSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    darkSprite.tint = 0x9090c0;
    darkSprite.width = app.screen.width;
    darkSprite.height = app.screen.height;
    darkSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;

    app.stage.on("loaded", () => {
      this.initMap();

      const sea = new PIXI.TilingSprite(app.visual.sea.texture, 33, 33);
      sea.wrapMode = PIXI.WRAP_MODES.REPEAT;
      // sea.width = window.innerWidth;
      // sea.height = window.innerHeight;
      this.populate();
      viewport.addChild(this);
      viewport.addChild(textLayer);
      viewport.addChild(this.worldMap);
      app.stage.addChild(viewport);

      viewport.on("pointerdown", this.updateMap.bind(this));
      // viewport.on("pointermove", this.updateMap.bind(this));
      // viewport.on("pointerup", this.updateMap.bind(this));
      viewport.on("pointerupoutside", this.updateMap.bind(this));
      viewport.on("pointercancel", this.updateMap.bind(this));
      viewport.on("pointerout", this.updateMap.bind(this));

      // app.stage.addChild(darkSprite);
    });
  }

  updateMap(evt) {
    this.worldMap.destroy();
    // delete this.worldMap;
    this.worldMap = new WorldMap();
    this.worldMap.createMapFromLoader();
    viewport.addChild(this.worldMap);
    this.populate();
  }

  populate() {
    const worldMap = this.worldMap.getSection();
    const SIZE = this.worldMap.map.height;
    // Create a SIZExSIZE grid of bunnies
    for (let row = 0; row < worldMap.length; row++) {
      for (let col = 0; col < worldMap[0].length; col++) {
        const value = worldMap[row][col];
        if (!~value) continue;

        let offsetX = 0;
        if (row % 2) {
          offsetX = 33;
        }

        let element = null;
        const y = ((row - SIZE / 2) ** 2 + (col - SIZE / 2) ** 2) * -0.15 + 30;
        if (true) {
          element = new Ground(value);
          element.x = (col + 1) * 65 + offsetX;
          element.y = (row + 1) * 54;
          this.worldMap.addChild(element);
        } else {
          // element = new Ground(app.visual.grounds[18], y);
          // element.x = (col + 1) * 65 + offsetX;
          // element.y = (row + 1) * 54;
          // this.addChild(element);
        }
      }
    }
  }

  initMap() {
    let el = app.loader.resources.map.data.elevation;
    el = el.map((v) => v.concat(v).concat(v));
    app.loader.resources.map.data.elevation = el.concat(el).concat(el);
  }
}

app.world = new World();
