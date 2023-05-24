import Notiflix from 'notiflix';

const param = 'name,capital,population,flags,languages';

export async function fetchCountries(name) { 
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=${param}`)
    const country = await res.json();
    //console.log(res.status);
    if (res.status === 404) {
        Notiflix.Notify.failure("Oops, there is no country with that name")
    }
    //console.log(country);
    return country;
};