import { createStore, createEvent, createEffect } from "effector";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const addMap = createEvent();
const setSize = createEvent();
const clearMap = createEvent();

export const mapStore = createStore({ elevation: new Uint8Array(), size: 0 })
  .on(addMap, (state, map) => {
    // console.log(state);
    // console.log(mapStore);
    return { ...state, elevaion: map };
  })
  .on(setSize, (state, size) => {
    return { ...state, size };
  })
  .reset(clearMap);

export const getMapFX = createEffect(async (hitArea) => {
  const res = await rpc.call("actionGetMapPortion", hitArea);
  return res;
});

getMapFX.done.watch(({ params, result }) => {
  if (!result?.result && !result?.data && result?.errorCode) {
    // console.error(
    //   result.errorCode,
    //   result.errorMessage,
    //   "params:",
    //   JSON.stringify(params)
    // );
    return;
  }
  return;
});
