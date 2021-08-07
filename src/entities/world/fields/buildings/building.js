import * as PIXI from 'pixi.js';


const app = global.app;

const names = [
  [
    'Afterlife Tower',
    'Heart Tower',
    'Solidarity Lookout',
    'Supremacy Spire',
    'Fusion Spire',
    'Dream Grounds Mast',
    'Crypt Mountain Obelisk',
    'Ebon Beach Tower',
    'East Range Obelisk',
    'Miracle Morass Obelisk',
  ],
  [
    'bank',
    'sexshop',
    'drugstore',
    'post office',
    'police office',
    'Crazy Panda office',
    'food market',
    'city hall',
    'cinema',
  ],
].flat();

const labelStyle = new PIXI.TextStyle({
  fontFamily: 'Roboto',
  fontSize: 24,
  fill: 'white',
});

export default class Building extends PIXI.Container {
  constructor (visualModel, y) {
    super();

    this.sprite = new PIXI.Sprite(visualModel.texture);
    this.sprite.pivot.y = this.sprite.pivot.y + y;
    this.addChild(this.sprite);
    // this.sprite.pivot.copyFrom(visualModel.pivot || { x: 65, y: 59 });

    this.sprite.on('click', () => {
      console.log('chop');
      window.tree.sprite.texture = window.textures.choppedTreesTexture;
    });

    const building = new PIXI.Sprite(window.app.visual.buildings[0].texture);

    building.pivot.y = 35 + (y * 100) / 66;
    building.scale.x = 0.66;
    building.scale.y = 0.66;
    this.addChild(building);
    const roof = new PIXI.Sprite(window.app.visual.buildings[1].texture);

    roof.pivot.y = 55 + (y * 100) / 66;
    roof.scale.x = 0.66;
    roof.scale.y = 0.66;
    this.addChild(roof);

    // this.label = new PIXI.Text(names[(Math.random() * names.length) | 0], labelStyle);
    // this.addChild(this.label);
    // this.label.anchor.set(0.5, 2);
    // this.label.parentGroup = window.textGroup;

    this.phase = 40 * Math.random();

    app.ticker.add((delta) => {
      // this.update(delta);
    });
  }

  onMouseOver () {
    const par = 1;

    this.sprite.y = -50 * (1 - par * par);
  }

  onMouseOut () {
    const par = 1;

    this.sprite.y = 50 * (1 - par * par);
  }

  update (delta) {
    // this.phase += delta * 0.1;
    // this.phase %= 10.0;
    // if (this.phase > 2.0) {
    //   this.sprite.y = 0;
    //   return;
    // }
    // const par = this.phase - 1;
    // this.sprite.y = -50 * (1 - par * par);
  }
}
