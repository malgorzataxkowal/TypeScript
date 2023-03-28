export type Country = {
  capital: string | null;
  flag: string;
  name: string;
  region: string;
  population: number;
};
const createInfoElement = (
  labelName: string,
  value: string | number | null
): HTMLDivElement => {
  const infoElement = document.createElement("div");
  const infoLabel = document.createElement("strong");
  infoLabel.innerText = `${labelName}:`;
  const infoValue = document.createElement("span");
  if (!value) {
    value = "";
  }
  if (typeof value === "number") {
    value = value.toString();
  }
  infoValue.innerText = value;
  infoElement.appendChild(infoLabel);
  infoElement.appendChild(infoValue);
  return infoElement;
};
const createFlagElement = (flagSource: string): HTMLDivElement => {
  const divFlagElement = document.createElement("div");
  const flagElement = document.createElement("img");
  flagElement.src = flagSource;
  divFlagElement.appendChild(flagElement);
  return divFlagElement;
};

const createCountriesList = (countries: Country[]): HTMLUListElement => {
  const listOfCountries = document.createElement("ul");
  countries.forEach((country) => {
    listOfCountries.appendChild(createCountryItem(country));
  });
  return listOfCountries;
};
const createCountryItem = (country: Country): HTMLLIElement => {
  const listElement = document.createElement("li");

  const countryName = document.createElement("span");
  countryName.innerText = country.name;
  listElement.appendChild(createFlagElement(country.flag));
  listElement.appendChild(countryName);
  listElement.appendChild(createInfoElement("Population:", country.population));
  listElement.appendChild(createInfoElement("Region:", country.region));
  listElement.appendChild(createInfoElement("Capital:", country.capital));
  return listElement;
};
export const renderCountryList = (countries: Country[]) => {
  const rootElement = document.querySelector("#root");
  rootElement?.appendChild(createCountriesList(countries));
};
