class City {
  async constructor(id, userCreator) {
    this.id = cityNextID++;
    this.timeCreate = Date.now();
    this.cityName = cityName;
    this.userCreator = userCreator;

    this.users = new Set([]);
    this.clients = new Set();
  }

  analysisRecvData(userID, data) {
    if (!this.penWriter.canWrite()) return;

    this.penWriter.analysisRecvData(userID, data);
    console.log(this.penWriter.bufferWriter.writeOffset);
  }

  toSendFormat() {
    return {
      id: this.id,
      timeCreate: this.timeCreate,
      cityName: this.cityName,
      numUsers: this.users.size,
      numUsersOnline: this.usersOnline.size,
    };
  }
}

class Cities extends Map {
  parseCityName(obj) {
    const cityName = String(obj?.cityName);
    if (!validCityName(cityName)) throw Result.error(ERROR_INVALID_INPUT_DATA);

    return { cityName };
  }

  actionCityCreate(obj, client, user) {
    const { cityName } = this.parseCityName(obj);

    if (this.has(cityName)) throw Result.error(ERROR_ESSENCE_ALREADY_EXISTS);

    const city = new City(cityName, user);
    this.set(cityName, city);

    return Result.success(city.toSendFormat());
  }

  getCity(obj) {
    const { cityName } = this.parseCityName(obj);

    const city = this.get(cityName);
    if (!city) throw Result.error(ERROR_ESSENCE_NOT_FOUND);

    return city;
  }
}
