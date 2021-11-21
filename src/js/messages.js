import Notiflix from 'notiflix';

function errorMessageTooManyMatches() {
    return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.", { width: '450px' });
};

function errorMessageNoCountry() {
    return Notiflix.Notify.failure("Oops, there is no country with that name", { width: '350px' });
};

function errorMessageOnCatch() { 
    return Notiflix.Notify.failure("Oops, something go wrong", { width: '350px' });
};

export {
    errorMessageTooManyMatches,
    errorMessageNoCountry,
    errorMessageOnCatch
};