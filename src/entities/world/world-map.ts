import * as PIXI from 'pixi.js';

import { Island } from '../island/index';
import Field from '../world/fields/field';

import City from './fields/city/city.js';


// const viewport = global.viewport;

const SECTION_SIZE = 40;

// import { mapStore } from "../../control/store";
export default class WorldMap extends PIXI.Container {
  map: {
    elevation: [][],
    start: { x: number, y: number },
    moisture?: any,
  };

  island: Island;

  constructor () {
    super();
    // this.map = mapStore.getState();
    this.map = { elevation: [[]], start: { x: 0, y: 0 } };
    window.app.stage?.on('loaded', () => {
      this.createMapFromLoader();
    });
    this.island = new Island();
  }

  // Show default map if is not logged in
  // if is logged in take map island and position
  // coordinates is in app

  _createMapFromStore () {
    // this.map = mapStore.getState();
  }

  resourcesMap = {
    elevation: [],
    moisture: [],
    direction: 1,
    height: 25,
    width: 25,
    length: 625,
    start: {
      x: 0,
      y: 0,
    },
  };

  createMapFromLoader () {
    const resources = window.app.loader?.resources;

    const map = resources?.map.data;

    this.map = Object.assign({}, map);
    // eslint-disable-next-line no-self-assign
    this.map.elevation = this.map.elevation;
    // .concat(this.map.elevation)
    // .concat(this.map.elevation);
  }

  updateMap () {
    // console.log("updateMap");
  }

  getSection () {
    const viewport = window.viewport;

    const { x, y, width, height } = viewport.hitArea as any;
    // const center = viewport.center;
    const { elevation, moisture } = this.map;

    let rows = Math.floor(height / 54);

    rows = rows > elevation.length ? elevation.length : rows;
    let cols = Math.floor(width / 65);

    if (!elevation[0]) {return [];}
    cols = cols > elevation[0].length ? elevation[0].length : cols;

    // нахожу верхнюю левую клетку во вьюпорте
    const getStart = (start, angle, size) =>
      Math.ceil((angle - start) / size) - 1;
    const vpX = getStart(this.map.start.x, x, 65);
    const vpY = getStart(this.map.start.y, y, 54);

    const start = {
      x: vpX > 0 ? vpX : 0,
      y: vpY > 0 ? vpY : 0,
    };

    const section = [...new Array(start.y + rows)].map(() =>
      new Array(start.x + cols).fill(-1),
    );

    for (let row = start.y; row < start.y + rows; row++) {
      if (!elevation[row]) {continue;}
      section[row].splice(
        start.x,
        cols,
        ...elevation[row].slice(start.x, start.x + cols),
      );
    }

    // console.log(section);
    return section;
  }

  drawCity (x = 100, y = 100) {
    this.addChild(new City(5, x, y));
  }

  drawIsland () {
    const childs: any[] = [];

    // debugger;
    for (const { biome, vertices } of this.island.polygons) {
      for (const v of vertices) {
        let main = window.app.visual?.grounds[22];
        
        switch (biome) {
        case 'TEMPERATE_DESERT':
          main = window.app.visual?.grounds[4];
          break;
        case 'GRASSLAND':
          main = window.app.visual?.grounds[6];
          break;
        case 'LAKE':
          main = window.app.visual?.grounds[26];
          break;
        case 'OCEAN':
          main = window.app.visual?.grounds[26];
          break;
        case 'BEACH':
          main = window.app.visual?.grounds[17];
          break;
        }

        const fieldVisualModel = {
          main,
          hover: window.app.visual?.grounds[0],
        };

        const sprite = new Field(fieldVisualModel, { x: v[0], y: v[1] });
        
        const index = 5; 

        sprite.x = v[0] * index;
        sprite.y = v[1] * index;

        childs.push(sprite);
      }
    }

    childs.sort(({ y: y1 }, { y: y2 }) => y1 - y2);

    for (const sprite of childs) {this.addChild(sprite);}
  }
}
