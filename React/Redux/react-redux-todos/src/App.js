import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';
//React Router Components
import {Link, Route, Redirect} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>See our Todos!</h1>

        <p>
          <Link to="/todos">See my todos</Link>
        </p>
        <p>
          <Link to="/todos/new">Add a todo</Link>
        </p>

          <Route
          path="/todos"
          component={TodoList}></Route>
          <Route
          exact path="/"
          render={()=> <Redirect to="/todos"/>}></Route>
      </div>



    );
  }
}

export default App;
