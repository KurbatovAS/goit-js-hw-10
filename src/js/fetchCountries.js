function fetchCountries(countriesName) {
    return fetch(`https://restcountries.com/v2/name/${countriesName}?fields=name,capital,population,flags,languages`)
    .then(response => {        
        return response.json();
    })
};

export { fetchCountries };