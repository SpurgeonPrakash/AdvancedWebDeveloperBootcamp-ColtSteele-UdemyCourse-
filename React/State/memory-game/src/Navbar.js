import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navbar extends Component {

  //prepariamo una callback vuota,
  //la passeremo da app per far ripartire
  //la partita
  static defaultProps ={
    onNewGame(){}
  }

  render() {

    const {onNewGame} = this.props;

    return (
      <nav>
        <h1>Memory Game</h1>
        <button type="button" onClick={onNewGame}>New Game</button>
      </nav>
    );
  }
}

export default Navbar;
