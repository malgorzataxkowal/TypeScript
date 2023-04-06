import { Country, CountryDetails, Region } from "./dom-utils";

export const fetchCountry = async (url: string) => {
  let countriesList: Country[];
  try {
    await fetch(url)
      .then((res) => res.json())
      .then((returnedCountries) => {
        let countries = returnedCountries.map((country) => {
          const primaryInfo: Country = {
            capital: country.capital,
            flag: country.flags.png,
            name: country.name.common,
            region: country.region,
            population: country.population,
            code: country.cioc || country.cca2 || country.cca3 || country.ccn3,
          };
          return primaryInfo;
        });
        countriesList = countries;
      })
      .catch(() => {
        console.log(`Problems with fetch data from ${url}`);
      });
  } catch (error) {
    console.log("Error! Can't download country details");
  }
  return countriesList;
};

export const filterbyRegionAndByCountryName = (
  countryList: Country[],
  countryName: string,
  filteredRegion: Region = Region.ALL
) => {
  const flteredCountry = countryList.filter(
    (country) =>
      country.name
        .toLocaleLowerCase()
        .startsWith(countryName.trim().toLocaleLowerCase()) &&
      (!filteredRegion || country.region === filteredRegion)
  );
  return flteredCountry;
};

export const fetchCountryDetails = async (url: string) => {
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
