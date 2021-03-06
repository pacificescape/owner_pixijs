import { Viewport } from "pixi-viewport";
const app = global.app;
// create viewport
const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,
  ticker: app.ticker,

  interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
});

// viewport.interactive = true;
viewport.on("pointerdown", (evt) => {
  console.log(evt);

  viewport.toWorld(150, 150);
});

global.viewport = viewport
  .drag()
  .pinch()
  .wheel()
  .clampZoom({
    minWidth: 350,
    minHeight: 350,
    maxWidth: 50000,
    maxHeigth: 50000,
  })
  .decelerate();
