const basedUrl = 'https://restcountries.eu/rest/v2/name/';

export default function fetchCountries(searchQuery) {
  const requestParams = `${searchQuery}`;

  return fetch(basedUrl + requestParams)
    .then(response => response.json())
    .catch(error => console.warn(error));
}
