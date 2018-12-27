//The Keyword THIS

/*
DEFINIZIONE:
- E' una keyword riservata in JS, non è possibile
assegnargli alcun valore direttamente.
- Il valore contenuto in 'this' è solitamente
determinato dal 'contesto di esecuzione di una funzione'
- Può essere determinata secondo 4 regole
  -> Globale
  -> Implicita (oggetto)
  -> Esplicita
  -> New
*/

/********************************************/

//REGOLA 1: GLOBALE(Global Context)
/*
 Quando 'this' viene impiegata nella window ossia non è
 utilizzata all'interno di un oggetto da noi dichiarato
 (global context) fa riferimento alla window stessa.
 Una funzione non è un oggetto quindi la keyword 'this'
 sta ancora operando nel global context
*/
function whatIsThis() {
  console.log('Sono la window: ' + (this === window));//true
  console.log(this);
}

whatIsThis();

var varGlobale = 'esempio di Globale';

//var globale è una proprietà dell'oggetto window
//quindi è una proprietà di 'this'
console.log(this.varGlobale);

//PRATICA DA EVITARE!
//- creare una variabile globale da una funzione tramite 'this'
//Farlo non crea un errore ma è sconsigliato
function daNonFare() {
  this.modoSbagliato = true;
}

//Per evitare di incappare in simile pratica si può 'attivare' lo
//STRICT MODE
//applicabile scrivendo "use strict" in cima al proprio file JS
//con esso attivato 'this' non corrisponde alla window quando
//si trova all'interno di una funzione (da invece 'undefined')

/********************************************/

//REGOLA 2: IMPLICITA/OGGETTO(Implicit/Object)
/*
 Quando 'this' viene impiegata all'interno di un oggetto
 da noi dichiarato rappresenta l'oggetto genitore più vicino
*/

var studente = {
  nome: 'Riccardo',
  cognome: 'Silvi',
  stampaNomeCompleto: function () {
    //this è l'oggetto studente
    console.log('Oggetto studente = this: ' +  (this === studente)); //vero!
    console.log('Ciao da ' + this.nome + ' ' + this.cognome);
  },
};
studente.stampaNomeCompleto();

//RICORDA: 'this' rappresenta sempre l'oggetto genitore più vicino
//e non l'oggetto principale da noi creato che lo contiene
var studente2 = {
  nome: 'Riccardo',
  cognome: 'Silvi',
  insegnanti: {
    web: ['Fabio', 'Michele'],
    mostraInsegnantiWeb: function () {
      //'this' rappresenta il genitore vicino 'insegnanti'
      console.log('Oggetto studente2 = this: ' +  (this === studente2)); //falso!
      console.log(this.web);
    },
  },
};
studente2.insegnanti.mostraInsegnantiWeb();

//COME POTREMMO ACCEDERE A STUDENTE2 CON LA KEYWORD 'THIS'???
//Ci viene in aiuto la terza regola

/********************************************/

//REGOLA 3: ESPLICITA(Explicit binding) - CALL, APPLY, BIND
/*
 Quando 'this' viene impiegata all'interno di un oggetto
 da noi dichiarato rappresenta l'oggetto genitore più vicino.
 Per superare questo limite possiamo utilizzare uno dei 3 metodi
 CALL, APPLY, BIND per assegnare 'ESPLICITAMENTE' un valore a 'this'.
 Il loro uso è esclusivamente legato alle funzioni!!!
 Cioè che cambia tra i 3 metodi sono due cose:
 -> Parametri per il metodo
 -> Tempo di invocazione(immediato o per successivo uso)

CALL
-> PARAMETRI: (valoreDaAssegnareAThis, altri, parametri, vari)
-> TEMPO DI INVOCAZIONE: Immediato

APPLY
-> PARAMETRI: (valoreDaAssegnareAThis, [altri, parametri, vari])
-> TEMPO DI INVOCAZIONE: Immediato

BIND
-> PARAMETRI: (valoreDaAssegnareAThis, [altri, parametri, vari])
-> TEMPO DI INVOCAZIONE: per successivo uso, ritorna la definizione della funzione
*/


//ESEMPIO DI CALL
//Riproponendo un oggetto studente identico al precedente
//usiamo call per assegnare a 'this' il valore di studente3
var studente3 = {
  nome: 'Riccardo',
  cognome: 'Silvi',
  insegnanti: {
    web: ['Fabio', 'Michele'],
    mostraInsegnantiWeb: function () {
      //'this' rappresenta il genitore vicino 'insegnanti'
      console.log('Oggetto studente3 = this: ' +  (this === studente3)); //falso!
      console.log(this.web);
    },
    ricordamiComeMiChiamo: function () {
      //'this' grazie a call potrà rappresentare 'studente'
      console.log('Oggetto studente3 se hai usato call = this: ' +  (this === studente3)); //falso!
      console.log(this.nome);
    },
  },
};
studente3.insegnanti.mostraInsegnantiWeb();
studente3.insegnanti.ricordamiComeMiChiamo.call(studente3);

