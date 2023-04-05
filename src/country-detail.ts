import { renderCountryDetail, CountryDetails } from "./dom-utils";

const urlDetails: string = "https://restcountries.com/v3.1/alpha?codes=";

const fetchCountryDetails = async (url: string) => {
  let country: CountryDetails;
  try {
    await fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(([res]) => {
        if (!res) {
          window.location.href = "/";
        }
        res = {
          capital: res.capital && res.capital[0],
          population: res.population,
          name: res.name.common,
          nativeName: Object.values(res.name?.nativeName)[0].official,
          code: res.cioc,
          region: res.region,
          subregion: res.subregion,
          flag: res.flags.png,
          currencies: Object.values(res.currencies)
            .map((currency) => currency.name)
            .join(", "),
          language: Object.values(res.languages).join(", "),
          tld: res.tld[0],
          borders: res.borders || [],
        };
        country = res;
      });
  } catch (error) {
    console.log("Error! Can't download country details" + error);
  }
  return country;
};

export const countryDetailView = (countryCode: string) => {
  let countryDetails: CountryDetails;
  fetchCountryDetails(`${urlDetails}${countryCode}`).then((country) => {
    console.log(country);
    renderCountryDetail(country);
  });
};
