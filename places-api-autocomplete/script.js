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

function initMap() {
  console.log('initMap');
  
  const pacInputElement = document.getElementById('pac-input');
  const autocomplete = new google.maps.places.Autocomplete(pacInputElement);
  autocomplete.addListener('place_changed', () => {
    const placeResult = autocomplete.getPlace();
    console.log('place: ', placeResult);
    const latLngString = getLatLngString(placeResult);
    console.log('latLngString: ', latLngString);
  });
  
}

/**
 * [getPlace docs](http://tinyurl.com/y3tmhlrq)
 * [PlaceResult docs](http://tinyurl.com/y55mysb9)
 * [PlaceGeometry docs](http://tinyurl.com/y55mysb9)
 * [LatLng docs](http://tinyurl.com/y3bcvu2o)
 *
 * @param {PlaceResult} placeResult
 */
const getLatLngString = (placeResult) => {
  const {geometry} = placeResult;
  const {location} = geometry;
  return `${location.lat()},${location.lng()}`;
};