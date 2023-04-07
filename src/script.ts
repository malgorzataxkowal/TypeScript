import { countryListView } from "./country-list";
import { countryDetailView } from "./country-detail";

let appTheme = localStorage.getItem("theme") || "ligth";
const body = document.querySelector("body");
if (appTheme === "dark") {
  body?.classList.add("dark");
} else {
  body?.classList.remove("dark");
}

if (window.location.search.includes("?country=")) {
  const countryCode = window.location.search.slice(9);
  countryDetailView(countryCode);
} else {
  countryListView();
}
const theme = document.querySelector("header button");
theme?.addEventListener("click", () => {
  if (appTheme === "dark") {
    localStorage.setItem("theme", "ligth");
    body?.classList.remove("dark");
    appTheme = "ligth";
    body?.classList.add("ligth");
  } else {
    body?.classList.remove("ligth");
    localStorage.setItem("theme", "dark");
    body?.classList.add("dark");
    appTheme = "dark";
  }
});
