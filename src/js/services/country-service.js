const basedUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
  query: '',

  fethCoutries() {
    const requestParams = `${this.query}`;

    return fetch(basedUrl + requestParams)
      .then(response => response.json())
      .then(parsedResponse => {
        return parsedResponse;
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
};
