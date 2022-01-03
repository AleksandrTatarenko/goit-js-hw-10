import './css/styles.css';
import fetchCountries from './fetchCountries';

var Debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.getElementById("search-box"),
};

refs.input.addEventListener('input', Debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
    const countryName =  e.target.value;
    fetchCountries(countryName)
};
