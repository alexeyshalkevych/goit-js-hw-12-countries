import countryService from './services/country-service';
import coutryListItemsTemplate from '../templates/coutry-list-items.hbs';
import coutryItemTemplate from '../templates/country-item.hbs';
import debounce from 'lodash.debounce';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';

const refs = {
  searchInput: document.querySelector('.js-country-search'),
  countriesList: document.querySelector('.js-coutries-list'),
  countryContent: document.querySelector('.js-coutry-content'),
};

refs.searchInput.addEventListener('input', debounce(searchInputHandler, 800));

function searchInputHandler(e) {
  const input = e.target.value;
  countryService.searchQuery = input;

  clearListItems();

  countryService
    .fethCoutries()
    .then(countries => {
      console.log(countries);

      if (countries.length >= 2 && countries.length <= 10) {
        insertListItems(countries);
      } else if (countries.length > 10) {
        PNotify.error({
          text: 'Too many mathes found. Please enter a more specific query!',
          styling: 'material',
          icons: 'material',
          icon: true,
          width: '260px',
          minHeight: '120px',
          delay: 3000,
        });
      } else if (countries.length === 1) {
        insertItem(countries);
      }
    })
    .catch(error => {
      console.warn(error);
    });
}

function insertListItems(items) {
  const markup = coutryListItemsTemplate(items);

  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

function insertItem(item) {
  const markup = coutryItemTemplate(item);

  refs.countryContent.insertAdjacentHTML('beforeend', markup);
}

function clearListItems() {
  refs.countriesList.innerHTML = '';
}
