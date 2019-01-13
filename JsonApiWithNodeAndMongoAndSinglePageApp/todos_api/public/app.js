console.log('app.js connected');

$(document).ready(function () {

  //a questo punto siamo nella directory principale
  //come url della richiesta get specifichiamo solo
  //l'endpoint.
  //usiamo il metodo getJSON per abbreviare
  $.getJSON('/api/todos')
  .then(addTodos)
  .catch(function (error) {
    console.log(error);
  });

});

function addTodos(todos) {
  console.log(todos);
  todos.forEach(function (todoFromApi) {
    console.log(todoFromApi.name);

    //creiamo il tag li
    //racchiudiamo il tag in $() per
    //poter applicare i metodi di jQuery
    //come ad esempio addClass per stilarlo
    var $newTodoLi = $('<li>' + todoFromApi.name + '</li>').addClass('task');

    //Se la proprietà completed dell'oggetto 'todo'
    //dall'api è true aggiungiamo la classe 'done'
    if (todoFromApi.completed) {
      newTodo.addClass('done');
    }

    //e lo aggiungiamo alla lista
    $('ul.list').append($newTodoLi);

  });
}
