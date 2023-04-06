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

const createSelectItem = (): HTMLSelectElement => {
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
const createFilterByCountry = (): HTMLDivElement => {
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
export const createDivFilters = (): HTMLDivElement => {
  const divForFilterSection = document.createElement("div");
  divForFilterSection.classList.add("filters");
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
  listOfCountries.classList.add("listOfCountries");
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
export const renderCountryList = (countries: Country[]): void => {
  const rootElement = document.querySelector(".countriesDashboard");
  rootElement!.innerHTML = "";
  countries.length && rootElement?.appendChild(createCountriesList(countries));
};

const createCountryView = (country: CountryDetails): HTMLDivElement => {
  const countryContent = document.createElement("div");
  countryContent.classList.add("country-detail-container");
  countryContent.appendChild(createFlagElement(country));

  const infoContent = document.createElement("div");
  infoContent.classList.add("info-details-container");

  const countryName = document.createElement("strong");
  countryName.innerText = country.name;
  countryName.classList.add("country-name");
  infoContent.appendChild(countryName);

  infoContent.appendChild(createInfoElement("Native Name", country.nativeName));
  infoContent.appendChild(createInfoElement("Population", country.population));
  infoContent.appendChild(createInfoElement("Region", country.region));
  infoContent.appendChild(createInfoElement("Subregion", country.subregion));
  infoContent.appendChild(createInfoElement("Capital", country.capital));
  infoContent.appendChild(createInfoElement("Top Level Domain", country.tld));
  infoContent.appendChild(createInfoElement("Curriencies", country.currencies));
  infoContent.appendChild(createInfoElement("Languages", country.language));
  infoContent.appendChild(createBorderCountriesContainer(country));
  countryContent.appendChild(infoContent);

  return countryContent;
};
const createButtonWithLink = (
  label: string,
  link: string
): HTMLAnchorElement => {
  const anchorBackElement = document.createElement("a");
  anchorBackElement.innerText = label;
  anchorBackElement.classList.add(label);
  anchorBackElement.href = link;
  return anchorBackElement;
};
const renderBorderCountriesList = (
  countriesList: string[]
): HTMLUListElement => {
  const borderCountriesList = document.createElement("ul");
  borderCountriesList.classList.add("border-country-list");
  countriesList.map((country) => {
    const redirectToCountryDetails = `?country=${country}`;
    borderCountriesList.appendChild(
      createButtonWithLink(country, redirectToCountryDetails)
    );
  });
  return borderCountriesList;
};

const createBorderCountriesContainer = (
  country: CountryDetails
): HTMLDivElement => {
  const borderCountriesContainer = document.createElement("div");
  const borderCountriesLabel = document.createElement("strong");
  borderCountriesLabel.innerText = "Border Countries: ";
  borderCountriesLabel.id = "border-countries-label";
  borderCountriesContainer.appendChild(borderCountriesLabel);
  if (country.borders?.length) {
    borderCountriesContainer.appendChild(
      renderBorderCountriesList(country.borders)
    );
  }
  return borderCountriesContainer;
};
export const createCountryListConteiner = (): void => {
  const rootItem = document.querySelector("#root");
  rootItem?.appendChild(createDivFilters());

  const listOfCountriesContent = document.createElement("div");
  listOfCountriesContent.classList.add("countriesDashboard");
  rootItem?.appendChild(listOfCountriesContent);
};
export const renderCountryDetail = (country: CountryDetails): void => {
  const rootElement = document.querySelector("#root");
  rootElement!.innerHTML = "";
  const detailViewContainer = document.createElement("div");
  detailViewContainer.classList.add("detail-view-conteiner");
  detailViewContainer.appendChild(createButtonWithLink("BACK", "/"));
  detailViewContainer.appendChild(createCountryView(country));
  rootElement?.appendChild(detailViewContainer);
};
