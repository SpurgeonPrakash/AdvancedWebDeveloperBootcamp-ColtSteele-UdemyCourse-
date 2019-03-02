import React, { Component } from 'react';
import './App.css';

//url https://restcountries.eu/rest/v2/all
//fare la chiamata all'api
//prendere 4 paesi random
//form per le scelte
//selezionare il paese soluzione
//passare i dati al componente Flag (urlImmagine)

const Flag = ({imgUrl}) => {
  return (
    <div className="flag" style={{marginTop: '100px'}}>
      <img style={{ maxWidth: '300px', }}src={imgUrl} alt="bandiera" />
    </div>
  );
}

const CountryCheckbox = (({name, id, onChangeCallback }) => {
  return(
    <div style={{ display: 'inline' }} >
    <label htmlFor={name}>{name}</label>
      <input type="radio" name="id" value={id} onChange={(e)=>{onChangeCallback(e)}} />
    </div>
  );
});

class CountryPickerForm extends Component {

  static defaultProps = {
    submitCallback(){ }
  }

  constructor(props){
    super(props);

    this.state = {
      id: null //l'id della country uscente
    }

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  handleCountryChange(e){
    console.log('callback cambio radio');
    // console.log(e.target.name);
    // console.log(e.target.value);

    console.log('state prima cambio check',this.state);
    this.setState({ [ e.target.name ] : parseInt(e.target.value)}, ()=>{console.log('state form dopo cambio check',this.state);});
  }

  handleSumbit(event){
    event.preventDefault();
    console.log('callback del sumbit');
    console.log(event);
    this.props.submitCallback({ ...this.state });
    this.setState({id: null});
  }

  render() {
    const {submitCallback, countries} = this.props;

    const checkboxes = countries.map((country) => {
        return <CountryCheckbox  key={`country-${country.id}`} {...country} onChangeCallback={this.handleCountryChange}/>
    });

    return (
      <form onSubmit={this.handleSumbit}>
      {checkboxes}
      <button type="submit">Conferma scelta</button>
      </form>
    )

  }

}

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      countries: [], //array di oggetti
      solutionCountry: {},
      rightPick: false,
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  newGame(e = null) {

      console.log('state prima chiamata ajax per gioco', this.state);
      fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => {
          const countries = this.scegliQuattroNazioniDa(data);
          const winIndex = this.generaNumeroCasualeTra(0, countries.length - 1);
          const solutionCountry = countries[winIndex];

          this.setState({ countries, solutionCountry,rightPick: false },
            //callback per controllare i dati nello state
            () => {
            console.log('fine chiamata ajax');
            console.log(this.state);
          })
        })
  }

  onFormSubmit({id}){

    this.setState({rightPick: (id === this.state.solutionCountry.id)},
    ()=>{
      console.log('state aggiornato dopo submit form');
      console.log(this.state);
    });

  }

  componentDidMount(){

    this.newGame()

  }

  generaNumeroCasualeTra(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
  }

  scegliQuattroNazioniDa(countriesData){

    const gameCountries = [];

    for (var id = 0; id < 4; id++) {
    const chosenIdx = this.generaNumeroCasualeTra(0, countriesData.length - 1);
    const {name, flag} = countriesData[chosenIdx];
    gameCountries.push( { name, flag , id });
   }

    return gameCountries;
  }

  render() {

    const { solutionCountry, countries, rightPick} = this.state;

    console.log('le country nel render');
    console.log(countries);

    const gameAreaDisplay = { display: (rightPick)? 'none': 'block'}
    const newGameBtnDisplay = { display: (!rightPick) ? 'none': 'block'}
    const gameMessage = (!rightPick)? 'Guess the Country of this flag': 'Good Job, Hit button to try again';

    return (
      <div className="App" style={{ paddingTop: '100px'}}>
        <h1>{gameMessage}</h1>
        <button type="button" style={{...newGameBtnDisplay, margin: '0 auto' }} onClick={this.newGame}>Play Again</button>
        <div className="gameArea" style={gameAreaDisplay}>
        <CountryPickerForm countries={countries} submitCallback={this.onFormSubmit} />
        <Flag id={solutionCountry.id} imgUrl={solutionCountry.flag} />
        </div>
      </div>
    );
  }
}

export default App;
