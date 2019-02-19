import React from 'react';
import {Component} from 'react';
import './Recipe.css';
import PropTypes from 'prop-types';

class Recipe extends Component {

  render(){

    {/* Estraggo se esistono le prop,
      ognuna avrà la sua var */}
    const {title, img, instructions, ingredients} = this.props;

    const ingListItems = ingredients.map((ing, index) => (<li key={index}>{ing}</li>));

    return (<div className="card">
              <div className="card-head">
                <h1>{title}</h1>
              </div>
              <div className="card-body">
                <img src={img} alt="immagine" />
                <hr/>
                <h5>Ingredients</h5>
                <ul>{ingListItems}</ul>
                <hr/>
                <h5>Instructions</h5>
                <p>{instructions}</p>
              </div>
            </div>
      );
  }
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired ,
  img: PropTypes.string.isRequired ,
  instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.string.isRequired,
}


export default Recipe;
