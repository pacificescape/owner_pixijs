import * as PIXI from "pixi.js";
import { Group } from "@pixi/layers";
import { Viewport } from "pixi-viewport";

import { Application } from "../app";
import Stats from "stats.js";

declare global {
  interface Window {
    PIXI: typeof PIXI;

    app: Application;

    viewport: Viewport;

    stats: Stats;

    textGroup: Group;
  }
}
