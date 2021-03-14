const { RPCClientBase, Client } = require(".");
const { Clients, Users } = require("../state");

module.exports = class ClientGuest extends RPCClientBase {
  constructor(webSocket) {
    super(webSocket);
  }

  _actionUserAuthAddUser(result) {
    const user = Users.get(result.result.login);
    const session = result.result.session;

    this.detach();
    new Client(this.webSocket, user, session);

    return result;
  }

  actionGetMapPortion(obj) {
    console.log(obj);

    const size = Math.floor(((obj.width / 65) * obj.height) / 54);
    const start =
      map.width * Math.ceil(obj.height / 54) + Math.ceil(obj.x / 65);

    console.log("size", size, "start", start);

    const portion = map.elevation.slice(start, start + size);
    return portion.toString();
  }

  actionUserAuthSignin(obj) {
    return this._actionUserAuthAddUser(Users.actionUserAuthSignin(obj));
  }
  actionUserAuthSignup(obj) {
    return this._actionUserAuthAddUser(Users.actionUserAuthSignup(obj));
  }
  actionUserAuthSession(obj) {
    return this._actionUserAuthAddUser(Users.actionUserAuthSession(obj));
  }
};
