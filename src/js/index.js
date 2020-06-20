import Search from "./modules/Search";
import Recipe from "./modules/Recipe";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import { elements, renderLoader, clearLoader } from "./views/base";

// Global state of the app
// 1. Search object
// 2. Current recipe object
// 3. Shopping list object
// 4. Liked recipes

//////////////////////////////////////////////////////////////////////////////////////////
// Search Controller
// Our state object
const state = {};

const controlSearch = async () => {
  // 1. Get the query from the view
  const query = searchView.getInput();

  if (query) {
    // 2. New search object and as a state variable
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4. Search for recipes
      await state.search.getResults();

      // 5. Render results to UI after awaiting for the search results
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch {
      alert("Something went wrong with the search...");
      clearLoader();
    }
  }
};

// On clicking search button
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

// Adding eventListener to pagination
elements.searchResPages.addEventListener("click", (e) => {
  // To limit it to just the pagination buttons
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////
// Recipe Controller
const controlRecipe = async () => {
  // Extract the recipe ID from URL
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected recipe
    if (state.search) searchView.highlightSelected(id);

    // Create a new recipe object as a state variable
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcServings();
      state.recipe.calcTime();

      // Render the recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      console.log("Error processing recipe!");
    }
  }
};

// Handling event listeners for pagination
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

// Handling event listeners for recipe servings + and - buttons
elements.recipe.addEventListener("click",e=>
{
  if(event.target.matches(".btn-decrease, .btn-decrease *")) {
    
    // Decrease button clicked
    if(state.recipe.servings > 1)
    {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
   
  }
  if(event.target.matches(".btn-increase, .btn-increase *")) {
    
    // Increase button clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  }
  console.log(state.recipe);
})