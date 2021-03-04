const app = global.app;
import Ground from "./entities/ground.js";

export default class Map {
  constructor() {
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
