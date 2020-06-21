import { elements } from "./base";

// export const add = (a, b) => a + b;
// export const mult = (a, b) => a * b;

// To read the input again
export const getInput = () => {
  return elements.searchInput.value;
};

// To clean the search bar after searching
export const clearInput = () => {
  elements.searchInput.value = "";
};

// To clean the UI for multiple searches
export const clearResults = () => {
  elements.searchResList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};

export const highlightSelected = (id) => {
  // Remove the already highlightes
  const resultsArr = Array.from(document.querySelectorAll(".results__link"));
  resultsArr.forEach(el => {
    el.classList.remove('results__link--active');
  });
  // Highlight the selection
  document
    .querySelector(`.results__link[href="#${id}"]`)
    .classList.add("results__link--active");
};
// To better format the recipe text on the UI to 17 characters
export const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];

  if (title.length > limit) {
    // We use reduce method that has a built in accumulator (like a count variable)
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // Return the result
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

// Handling one particular recipe
const renderRecipe = (recipe) => {
  const markup = `<li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${
    recipe.title
  }">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(
                              recipe.title
                            )}
                            </h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                  </li>`;

  //  Puts the results one below each other
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

// Code for displaying pagination buttons
// type can be 'prev' or 'next'
const createButton = (
  page,
  type
) => `<button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
                                        <span>Page ${
                                          type === "prev" ? page - 1 : page + 1
                                        }</span>                                        
                                        <svg class="search__icon">
                                            <use href="img/icons.svg#icon-triangle-${
                                              type === "prev" ? "left" : "right"
                                            }">
                                            </use>
                                        </svg>
                                        
                                      </button>`;

// To render buttons for pagination
const renderButton = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // Button to go up next page
    button = createButton(page, "next");
  } else if (page === pages && pages > 1) {
    // Only button to go to last page
    button = createButton(page, "prev");
  } else if (page < pages) {
    // Both up and last page button
    button = `${createButton(page, "prev")}${createButton(page, "next")}`;
  }

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

// To display the results on UI
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // Render results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // Render pagination buttons
  renderButton(page, recipes.length, resPerPage);
};
