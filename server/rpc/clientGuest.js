const RPCClientBase = require("./clientBase");
const { RPCClient } = require("./client");
const { clients, users } = require("../state");
const { actionGetMapPortion } = require("../actions");
module.exports = class RPCClientGuest extends RPCClientBase {
  constructor(webSocket) {
    super(webSocket);
  }

  actionGetMapPortion(...args) {
    return actionGetMapPortion.call(this, ...args);
  }
  //rewrite auth
  _actionUserAuthAddUser(result) {
    const user = users.get(result.result.login);
    const session = result.result.session;

    this.detach();
    new RPCClient(this.webSocket, user, session);

    return result;
  }

  // rewrite actions
  // actionUserAuthSignin(obj) {
  //   return this._actionUserAuthAddUser(users.actionUserAuthSignin(obj));
  // }
  // actionUserAuthSignup(obj) {
  //   return this._actionUserAuthAddUser(users.actionUserAuthSignup(obj));
  // }
  // actionUserAuthSession(obj) {
  //   return this._actionUserAuthAddUser(users.actionUserAuthSession(obj));
  // }
};
