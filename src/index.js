'use strict';

import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { errorMessageTooManyMatches, errorMessageNoCountry, errorMessageOnCatch } from './js/messages';
import countriesListTpl from './templates/countriesListTpl.hbs';
import countryInfoTpl from './templates/countryInfoTpl.hbs';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputAction, DEBOUNCE_DELAY));

function onInputAction(event) {
    event.preventDefault();

    const inputValue = inputEl.value.trim();
    
    if (inputValue === '') {
        resetMarkup();        
    }
    else {
        fetchCountries(inputValue)
            .then(countries => {
                if (countries.length > 10) {
                    resetMarkup();
                    errorMessageTooManyMatches()                    
                    return;
                }

                if (countries.length >= 2 && countries.length <= 10) {
                    resetMarkup();                    
                    createListMarkup(countries)                    
                    return;
                }
                                
                if (countries.length === 1) {
                    createListMarkup(countries)
                    createInfoMarkup(countries)                    
                    return;
                }

                if (countries.status === 404) {
                    resetMarkup();
                    errorMessageNoCountry()
                }        
        })
        .catch(error => {
            errorMessageOnCatch()
        });    
    }    
};

function resetMarkup() {
    listEl.innerHTML = '';
    infoEl.innerHTML = '';
};

function createListMarkup(countries) {
    const listMarkup = countriesListTpl(countries);
    listEl.innerHTML = listMarkup;
};

function createInfoMarkup(countries) {
    const infoMarkup = countryInfoTpl(countries);
    infoEl.innerHTML = infoMarkup;
};