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

const nav = window.navigator;
const geo = window.navigator.geolocation;

class PositionListener {
  /**
   * @param {Position} position
   */
  onSuccess(position) {
    const {latitude: lat, longitude: lng} = position.coords;
    console.log(lat, lng);
  }

  /**
   * @param {PositionError} error
   */
  onFailure(error) {
    console.error(error.message);
  }

  options = {
    maximumAge: 0,
    timeout: 5000,
    enableHighAccuracy: true,
  };
}

let watchId = undefined;

const main = () => {
  console.log('userAgent: ', nav.userAgent);
  if (geo) {
    console.log('geolocation api available in browser');
    const positionListener = new PositionListener();
    geo.getCurrentPosition(positionListener.onSuccess,
        positionListener.onFailure, positionListener.options);
    watchId = geo.watchPosition(positionListener.onSuccess,
        positionListener.onFailure);
  }
};

window.addEventListener('beforeunload', function (e) {
  if(geo && watchId){
    geo.clearWatch(watchId);
    console.log('clear watchId')
  }

  // Cancel the event as stated by the standard.
  e.preventDefault();
  // Chrome requires returnValue to be set.
  e.returnValue = '';
});

main();
