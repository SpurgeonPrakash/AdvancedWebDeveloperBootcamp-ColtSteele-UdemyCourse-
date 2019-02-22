import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [
        {
          name: 'Tim',
          hobbies: ['sailing', 'react']
        }, {
          name: 'Matt',
          hobbies: ['math', 'd3']
        }, {
          name: 'Colt',
          hobbies: ['css', 'hiking']
        }, {
          name: 'Elie',
          hobbies: ['music', 'es2015']
        }
      ]
    };

    {/* MODIFICARE CORRETTAMENTE this.state */}

    {/* MODO 1: SLICE, OBJECT.ASSIGN, SPLICE */}

    { /*
        setTimeout(() => {
          this.state.instructors.forEach ((inst) => {
            console.log('this.state inizio: ' + inst.hobbies);
          });


          const instIndex = Math.floor(Math.random() * this.state.instructors.length);

          const hobbyIndex = Math.floor(Math.random() * this.state.instructors[instIndex].length);

          console.log('indice modifica ' + instIndex);

          //Duplichiamo l'array di oggetti intructors
          const instructors = this.state.instructors.slice();

          //Facciamo una copia indipendente, che non faccia alcun
          //riferimento all'oggetto originale
          //Object.assign(nuovoOggettoVuoto, oggettoDaCopiare)
          instructors[instIndex] = Object.assign({}, instructors[instIndex]);

          //per togliere la referenza anche all'array hobbies
          //lo sleghiamo con un duplicato

           instructors[instIndex].hobbies = instructors[instIndex].hobbies.slice();

           //Ora non ci sono legami con this.setState, possiamo
          //modificare direttamente l'array hobbies all'istruttore scelto

          instructors[instIndex].hobbies.splice(hobbyIndex, 1);

          this.state.instructors.forEach ((inst) => {
            console.log('this.state dopo modifica copia: ' + inst.hobbies);
          });

          //Procediamo con setState
          this.setState({instructors});

          this.state.instructors.forEach ((inst) => {
            console.log('this.state dopo setState: ' + inst.hobbies);
          });

        }, 5000);
    */}
  }

  render() {
    const instructors = this.state.instructors.map((instructor, index) => (
      <li key={index}>
        <h3>{instructor.name}</h3>
        <h4>Hobbies: {instructor.hobbies.join(", ")}</h4>
      </li>
    ));
    return (
      <div className="App">
        <ul>
          {instructors}
        </ul>
      </div>
    );
  }
}

export default App;
