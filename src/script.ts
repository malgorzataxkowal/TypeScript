import { Country, renderCountryList, createDivFilters } from "./dom-utils";

const API_URL_ALL_COUNTRIES = "https://restcountries.com/v3.1/all";

let countries: Country[];

fetch(API_URL_ALL_COUNTRIES)
  .then((res) => res.json())
  .then((returnedCountries) => {
    countries = returnedCountries.map((country) => {
      const primaryInfo: Country = {
        capital: country.capital,
        flag: country.flags.png,
        name: country.name.common,
        region: country.region,
        population: country.population,
      };
      return primaryInfo;
    });
    renderCountryList(countries);
  });

createDivFilters();
