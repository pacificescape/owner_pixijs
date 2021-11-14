import * as PIXI from 'pixi.js';


export default class Field extends PIXI.Sprite {
  constructor (visualModels, pos, sector) {
    const textures = {
      hover: visualModels.hover.texture,
      main: visualModels.main.texture,
    };

    super(textures.main);

    // this.cacheAsBitmap = true;
    // this.cacheAsBitmapResolution = 0.3;

    this.textures = textures;

    this.pos = pos;
    this.sector = sector;

    this.interactive = true;
    this.hitArea = new PIXI.Polygon([
      0,
      25,
      50,
      0,
      100,
      25,
      100,
      112,
      50,
      137,
      0,
      112,
    ]); // map if texture size change

    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.mouseup = this.touchend = this.touchendoutside = this.mouseupoutside = this.parseClick.bind(
      this,
    );
    this.touchstart = this.mousedown = (evt) => {
      // console.log("touchstart");
      this.touch = {
        x: evt.data.global.x,
        y: evt.data.global.y,
      };
    };
  }

  parseClick (evt) {
    if (!this.touch) {return;}
    if (
      this.touch.x === evt.data.global.x &&
      this.touch.y === evt.data.global.y
    ) {
      console.log('click parsed');

      window.app.stage.emit(
        'window',
        evt.data.global,
        {
          pos: this.pos,
          sector: this.sector,
        },
        evt.data.global,
      );
      return;
    }
    console.log('move parsed');
    this.mouseout();
  }

  toggleTexture () {
    this.generalTexture = window.app.visual.grounds[12];
    this.mouseout();
  }

  mouseover (evt) {
    this.texture = this.textures.hover;
  }

  mouseout () {
    this.texture = this.textures.main;
  }

  async addPic (url) {
    // const url = 'http://adgang.jp/wp-content/uploads/2017/07/318.png';
    const loader = new PIXI.Loader();

    // const link = await fetch(url, {
    //   mode: 'cors',
    //   headers: [
    //     ['Access-Control-Allow-Origin', '*'],
    //     ['Access-Control-Allow-Headers', '*'],
    //     ['Access-Control-Allow-Methods', '*'],
    //   ],
    // }).catch((error) => {return error;});

    const img = new Image();

    // img.crossOrigin = '';
    img.src = url;
    img.addEventListener('load', () => {
      
      // loader.add(
      //   url,
      //   url,
      //   { crossOrigin: '' },
      // ).load(() => {
          
      // img.crossOrigin = '';
      const pic = PIXI.Sprite.from(img);
          
      this.addChild(pic);
      // });

    });
  }

  makeCoordinateLabel (x, y) {
    const label = new PIXI.Text(`x:${x}, y:${y}`, { fontSize: 14 });

    label.y += 20;
    label.x += 10;
    this.addChild(label);
  }
}
