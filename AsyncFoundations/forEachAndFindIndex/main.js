/*
ESERCIZIO:
Ricreare le funzioni forEach e findIndex per capire il ruolo ed
il funzionamento delle callback functions
*/


//forEach
function forEach(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

//findIndex
function findIndex(array, callback) {
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return i;
    }
  }

  return -1;

}


//Esempio

var mioArray = [1, 8, 12, 7, 4, 97, 4];

console.log('Il mio array di numeri è: ' +  mioArray);

//forEach

function stampaInConsole(elemento, indice, array) {
  console.log('Il numero all\'indice ' + indice + ' è: ' + elemento);
}

forEach(mioArray,stampaInConsole);

//findIndex

function numeroMaggioreDi4(elemento, indice, array) {
  return (elemento > 4) ? true : false;
}

var risultatoRicercaIndice = findIndex(mioArray, numeroMaggioreDi4);

if (risultatoRicercaIndice != -1) {
  console.log('L\'indice del primo numero maggiore di 4 nel mio array è ' + + risultatoRicercaIndice);
} else {
  console.log('L\'array non contiene il numero 4');
}
