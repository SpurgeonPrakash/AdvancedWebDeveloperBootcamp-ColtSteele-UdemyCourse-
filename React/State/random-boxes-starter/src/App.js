import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

//Stateless functional component
const Box = (props) => {
  return (
    <li className="box" style={{backgroundColor: props.color, width: '200px', height: '200px', border: '1px solid black'}}>
    </li>
  );
}

Box.propTypes = {
  color: PropTypes.string,
};


class App extends Component {


  constructor(props) {
    super(props);

    const startingBoxes = [];

    for (var i = 0; i < 32; i++) {
      startingBoxes.push({ color : this.dammiColoreCasuale()});
    }

    this.state = {
      boxes: startingBoxes,
    };

    console.log(startingBoxes);

    //per modificare i box,
    //arrow function preserva il valore della keyword this
    setInterval(() => {
      //Scegli un box casuale da modificare
      const randomBoxIdx = Math.floor(Math.random() * 32);
      console.log(randomBoxIdx);

      var randomColor = this.dammiColoreCasuale();

      //LAVORO SU UNA COPIA DI BOXES PER NON MODIFICARE
      //LO STATE QUINDI NUOVO ARRAY CON SPREAD OPERATOR
      const boxes = this.copiaSicuraBoxes().map((box, i, boxesOriginal) => {
        if (i === randomBoxIdx) {
        console.log('box originale');
        console.log(box);
        //creo un nuovo oggetto indipendente di box
        //con object.assign
        const newBox = this.copiaSicuraOggettoBox(box);
          //MODIFICO IL COLORE SUL NUOVO OGGETTO
          newBox.color = randomColor;
          //VERIFICO DI NON AVER CAMBIATO
          //L'OGGETTO NELLO STATE MA SOLO IL NUOVO
          console.log('newBox' );
          console.log(newBox);
          console.log('actualBox, deve essere diverso');
          console.log(box);
          console.log('box in state');
          console.log(this.state.boxes[i]);
          //aggiungo il box modificato all'array risultato
          return newBox;
        }
        //invece se non siamo all'index da cambiare restituiamo
        //direttamente un box non modificato
        return box;
    });

    //controllo di non aver modificato lo state
    console.log('Fine map');
    console.log(this.state.boxes);

    //Utilizzo la callback di set state per verificare il suo
    //valore a seguito del cambio
    this.setState({boxes: boxes},() => {
      console.log('Dopo set state');
      console.log(this.state.boxes);
    });

  } , 300)
  }

  //Ogni LIVELLO del contenuto di state
  //va copiato in modo sicuro, non deve avere
  //referenze allo state e quindi usiamo
  //queste due funzioni

  //Fornisce una copia sicura di boxes
  //newArray with spread operator
  copiaSicuraBoxes(){
    return [...this.state.boxes];
  }

  copiaSicuraOggettoBox(box) {
    return Object.assign({},box);
  }

  dammiColoreCasuale(){
    //Scegli un nuovo colore casuale
    const randomColorIdx = Math.floor(Math.random() * this.props.allColors.length);

    return [...this.props.allColors][randomColorIdx];
  }

  render() {

    const boxes = this.state.boxes.map((box, index) => (
      <Box
        key={index}
        color={box.color}
      />
    ));

    return (
      <div className="App" >
        <ul className="boxes">
          {boxes}
        </ul>
      </div>
    );
  }
}

App.defaultProps = {
  allColors: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
              "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate",
              "Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod",
              "DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange",
              "DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey",
              "DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue",
              "FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod",
              "Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
              "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan",
              "LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon",
              "LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow",
              "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
              "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
              "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
              "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
              "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue",
              "Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen",
              "SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen",
              "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke",
              "Yellow","YellowGreen"]
};

export default App;
