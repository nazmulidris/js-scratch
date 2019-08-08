import { Storage } from "./storage";

const fetchWeather = (lat, lng) => {
  console.log("Attempting to fetch darksky API weather data...");
  const API_KEY = "0a844be4b32012620981e3f63f88d00d";
  const url = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`;
  const corsFreeUrl = "https://cors-anywhere.herokuapp.com/" + url;

  fetch(corsFreeUrl)
    .then(response => {
      return response.json();
    })
    .then(json => {
      Storage.saveWeatherData(json);
    })
    .catch(reason => {
      console.warn("There is a problem fetching the URL.", reason);
    });
};

export { fetchWeather };
