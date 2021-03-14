const { cities } = require(".");
const {
  actionGetMapPortion,
  actionBuyImmobilier,
  actionPutUpForSale,
} = require("../actions");

const defaultUserMethods = {
  actionGetMapPortion,
  actionBuyImmobilier,
  actionPutUpForSale,
};
class User {
  constructor(userMongo, methods = defaultUserMethods) {
    for (let method of Object.keys(methods)) {
      this[method] = this[method].bind(this);
    }

    Object.assign(this, userMongo.lean()); // mongoose User unstance

    this.timeCreate = Date.now();
    this.isOnline = true;
    this.client = null; // websocket
  }

  // hz
  createSession() {
    const session = crypto.randomBytes(32).toString("hex");
    sessions.set(session, this);
    return session;
  }

  // prepare
  toSendFormat() {
    return {
      timeCreate: this.timeCreate,
      id: this.id,
      login: this.login,
    };
  }
}

class Users extends Map {
  // to replace
  actionAuthUser(login) {
    if (!login) return;
    if (this.has(login)) return;
    const user = new User(login);
    this.set(login, user);
  }
}

module.exports = Users;
