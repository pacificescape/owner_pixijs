import * as PIXI from 'pixi.js';
import { Stage, Group } from '@pixi/layers';
import { Loader } from 'pixi.js';

import World from './world';
import { VisualModels } from './visual';


window.PIXI = PIXI;
window.textGroup = new Group();

const stats = window.stats;

// const rpc = window.rpc;
export class Application {
  renderer: PIXI.Renderer;

  textLayer: any;

  ticker: PIXI.Ticker;

  stage?: Stage;

  world?: World;

  visual?: VisualModels;

  loader?: Loader;

  gameWidth: number;

  gameHeight: number;


  constructor () {
    this.renderer = new PIXI.Renderer({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x10_99_BB,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
      autoResize: true, // https://www.html5gamedevs.com/topic/42553-resize-window/
      autoDensity: true, // TODO: resize do not working after change orientation ios/?android
    } as any);

    this.gameWidth = window.innerWidth;
    this.gameHeight = window.innerHeight;


    document.body.append(this.renderer.view);

    this.ticker = new PIXI.Ticker();
    // this.stage
    // this.world

    this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.LOW);
    this.ticker.start();
  }

  get screen () {
    return this.renderer.screen;
  }

  render () {
    stats.begin();
    // console.log(window.viewport.hitArea.width, window.viewport.hitArea.height);
    this.renderer.render(this.stage as any);
    stats.end();
  }

  onresize () {
    window.app.renderer.resize(window.innerWidth, window.innerHeight);
    window.viewport.resize(window.innerWidth, window.innerHeight);

    window.app.world?.resize();
  }
}

window.app = new Application();
window.app.stage = new Stage();
window.app.world = new World();
// window.addEventListener('resize', window.app.onresize); // todo eventEmitter???

function resizeCanvas (): void {
  const resize = () => {
    window.app.renderer.resize(window.innerWidth, window.innerHeight);

    if (window.app.stage) {
      window.app.stage.scale.x = window.innerWidth / window.app.gameWidth;
      window.app.stage.scale.y = window.innerHeight / window.app.gameHeight;
    }
  };

  resize();

  window.addEventListener('resize', resize);
}

resizeCanvas();
