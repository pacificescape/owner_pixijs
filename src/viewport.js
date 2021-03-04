import { Viewport } from "pixi-viewport";
const app = global.app;
// create viewport
const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,

  interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
});

global.viewport = viewport.drag().pinch().wheel().decelerate();
