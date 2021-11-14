import * as PIXI from 'pixi.js';
import { makeHexagonalShape } from '@/utils/hex-generator';

import Sector from '../sector/sector';


export default class City extends PIXI.Container {
  sectors: Sector[];

  constructor (radius = 5, addX: number, addY: number) {
    super();
    // TODO: Refactor
    this.sectors = makeHexagonalShape(radius).map((hex) => {
      const { x, y } = hex.evenCol();
      const sector = new Sector(x, y, { x: addX, y: addY });

      return sector;
    });
    this.addChild(...this.sectors);
  }
}
