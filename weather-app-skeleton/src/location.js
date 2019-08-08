import { Storage } from "./storage";

const getCurrentLocation = () => {
  console.log("Attempting to get current location of browser...");
  const options = {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0
  };
  window.navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      Storage.saveLocation(latitude, longitude, "N/A");
    },
    error => {
      const [latitude, longitude] = [37.419857, -122.078827];
      Storage.saveLocation(latitude, longitude, "Mountain View, CA");
    },
    options
  );
};
export { getCurrentLocation };
