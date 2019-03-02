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

  //Alla pressione di enter nell'input del form
  $('#todoInput').keypress(function(event){
    if(event.which == 13) {
      console.log('you hit enter');
      if($('#todoInput').val() !== '') {
        createTodo();
      }
    }
    });
});

function addTodos(todos) {
  console.log(todos);
  todos.forEach(addTodo);
}

function addTodo(todoFromApi) {
  console.log(todoFromApi.name);

  //creiamo il tag li
  //racchiudiamo il tag in $() per
  //poter applicare i metodi di jQuery
  //come ad esempio addClass per stilarlo
  var $newTodoLi = $('<li>' + todoFromApi.name + '</li>').addClass('task');

  //Se la proprietà completed dell'oggetto 'todo'
  //dall'api è true aggiungiamo la classe 'done'
  if (todoFromApi.completed) {
    $newTodoLi.addClass('done');
  }

  //e lo aggiungiamo alla lista
  $('ul.list').append($newTodoLi);

}

function createTodo(){

  //ciò che abbiamo scritto nell'input
  var userInput = $('#todoInput').val();
  console.log(userInput);

  //Post request per inviare una nuova todo
  $.post('/api/todos', { name: userInput, completed: false})
    .then(function(todo){
      addTodo(todo);
      $('#todoInput').val('');
    })
    .catch(function(error){
      console.log(error);
    })

}
