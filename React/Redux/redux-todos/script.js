
const initialState = { todos: [], id: 0 };

function rootReducer(state=initialState, action){

  switch(action.type){

    case 'ADD_TODO':  var newState = {...state};

                      newState.id++;

                      return {...newState, todos: [...newState.todos, {task: action.task, id: newState.id}]}

    case 'REMOVE_TODO': var newState = {...state};


                        let todos = newState.todos.filter(todo=> todo.id !== action.id)
                        return {...newState, todos}

    default: return state;

  }

}

const store = Redux.createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

$(document).ready(function(){

  //per poter scatenare un azione ad ogni click dei bottoni negli li
  $('ul').on('click', 'button', function(event){

      //sfruttando l'id del button lanciamo l'azione "REMOVE_TODO"
      store.dispatch({type: 'REMOVE_TODO', id: parseInt($(event.target).attr('id'))});
      //rimuoviamo li relativo
      $(event.target).parent().remove();
  })


  $('form').on('submit', function(e){
    //non facciamo refreshare
    e.preventDefault();
    //eseguiamo l'azione di aggiunta, passando il testo nell'input
    store.dispatch({type: 'ADD_TODO', task: $('#task').val()})
    //estraiamo lo state attuale
    let currentState = store.getState();
    console.log(currentState);
    //Creiamo un LI con il testo presente nell'input
    let $newLi = $('<li>', {text: $('#task').val()});
    //bottone per la cancellazione dell'li, gli passiamo il valore
    //di id in state(il conteggio della posizione dell'ultimo todo creato)
    let $newDeleteBtn = $('<button>',{text: 'Delete', id: currentState.id});
    //aggiungiamo il button all'li
    $newLi.append($newDeleteBtn);
    //aggiugniamo li con bottone all'ul
    $('#todos').append($newLi);
    //puliamo l'input del form
    $('form').trigger('reset');

  })

})
