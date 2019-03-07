import React, { Component } from 'react';

export default class NewTodoForm extends Component {

 constructor(props){

   super(props);

   this.state = {
     task: '',
   }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
 }

 handleSubmit(e) {
   e.preventDefault();
   //il metodo dispatch è ora in props
   //chiamiamo l'azione di tipo addtodo
   //passando il dato task da state
   //1.prima di importare le actions con connect e mapDispatchToProps
   // this.props.dispatch({type: "ADD_TODO", task: this.state.task});
   //2.dopo aver importato le actions con connect e mapDispatchToProps
   //-->Isolando il componente chiamiamo la callback da TodoList
   this.props.handleSubmission(this.state.task);
   //ripristiniamo lo state dell'input da cui proviene il dato
   // this.setState({[e.target.name]: ""})
   //puliamo il form
   e.target.reset();

   //REACT ROUTER, REDIRECT ALLA ROTTA /todos
   this.props.history.push("/todos");
 }

 handleChange(e) {
   this.setState({ [e.target.name]: e.target.value })
 }


  render(){

    return(
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
    )
  }

}
