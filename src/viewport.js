import { Viewport } from 'pixi-viewport';


const app = global.app;
// create viewport
const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 100,
  worldHeight: 100,
  ticker: app.ticker,

  interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
});

viewport.interactive = true;
viewport.animate({
  scale: 1.5,
  position: { x: 150, y: 150 },
  time: 0,
});

global.viewport = viewport
  .drag()
  .pinch()
  .wheel()
  .clampZoom({
    minWidth: 350,
    minHeight: 350,
    maxWidth: 5000,
    maxHeigth: 5000,
  })
  .decelerate();
