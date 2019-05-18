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

const main = () => {
  
  /**
   * @type {PositionListener}
   */
  let watchingListener = undefined;
  
  console.log('userAgent: ', window.navigator.userAgent);
  
  document.getElementById('getCurrentPosition')
          .addEventListener(
              "click",
              (event) => {
                const listener = PositionListener.getCurrentPosition();
              }
          );
  
  document.getElementById('watchPosition')
          .addEventListener(
              "click",
              (event) => {
                if (watchingListener) {
                  console.error('Already watching a position');
                  return;
                }
                watchingListener = PositionListener.watchPosition();
              }
          );
  
  document.getElementById('clearWatch')
          .addEventListener(
              "click",
              (event) => {
                if (watchingListener) {
                  watchingListener.clearWatch();
                  watchingListener = undefined;
                }
              }
          );
};

// Attach to window lifecycle events.

/**
 * More info: https://stackoverflow.com/a/52358522/2085356
 */
window.addEventListener('beforeunload', (event) => {
  if (watchId) {
    assertGeoIsAvailable()
        .clearWatch(watchId);
    console.log('clear watchId')
  }
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});

window.addEventListener(
    'DOMContentLoaded',
    (event) => {
      main();
    }
);

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
   * Why does this work? Since onFailure & onSuccess is defined using regular
   * method syntax, it will acquire the context of the instance that invoked it
   * (this in the example above). And since arrow functions are lexically
   * scoped, this will be the current instance of our class.
   * More info:
   * https://javascriptweblog.wordpress.com/2015/11/02/of-classes-and-arrow-functions-a-cautionary-tale/
   * @return {PositionListener}
   */
  static getCurrentPosition() {
    assertGeoIsAvailable();
    const listener = new PositionListener();
    window.navigator.geolocation.getCurrentPosition(
        (arg) => listener.onSuccess(arg),
        (arg) => listener.onFailure(arg),
        listener.lowAccuracyOptions
    );
    return listener;
  }
  
  /**
   * Why does this work? Since onFailure & onSuccess is defined using regular
   * method syntax, it will acquire the context of the instance that invoked it
   * (this in the example above). And since arrow functions are lexically
   * scoped, this will be the current instance of our class.
   * More info:
   * https://javascriptweblog.wordpress.com/2015/11/02/of-classes-and-arrow-functions-a-cautionary-tale/
   * @return {PositionListener}
   */
  static watchPosition() {
    assertGeoIsAvailable();
    const listener = new PositionListener();
    listener.watchId = window.navigator.geolocation.watchPosition(
        (arg) => listener.onSuccess(arg),
        (arg) => listener.onFailure(arg),
        listener.lowAccuracyOptions
    );
    return listener;
  }
  
  constructor() {
    this.watchId = undefined;
  }
  
  clearWatch() {
    if (this.watchId) {
      window.navigator.geolocation.clearWatch(this.watchId);
      console.log('watchId: ', this.watchId, ' cleared.');
      this.watchId = undefined;
    }
  };
  
  /**
   * @param {Position} position
   */
  onSuccess(position) {
    const {latitude: lat, longitude: lng} = position.coords;
    console.log(lat, lng);
    
    if (this.watchId) {
      document.getElementById(
          'latLng').innerText = `${this.watchId}, ${new Date()}: ${lat}, ${lng}`;
      
    } else {
      document.getElementById(
          'latLng').innerText = `${lat}, ${lng}`;
      
    }
  };
  
  /**
   * @param {PositionError} error
   */
  onFailure(error) {
    console.error(error.message);
  };
  
  lowAccuracyOptions = {
    maximumAge: 0,
    timeout: 5000,
    enableHighAccuracy: false,
  };
  
  highAccuracyOptions = {
    maximumAge: 0,
    timeout: 5000,
    enableHighAccuracy: true,
  };
}
