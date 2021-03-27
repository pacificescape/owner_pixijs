import { PromiseEx } from "../helpers/PromiseEx.js";
import { createEvent } from "effector";
import { connectEvt } from "./store";

const onConnect = createEvent();

class WebSocketRPCClient {
  constructor(webSocket) {
    this.webSocket = webSocket;
    this.nextRpcID = 1;
    this.map = {};

    const noop = () => null;
    this.subscribeMap = {};
    this.wsEvents = Object.entries({
      message: (evt) => {
        console.log(evt);
        const parsedData = JSON.parse(evt.data);
        const { rpcID } = parsedData;
        if (!rpcID) return;
        if (this.map[rpcID]) {
          this.map[rpcID].resolve(parsedData);
        }
      },
    });
  }

  attach(webSocket) {
    this.detach();

    this.webSocket = webSocket;
    this.webSocket.binaryType = "arraybuffer";
    this.wsEvents.map((v) => this.webSocket.addEventListener(...v));
  }
  detach() {
    if (this.webSocket) {
      this.wsEvents.map((v) => this.webSocket.removeEventListener(...v));
      this.webSocket = null;
    }

    Object.values(this.map).map((p) =>
      p.reject({ errorCode: "ERROR_NETWORK" })
    );
    this.map = {};
  }

  async call(action, data) {
    if (!this.webSocket) return;
    const rpcID = this.nextRpcID++;
    this.webSocket.send(JSON.stringify({ rpcID, action, data }));
    return (this.map[rpcID] = new PromiseEx());
  }

  sendBinary(data) {
    if (!this.webSocket) return;
    this.webSocket.send(data);
  }

  // subscribe(action, callback) {
  //   (this.subscribeMap[action] = this.subscribeMap[action] ?? []).push(
  //     callback
  //   );

  parseBinary() {
    //
  }
}

export const rpc = new WebSocketRPCClient();
globalThis.rpc = rpc;

const wsUrl =
  location.hostname === "127.0.0.1" || "localhost"
    ? `ws://${location.hostname}:8081`
    : `ws://owner.${location.hostname}/`;

async function wsReconnect() {
  const login = await fetch("/login").then((r) => r.json());
  const auth = await fetch("/auth").then((r) => r.json());
  const token = auth.result;
  const webSocket = new WebSocket(wsUrl + `?token=${token}`);
  webSocket.onopen = () => {
    rpc.attach(webSocket);
    setTimeout(() => {
      connectEvt(1);
    }, 3000);
    const data = onConnect.map((msg) => {
      return msg;
    });
    data.watch((data) => {
      console.log(data);
    });
  };
  webSocket.onclose = () => {
    connectEvt(0);
    setTimeout(wsReconnect, 2e3);
  };
  webSocket.onmessage = (msg) => {
    console.log("ws msg", msg);
  };
  webSocket.onerror = (e) => {
    console.log(e);
  };
}
wsReconnect();
