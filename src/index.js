import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 500;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
        
};

refs.input.addEventListener('input', debounce(handleInputSearch, DEBOUNCE_DELAY));
refs.countryList.addEventListener('click', handleCountryNameClick);

function handleCountryNameClick(event) { 
    clearRender();
    const countryName = event.target.textContent === '' ? event.target.alt : event.target.textContent.trim();
    console.log(countryName)
    fetchCountries(countryName).then(country => {
        renderCountryInfo(country);
    })
};

function handleInputSearch(event) { 
    let searchParam = event.target.value.trim();

    clearRender();

    if (searchParam !== '') {

        fetchCountries(searchParam).then(countrys => {

            if (countrys.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
            } else if (countrys.length >= 2 && countrys.length <= 10) {
                renderCountryList(countrys);
                
            } else if (countrys.length === 1) {

                renderCountryInfo(countrys)
            } 
        
        }).catch(error => {
            Notiflix.Notify.failure("Oops, there is no country with that name")
            return error
        });
    }
    
};

function renderCountryInfo(country) {
    
    const markup = country.map(({ name, capital, population, flags, languages }) => {
        return `<ul class='country-info-list'>
        <li><img src="${flags.svg}" alt="${name.common}" width="120px"></li>
        <li><h2><a>${name.official}</a></h2></li>
        <li><h3>${name.common}</h3></li>
        <li><h4>Capital: ${capital}</h4></li>
        <li><p>Language: ${Object.values(languages)}</p></li>
        <li><p>Population: ${population}</p></li>
      </ul>`
    }).join('');
    //console.log(markup)
    
    refs.countryInfo.insertAdjacentHTML('afterbegin', markup);
};

function renderCountryList(countries) {

    const markup = countries.map(({ name, flags }) => {
        return `<li>
        <p>
        <img src="${flags.svg}" alt="${name.official}" width="100px">${name.official}</p>
      </li>`
    }).join('');
    
    refs.countryList.insertAdjacentHTML('afterbegin', markup);
};

function clearRender() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
};







