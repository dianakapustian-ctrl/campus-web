"use strict";

const form = document.querySelector("#search-form");
const queryInput = document.querySelector("#search-query");
const citySelect = document.querySelector("#city-select");
const cards = [...document.querySelectorAll(".product-card")];
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

//  пошук оголошень за назвою.
// Місто враховується як другий критерій.
function filterListings() {
  const searchText = queryInput.value.trim().toLocaleLowerCase("uk");
  const selectedCity = citySelect.value;
  let visible = 0;

  cards.forEach((card) => {
    const matchesTitle = card.dataset.title.toLocaleLowerCase("uk").includes(searchText);
    const matchesCity = !selectedCity || card.dataset.city === selectedCity;
    const show = matchesTitle && matchesCity;
    card.hidden = !show;
    if (show) visible++;
  });

  resultCount.textContent = `${visible} ${visible === 1 ? "оголошення" : "оголошень"}`;
  emptyState.hidden = visible !== 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  filterListings();
});

//  кнопка обраного має справжній стан.
document.querySelectorAll(".favorite").forEach((button) => {
  button.addEventListener("click", () => {
    const isSelected = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isSelected));
    button.textContent = isSelected ? "♡" : "♥";
    button.setAttribute(
      "aria-label",
      isSelected ? "Додати товар до обраного" : "Видалити товар з обраного"
    );
  });
});