//Possiamo usare Call per utilizzare funzioni su oggetti con una struttura
//analoga grazie alla possibilità di cambiare il valore di 'this'

var studente4 = {
  nome: 'Mario',
  cognome: 'Rossi',
  insegnanti: {
    web: ['Giulio', 'Simone'],
  },
};

//pur non esistendo in studente4 i metodi sottostanti, passiamo il valore
//di studente4 ai metodi di studente3 con esecuzione immediata
studente3.insegnanti.mostraInsegnantiWeb.call(studente4.insegnanti);
studente3.insegnanti.ricordamiComeMiChiamo.call(studente4);

//ESEMPIO DI APPLY
//APPLY accetta 2 parametri
//-> il valore da assegnare a this
//-> un array di valori come secondo parametro
//La comodità di apply risiede nel fatto che presenti il nostro array
//sotto forma di classici argomenti separati da virgole alla funzione
//a cui viene abbinata

var numeri = [5, 2, 8, 3, 7, 3, 7];

//Math.max non accetta un array di valori
console.log(Math.max(numeri)); //Restituisce NaN (notANumber)
console.log(Math.max(5, 2, 8, 3, 7, 3, 7)); //Questo viene accettato
//tramite apply l'array viene passato come sopra
console.log(Math.max.apply(this, numeri)); //è come aver scritto gli argomenti tra virgole!

//ESEMPIO DI BIND
//Bind si distingue da call e apply perchè restituisce la
//definizione della funzione per utilizzo successivo
//permettendo di contestualizzare a piacere 'this' indipendentemente
//dal momento e contesto di utilizzo

//BIND presenta
//-> il valore da assegnare a this
//-> INFINITI valori separati da virgole come successivi parametri

//Bind ha due applicazioni:
//-> applicazione Parziale
//-> codice asincrono

//ESEMPIO DI BIND(Partial Application)
//E' possibile 'precaricare' dei parametri nella definizione della funzione
//per poi completarla al momento della chiamata vera e propria

var studente5 = {
  nome: 'Enrico',
  cognome: 'Cacace',
  insegnanti: {
    web: ['Fabio', 'Michele'],
    mediaVoti: function (v1, v2, v3, v4) {
       return 'la media Voti di ' + this.nome + ' è: ' + ((v1 + v2 + v3 + v4) / 4);
    },
  },
};

//Con bind passiamo alla var una versione di funzione mediaVoti con
//-----> studente5 come valore di 'this'
//-----> 2 parametri di partenza
var mediaStudente5 = studente5.insegnanti.mediaVoti.bind(studente5, 6, 8);
//Ogni volta che chiamiamo mediaStudente dovremo immettere solo i restanti 2
//parametri e this sarà riferito all'oggetto studente5!
console.log(mediaStudente5(10, 3));

//ESEMPIO DI BIND(Codice Asincrono)

//Il problema con il codice asincrono è che this nel momento in cui
//sarà chiamato il codice dalla funzione non sarà più legato all'oggetto
//di cui fa parte

var studenteAsincrono = {
  nomeCompleto: 'Riccardo Silvi',
  chiSono: function () {
    //con il codice così articolato passando
    //3 secondi this non sarà più studenteAsincrono
    setTimeout(function () {
      console.log('Ciao, sono: ' + this.nomeCompleto);
    }, 3000);
  },
};

//Usiamo bind a seguito del setTimeout per evitare questa
//perdita di contesto

var studenteAsincrono2 = {
  nomeCompleto: 'Riccardo Silvi',
  chiSono: function () {
    //Aggiungendo bind alla dichiarazione della funzione
    //leghiamo il valore di 'this' al suo oggetto
    //genitore permettendo un richiamo successivo
    //con 'this' 'regolarmente contestualizzato'
    setTimeout(function () {
      console.log('Ciao, sono: ' + this.nomeCompleto);
    }.bind(this), 3000);
  },
};

//ESERCIZI CALL APPLY BIND

console.log('esercizi');

/*
Write a function called arrayFrom which converts an array-like-object into an array.

Examples:
    var divs = document.getElementsByTagName('divs');
    divs.reduce // undefined
    var converted = arrayFrom(divs);
    converted.reduce // function(){}....
*/

function arrayFrom(arrayLikeObject) {
  var converted = [];
  for (var key in arrayLikeObject) {
    converted.push(arrayLikeObject[key]);
  }

  return converted;
}

/*
NOTA CORREZIONE
function arrayFrom(arrayLikeObject) {
//è possibile  produrre un array così in una singola riga
//passando a slice un oggetto strutturato come un array
return [].slice.call(arrayLikeObject);
}
*/

