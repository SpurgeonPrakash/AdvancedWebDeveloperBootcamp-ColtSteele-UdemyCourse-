import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './api';

class TodoList extends Component {

  //TodoList gestisce lo state dell'app
  constructor(props){
    super(props);

    this.state = {
      todos: [],
    }

    this.addTodo = this.addTodo.bind(this);

  }

  //chiamiamo la nostra api per i dati
  componentWillMount(){

    this.loadTodos();
  }

  // funzioni CRUD

  async loadTodos(){
    let todos = await apiCalls.getTodos();
    //passaggio dati a state
    this.setState({todos});
}

  async addTodo(val){

    console.log('todo from todolist component', val);

    let newTodo = await apiCalls.createTodo(val);

    //passaggio dati a state
    this.setState({todos: [...this.state.todos, newTodo]});

  }

  async deleteTodo(id){
    console.log('cancella con id: ', id);

    //in questo caso attendiamo solo l'avvenuta cancellazione
    //per procedere alla modifica dell'interfaccia
    await apiCalls.removeTodo(id);

    const todos = this.state.todos.filter((todo) => (todo._id !== id));

    this.setState({todos});
    }

  async toggleTodo(todo){
    console.log('modifica stato completed con id: ', todo._id, todo.completed);

    let updatedTodo = await apiCalls.updateTodo(todo);

    const todos = this.state.todos.map((todo) => ((todo._id !== updatedTodo._id) ? todo : {...todo, completed: !todo.completed}));

    //passaggio dati a state
    this.setState({todos},()=>{
      console.log('dopo update completed: ', updatedTodo.completed)
    });

  }

  //Render component
  render() {
    const todos = this.state.todos.map((todo) => (
      <TodoItem
      key={todo._id}
      {...todo}
      onDelete={this.deleteTodo.bind(this, todo._id)}
      onToggle={this.toggleTodo.bind(this, todo)}
      />
    ));

    return (
        <div>
          <h1>Todolist</h1>
          <TodoForm addTodo={this.addTodo} />
          <ul>
            {todos}
          </ul>
        </div>
    );
  }
}

export default TodoList;
