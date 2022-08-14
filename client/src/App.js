import './App.css';
import React from "react";
import paginaInicial from './components/paginaInicial/paginaInicial.js';
import { BrowserRouter, Route } from "react-router-dom";
import rutaPrincipal from './components/rutaPrincipal/rutaPrincipal.js'
import recipeDetail from './components/recipeDetail/recipeDetail.js'
import createRecipe from './components/createRecipe/createRecipe.js'


function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={paginaInicial} />
      <Route path="/home" component={rutaPrincipal} />
      <Route path="/recipes/:id" component={recipeDetail} />
      <Route path="/create" component={createRecipe} />
    </BrowserRouter>
  );
}

export default App;
