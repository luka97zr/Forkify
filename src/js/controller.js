import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable'; //za polyfill svega drugog osim async await
import 'regenerator-runtime/runtime'; //polyfill za async await
import { async } from 'regenerator-runtime';

if(module.hot)
  module.hot.accept()

const controlRecipes = async function(){
  try{
    const id= window.location.hash.slice(1);
    console.log(id)

    if(!id) return;
    recipeView.renderSpinner();

    //Update search results
    resultsView.update(model.getSearchResultsPage())

    //Update bookmarks
    bookmarksView.update(model.state.bookmarks)


    //1) Loading recipe
    await model.loadRecipe(id)

    //2) Rendering recipe
    recipeView.render(model.state.recipe)

  }catch(err){
    recipeView.renderError(err)
  }
}

const controlSearchResaults = async function(){
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery()
    if(!query) return;
    await model.loadSearchResaults(query)
    resultsView.renderSpinner()

    resultsView.render(model.getSearchResultsPage())

    //Render initial page btns
    paginationView.render(model.state.search)
  }catch(err){
    console.log(err)
  }
}

const controlPagination = function(goToPage){
  //Render NEW page
  resultsView.render(model.getSearchResultsPage(goToPage))

  //Render NEW page btns
  paginationView.render(model.state.search)
}

const controlServings = function(newServings){
  //update recipe servings
  model.updateServings(newServings);

  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)

}

const controlAddBookmark = function(){
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);


  recipeView.update(model.state.recipe)
  console.log(model.state.recipe)

  //Add bookmark
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

const controlUpdateRecipe = function(ingData){
  try {
    model.uploadRecipe(ingData)
  }catch(err){
    addRecipeView.renderError(err.message)
  }
}

const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResaults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlUpdateRecipe)
}
init();

