import Notiflix from "notiflix";

const searchParams = 'name,capital,population,flags,languages';
const baseUrl = 'https://restcountries.com/v3.1/name';
const ulList = document.querySelector('.country-list');
const cardContainer = document.querySelector('.country-info');

export default function fetchCountries(name) { 
    fetch(`${baseUrl}/${name}?fields=${searchParams}`).then(response => {
            return response.json()
    })
    .then(renderCountryCard)
    .catch(catchError)
};

function renderCountryCard(countries) {
    console.log(countries);
    if (countries.length === 1) {
        ulList.classList.add('.hidden');
        const markup = countries.map((country) => {
            return `
        <div class="head-container">
        <img src="${country.flags.svg}" width="16" height="16" alt="">
        <h3 class="country-name">${country.name.official}</h3>
        </div>
        <ul>
           <li><p class="list-item">Capital: ${country.capital}</p></li>
           <li><p class="list-item">Population: ${country.population}</p></li>
           <li><p class="list-item">Languages: ${Object.values(country.languages)}</p></li>
        </ul>`;
        })
            .join('');
        cardContainer.innerHTML = markup;
        ulList.innerHTML = '';
    } else if (countries.length >= 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else {
        const markup = countries.map((country) => {
            return `
        <li class="country-list-item">
        <img src="${country.flags.svg}" width="16" height="16" alt="">
        <h3>${country.name.official}</h3>
        </li>`;
        })
            .join('');
        ulList.innerHTML = markup;
        cardContainer.innerHTML = '';
    }
} 

function catchError(error) {
    console.log(error);
    Notiflix.Notify.failure("Oops, there is no country with that name");
    cardContainer.innerHTML = '';
    ulList.innerHTML = '';
}
