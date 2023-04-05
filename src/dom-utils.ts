export interface Country {
  capital: string | null;
  flag: string;
  name: string;
  region: string;
  population: number;
  code: string;
}
export interface CountryDetails extends Country {
  nativeName: string;
  subregion: string;
  currencies: string;
  language: string;
  tld: string;
  borders: string[] | null;
}
export enum Region {
  ALL = "",
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
const createFlagElement = <T extends Country | CountryDetails>(
  country: T
): HTMLDivElement => {
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
  const anchorElement = document.createElement("a");
  anchorElement.href = `?country=${country.code}`;
  anchorElement.appendChild(createFlagElement(country));
  const infoContent = document.createElement("div");
  infoContent.classList.add("info-container");
  const countryName = document.createElement("strong");
  countryName.innerText = country.name;
  countryName.classList.add("country-name");
  infoContent.appendChild(countryName);
  infoContent.appendChild(createInfoElement("Population", country.population));
  infoContent.appendChild(createInfoElement("Region", country.region));
  infoContent.appendChild(createInfoElement("Capital", country.capital));
  anchorElement.appendChild(infoContent);
  listElement.appendChild(anchorElement);
  return listElement;
};
export const renderCountryList = (countries: Country[]) => {
  const rootElement = document.querySelector("#listOfCountries");
  rootElement!.innerHTML = "";
  countries.length && rootElement?.appendChild(createCountriesList(countries));
};

const createCountryView = (country: CountryDetails): HTMLDivElement => {
  const countryContent = document.createElement("div");

  countryContent.appendChild(createFlagElement(country));

  const infoContent = document.createElement("div");
  infoContent.classList.add("info-details-container");

  const countryName = document.createElement("strong");
  countryName.innerText = country.name;
  countryName.classList.add("country-name");
  infoContent.appendChild(countryName);

  infoContent.appendChild(createInfoElement("Native Name", country.population));
  infoContent.appendChild(createInfoElement("Population", country.population));
  infoContent.appendChild(createInfoElement("Region", country.region));
  infoContent.appendChild(createInfoElement("Subregion", country.subregion));
  infoContent.appendChild(createInfoElement("Capital", country.capital));
  infoContent.appendChild(createInfoElement("Top Level Domain", country.tld));
  infoContent.appendChild(createInfoElement("Curriencies", country.currencies));
  infoContent.appendChild(createInfoElement("Languages", country.language));

  countryContent.appendChild(infoContent);
  return countryContent;
};
const createBackButton = (): HTMLAnchorElement => {
  const anchorBackElement = document.createElement("a");

  anchorBackElement.innerText = "BACK";
  anchorBackElement.classList.add("back-details-button");
  anchorBackElement.href = "/";
  return anchorBackElement;
};
const renderBorderCountriesList = (countriesList: string[]) => {
  const countriesListContent = document.createElement("ul");
  countriesList.map((country) => {
    const countriesListElement = document.createElement("li");
    countriesListElement.innerText = country;
    countriesListContent.appendChild(countriesListElement);
  });
  return countriesListContent;
};

const createBorderCountriesConteiner = (
  country: CountryDetails
): HTMLDivElement => {
  const borderCountriesConteiner = document.createElement("div");
  const borderCountriesLabel = document.createElement("strong");
  borderCountriesLabel.innerText = "Border Countries";
  borderCountriesLabel.id = "border-countries-label";
  borderCountriesConteiner.appendChild(borderCountriesLabel);
  if (country.borders?.length) {
    borderCountriesConteiner.appendChild(
      renderBorderCountriesList(country.borders)
    );
  }

  return borderCountriesConteiner;
};

export const renderCountryDetail = (country: CountryDetails) => {
  const rootElement = document.querySelector("#countryDetails");
  rootElement!.innerHTML = "";
  rootElement?.appendChild(createBackButton());
  rootElement?.appendChild(createCountryView(country));
  rootElement?.appendChild(createBorderCountriesConteiner(country));
};
