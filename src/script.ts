import { countryListView } from "./country-list";
import { countryDetailView } from "./country-detail";

if (window.location.search.includes("?country=")) {
  const countryCode = window.location.search.slice(9);
  countryDetailView(countryCode);
} else {
  countryListView();
}
