import { Country, renderCountryList, Region } from "./dom-utils";

export const fetchCountry = async (url: string) => {
  let countriesList: Country[] = [];
  await fetch(url)
    .then((res) => res.json())
    .then((returnedCountries) => {
      countriesList = returnedCountries.map((country) => {
        const primaryInfo: Country = {
          capital: country.capital,
          flag: country.flags.png,
          name: country.name.common,
          region: country.region,
          population: country.population,
        };
        return primaryInfo;
      });
      return countriesList;
    })
    .catch(() => {
      console.log(`Problems with fetch data from ${url}`);
      countriesList = [];
      return [];
    });
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
