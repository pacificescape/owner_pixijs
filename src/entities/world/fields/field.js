import * as PIXI from 'pixi.js';


export default class Field extends PIXI.Sprite {
  quotafbotclick = () => null;

  polygon = new PIXI.Polygon([
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
  ]);

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
    this.hitArea = this.polygon; // map if texture size change

    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.addListener('pointerdown', this.mouseover.bind(this));
    this.addListener('pointerup', this.mouseout.bind(this));

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

      // window.app.stage.emit(
      //   'window',
      //   evt.data.global,
      //   {
      //     pos: this.pos,
      //     sector: this.sector,
      //   },
      //   evt.data.global,
      // );
      
      // this.quotafbotclick();
      
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
    
    const pic = PIXI.Sprite.from(window.app.loader.resources[url].texture);
    
    
    pic.width = this.width;
    pic.height = this.width;
    pic.alpha = 0.7;
    pic.interactive = true;
    pic.buttonMode = true;
    pic.on('touchend', () => window.open('https://t.me/quotafbot'));
    

    const on = () => { pic.alpha = 1; };
    const off = () => { pic.alpha = 0.7; };

    pic.mouseover = on;
    pic.mouseout = off;
    pic.mousedown = off;
    pic.mouseup = () => window.open('https://t.me/quotafbot');
    pic.addListener('pointerdown', on);
    pic.addListener('pointerup', off);

    const mask = new PIXI.Graphics();
    
    mask.beginFill(0xFF_33_00);
    mask.drawPolygon(this.hitArea);

    mask.endFill();

    mask.isMask = true;

    pic.mask = mask;

    this.addChild(mask);
    this.addChild(pic);
  }

  makeCoordinateLabel (x, y) {
    const label = new PIXI.Text(`x:${x}, y:${y}`, { fontSize: 14 });

    label.y += 20;
    label.x += 10;
    this.addChild(label);
  }
}
