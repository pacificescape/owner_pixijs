const { cities } = require(".");

class User {
  constructor(login, password) {
    this.id = users.size()++;
    this.timeCreate = Date.now();
    this.login = login;
    this.password = password || "";
    this.isOnline = false;
    this.client = null;
  }

  createSession() {
    const session = crypto.randomBytes(32).toString("hex");
    sessions.set(session, this);
    return session;
  }

  toSendFormat() {
    return {
      timeCreate: this.timeCreate,
      id: this.id,
      login: this.login,
    };
  }
}

class Users extends Map {
  actionAuthUser(login) {
    if (!login) return;
    if (this.has(login)) return;
    const user = new User(login);
    this.set(login, user);
  }
}

module.exports = Users;
