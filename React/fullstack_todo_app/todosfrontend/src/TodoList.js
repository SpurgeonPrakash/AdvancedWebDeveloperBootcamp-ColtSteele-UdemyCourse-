import React, { Component } from 'react';
import TodoItem from './TodoItem';
const apiUrl = '/api/todos';


class TodoList extends Component {

  //TodoList gestisce lo state dell'app
  constructor(props){
    super(props);

    this.state = {
      todos: [],
    }

  }

  //chiamiamo la nostra api per i dati
  componentWillMount(){

    this.loadTodos();
  }

  loadTodos(){
    fetch(apiUrl)
      .then(response => {

        //Error Handling
        if(!response.ok){
          if(response.status >= 400 && response.status < 500){
            return response.json().then(data => {
              let err ={errorMessage: data.message};
              throw err;
            })
          } else {
            let err = {errorMessage: 'Server off, retry later'}
          }
        }
        //Caso success
        return response.json();
  }).then(todos => this.setState({todos}));//passaggio dati a state
}

  render() {
    const todos = this.state.todos.map((todo) => (
      <TodoItem key={todo._id} {...todo} />
    ));

    return (
        <div>
          <h1>Todolist</h1>
          <ul>
            {todos}
          </ul>
        </div>
    );
  }
}

export default TodoList;
