'use strict';

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

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
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.", { width: '450px' });
                    
                    return;
                }

                if (countries.length >= 2 && countries.length <= 10) {
                    resetMarkup();
                    const listMarkup = countries.map(element =>
                         `<li class="country-list__item">
                            <img class="country-list__img" src="${element.flags.svg}" alt="${element.name}">
                            <span class="country-list__name">${element.name}</span>
                         </li>`
                    ).join('');                    
                    listEl.innerHTML = listMarkup;
                    
                    return;
                }
                                
                if (countries.length === 1) {
                    const listMarkup = countries.map(element =>
                         `<li class="country-list__item">
                            <img class="country-list__img" src="${element.flags.svg}" alt="${element.name}">
                            <span class="country-list__name">${element.name}</span>
                         </li>`
                    ).join('');                      
                    listEl.innerHTML = listMarkup;
                    
                    const countryLanguages = countries[0].languages.map(element => element.name).join(', ');
                    
                    const infoMarkup = countries.map(element =>                         
                         `<ul>
                            <li class="country-info__item"><span class="country-info__span">Capital:</span> ${element.capital}</li>
                            <li class="country-info__item"><span class="country-info__span">Population:</span> ${element.population}</li>
                            <li class="country-info__item"><span class="country-info__span">Languages:</span> ${countryLanguages}</li>
                         </ul>`
                    ).join('');
                    infoEl.innerHTML = infoMarkup;
                    
                    return;
                }

                if (countries.status === 404) {
                    resetMarkup();
                    Notiflix.Notify.failure("Oops, there is no country with that name", { width: '350px' });
                }        
        })
        .catch(error => {
            Notiflix.Notify.failure("Oops, something go wrong", { width: '350px' });
        });    
    }    
};

function resetMarkup() {
    listEl.innerHTML = '';
    infoEl.innerHTML = '';
};