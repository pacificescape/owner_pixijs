const Users = require("./users");
const Cities = require("./cities");

const sessions = new Map();
const users = new Users();
const cities = new Cities();
const clients = [];

module.exports = {
  sessions,
  users,
  cities,
  clients,
};
