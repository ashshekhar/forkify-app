// We will be storing all our DOM calls here
export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchRes: document.querySelector(".results"),
  searchResList: document.querySelector(".results__list"),
  searchResPages: document.querySelector(".results__pages"),
  recipe: document.querySelector(".recipe"),
};

export const elementStrings = {
  loader: "loader",
};

// To implement the loader
export const renderLoader = (parent) => {
  const loader = `<div class="${elementStrings.loader}">
                    <svg>
                      <use href="img/icons.svg#icon-cw"></use>
                    </svg>
                  </div>`;
  parent.insertAdjacentHTML("afterbegin", loader);
};

// To clear the loader after the results are back
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
