import Search from "./modules/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

// Global state of the app
// 1. Search object
// 2. Current recipe object
// 3. Shopping list object
// 4. Liked recipes

// Our state object
const state = {};

const controlSearch = async () => {
  // 1. Get the query from the view
  const query = searchView.getInput();

  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4. Search for recipes
    await state.search.getResults();

    // 5. Render results to UI after awaiting for the search results
    clearLoader();
    console.log("hi");
    searchView.renderResults(state.search.result);
  }
};

// On clicking search button
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

// Adding eventListener to pagination
elements.searchResPages.addEventListener("click", (e) => {
  // This displays wherever you click on the UI
  // console.log(e.target);
  // To limit it to just the pagination buttons
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});
