
//Creiamo le funzioni che produrranno le
//azioni quando eseguiremo dispatch per modificare lo state
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

export function addTodo(task){
  return {
    type: ADD_TODO
  }
}
export function removeTodo(id){
  return {
    type: REMOVE_TODO
  }
}