var divs = document.getElementsByTagName('divs');
console.log(divs.reduce);// undefined
var converted = arrayFrom(divs);
console.log(converted.reduce); // function(){}....

/*
// Write a function called sumEvenArguments which takes all of the arguments passed to a function and returns the sum of the even ones.

Examples:
    sumEvenArguments(1,2,3,4) // 6
    sumEvenArguments(1,2,6) // 8
    sumEvenArguments(1,2) // 2
*/

function sumEvenArguments() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] % 2 === 0) {
      sum += arguments[i];
    }
  }
  return sum;
}

/*
NOTA CORREZIONE
function sumEvenArguments() {
  //tutti gli arguments vengono messi in un array
  var numbers = [].slice.call(arguments)
  //restituiamo grazie a reduce il risultato dell'accumulatore
  //inteso come somma dei valori solo se positivi
  return numbers.reduce(function(accumulator, number) {
    if (number % 2 === 0) {
      accumulator += number;
    }
    return accumulator;
  },0);
}


*/
console.log(sumEvenArguments(1,2,3,4)); // 6
console.log(sumEvenArguments(1,2,6)); // 8
console.log(sumEvenArguments(1,2)); // 2
/*
Write a function called invokeMax which accepts a function and a maximum amount. invokeMax should return a function that when called increments a counter. If the counter is greater than the maximum amount, the inner function should return "Maxed Out"

Examples:

    function add(a,b){
        return a+b
    }

    var addOnlyThreeTimes = invokeMax(add,3);
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(2,2) // 4
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(1,2) // "Maxed Out!"

*/

function invokeMax(fn, num) {
  var counter = 0;
  return function () {
      counter++;
      if (counter > num) {
        return 'Maxed Out!';
      }

      //apply permette di passare come argomento
      //di fn gli arguments passati alla
      //anonymous function (closure in questo caso)
      return fn.apply(this, arguments);
    };
}

function add(a, b){
    return a + b;
}

var addOnlyThreeTimes = invokeMax(add, 3);
console.log(addOnlyThreeTimes(1, 2)); // 3
console.log(addOnlyThreeTimes(2, 2)); // 4
console.log(addOnlyThreeTimes(1, 2)); // 3
console.log(addOnlyThreeTimes(1, 2)); // "Maxed Out!"

/*
Write a function called once which accepts two parameters, a function and a value for the keyword 'this'. Once should return a new function that can only be invoked once, with the value of the keyword this in the function set to be the second parameter.

Examples:

    function add(a,b){
        return a+b
    }

    var addOnce = once(add, this);
    addOnce(2,2) // 4
    addOnce(2,2) // undefined
    addOnce(2,2) // undefined

    function doMath(a,b,c){
        return this.firstName + " adds " + (a+b+c)
    }

    var instructor = {firstName: "Elie"}
    var doMathOnce = once(doMath, instructor);
    doMathOnce(1,2,3) // "Elie adds 6"
    doMathOnce(1,2,3) // undefined


*/

console.log('once');

function once(fn, thisArg) {
  //Era possibile anche utilizzare un booleano...
  var counter = 0;
  return function () {
    if (counter >= 1) {
      return undefined;
    }

    counter++;
    return fn.apply(thisArg, arguments);
  };
}

function add(a, b) {
  return a + b;
}

var addOnce = once(add, this);
console.log(addOnce(2,2));  // 4
console.log(addOnce(2,2));   // undefined
console.log(addOnce(2,2));   // undefined

function doMath(a,b,c){
  return this.firstName + " adds " + (a+b+c)
}

var instructor = { firstName: "Elie" }
var doMathOnce = once(doMath, instructor);
console.log(doMathOnce(1, 2, 3)); // "Elie adds 6"
console.log(doMathOnce(1, 2, 3)); // undefined
// BONUSES!

/*
Write a function called bind which accepts a function and a value for the keyword this. Bind should return a new function that when invoked, will invoke the function passed to bind with the correct value of the keyword this. HINT - if you pass more than two parameters to bind, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!

Examples:

    function firstNameFavoriteColor(favoriteColor){
        return this.firstName + "'s favorite color is " + favoriteColor
    }

    var person = {
        firstName: 'Elie'
    }

    var bindFn = bind(firstNameFavoriteColor, person);
    bindFn('green') // "Elie's favorite color is green"

    var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
    bindFn2('green') // "Elie's favorite color is blue"

    function addFourNumbers(a,b,c,d){
        return a+b+c+d;
    }

    bind(addFourNumbers,this,1)(2,3,4) // 10
    bind(addFourNumbers,this,1,2)(3,4) // 10
    bind(addFourNumbers,this,1,2,3)(4) // 10
    bind(addFourNumbers,this,1,2,3,4)() // 10
    bind(addFourNumbers,this)(1,2,3,4) // 10
    bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // 10

*/

