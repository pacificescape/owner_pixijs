import { createStore, createEvent, createEffect } from "effector";

const addMap = createEvent();
const clearMap = createEvent();

export const mapStore = createStore({ elevation: new Uint8Array(), size: 0 })
  .on(addMap, (state, map) => {
    // console.log(state);
    // console.log(mapStore);
    return map;
  })
  .reset(clearMap);

export const getMapFX = createEffect(async (hitArea) => {
  const res = await rpc.call("actionGetMapPortion", hitArea);
  return res;
});

export const connectEvt = createEvent();
export const connetionStore = createStore({ status: 0 }).on(
  connectEvt,
  (state, connection) => {
    return { ...state, status: connection };
  }
);
