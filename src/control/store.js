import { createStore, createEvent } from "effector";

const addMap = createEvent();
const clearMap = createEvent();

export const mapStore = createStore({ elevation: [], moisture: [] })
  .on(addMap, (state, map) => {
    console.log(state);
    console.log(mapStore);
    return map;
  })
  .reset(clearMap);

export const connectEvt = createEvent();
export const connetionStore = createStore({ status: 0 }).on(
  connectEvt,
  (state, connection) => {
    console.log(state, connection);
    return { ...state, status: connection };
  }
);
