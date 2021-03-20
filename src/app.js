import * as PIXI from "pixi.js";
window.PIXI = PIXI;
require("pixi-layers");
window.textGroup = new PIXI.display.Group();

const stats = window.stats;
const rpc = window.rpc;
class Application {
  constructor() {
    this.renderer = new PIXI.Renderer({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
      autoResize: true, // https://www.html5gamedevs.com/topic/42553-resize-window/
      autoDensity: true, // TODO: resize do not working after change orientation ios/?android
    });

    document.body.appendChild(this.renderer.view);

    this.ticker = new PIXI.Ticker();
    this.stage = new PIXI.display.Stage();

    this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.LOW);
    this.ticker.start();
  }

  get screen() {
    return this.renderer.screen;
  }

  render() {
    stats.begin();
    // console.log(window.viewport.hitArea.width, window.viewport.hitArea.height);
    this.renderer.render(this.stage);
    stats.end();
  }

  onresize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    viewport.resize(window.innerWidth, window.innerHeight);
    app.world.resize();
  }
}

window.app = new Application();
window.onresize = window.app.onresize; // todo eventEmitter???
