const BASE_URL = 'https://restcountries.eu/rest/v2'

function fetchCountryByName(countryName) {
  const url = `${BASE_URL}/name/${countryName}`;
  return fetch(url).then(response => {
    return response.json();
  });
}

export default { fetchCountryByName }