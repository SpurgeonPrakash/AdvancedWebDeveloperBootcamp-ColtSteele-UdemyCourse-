import React, { Component } from 'react';
import './RecipeApp.css';
import Recipe from './components/Recipe/Recipe';
import Navbar from './components/Navbar/Navbar';

class RecipeApp extends Component {

  render() {
    {/* ogni attributo sarà trasmesso a this.props nel metodo render del componente */}
    const recipes = this.props.recipes.map((rec, index) => (<Recipe {...rec}/>));

    return (
    <div className="app">
      <Navbar />
      <div className="content">
      {recipes}
      </div>
    </div>
    );
  }
}

RecipeApp.defaultProps = {
    recipes: [ {
      title: 'Spaghetti',
      ingredients: ['pasta', '8 cups water', '1 box spaghetti'],
      img: 'spaghetti.jpg',
      instructions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
    }, {
      title: 'Milkshake',
      ingredients: ['2 scoops ice cream', '8 ounces milk'],
      img: 'milkshake.jpg' ,
      instructions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
    }, {
      title: 'Avocado Toast',
      ingredients: ['2 slices of bread', '1 avocado', '1 tablespoon olive oil', '1 pinch of salt', 'pepper'],
      img: 'avocado_toast.jpg',
      instructions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
    }
  ],
};

export default RecipeApp;
