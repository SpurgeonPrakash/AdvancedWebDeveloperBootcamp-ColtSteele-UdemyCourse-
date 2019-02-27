import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import logo from './logo.svg';
import './App.css';

//Stateless functional component
const ToDo = (props) => {
  return (
    <li className="todo">{props.todoText}</li>
  );
}

ToDo.propTypes = {
  todoText: PropTypes.string,
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { data: ['todo1'], inputText: '' }
  }

  render() {
    /*
      Popoliamo una var inputText se in state
      c'è una proprietà uguale, ovviamente esiste
      */
    const {inputText} = this.state;

    const todos = this.state.data.map((todo, index) => {
        return <ToDo key={index} todoText={todo} />
      });

    return (
      <div className="App">
        <form onSubmit={ (event) => {
          /*Blocchiamo l'azione di default del submit
          permettendo la successiva logica di React*/
          event.preventDefault();
          /* Creiamo un array di dati del form composto
          da i dati preesistenti e i nuovi*/
          if (this.state.inputText !== '') {
          const data = [...this.state.data, this.state.inputText];
          /* modifichiamo lo stato dell'app
          resettando il valore di inputText*/
          this.setState({ data, inputText: '' });
        } else {
          console.log('form vuoto');
        }
        }}>
        {/* per essere monitorato da React
            un input deve avere il value legato allo
            state del form, e un onChange event */ }
        <input
          type="text"
          name="inputText"
          value={inputText /* la var all'inizio del render method */}
          onChange={(event) => { this.setState({ [event.target.name]: event.target.value })} }
          />
        <button type="submit">Aggiungi ToDo </button>
        </form>
        <ul>
          {todos}
        </ul>
      </div>
    );
  }
}

export default App;
