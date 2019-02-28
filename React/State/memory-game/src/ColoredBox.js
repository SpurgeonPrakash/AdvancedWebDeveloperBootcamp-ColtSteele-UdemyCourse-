import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColoredBox extends Component {

  //prepariamo una callback vuota
  static defaultProps ={
    onBoxClicked(){}
  }

  render() {

    const {onNewGame, bgColor, onBoxClicked, position} = this.props;
    // console.log(onBoxClicked);

    return (
      <div position={position} className="box" style={{backgroundColor: bgColor}} onClick={() => onBoxClicked(position)}>
      </div>
    );
  }
}

export default ColoredBox;
