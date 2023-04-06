import { renderCountryDetail, CountryDetails } from "./dom-utils";
import { fetchCountryDetails } from "./dom-action";

const urlDetails: string = "https://restcountries.com/v3.1/alpha?codes=";

export const countryDetailView = (countryCode: string) => {
  fetchCountryDetails(`${urlDetails}${countryCode}`).then((country) => {
    renderCountryDetail(country);
  });
};
