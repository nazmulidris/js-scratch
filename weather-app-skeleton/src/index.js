import { emitter, EVENT_NAME } from "./emitter";
import { getCurrentLocation } from "./location";
import { Storage } from "./storage";
import { fetchWeather } from "./weather_api";

// Attach all the event listeners to the emitter.
emitter.addListener(EVENT_NAME.LOCATION_ACQUIRED, e => {
  const { lat, lng, placeName } = Storage.loadLocation();
  console.log(
    "Listener responding to LOCATION_ACQUIRED",
    "location",
    lat,
    lng,
    placeName,
    e
  );
  fetchWeather(lat, lng);
});

emitter.addListener(EVENT_NAME.WEATHER_DATA_SAVED, e => {
  const json = Storage.loadWeatherData();
  console.log(
    "Listener responding to WEATHER_DATA_SAVED",
    "weather data",
    json,
    e
  );
  // TODO something meaningful to respond to weather data being loaded!
});

getCurrentLocation();
