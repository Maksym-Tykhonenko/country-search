const param = 'name,capital,population,flags,languages';

export async function fetchCountries(name) { 
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=${param}`)
    const country = await res.json();
    //console.log(country);
    return country;
};