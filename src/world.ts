import {
  Sprite,
  Texture,
  Container,
  WRAP_MODES,
  BLEND_MODES,
  TilingSprite,
  DisplayObject,
} from 'pixi.js';
import { Layer } from '@pixi/layers';
import { AnimateOptions } from 'pixi-viewport';

import Status from './helpers/status.js';
import WorldMap from './entities/world/world-map';
// import { getMapFX } from './store';


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default class World extends Container {
  worldMap: any;

  textLayer: any;

  constructor () {
    super();

    // this.worldMap = new WorldMap();

    // const textLayer = new Layer(window.textGroup);
    // app.textLayer = textLayer;

    // const darkSprite = new Sprite(Texture.WHITE);
    // darkSprite.tint = 0x9090c0;
    // darkSprite.width = app.screen.width;
    // darkSprite.height = app.screen.height;
    // darkSprite.blendMode = BLEND_MODES.MULTIPLY;


    window.app?.stage?.on('loaded', async () => {
      await sleep(300); // TODO emit another event

      this.worldMap = new WorldMap();

      const textLayer = new Layer(window.textGroup as any);

      window.app.textLayer = textLayer;

      const darkSprite = new Sprite(Texture.WHITE);

      darkSprite.tint = 0x90_90_C0;
      darkSprite.width = window.app.screen.width;
      darkSprite.height = window.app.screen.height;
      darkSprite.blendMode = BLEND_MODES.MULTIPLY;

      const sea: any = new TilingSprite(window.app.visual?.sea.texture, 33, 33);

      sea.wrapMode = WRAP_MODES.REPEAT;
      sea.width = window.innerWidth;
      sea.height = window.innerHeight;
      sea.tileScale = { x: 0.08, y: 0.08 };

      window.viewport.addChild(this);
      window.viewport.addChild(textLayer as any);
      window.viewport.addChild(this.worldMap);
      window.app.stage?.addChild(sea);
      window.app.stage?.addChild(window.viewport);
      window.app.stage?.addChild(new Status());
      window.viewport.animate({
        scale: 0.3,
        position: { x: 0, y: 0 },
        time: 0,
      } as AnimateOptions);
      this.updateMap();
      // getMapFX(window.viewport.hitArea);
      // window.viewport.on("pointerdown", this.updateMap.bind(this));
      // window.viewport.on("pointermove", this.updateMap.bind(this));
      // window.viewport.on("pointerup", this.updateMap.bind(this));
      // window.viewport.on("pointerupoutside", this.updateMap.bind(this));
      // window.viewport.on("pointercancel", this.updateMap.bind(this));
      // window.viewport.on("pointerout", this.updateMap.bind(this));

      // window.app.stage.addChild(darkSprite);

      window.app.ticker.add((_delta) => {
        if (window.viewport.moving) {
          // position changed more than x y
          // getMapFX(window.viewport.hitArea); //.then(check);
          // sectors are too far away
          // this.updateMap()
        }
      });
    });
  }

  updateMap (evt?: any): void {
    this.worldMap.destroy();
    this.worldMap = new WorldMap();
    this.worldMap.drawIsland();
    window.viewport.addChild(this.worldMap);
  }

  resize () {
    this.destroy();
    window.app.world = new World();
  }
}
