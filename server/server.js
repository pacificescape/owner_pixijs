const WebSocket = require("ws");
const { RPCClientGuest } = require("./rpc");

const wss = new WebSocket.Server({ port: 8081 });

wss
  .on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
      console.log("received: %s", message);
    });
  })
  .on("connection", function connection(webSocket) {
    new RPCClientGuest(webSocket);
  })
  .on("error", (e) => console.log("WebSocketServer error: " + e.message));
