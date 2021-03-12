import * as PIXI from "pixi.js";
import WorldMap from "./entities/world/worldMap.js";
import Building from "./entities/world/fields/buildings/building.js";
import Field2d from "./entities/world/fields/field2d";
import Sector from "./entities/world/fields/sector/sector.js";
import Status from "./helpers/status.js";
import { getMapFX } from "./control/store";

const app = global.app;
const viewport = global.viewport;
let fields = [];
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
      // fields = new Array(8).fill("").map((_, i) => new Field2d(i));

      // const sea = new PIXI.TilingSprite(app.visual.sea.texture, 33, 33);
      // sea.wrapMode = PIXI.WRAP_MODES.REPEAT;
      // sea.width = window.innerWidth;
      // sea.height = window.innerHeight;
      this.drawSectors();
      viewport.addChild(this);
      viewport.addChild(textLayer);
      viewport.addChild(this.worldMap);
      app.stage.addChild(viewport);
      app.stage.addChild(new Status());
      viewport.animate({ position: { x: 0, y: 0 }, time: 500 });

      // viewport.on("pointerdown", this.updateMap.bind(this));
      // viewport.on("pointermove", this.updateMap.bind(this));
      // viewport.on("pointerup", this.updateMap.bind(this));
      // viewport.on("pointerupoutside", this.updateMap.bind(this));
      // viewport.on("pointercancel", this.updateMap.bind(this));
      // viewport.on("pointerout", this.updateMap.bind(this));

      // app.stage.addChild(darkSprite);

      // TODO Refactor
      const zeroLabel = new PIXI.Text("zero");
      viewport.addChild(zeroLabel);

      getMapFX(global.viewport.hitArea);

      app.ticker.add((delta) => {
        if (viewport.moving) {
          // if (viewport.plugins.list[4].timeSinceRelease < 500) {
          // this.updateMap();
          // }
        }
      });
    });
  }

  updateMap(evt) {
    this.worldMap.destroy();
    // delete this.worldMap;
    this.worldMap = new WorldMap();
    this.worldMap.createMapFromLoader();
    viewport.addChild(this.worldMap);
    this.drawSectors();
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
          offsetX = 32;
        }

        let element = null;
        const y = ((row - SIZE / 2) ** 2 + (col - SIZE / 2) ** 2) * -0.15 + 30;
        element = new Field2d(Math.floor(value * 2 + 1) || 1);
        element.x = (col + 1) * element.width + offsetX;
        element.y = (row + 1) * 54;
        this.worldMap.addChild(element);
      }
    }
  }

  drawSectors() {
    const wroldMap = this.worldMap.getSection();

    const hexas = [
      [0, 700],
      [0, -700],
      [0, 0],
      [575, 350],
      [575, -350],
      [-575, 350],
      [-575, -350],
    ];

    hexas.forEach(([x, y]) => {
      this.worldMap.addChild(new Sector(x, y));
    });
  }

  initMap() {
    let el = app.loader.resources.map.data.elevation;
    el = el.map((v) => v.concat(v).concat(v));
    app.loader.resources.map.data.elevation = el.concat(el).concat(el);
  }
}

app.world = new World();
