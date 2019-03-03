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

  //Puntiamo ogni listitem tramite il padre che è
  //già nella pagina al primo caricamento
  $('.list').on('click','li', function(){
    console.log('clicked on li');
    updateTodo($(this));
  });

  //Puntiamo lo span tramite il padre che è
  //già nella pagina al primo caricamento
  $('.list').on('click', 'span', function(e){
    //impedisce al click sullo span di causare anche il click dell li
    e.stopPropagation();
    console.log('clicked on span');
    removeTodo($(this).parent());
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
  var $newTodoLi = $('<li>' + todoFromApi.name + '<span>X</span></li>').addClass('task');
  //aggiungiamo un id all'oggetto jquery che rappresenta li
  $newTodoLi.data('id',todoFromApi._id);
  $newTodoLi.data('completed',todoFromApi.completed);
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

function removeTodo(li){
  //estraiamo l'id dall'oggetto jquery
  var todoId = li.data('id');

  //effettuiamo la delete request
  $.ajax({
    method: 'DELETE',
    url: '/api/todos/' + todoId
  })
  .then(function(data){
    console.log(data);
    //se tutto va a buon fine cancelliamo
    //il padre cioè l'li relativo
    li.remove();
  })
  .catch(function(error){
    console.log(error);
  });

}

function updateTodo(li){

  //estraiamo l'id e lo stato di completamento dall'oggetto jquery
  var todoId = li.data('id');
  var todoDone = li.data('completed');
  var updateData = {completed: !todoDone};
  $.ajax({
    method: 'PUT',
    url: '/api/todos/' + todoId,
    data: updateData
  })
  .then(function(updatedTodo){
    console.log(updatedTodo);
    //toggle della class  e aggiornamento dell'oggetto
    li.toggleClass('done').data('completed', !todoDone);
  })
  .catch(function(error){
    console.log(error);
  })


}
