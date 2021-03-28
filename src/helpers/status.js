import * as PIXI from "pixi.js";
import { connectionStore } from "../store/connectionStore";

export default class Status extends PIXI.Sprite {
  constructor() {
    const app = global.app;

    const circleDraw = new PIXI.Graphics();
    circleDraw.beginTextureFill(0x000000);
    circleDraw.drawCircle(10, 10, 10);
    circleDraw.endFill();

    const circle = app.renderer.generateTexture(
      circleDraw,
      PIXI.SCALE_MODES.LINEAR,
      1
    );

    super(circle);

    this.status = connectionStore.getState().ws;
    this.setStatus();
    this.x = window.innerWidth - 40;
    this.y = 20;
    connectionStore.watch(({ ws }) => {
      this.setStatus(ws);
    });
  }

  setStatus(status) {
    this.tint = status ? 0x00aa00 : 0xaa0000;
  }
}
