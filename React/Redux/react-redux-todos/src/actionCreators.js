
//Creiamo le funzioni che produrranno le
//azioni quando eseguiremo dispatch per modificare lo state
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

//creiamo l'action addTodo
export function addTodo(task){
  return {
    type: ADD_TODO,
    task
  }
}

//creiamo l'action removeTodo
export function removeTodo(id){
  return {
    type: REMOVE_TODO,
    id
  }
}
