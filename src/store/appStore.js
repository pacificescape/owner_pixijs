import { createStore, createEvent, createEffect } from "effector";
const app = window.app;

export const toggleWindowEvt = createEvent();
export const appStore = createStore({
  debug: {},
  windowVisibility: false,
  windowPos: { x: 0, y: 0 },
  windowData: {},
}).on(toggleWindowEvt, (state, data) => {
  return { ...state, ...data };
});

app.stage.on("window", (windowPos, { pos, sector }, debug) => {
  console.log("onWindow");
  console.log("evt", windowPos.x, windowPos.y);
  console.log("pos", pos);
  console.log("sector", sector);

  toggleWindowEvt({
    debug,
    windowVisibility: true,
    windowPos,
  });
});
