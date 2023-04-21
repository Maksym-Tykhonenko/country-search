import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 500;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
        
};

refs.input.addEventListener('input', debounce(handleInputSearch, DEBOUNCE_DELAY));

function handleInputSearch(event) { 
    let searchParam = event.target.value.trim();
    console.log(searchParam)

    if (searchParam !== '') {
        fetchCountries(searchParam).then(countrys => {
            console.log(countrys.length);
            console.log(countrys);

            if (countrys.length >= 2 && countrys.length <= 10) {
                renderCountryList(countrys);

            } else if (countrys.length === 1) {

                renderCountryInfo(countrys)
            }
        
        })
    }
    
};

function renderCountryInfo(country) {
    
    const markup = country.map(({ name, capital, population, flags, languages }) => {
        return `<ul>
        <li><img src="${flags.svg}" alt="${name.common}" width="120px"></li>
        <li><h2>${name.common}</h2></li>
        <li><h4>Capital: ${capital}</h4></li>
        <li><p>Language: ${Object.values(languages)}</p></li>
        <li><p>Population: ${population}</p></li>
      </ul>`
    }).join('');
    console.log(markup)
    
    refs.countryInfo.insertAdjacentHTML('afterbegin', markup);
};

function renderCountryList(countries) { 
    //clearRender()

    const markup = countries.map(({ name, flags }) => {
        return `<li>
        <p>${name.official}</p>
        <img src="${flags.svg}" alt="${name.official}" width="100px">
      </li>`
    }).join('');
    
    refs.countryList.insertAdjacentHTML('afterbegin', markup);
};

function clearRender() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
};







