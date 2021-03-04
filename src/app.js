import * as PIXI from "pixi.js";
window.PIXI = PIXI;
require("pixi-layers");
window.textGroup = new PIXI.display.Group();

class Application {
  constructor() {
    this.renderer = new PIXI.Renderer({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      resize: true,
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
    this.renderer.render(this.stage);
  }
}

window.app = new Application();
