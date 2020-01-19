import fetchCountries from './services/fetch-countries';
import countryListItemsTemplate from '../templates/coutry-list-items.hbs';
import countryItemTemplate from '../templates/country-item.hbs';
import debounce from 'lodash.debounce';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial';

const refs = {
  searchInput: document.querySelector('.js-country-search'),
  countriesList: document.querySelector('.js-countries-list'),
  countryContent: document.querySelector('.js-country-content'),
};

refs.searchInput.addEventListener('input', debounce(searchInputHandler, 800));

function searchInputHandler(e) {
  const input = e.target.value;

  fetchCountry(input);
}

function insertListItems(items) {
  const markup = countryListItemsTemplate(items);

  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

function insertItem(item) {
  const markup = countryItemTemplate(item);

  refs.countryContent.insertAdjacentHTML('afterbegin', markup);
}

function clearListItems() {
  refs.countriesList.innerHTML = '';
  refs.countryContent.innerHTML = '';
}

function checkCountryListLength(country) {
  if (country.length >= 2 && country.length <= 10) {
    insertListItems(country);
  } else if (country.length === 1) {
    insertItem(country);
  } else if (country.length > 10) {
    PNotify.error({
      text: 'Too many mathes found. Please enter a more specific query!',
      styling: 'material',
      icons: 'material',
      icon: true,
      width: '260px',
      minHeight: '120px',
      delay: 3000,
    });
  } else {
    PNotify.error({
      text: 'No results were found for your request. Please enter valid data!',
      styling: 'material',
      icons: 'material',
      icon: true,
      width: '260px',
      minHeight: '120px',
      delay: 3000,
    });
  }
}

function fetchCountry(countryName) {
  clearListItems();

  if(countryName === '') {
    return;
  }

  fetchCountries(countryName)
    .then(countries => checkCountryListLength(countries))
    .catch(error => console.warn(error));
}
