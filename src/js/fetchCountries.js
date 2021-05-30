import countryCardTmpl from '../templates/country-card.hbs';
import countriesListTmpl from '../templates/countries-list.hbs';

import debounce from 'lodash.debounce';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import API from './api-service';

import getRefs from './get-refs';

const refs = getRefs();

refs.input.addEventListener('input', debounce(onInputCountrySearch, 500));

function onInputCountrySearch(e) {
  let inputValue = refs.input.value;
  API.fetchCountryByName(inputValue).then(renderCountriesSearch).catch(onFetchError);
}

function renderCountryCard(country) {
  const markup = countryCardTmpl(country);
  // console.log(markup);
  refs.cardContainer.innerHTML = markup;
}

function renderCountriesList(country) {
  const countryListMarkup = countriesListTmpl(country);
  refs.cardContainer.innerHTML = countryListMarkup;
}

function renderCountriesSearch(country) {
  if (country.length > 10) {
    removeInputValue();
    return onFetchError();
  } else if (country.length >= 2 && country.length <= 10) {
    removeInputValue();
    renderCountriesList(country);
  } else if (country.status === 404) {
    removeMarkup();
  } else {
    removeInputValue();
    renderCountryCard(country);
  }
}

function onFetchError() {
  error({
    text: 'Too many matches found. Please enter a more spesific query!',
  });
}

function removeInputValue() {
  refs.input.value = '';
}

function removeMarkup() {
  refs.cardContainer.innerHTML = '';
}
