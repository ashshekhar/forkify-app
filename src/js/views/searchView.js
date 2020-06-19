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
};

// To better format the recipe text on the UI to 17 characters
const limitRecipeTitle = (title, limit = 17) => {
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
                    <a class="results__link" href="${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(
                              recipe.title
                            )}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                  </li>`;

  //  Puts the results one below each other
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};


// To display the results on UI
export const renderResults = (recipes) => {
  recipes.forEach(renderRecipe);
};
