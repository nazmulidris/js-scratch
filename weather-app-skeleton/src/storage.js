import { emitter, EVENT_NAME } from "./emitter";

const KEYS = {
  LOCATION: "LOCATION",
  WEATHER_DATA: "WEATHER_DATA"
};

class Storage {
  static saveLocation(lat, lng, placeName) {
    const locationObject = { lat, lng, placeName };
    localStorage.setItem(KEYS.LOCATION, JSON.stringify(locationObject));
    emitter.fire(EVENT_NAME.LOCATION_ACQUIRED);
  }

  static loadLocation() {
    return JSON.parse(localStorage.getItem(KEYS.LOCATION));
  }

  static saveWeatherData(json) {
    localStorage.setItem(KEYS.WEATHER_DATA, JSON.stringify(json));
    emitter.fire(EVENT_NAME.WEATHER_DATA_SAVED);
  }

  static loadWeatherData() {
    return JSON.parse(localStorage.getItem(KEYS.WEATHER_DATA));
  }
}

export { Storage };
