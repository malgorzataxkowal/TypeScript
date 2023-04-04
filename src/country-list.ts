import {
  Country,
  renderCountryList,
  createDivFilters,
  Region,
} from "./dom-utils";
import { filterbyRegionAndByCountryName, fetchCountry } from "./dom-action";

export const countryListView = () => {
  const API_URL_ALL_COUNTRIES = "https://restcountries.com/v3.1/all";

  let countries: Country[];
  let countryNameValue: string = "";
  let regionValue: Region = Region.ALL;

  createDivFilters();

  fetchCountry(API_URL_ALL_COUNTRIES).then((countryList) => {
    countries = countryList;
    renderCountryList(countries);
  });

  const inputCountryName = <HTMLInputElement>(
    document.querySelector("input.query")
  );
  inputCountryName &&
    inputCountryName.addEventListener("input", (e) => {
      countryNameValue = (e.target as HTMLInputElement).value;
      renderCountryList(
        filterbyRegionAndByCountryName(countries, countryNameValue, regionValue)
      );
    });

  const selectedRegion = <HTMLSelectElement>(
    document.querySelector("div.filters select[name='region']")
  );
  selectedRegion &&
    selectedRegion.addEventListener("change", (e) => {
      regionValue = (e.target as HTMLSelectElement).value as Region;
      renderCountryList(
        filterbyRegionAndByCountryName(countries, countryNameValue, regionValue)
      );
    });
};
