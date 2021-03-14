const RPCClientBase = require("./clientBase");
const { RPCClient } = require("./client");
const { Clients, Users } = require("../state");

module.exports = class RPCClientGuest extends RPCClientBase {
  constructor(webSocket) {
    super(webSocket);
  }

  //
  _actionUserAuthAddUser(result) {
    const user = Users.get(result.result.login);
    const session = result.result.session;

    this.detach();
    new RPCClient(this.webSocket, user, session);

    return result;
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