console.log('bind');

function bind(fn, thisArg) {

  var outerArgs = [].slice.call(arguments, 2);

  return function () {
    var closureArgs = [].slice.call(arguments);
    var completeArgs = outerArgs.concat(closureArgs);
    return fn.apply(thisArg, completeArgs);
  }
}

function firstNameFavoriteColor(favoriteColor){
    return this.firstName + "'s favorite color is " + favoriteColor;
}

var person = {
    firstName: 'Elie',
}

var bindFn = bind(firstNameFavoriteColor, person);
console.log(bindFn);
console.log(bindFn('green')); // "Elie's favorite color is green"

var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
console.log(bindFn2('green')); // "Elie's favorite color is blue"

function addFourNumbers(a,b,c,d){
    return a+b+c+d;
}

bind(addFourNumbers,this,1)(2,3,4) // 10
bind(addFourNumbers,this,1,2)(3,4) // 10
bind(addFourNumbers,this,1,2,3)(4) // 10
bind(addFourNumbers,this,1,2,3,4)() // 10
bind(addFourNumbers,this)(1,2,3,4) // 10
bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // 10


/*
Write a function called flip which accepts a function and a value for the keyword this. Flip should return a new function that when invoked, will invoke the function passed to flip with the correct value of the keyword this and all of the arguments passed to the function REVERSED. HINT - if you pass more than two parameters to flip, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!

Flip should return a new function that when invoked takes the correct number of required arguments to that function which are then reversed. HINT - you will need to use the .length property on functions to figure out the correct amount of arguments. For example:

flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10)




Examples:

    function personSubtract(a,b,c){
        return this.firstName + " subtracts " + (a-b-c);
    }

    var person = {
        firstName: 'Elie'
    }

    var flipFn = flip(personSubtract, person);
    flipFn(3,2,1) // "Elie subtracts -4"

    var flipFn2 = flip(personSubtract, person, 5,6);
    flipFn2(7,8). // "Elie subtracts -4"

    function subtractFourNumbers(a,b,c,d){
        return a-b-c-d;
    }

    flip(subtractFourNumbers,this,1)(2,3,4) // -2
    flip(subtractFourNumbers,this,1,2)(3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4) // -2
    flip(subtractFourNumbers,this,1,2,3,4)() // -2
    flip(subtractFourNumbers,this)(1,2,3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4,5,6,7) // -2
    flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // -2
    flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) // -22

*/

console.log('flip**********************');
function flip(fn, thisArg){
  //otteniamo gli argomenti eccetto fn e thisArg
  var outerArgs = [].slice.call(arguments, 2);
  var neededParams = fn.length;
  console.log('Passed function accepts ' + neededParams + ' parameters');
    return function(){
      var closureArgs = [].slice.call(arguments);
      var allArgs = outerArgs.concat(closureArgs);
      var allReversed = allArgs.reverse();
      var justNeeded = allArgs.slice((allReversed.length - neededParams));
      console.log('all  args reversed ' + allReversed);
      console.log('justNeeded ' + justNeeded);
      /*
      NOTA CORREZIONE:
      la proprietà .length su una funzione ci da accesso al numero di parametri
      attesi dalla funzione stessa. Così rendiamo dinamico il numero di
      parametri finale da passare al momento del return
      var innerArgs = [].slice.call(arguments);
      var allArgs = outerArgs.concat(innerArgs).slice(0, fn.length);
      return fn.apply(thisArg, allArgs.reverse());
      */

      return fn.apply(thisArg, justNeeded);
    }
}

function personSubtract(a,b,c){
    return this.firstName + " subtracts " + (a-b-c);
}

var person = {
    firstName: 'Elie'
}

var flipFn = flip(personSubtract, person);
console.log(flipFn(3,2,1)); // "Elie subtracts -4"

var flipFn2 = flip(personSubtract, person, 5,6);
console.log(flipFn2(7,8)); // "Elie subtracts -4"

function subtractFourNumbers(a,b,c,d) {
    return a-b-c-d;
}

console.log(flip(subtractFourNumbers,this,1)(2,3,4));  // -2
console.log(flip(subtractFourNumbers,this,1,2)(3,4)); // -2
console.log(flip(subtractFourNumbers,this,1,2,3)(4)); // -2
console.log(flip(subtractFourNumbers,this,1,2,3,4)()); // -2
console.log(flip(subtractFourNumbers,this)(1,2,3,4)); // -2
console.log(flip(subtractFourNumbers,this,1,2,3)(4,5,6,7));  // -2
console.log(flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10));  // -2
console.log(flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10)); // -22
