class City {
  constructor(cityMongo) {
    Object.assign(this, cityMongo.lean());

    this.users = new Set([]);
    this.clients = new Set();

    // needs for elemenate City from Cities
    this.usersOnline = new Set([]);
    this.timeCreate = Date.now();
  }

  toSendFormat() {
    return {
      id: this.id,
      UsersOnline: this.usersOnline,
    };
  }
}

module.exports = class Cities extends Map {
  parseCityName(obj) {
    const cityName = String(obj?.cityName);
    if (!validCityName(cityName)) throw Result.error(ERROR_INVALID_INPUT_DATA);

    return { cityName };
  }

  async actionCityCreate(data, user) {
    const cityMongo = {}; // create City in Mongo

    const city = new City(cityMongo, user);
    this.set(city.id, city);

    return Result.success(city.toSendFormat());
  }

  async getCity(obj) {
    const { id } = obj;

    let city = this.get(id);
    if (!city) {
      city = {}; // get city from Mongo
      throw Result.error(ERROR_ESSENCE_NOT_FOUND);
    }

    return city;
  }
};
