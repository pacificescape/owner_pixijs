const PIXI = global.PIXI;
const app = global.app;
const viewport = global.viewport;

export default class WorldMap extends PIXI.Container {
  constructor() {
    super();
    app.stage.on("loaded", () => {
      this.createMapFromLoader();
    });
  }

  // Show default map if is not logged in
  // if is logged in take map island and position
  // coordinates is in app

  createMapFromLoader() {
    const resources = app.loader.resources;
    const map = resources.map.data;

    this.map = map.data;
    this.height = map.height;
    this.width = map.width;
  }

  getSection(world) {
    const center = viewport.center;
    const { width, height } = viewport.hitArea;
  }
}
