import React, { Component } from 'react';
import Navbar from './Navbar';
import ColoredBox from './ColoredBox';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = this.resetPartita();
    this.onBoxClick = this.onBoxClick.bind(this);
  }

  //Event functions
  onBoxClick(boxPosition){
    console.log('box');

    const gestisciTurno = this.gestisciTurno.bind(this, boxPosition);
    this.setState(gestisciTurno);
  }

  gestisciTurno(boxPosition, prevState, props ) {

    if(boxPosition === prevState.lastBoxClickedIndex) {
      console.log('cliccato lo stesso bottone riprova, stato immutato');
      return Object.assign({}, prevState);
    }

    //il colore toccato fa parte dei colori estratti?
    const clickedBoxColor = [...prevState.boxesColors][boxPosition];
    console.log(clickedBoxColor);

    if(prevState.searchingForNewColor) {
        console.log('clicked new color');

        const extractedColors = [...prevState.extractedColors, clickedBoxColor];
        console.log('colori estratti' );
        console.log(extractedColors);
        const shownColors = [...prevState.boxesShownColors].map((previousColor, index) => {

          return (index !== boxPosition) ? previousColor : clickedBoxColor;

        });

        return {
          gameColors: [...prevState.gameColors],
          boxesColors: [...prevState.boxesColors],
          boxesShownColors : shownColors,
          extractedColors: extractedColors,
          searchingForNewColor: false,
          lastBoxClickedIndex: boxPosition,
         }
    } else {
      console.log('tentato nuovo colore');

      console.log(prevState);
      if(prevState.extractedColors.includes(clickedBoxColor)){
        console.log('same color found');
        const shownColors = [...prevState.boxesShownColors].map((previousColor, index) => {

          return (index !== boxPosition) ? previousColor : clickedBoxColor;

        });

        return {
          gameColors: [...prevState.gameColors],
          boxesColors: [...prevState.boxesColors],
          boxesShownColors : shownColors,
          extractedColors: [...prevState.extractedColors],
          searchingForNewColor: true,
          lastBoxClickedIndex: boxPosition,
         }

      } else {
        console.log('different color,reverting all boxes to grey');
        return this.ricominciaGiocoSenzaCambiareColori(prevState);
      }
    }
  }

  //Color and Boxes functions

  ricominciaGiocoSenzaCambiareColori(prevState){
    return {
      gameColors: [...prevState.gameColors],
      boxesColors: [...prevState.boxesColors],
      boxesShownColors : this.generaColoriInizialiBox(),
      extractedColors: [],
      searchingForNewColor: true,
      lastBoxClickedIndex: null,
     }
  }

  resetPartita(){

    //estrarre 8 colori

    var gameColors = this.estraiColoriPerGioco();

    //l'array per i boxes del gioco è composto
    //da gameColors + gli stessi colori randomizzati
    const boxesColors = [...gameColors, ...this.randomizzaArrayColori(gameColors)];

    const boxes = this.generaColoriInizialiBox();

    console.log('reset partita');
    console.log(boxesColors);

    return {
      gameColors: gameColors,
      boxesColors: boxesColors,
      boxesShownColors : this.generaColoriInizialiBox(),
      extractedColors: [],
      searchingForNewColor: true,
      lastBoxClickedIndex: null,
     }

  }

  estraiColoriPerGioco() {
    const gameColors = [];

    for (var i = 0; i < 8; i++) {
      gameColors.push(this.dammiColoreCasuale());
    }
    return gameColors;
  }

  generaColoriInizialiBox(){
    const boxes = [];

    for (var i = 0; i < 16; i++) {
     boxes.push('grey');
   }

    return boxes;
  }

  dammiColoreCasuale(){
    //Scegli un nuovo colore casuale
    const randomColorIdx = Math.floor(Math.random() * this.props.allColors.length);

    return [...this.props.allColors][randomColorIdx];
  }

  generaNumeroCasualeTra(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomizzaArrayColori(baseColors, randomTimes = 30){

    var colors = [...baseColors];

    for (var i = 0; i < randomTimes; i++) {

      //taglio un elemento ad un indice casuale di un array
      //e lo pusho alla fine dell'array originale

      const randomIndexToCutAt = this.generaNumeroCasualeTra(0, colors.length -1);

      const extractedColor = colors.splice(randomIndexToCutAt,1);

      colors.push(...extractedColor);

    }

    return colors;
  }


  render() {

    const boxes = [...this.state.boxesShownColors].map((boxColor , index) => {

      return <ColoredBox position={index} key={index} bgColor={boxColor} onBoxClicked={this.onBoxClick} />
    });

    const message = (this.state.boxesShownColors.includes('grey')) ? this.props.gameOnMessage : this.props.winningMessage ;
    return (
      <div className="App">
        <Navbar onNewGame={() => { this.setState(this.resetPartita())}} />
        <div className="container">
          <h1> {message} </h1>
          {boxes}
        </div>
      </div>
    );
  }
}

//tutti i colori tra cui si estrarrà
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
              "Yellow","YellowGreen"],
  gameOnMessage: "Keep gaming you can do it",
  winningMessage: "Nice one, try again",
};

export default App;
