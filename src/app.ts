import * as PIXI from "pixi.js";
import { Stage, Group } from "@pixi/layers";
import World from "./world";

window.PIXI = PIXI;
window.textGroup = new Group();

const stats = window.stats;
// const rpc = window.rpc;
export class Application {
  renderer: PIXI.Renderer;

  textLayer: any;

  ticker: PIXI.Ticker;

  stage: Stage | any;

  world: World | any;

  visual: any;

  constructor() {
    this.renderer = new PIXI.Renderer({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      // resizeTo: window,
      autoResize: true, // https://www.html5gamedevs.com/topic/42553-resize-window/
      autoDensity: true, // TODO: resize do not working after change orientation ios/?android
    } as any);

    document.body.appendChild(this.renderer.view);

    this.ticker = new PIXI.Ticker();
    // this.stage
    // this.world

    this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.LOW);
    this.ticker.start();
  }

  get screen() {
    return this.renderer.screen;
  }

  render() {
    stats.begin();
    // console.log(window.viewport.hitArea.width, window.viewport.hitArea.height);
    this.renderer.render(this.stage as any);
    stats.end();
  }

  onresize() {
    window.app.renderer.resize(window.innerWidth, window.innerHeight);
    window.viewport.resize(window.innerWidth, window.innerHeight);

    window.app.world?.resize();
  }
}

window.app = new Application();
window.app.stage = new Stage();
window.app.world = new World();
window.onresize = window.app.onresize; // todo eventEmitter???
