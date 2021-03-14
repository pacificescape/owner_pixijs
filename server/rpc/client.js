const RPCClientBase = require("./clientBase");
const { clients, cities } = require("../state");

const sendBroadcast = (data, city, withoutUser) => {
  for (const client of cities)
    if ((!city || client.city === city) && client !== withoutUser)
      //
      client.send(data);
};
const sendBroadcastJSON = (data, city, withoutUser) =>
  sendBroadcast(JSON.stringify(data), city, withoutUser);

module.exports = class Client extends RPCClientBase {
  constructor(webSocket, user, session) {
    super(webSocket);

    this.user = user;
    this.session = session;
    this.city = null;

    this.user.client = this;

    this.isOnline = false;

    clients.push(this);

    // broadcast in all cities that user is online etc
    this.sendBroadcastJSON(
      "cityList",
      [...cities.values()].map((c) => c.toSendFormat()) // rewrite
    );

    this.webSocket.on("close", () => this.destroy());
  }

  toSendFormat() {
    return {
      id: this.user.id,
      timeCreate: this.user.timeCreate,
      login: this.user.login,

      cityID: this.city?.id,
      isOnline: this.isOnline,
    };
  }
  sendBroadcastJSON(action, data) {
    sendBroadcastJSON({ action, data });
  }
  sendBroadcastThisUser() {
    this.sendBroadcastJSON("user", this.toSendFormat());
  }

  actionUserSetOnlineStatus(obj) {
    this.isOnline = obj.isOnline;
    this.sendBroadcastThisUser();
    return Result.success(true);
  }

  actionCityCreate(obj) {
    const result = cities.actioncityCreate(obj);

    const city = cities.get(result.result.cityName);
    this.sendBroadcastJSON("city", city.toSendFormat());

    return result;
  }
  actionCityConnect(obj) {
    const city = cities.getcity(obj);

    this.actioncityDisconnect();

    this.city = city;
    this.city.clients.add(this);

    this.penWriterReadOffset = 0;
    this.sendPenWriterData();

    this.sendBroadcastThisUser();

    return Result.success(city.toSendFormat());
  }
  actionCityDisconnect() {
    if (!this.city) return Result.success(false);

    this.city.clients.delete(this);
    this.city = null;

    this.sendBroadcastThisUser();

    return Result.success(true);
  }

  sendPenWriterData() {
    const data = this.city.penWriter.readData(this.penWriterReadOffset);
    this.penWriterReadOffset += data.length;
    this.send(data);
  }

  destroy() {
    this.isOnline = false;
    this.actioncityDisconnect();
    this.sendBroadcastThisUser();

    clients.splice(clients.indexOf(this), 1);
    this.user.client = null;
    this.webSocket.close();
  }

  parseBinary(data) {
    if (!this.city) return;

    this.city.analysisRecvData(this.user.id, data);

    for (const client of this.city.clients.values()) {
      if (client === this) continue;
      client.sendPenWriterData();
    }
  }
};
