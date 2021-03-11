import * as PIXI from "pixi.js";
const loader = new PIXI.Loader();
const app = global.app;
global.app.loader = loader;

const loadOptions = { crossOrigin: true };

loader.baseUrl = "assets/";
loader.add("map", "map.json", loadOptions);
loader.add("all", "buildings_roads.json", loadOptions);
loader.add("tileGrass", "tileGrass.png", loadOptions);
loader.add("tileSnow", "tileSnow.png", loadOptions);
loader.add("grounds", "ground/grounds.json", loadOptions);
// loader.add("grounds@0.5x", "ground/grounds@0.5x.json", loadOptions);
loader.add("sea", "sea/sea_1.png", loadOptions);
loader.add("buildings", "buildings/buildings.json", loadOptions);

loader.load(() => {
  app.stage.emit("loaded");
});
