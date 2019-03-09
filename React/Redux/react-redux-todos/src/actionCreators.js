
//Creiamo le funzioni che produrranno le
//azioni quando eseguiremo dispatch per modificare lo state
export const GET_TODOS = "GET_TODOS";
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";


//REDUX THUNK
//con redux thunk non esportiamo più le action...

function handleTodos(data){
  return {
    type: GET_TODOS,
    data
  }
}

function handleAdd(todo){
  return {
    type: ADD_TODO,
    todo
  }
}


function handleRemove(id){
  return {
    type: REMOVE_TODO,
    id
  }
}

//ma dei thunks ossia delle funzioni che non creerano subito
//delle actions per il reducer, ma delle funzioni che prima
//eseguiranno delle operazioni e poi passeranno eventuali
//dati all'interno dell'action che sarà poi lanciata infine
//tramite dispatch()

export function getTodos(){
  return dispatch => {
    return fetch("http://localhost:3001/api/todos")
      .then(res => res.json())//trasforma in json
      .then(data => dispatch(handleTodos(data)))//qui richiamo la action sopra
      .catch(err => console.log('error!', err))
  }
}

export function addTodo(task){
  return dispatch => {
    return fetch("http://localhost:3001/api/todos",
                  {method: 'POST',
                  headers: new Headers({'Content-Type': 'application/json'}),
                  body: JSON.stringify({task})
                })
      .then(res => res.json())//trasforma in json
      .then(data => dispatch(handleAdd(data)))//qui richiamo la action sopra
      .catch(err => console.log('error!', err))
  }
}

export function deleteTodo(id){
  return dispatch => {
    return fetch("http://localhost:3001/api/todos/" + id, {method: 'DELETE'})
      .then(res => res.json())//trasforma in json
      .then(data => dispatch(handleRemove(id)))//qui richiamo la action sopra
      .catch(err => console.log('error!', err))
  }
}
