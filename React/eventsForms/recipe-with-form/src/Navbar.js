import React, {Component} from 'react';
import './Navbar.css';
import PropTypes from 'prop-types';

class Navbar extends Component {

  //diamo un valore di defaul vuoto
  //alla prop onNewRecipe, sarà una funzione che
  //accetta una callback da un component padre
  //in questo caso app
  static defaultProps = {
    onNewRecipe(){}
  }

  static propTypes = {
    onNewRecipe: PropTypes.func
  }

  render() {
    return (
      <header>
        <h2><a>Recipe App</a></h2>
        <nav>
          <li><a onClick={this.props.onNewRecipe}>New Recipe</a></li>
          <li><a>Home</a></li>
          <li><a>About</a></li>
          <li><a>Contact Us</a></li>
        </nav>
      </header>
    );
  }
}

export default Navbar;
