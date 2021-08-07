import * as PIXI from 'pixi.js';
import { Group } from '@pixi/layers';
import { Viewport } from 'pixi-viewport';
import Stats from 'stats.js';
import World from 'src/world';

import { Application } from '../app';


declare global {
  interface Window {
    PIXI: typeof PIXI;
    app: Application;
    viewport: Viewport;

    stats: Stats;

    textGroup: Group;

    world: World;
  }
}
