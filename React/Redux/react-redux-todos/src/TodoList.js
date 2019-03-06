import React, { Component } from 'react';
import Todo from './Todo';
//con connect connetteremo lo store al componente
import {connect} from 'react-redux';

class TodoList extends Component {

  constructor(props){
    super(props);

    //NON USIAMO PIù LO STATE CLASSICO!
    //TUTTA LA BASE DI DATI VIENE GESTITA DA REDUX
    //Per ciò che "nasce e muore " nel componente usiamo
    //il classico state normale

    this.state = {
      task:""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.removeTodo = this.removeTodo.bind(this);

  }

  removeTodo(id){
    this.props.dispatch({
      type: "REMOVE_TODO",
      id: id
    });
  }

  handleSubmit(e){
    e.preventDefault();
    //il metodo dispatch è ora in props
    //chiamiamo l'azione di tipo addtodo
    //passando il dato task da state
    this.props.dispatch({type: "ADD_TODO", task: this.state.task});
    //ripristiniamo lo state dell'input da cui proviene il dato
    this.setState({[e.target.name]: ""})
    //puliamo il form
    e.target.reset();
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render(){

    //lo state di redux passato a props ha trasmesso
    //un array di oggetti quindi con map
    //creiamo gli li con il valore della chiave task
    //di ogni oggetto
    const {todos} = this.props;

    const listItems = todos.map((todoObj, index)=>(
      <Todo key={index} task={todoObj.task} removeTodo={this.removeTodo.bind(this,todoObj.id)} />
    ));

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="task">Task</label>
        <input
          type="text"
          name="task"
          id="task"
          onChange={this.handleChange}
        />
        <button>Add Todo</button>
        </form>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }

}

//la funzione riceve da connect lo state di Redux
//e possiamo passare alle prop del componente connesso
//ciò che vogliamo dallo store di redux ritornando
//un oggetto (che quindi rappresenta le props che avrà il componente)
//in più avremo "GRATIS" una dispatch function per
//lanciare le action
function mapStateToProps(reduxState){

  return {
    todos: reduxState.todos
  }
}

export default connect(mapStateToProps)(TodoList);
