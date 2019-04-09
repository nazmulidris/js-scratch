function initMap() {
  console.log('initMap');

  const input = document.getElementById('pac-input');
  const autocomplete = new google.maps.places.Autocomplete(input);
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