export type Country = {
  capital: string | null;
  flag: string;
  name: string;
  region: string;
  population: number;
};
export enum Region {
  ASIA = "Asia",
  AFRICA = "Africa",
  AMERICAS = "Americas",
  EUROPE = "Europe",
  OCEANIA = "Oceania",
}
const createOptionItem = (
  regionOptionLabel: string,
  regionOptionValue: string = regionOptionLabel
): HTMLOptionElement => {
  const optionItem = document.createElement("option");
  optionItem.value = regionOptionValue;
  optionItem.text = regionOptionLabel;
  return optionItem;
};

const createSelectItem = () => {
  const selectItem = document.createElement("select");
  selectItem.name = "region";
  selectItem.id = "region";
  selectItem.appendChild(createOptionItem("Filter by region", ""));
  selectItem.appendChild(createOptionItem(Region.AFRICA));
  selectItem.appendChild(createOptionItem(Region.AMERICAS));
  selectItem.appendChild(createOptionItem(Region.ASIA));
  selectItem.appendChild(createOptionItem(Region.EUROPE));
  selectItem.appendChild(createOptionItem(Region.OCEANIA));
  return selectItem;
};
const createFilterByCountry = () => {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("query-section");
  const inputCountryName = document.createElement("input");
  inputCountryName.classList.add("query");
  inputCountryName.type = "text";
  inputCountryName.placeholder = "Search for country";
  const iconElement = document.createElement("i");
  iconElement.textContent = "search";
  iconElement.classList.add("material-icons");
  iconElement.id = "icon-search";
  contentDiv.appendChild(inputCountryName);
  contentDiv.appendChild(iconElement);
  return contentDiv;
};
export const createDivFilters = () => {
  const divForFilterSection = <HTMLDivElement>(
    document.querySelector(".filters")
  );
  divForFilterSection.appendChild(createFilterByCountry());
  divForFilterSection.appendChild(createSelectItem());

  return divForFilterSection;
};

const createInfoElement = (
  labelName: string,
  value: string | number | null
): HTMLDivElement => {
  const infoElement = document.createElement("div");
  const infoLabel = document.createElement("strong");
  infoLabel.innerText = `${labelName}: `;
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
const createFlagElement = (country: Country): HTMLDivElement => {
  const divFlagElement = document.createElement("div");
  const flagElement = document.createElement("img");
  flagElement.src = country.flag;
  flagElement.alt = `${country.name} flag`;
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
  listElement.appendChild(createFlagElement(country));
  const infoContent = document.createElement("div");
  infoContent.classList.add("info-container");
  const countryName = document.createElement("strong");
  countryName.innerText = country.name;
  countryName.classList.add("country-name");
  infoContent.appendChild(countryName);
  infoContent.appendChild(createInfoElement("Population", country.population));
  infoContent.appendChild(createInfoElement("Region", country.region));
  infoContent.appendChild(createInfoElement("Capital", country.capital));
  listElement.appendChild(infoContent);
  return listElement;
};
export const renderCountryList = (countries: Country[]) => {
  const rootElement = document.querySelector("#listOfCountries");
  rootElement?.appendChild(createCountriesList(countries));
};
