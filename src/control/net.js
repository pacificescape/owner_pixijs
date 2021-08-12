import { createEvent } from 'effector';

import { PromiseEx } from '../helpers';
import { connectionStore } from '../store/connection-store';


const onConnect = createEvent();
const noop = () => null;
const Result = {
  error: (err) => { throw new Error(err); },
};

class WebSocketRPCClient {
  constructor (webSocket) {
    this.webSocket = webSocket;
    this.nextRpcID = 1;
    this.map = {};

    this.subscribeMap = {};
    this.wsEvents = Object.entries({
      message: async (evt) => {
        // console.log(evt);
        const parsedData = JSON.parse(evt.data);
        const { rpcID, action, data } = parsedData;

        if (!rpcID) {return;}
        if (this.map[rpcID]) {
          return this.map[rpcID].resolve(parsedData);
        }
        if (action) {
          if (!rpcID) {throw Result.error('ERROR_INVALID_RPC_RPCID');}

          if (typeof this[action] !== 'function') {
            throw Result.error('ERROR_INVALID_RPC_METHOD');
          }

          return await this[action](data);
        }
      },
    });
  }

  attach (webSocket) {
    this.detach();

    this.webSocket = webSocket;
    this.webSocket.binaryType = 'arraybuffer';
    this.wsEvents.map((v) => this.webSocket.addEventListener(...v));
  }

  detach () {
    if (this.webSocket) {
      this.wsEvents.map((v) => this.webSocket.removeEventListener(...v));
      this.webSocket = null;
    }

    Object.values(this.map).map((p) =>
      p.reject({ errorCode: 'ERROR_NETWORK' }),
    );
    this.map = {};
  }

  async call (action, data) {
    if (!this.webSocket) {return;}
    const rpcID = this.nextRpcID++;

    this.webSocket.send(JSON.stringify({ rpcID, action, data }));
    return (this.map[rpcID] = new PromiseEx());
  }

  sendBinary (data) {
    this.webSocket.send(data);
  }

  actionAlert (data) {
    alert(data);
  }

  // subscribe(action, callback) {
  //   (this.subscribeMap[action] = this.subscribeMap[action] ?? []).push(
  //     callback
  //   );

  parseBinary () {
    //
  }
}

export const rpc = new WebSocketRPCClient();
window.rpc = rpc;

const wsUrl = 'ws://localhost:5007/api/ws';
// .replace(/^http:\/\//, "ws://")
// .replace(/^https:\/\//, "wss://") + "/api/ws";

export async function wsReconnect () {
  return new Promise((resolve, reject) => {
    const store = connectionStore.getState();

    if (!store.login) {return reject();}

    const webSocket = new WebSocket(wsUrl + `?token = ${store.token}`);

    webSocket.addEventListener('open', () => {
      rpc.attach(webSocket);
      resolve(rpc);
      const data = onConnect.map((msg) => {
        return msg; // ????
      });

      data.watch((data) => {
        console.log(data);
      });
    });
    webSocket.onclose = () => {
      setTimeout(wsReconnect, 2e3);
    };
    webSocket.addEventListener('onmessage', (msg) => {
      // console.log("ws msg", msg);
    });
    webSocket.addEventListener('error', (e) => {
      reject(e);
      console.log(e);
    });
  });
}
