import { createStore, createEvent, createEffect } from 'effector';

import { login, auth } from '../control/api';
import { wsReconnect } from '../control/net';


export const connectEvt = createEvent();
export const connectionStore = createStore({
  login: false,
  ws: false,
  isFetching: false,
  token: '',
}).on(connectEvt, (state, connection) => {
  return { ...state, ...connection };
});

export const checkAuthFx = createEffect(async () => {
  connectEvt({ isFetching: true });
  try {
    const token = await auth();

    console.log(token);
    if (!token) {
      throw new Error('Auth error 401');
    }
    connectEvt({ token, login: true });
  } catch (error) {
    console.log(error);
    connectEvt({ isFetching: false, login: false, token: '' });
  }
});

checkAuthFx.done.watch(async () => {
  connectEvt({ isFetching: false });
});

export const loginFX = createEffect(async (data) => {
  connectEvt({ isFetching: true });
  const res = await login(data);

  connectEvt({ login: res.ok });
});

loginFX.done.watch(async () => {
  console.log('loginFX.done');
  await connectFX();
});

export const connectFX = createEffect(async () => {
  try {
    await checkAuthFx();
    connectEvt({ isFetching: true });

    const connect = await wsReconnect();

    console.log('connect:', connect);
    connectEvt({ ws: true });
  } catch (error) {
    console.log(error);
  }
  connectEvt({ isFetching: false });
});
