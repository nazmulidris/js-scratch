/*
 * Copyright 2019 Nazmul Idris. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Main entry point.
const main = () => {
  assertGeolocationIsAvailable();
  document.getElementById('currentPositionPromise')
          .addEventListener("click", currentPositionPromiseButtonHandler);
  document.getElementById('currentPositionAsync')
          .addEventListener("click", currentPositionAsyncButtonHandler);
};

const currentPositionAsyncButtonHandler = async () => {
  try {
    const position = await invokeGetCurrentPositionAsync();
    console.log(getLatLngFromPosition(position));
  } catch (error) {
    console.error(error);
    window.alert(error.message);
  }
};

/**
 * This function doesn't work, because it returns immediately before the
 * getCurrentPosition() method returns anything. Calling this function will
 * always return undefined.
 */
const invokeGetCurrentPositionAsync = async () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0
  };
  window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        return position;
      },
      (error) => {
        throw error;
      },
      options
  );
};

// More info:
// https://stackoverflow.com/a/44439358/2085356
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
/**
 * @returns {Promise<Position>}
 */
const invokeGetCurrentPositionPromise = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0
  };
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const currentPositionPromiseButtonHandler = async () => {
  try {
    updateUi('invokeGetCurrentPositionPromise()...');
    const position = await invokeGetCurrentPositionPromise();
    console.log(position);
    updateUi(JSON.stringify(
        getLatLngFromPosition(position), null, 2));
    
    updateUi('fetchReverseGeocode()...');
    const reverseGeocode = await fetchReverseGeocode(position);
    console.log(reverseGeocode);
    updateUi(reverseGeocode.display_name);
  } catch (error) {
    console.error(error);
    updateUi(error.message);
  }
};

const updateUi = (message) => {
  const element = document.getElementById('latLng');
  element.innerText = element.innerText + '\n--\n' + message;
};

/**
 * @param {Position} position
 */
const fetchReverseGeocode = async (position) => {
  const format = 'jsonv2';
  const latLng = getLatLngFromPosition(position);
  const url = `https://nominatim.openstreetmap.org/reverse?format=${
      format}&lat=${latLng.lat}&lon=${latLng.lng}`;
  return await fetch(url)
      .then((response) => response.json())
      .then((json) => json);
};

// Helper functions.
const getLatLngFromPosition = (position) => {
  if (!position) return;
  return {lat: position.coords.latitude, lng: position.coords.longitude};
};
const assertGeolocationIsAvailable = () => {
  if (window.navigator.geolocation) return;
  const message = "window.navigator.geolocation is not available";
  console.error(message);
  window.alert(message);
  throw new Error(message);
};

// Attach DOM lifecycle listeners.
window.addEventListener('DOMContentLoaded', main);
