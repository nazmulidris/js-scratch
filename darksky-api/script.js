const main = () => {
  const API_KEY = '0a844be4b32012620981e3f63f88d00d';
  const lat = '37.385530';
  const lon = '-122.002276';
  const url = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lon}`;
  const corsFreeUrl = 'https://cors-anywhere.herokuapp.com/' + url;

  console.log(url);
  console.log(corsFreeUrl);

  fetch(corsFreeUrl)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        process(json);
      })
      .catch((reason) => {
        console.error('There is a problem fetching the URL.', reason);
      })
  ;
};

const process = (json) => {
  console.log('TODO process the json data');
  console.log('json size roughly', JSON.stringify(json).length / 1000, 'kb');
};

main();
