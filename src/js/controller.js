import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import BookmarksView from './views/bookmarksView.js';
import 'core-js/stable'; //polyfilling
import 'regenerator-runtime/runtime'; //polyfilling async await
import paginationView from './views/paginationView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //0 update results view to highlight selected result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    //1. loading recipe
    await model.loadRecipe(id); //returns promise (async)

    //2 rendering recipe
    recipeView.render(model.state.recipe); //render method for new object
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();
    //1.get search query
    const query = SearchView.getQuery();
    if (!query) return;

    //2. load search results
    await model.loadSearchResults(query);

    //3. render results

    ResultsView.render(model.getSearchResultsPage(1));

    //render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = function (gotoPage) {
  ResultsView.render(model.getSearchResultsPage(gotoPage));

  //render pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.state.recipe.bookmarked;
  model.removeBookmark(model.state.recipe.id);
  ///update recipeView
  recipeView.update(model.state.recipe);
  console.log(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.adHandlerClick(controlPagination);
};

init();
