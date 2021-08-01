import * as PIXI from "pixi.js";
import WorldMap from "./entities/world/worldMap.js";
import Status from "./helpers/status.js";
import { getMapFX } from "./store";

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
      const sea = new PIXI.TilingSprite(app.visual.sea.texture, 33, 33);
      sea.wrapMode = PIXI.WRAP_MODES.REPEAT;
      sea.width = window.innerWidth;
      sea.height = window.innerHeight;
      sea.tileScale = { x: 0.08, y: 0.08 };

      viewport.addChild(this);
      viewport.addChild(textLayer);
      viewport.addChild(this.worldMap);
      app.stage.addChild(sea);
      app.stage.addChild(viewport);
      app.stage.addChild(new Status());
      viewport.animate({ scale: 0.3, position: { x: 0, y: 0 }, time: 0 });
      this.updateMap();
      getMapFX(viewport.hitArea);
      // viewport.on("pointerdown", this.updateMap.bind(this));
      // viewport.on("pointermove", this.updateMap.bind(this));
      // viewport.on("pointerup", this.updateMap.bind(this));
      // viewport.on("pointerupoutside", this.updateMap.bind(this));
      // viewport.on("pointercancel", this.updateMap.bind(this));
      // viewport.on("pointerout", this.updateMap.bind(this));

      // app.stage.addChild(darkSprite);

      app.ticker.add((delta) => {
        if (viewport.moving) {
          // position changed more than x y
          getMapFX(viewport.hitArea); //.then(check);
          // sectors are too far away
          // this.updateMap()
        }
      });
    });
  }

  updateMap(evt) {
    this.worldMap.destroy();
    this.worldMap = new WorldMap();
    this.worldMap.drawCity();
    viewport.addChild(this.worldMap);
  }

  resize() {
    this.destroy();
    app.world = new World();
  }
}

app.world = new World();
