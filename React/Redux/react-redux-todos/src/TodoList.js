import React, { Component } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
//con connect connetteremo lo store al componente
import { connect } from 'react-redux';
//importiamo le funzioni add e remove
import { addTodo, deleteTodo, getTodos } from './actionCreators';
//REACT ROUTER
import {Route} from 'react-router-dom';

class TodoList extends Component {

  constructor(props) {
    super(props);

    //NON USIAMO PIù LO STATE CLASSICO!
    //TUTTA LA BASE DI DATI VIENE GESTITA DA REDUX
    //Per ciò che "nasce e muore " nel componente usiamo
    //il classico state normale

    this.handleAdd = this.handleAdd.bind(this);

  }

  componentDidMount(){
    this.props.getTodos();
  }

  handleAdd(val){
    this.props.addTodo(val);
  }

  removeTodo(id) {
    //1.prima di importare le actions con connect e mapDispatchToProps
    // this.props.dispatch({
    //   type: "REMOVE_TODO",
    //   id: id
    // });
    //2.dopo aver importato le actions con connect e mapDispatchToProps
    this.props.deleteTodo(id);
  }

  render() {

    //lo state di redux passato a props ha trasmesso
    //un array di oggetti quindi con map
    //creiamo gli li con il valore della chiave task
    //di ogni oggetto
    const { todos } = this.props;

    const listItems = todos.map(todoObj => (
      <Todo key={todoObj._id} task={todoObj.task} removeTodo={this.removeTodo.bind(this, todoObj._id)} />
    ));

    return (
        <div>
          <Route
          path="/todos/new"
          component={props =>(
              <NewTodoForm {...props} handleSubmission={this.handleAdd} />
          )}/>
          <Route
          exact path="/todos"
          component={()=>(<div>
                            <ul>
                            {listItems}
                            </ul>
                          </div>)}
          />
        </div>
    )
  }

}

//la funzione riceve da connect lo state di Redux
//e possiamo passare alle prop del componente connesso
//ciò che vogliamo dallo store di redux ritornando
//un oggetto (che quindai rappresenta le props che avrà il componente)
//in più avremo "GRATIS" una dispatch function per
//lanciare le action
function mapStateToProps(reduxState) {

  return {
    todos: reduxState.todos
  }
}

//mapStateToProps ci mette a disposizione
//il metodo dispatch a cui passare un action come
//classico,
//per passare direttamente i metodi alle props
//del componente connesso passiamo un secondo
//parametro a connect, questa funzione mette a
//disposizione un oggetto con tutte
//le actions che si possono compiere in questo componente
/*
function mapDispatchToProps(dispatch){
  restituisce in props
  tutte le funzioni contenute
  nell'oggetto ritornato
  return {
    addTodo: function(task){
    return {
      type: 'ADD_TODO',
      task
      }
    },
    removeTodo: function(id){
      return {
        type: 'REMOVE_TODO',
        id
        }
      }
    }
  }
*/


//versione con mapDispatchToProps nel componente
// export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

//versione con le action importate da file esterno,
//in questo caso da actionCreator.js
export default connect(mapStateToProps, { addTodo, deleteTodo, getTodos })(TodoList);
//passandole come secondo parametro saranno direttamente aggiunte
//alle props e non dovremo pià usare dispatch ma
//semplicemente eseguire this.props.action()
