import React, { Component } from 'react';
import './RecipeApp.css';
import Recipe from './components/Recipe/Recipe';

class RecipeApp extends Component {
  render() {
    return (
    <div className="App">
      {/* ogni attributo sarà trasmesso a this.props nel metodo render del componente */}
      <Recipe
      title="pasta" ingredients={['flour','water']}
      img="spaghetti.jpg"
      instructions="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."/>
    </div>
    );
  }
}

export default RecipeApp;
