import * as PIXI from 'pixi.js';

import City from './fields/city/city.js';


const app = window.app;
const viewport = global.viewport;

const SECTION_SIZE = 40;

// import { mapStore } from "../../control/store";
export default class WorldMap extends PIXI.Container {
  constructor () {
    super();
    // this.map = mapStore.getState();
    this.map = { elevation: [[]], start: { x: 0, y: 0 } };
    window.app.stage.on('loaded', () => {
      this.createMapFromLoader();
    });
  }

  // Show default map if is not logged in
  // if is logged in take map island and position
  // coordinates is in app

  _createMapFromStore () {
    // this.map = mapStore.getState();
  }

  createMapFromLoader () {
    const resources = app.loader.resources;
    const map = resources.map.data;

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

    const { x, y, width, height } = viewport.hitArea;
    const center = viewport.center;
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
}