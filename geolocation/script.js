/*
 * Copyright 2019 Nazmul Idris All rights reserved.
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

let watchId = undefined;

const main = () => {

  console.log('userAgent: ', window.navigator.userAgent);

  document.getElementById('getCurrentPosition').addEventListener("click",
      (event) => {
        assertGeoIsAvailable();
        const listener = new PositionListener();
        window.navigator.geolocation.getCurrentPosition(listener.onSuccess,
            listener.onFailure,
            listener.lowAccuracyOptions);
      });

  document.getElementById('watchPosition').addEventListener("click",
      (event) => {
        assertGeoIsAvailable();
        const listener = new PositionListener();
        if (watchId) {
          console.log(`watchId: ${watchId} is already active.`);
          return;
        }
        watchId = window.navigator.geolocation.watchPosition(listener.onSuccess,
            listener.onFailure,
            listener.lowAccuracyOptions);
      });

  document.getElementById('clearWatch').addEventListener("click",
      (event) => {
        assertGeoIsAvailable();
        if (watchId) {
          window.navigator.geolocation.clearWatch(watchId);
        }
      });
};

// Attach to window lifecycle events.

/**
 * More info: https://stackoverflow.com/a/52358522/2085356
 */
window.addEventListener('beforeunload', (event) => {
  if (watchId) {
    assertGeoIsAvailable().clearWatch(watchId);
    console.log('clear watchId')
  }
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});

window.addEventListener('DOMContentLoaded',
    (event) => {
      main();
    });

// Helper functions.

const assertGeoIsAvailable = () => {
  if (window.navigator.geolocation) {
    return;
  }
  const message = "window.navigator.geolocation is not available";
  console.error(message);
  throw new Error(message);
};

// Helper classes.

class PositionListener {
  /**
   * @param {Position} position
   */
  onSuccess(position) {
    const {latitude: lat, longitude: lng} = position.coords;
    console.log(lat, lng);
    document.getElementById(
        'latLng').innerText = `${watchId ? "no watchId"
        : watchId}, ${new Date()}: ${lat}, ${lng}`;
  }

  /**
   * @param {PositionError} error
   */
  onFailure(error) {
    console.error(error.message);
  }

  lowAccuracyOptions = {
    timeout: 5000,
    enableHighAccuracy: false,
  };
  highAccuracyOptions = {
    maximumAge: 0,
    timeout: 5000,
    enableHighAccuracy: true,
  };
}
