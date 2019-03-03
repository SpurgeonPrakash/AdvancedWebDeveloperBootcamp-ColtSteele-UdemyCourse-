const apiUrl = '/api/todos/';

export async function getTodos(){
  return fetch(apiUrl)
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
})
}

export async function createTodo(val){
  return fetch(apiUrl,
    { method: 'post',
      headers: new Headers({'Content-type': 'application/json'}),
      body: JSON.stringify({name : val})
    })
    .then(response => {

      //Error Handling
      if(!response.ok){
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Server off, retry later'}
        }
      }
      //Caso success
      return response.json();
})
}

export async function removeTodo(id){
  return fetch(apiUrl + id, { method: 'delete'})
    .then(response => {

      //Error Handling
      if(!response.ok){
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Server off, retry later'}
        }
      }
      //Caso deletion success
      return response.json();
})
}

export async function updateTodo(todo){
  return fetch(apiUrl + todo._id,
        { method: 'put',
          headers: new Headers({'Content-type': 'application/json'}),
          body: JSON.stringify({completed : !todo.completed})
        })
    .then(response => {

      //Error Handling
      if(!response.ok){
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Server off, retry later'}
        }
      }
      //Caso deletion success
      return response.json();
})
}
