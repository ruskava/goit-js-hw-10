import './css/styles.css';
import countriesCardsHbs from './templates/countriesCards.hbs';
import countriesSearchHbs from './templates/countriesSerch.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './featchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const countryInfo = document.querySelector('.country-info');
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  clearResults();
  const searchInput = e.target.value.trim();
  if (searchInput === '') {
    return;
  }
    fetchCountries(searchInput)
        .then(renderCountries)
        .catch(onFetchError)
}
    function renderCountries(countries) {
        console.log(countries);
        const countriesLength = countries.length;

       if (countriesLength > 10) {
    Notify.info('Too many matches found. Please enter a more specific name');
  } else if (countriesLength === 1) {
    const markup = countries
      .map(countriesCardsHbs).join('');
    countryInfo.innerHTML = markup;
  } else {
    const markupList = countries
    .map(countriesSearchHbs).join('');
    countryList.innerHTML = markupList;
  }
    }
function onFetchError(error) {
     Notify.failure('Oops, there is no country with that name');
    }

function clearResults() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}