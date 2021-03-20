const app = global.app;

class VisualModels {
  constructor() {
    app.stage.on("loaded", () => {
      this.createModels();
    });
  }

  createModels() {
    const resources = app.loader.resources;
    const buildings = resources.buildings.textures;
    const all = resources.all.textures;
    const grounds = resources.grounds.textures;
    const hexagons2d = resources.hexagons2d.textures;
    const hugeIsland = resources.hugeIsland.texture;

    Object.assign(this, {
      sea: resources.sea.texture,
      hugeIsland,
      hexagons2d: [
        { texture: hexagons2d["black.png"] },
        { texture: hexagons2d["blue.png"] },
        { texture: hexagons2d["green.png"] },
        { texture: hexagons2d["grey.png"] },
        { texture: hexagons2d["orange.png"] },
        { texture: hexagons2d["red.png"] },
        { texture: hexagons2d["violet.png"] },
        { texture: hexagons2d["white.png"] },
      ],
      grounds: [
        { texture: grounds["tileAutumn.png"] },
        { texture: grounds["tileAutumn_full.png"] },
        { texture: grounds["tileAutumn_bridge.png"] },
        { texture: grounds["tileAutumn_tile.png"] },
        { texture: grounds["tileDirt.png"] },
        { texture: grounds["tileDirt_full.png"] },
        { texture: grounds["tileDirt_bridge.png"] },
        { texture: grounds["tileDirt_tile.png"] },
        { texture: grounds["tileGrass.png"] },
        { texture: grounds["tileGrass_full.png"] },
        { texture: grounds["tileGrass_bridge.png"] },
        { texture: grounds["tileGrass_tile.png"] },
        { texture: grounds["tileLava.png"] },
        { texture: grounds["tileLava_full.png"] },
        { texture: grounds["tileLava_bridge.png"] },
        { texture: grounds["tileLava_tile.png"] },
        { texture: grounds["tileMagic.png"] },
        { texture: grounds["tileMagic_full.png"] },
        { texture: grounds["tileMagic_bridge.png"] },
        { texture: grounds["tileMagic_tile.png"] },
        { texture: grounds["tileRock.png"] },
        { texture: grounds["tileRock_bridge.png"] },
        { texture: grounds["tileRock_tile.png"] },
        { texture: grounds["tileSand.png"] },
        { texture: grounds["tileSand_full.png"] },
        { texture: grounds["tileSand_bridge.png"] },
        { texture: grounds["tileSand_tile.png"] },
        { texture: grounds["tileSnow.png"] },
        { texture: grounds["tileSnow_full.png"] },
        { texture: grounds["tileSnow_bridge.png"] },
        { texture: grounds["tileSnow_tile.png"] },
        { texture: grounds["tileStone.png"] },
        { texture: grounds["tileStone_bridge.png"] },
        { texture: grounds["tileStone_full.png"] },
        { texture: grounds["tileStone_tile.png"] },
        { texture: grounds["tileWater.png"] },
        { texture: grounds["tileWater_full.png"] },
        { texture: grounds["tileWater_shadow.png"] },
        { texture: grounds["tileWater_tile.png"] },
        { texture: grounds["tileWood_bridge.png"] },
      ].filter(({ texture }) => texture),
      buildings: [
        {
          texture: buildings["sandDoorWindowBlindsMirror.png"],
        },
        {
          texture: buildings["sandRoofStraight.png"],
        },
      ],
      roads: [
        {
          texture: all["empty"],
          // pivot: { x: 65, y: 33 }
        },
        {
          texture: all["right"],
          // pivot: { x: 65, y: 33 }
        },
        {
          texture: all["left"],
          // pivot: { x: 65, y: 33 }
        },
        {
          texture: all["cross"],
          // pivot: { x: 65, y: 13 }
        },
      ],
      png: [
        {
          texture: resources.tileGrass.texture,
        },
        {
          texture: resources.tileSnow.texture,
        },
      ],
      sea: resources.sea,
    });
  }
}

app.visual = new VisualModels();
