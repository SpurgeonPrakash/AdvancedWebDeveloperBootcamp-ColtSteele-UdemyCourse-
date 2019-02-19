import React, { Component } from 'react';
import './RecipeApp.css';
import RecipeList from './components/RecipeList/RecipeList';
import Navbar from './components/Navbar/Navbar';

class RecipeApp extends Component {

  render() {

    return (
    <div className="app">
      <Navbar />
      <RecipeList />
    </div>
    );
  }
}

export default RecipeApp;
