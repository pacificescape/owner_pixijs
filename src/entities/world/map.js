const PIXI = global.PIXI;
const app = global.app;

export default class Map extends PIXI.Container {
  constructor() {
    super();
    app.stage.on("loaded", () => {
      this.createMap();
    });
  }

  // Show default map if is not logged in
  // if is logged in take map island and position
  // coordinates is in app

  createMap() {
    const resources = app.loader.resources;
    const map = resources.map.data;

    this.map = map;
  }

  section(world) {
    // console.log(app.viewport);
  }
}
