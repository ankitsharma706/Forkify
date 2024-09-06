import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import addRecipeView from './views/addRecipeView.js';
import bookmarkview from './views/bookmarkview.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
// import icons from '../img/icons.svg'
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    bookmarkview.update(model.state.bookmarks);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);

    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResults()
const controlPagination = function (goTOPage) {
  resultsView.render(model.getSearchResultsPage(goTOPage));

  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  //update the recipe serving
  model.updateServings(newServings);
  // update the recipe View
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // model.addBookmark(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarkview.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkview.render(model.state.bookmarks);
};

const controlAddRecipeData = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe)
    addRecipeView.renderMessage();
    bookmarkview.render(model.state.bookmarks)
    window.history.pushState(null,'',`#${model.state.recipe.id}`)
    // window.his
    setTimeout(function(){
      addRecipeView.toggleWindow()
    },MODAL_CLOSE_SEC*1000)
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkview.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipeData);
  // controlServings()
};
init();
