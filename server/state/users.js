const { cities } = require(".");

class User {
  constructor(name) {
    // userMongo, methods = defaultUserMethods) {
    // Object.assign(this, userMongo.lean()); // mongoose User unstance

    this.name = name;
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
}

class Users extends Map {
  // to replace
  getLyoSU() {
    return {
      result: {
        name: "LyoSU",
        user: new User("LyoSu"),
      },
    };
  }

  actionAuthUser(login) {
    if (!login) return;
    if (this.has(login)) return;
    const user = new User(login);
    this.set(login, user);
  }
}

module.exports = Users;
