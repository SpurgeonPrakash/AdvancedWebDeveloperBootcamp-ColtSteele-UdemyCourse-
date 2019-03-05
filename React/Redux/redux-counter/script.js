
//1. CREAZIONE INITIAL STATE
//Alla creazione dello store sarà il valore assegnato allo state

const initialState = { count: 0};

//2. Il reducer è la funzione che gestisce lo store,
//prende come parametri lo state attuale e un action
//quando si esegue store.dispatch il reducer
//vede se ha un action ed esegue l'azione che ha il type
//corrispondente nello state
//al primo lancio il reducer esegue '@@INIT' che restituisce
//il valore default dello state, in questo caso initial state

function rootReducer(state=initialState, action){

  switch(action.type){
    //fare sempre una copia dello state prima di manipolarla!!!
    case 'INCREMENT': var newState = {...state};
                      newState.count++;
                      return newState;

    case 'DECREMENT': var newState = Object.assign({},state);
                      newState.count--;
                      return newState;

    default: return state;

  }


}

//3. creazione dello store assegnando il root Reducer
const store = Redux.createStore(rootReducer)

//accedere al valore dello state
//con la funzione preposta
// store.getState();

$(document).ready(function(){

  //4. Mostriamo alla prima esecuzione il valore count nello state
  let {count} = store.getState();
  $('#counter').text(count);

  //5. tramite i listeners e la funzione dispatch
  //lanciamo l'azione corrispondente nel rootReducer

  $('#increment').on('click', function(){
    store.dispatch({type: 'INCREMENT'})
    let {count} = store.getState();
    $('#counter').text(count);
  })

  $('#decrement').on('click', function(){
    store.dispatch({type: 'DECREMENT'})
    let {count} = store.getState();
    $('#counter').text(count);
  })

})
