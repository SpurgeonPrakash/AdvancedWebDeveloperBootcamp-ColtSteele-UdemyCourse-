import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

/*
Solo un componente nell'app può
gestire lo stato (setState).
Chi gestisce lo stato può innescare
una reazione solo nei componenti figli,
MAI nei componenti fratelli o superiori

In questo caso instructor Item viene
aggiornato dal componente principale AppComponent
che è incaricato della gestione dello stato

AppComponent tramite il suo setTime Out
modifica lo stato e in un certo senso la base di dati
e la passa come props ai componenti figli,

In questo caso Instructor Item non accede a State
venendo trasfromato in uno stateless functional component.

In qualità di stateless functional component viene
creato tramite una funzione che porta in dote le props
trasmesse al componente stesso dal padre, all'interno
della funzione si espleta l'iter del renderMethod
classico di un componente. Il vantaggio è che props
è una copia liberamente manipolabile di ciò che viene passato ad esso. Infatti si può usare il metodo join senza
rischiare di avere ripercussioni sui dati(state).


*/
const InstructorItem = props => {
  return (
    <li>
      <h3>{props.name}</h3>
      <h4>
      Hobbies: {props.hobbies.join(", ")}
      </h4>
    </li>
  );
}

InstructorItem.propTypes = {
  name: PropTypes.string,
  hobbies: PropTypes.arrayOf(PropTypes.string)
};


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

    setTimeout(() => {
      const randInst = Math.floor(
        Math.random() *
        this.state.instructors.length
      );

      const hobbyIndex = Math.floor(
        Math.random() *
        this.state.instructors[randInst].length
      );

      const instructors = this.state.instructors.map((inst, i) => {
        if (i === randInst) {
          const hobbies = [...inst.hobbies];
          hobbies.splice(hobbyIndex, 1);
          return {
            ...inst,
            hobbies
          };
        }

        return inst;
      });
      this.setState({instructors});
    }, 5000);
  }

  render() {
    const instructors = this.state.instructors.map((instructor, index) => (
      <InstructorItem
        key={index}
        name={instructor.name}
        hobbies={instructor.hobbies}
      />
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
