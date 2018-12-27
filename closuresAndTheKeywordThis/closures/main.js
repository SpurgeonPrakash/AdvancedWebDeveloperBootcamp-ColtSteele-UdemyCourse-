//CLOSURES

/*
DEFINIZIONE:
Una closure è una funzione ritornata da una funzione che
utilizza una variabile della funzione che la contiene.
Una funzione ritornata da una funzione madre che non fa uso di
una sua variabile/parametro è solo una funzione in una funzione.
*/

//Esempio : FUNZIONE IN FUNZIONE

function funzioneMadre() {
  var dallaMadre = 'madre';
  return function funcInFunc() {
    return 'sono una funzione in una funzione';
  };
}

//Esempio : CLOSURE
//funzione madre ritorna closureInterna che fa uso della var primaParte
function funzioneMadre() {
  var primaParte = 'Questa è la funzione madre ';
  return function closureInterna() {
    console.log('La closure si ricorda della var della funzioneMadre: ' + primaParte);
    return primaParte + ' e questa è la closure';
  };
}

//Richiamare la sola funzione madre restituisce la definizione della closure
var closure = funzioneMadre();
console.log(closure);

//Richiamando la closure otteniamo il risultato di essa e notiamo
//come essa si "ricordi" della var di funzioneMadre
console.log(closure());

//Esempio : CLOSURE CON PARAMETRO
/*
Una closure potrà accettare un parametro dall'utente quando
richiamata e fare uso delle var/parametri della funzione madre
*/

function creaClosureCheLegga(parametroMadre) {
  return function closureInterna(parametroClosure) {
    return parametroMadre + parametroClosure;
  };
}

var closure = creaClosureCheLegga(1);
console.log(closure);
console.log(closure(3));

/* UTILIZZO PRATICO DELLE CLOSURES*/

//PRIVATE VARIABLES

//una var passata ad una closure (contenuta in una var)
//resterà dipendente da essa,
//la var contatore non è richiamabile dallo scope globale!
//per questo la si definisce privata

function contatore() {
  var contatore = 0;
  return function incrementaDi(num) {
    console.log('contatore: ' + contatore + ' + num: ' + num);
    contatore += num;
    return contatore;
  };
}

var closure1 = contatore();
var closure2 = contatore();

//closure 1 e 2 quando richiamate faranno riferimento
//ciascuna al proprio contatore in modo indipendente
console.log('closure 1');
console.log(closure1(2));
console.log(closure1(3));
console.log('closure 2');
console.log(closure2(4));
console.log(closure2(9));

//VARIABILI PRIVATE IN UN OGGETTO!

/*
quando una funzione produce un oggetto, è possibile passare
all'oggetto ritornato delle sue variabili interne.
Così facendo è possibile dare dei valori immutabili a disposizione
di eventuali funzioni contenute nelle proprietà dell'oggetto stesso
*/

function creaClasse() {//funzione madre costruisce oggetto

  var istruttori = ['Michele', 'Fabio'];

  //l'oggetto ritornato ha accesso alle var della func madre
  //ma non potrà modificare la var istruttori grazie al metodo
  //slice che ritorna una copia dell'array prevenendo azioni
  //di modifica dell'array originale se ritornato direttamente
  return {
    elencaIstruttori: function () {
      return istruttori.slice();
    },

    aggiungiIstruttore: function (nuovoIstruttore) {
      istruttori.push(nuovoIstruttore);
      return istruttori.slice();
    },
  };

}

var nuovaClasse = creaClasse();
console.log(nuovaClasse.elencaIstruttori());

nuovaClasse.aggiungiIstruttore('Riccardo');

console.log(nuovaClasse.elencaIstruttori());

//grazie a slice non è possibile modificare istruttori
//tramite concatenazioni (e non quindi tramite i metodi
//dell'oggetto) ma solo maneggiarne una copia
// rendendo immutabile la var originale
console.log(nuovaClasse.elencaIstruttori().pop());
console.log(nuovaClasse.elencaIstruttori());//pop non ha avuto effetti

//ESERCIZI

console.log('ESERCIZI CLOSURES');
/*
Write a function called specialMultiply which accepts two parameters. If the function is passed both parameters, it should return the product of the two. If the function is only passed one parameter - it should return a function which can later be passed another parameter to return the product. You will have to use closure and arguments to solve this.

Examples:

    specialMultiply(3,4); // 12
    specialMultiply(3)(4); // 12
    specialMultiply(3); // function(){}....
*/

function specialMultiply(a, b) {
  if (a && b) {
    console.log('both parameters');
    return a * b;
  } else {
    console.log('just one');
    return function (c) {
      return a * c;
    };
  }
}

/*
NOTA CORREZIONE
per controllare se c'è solo un argomento possiamo scrivere come condizione
arguments.length ==  1

function specialMultiply(a, b) {
  if (arguments.length ==  1) {
    return function (c) {
      return a * c;
    };
  }
  return a * b;
}
*/
console.log(specialMultiply(3, 2));;
console.log(specialMultiply(3)(4));
/*
Write a function called guessingGame which takes in one parameter amount. The function should return another function that takes in a parameter called guess. In the outer function, you should create a variable called answer which is the result of a random number between 0 and 10 as well as a variable called guesses which should be set to 0.

In the inner function, if the guess passed in is the same as the random number (defined in the outer function) - you should return the string "You got it!". If the guess is too high return "Your guess is too high!" and if it is too low, return "Your guess is too low!". You should stop the user from guessing if the amount of guesses they have made is greater than the initial amount passed to the outer function.

You will have to make use of closure to solve this problem.

Examples (yours might not be like this, since the answer is random every time):

    var game = guessingGame(5)
    game(1) // "You're too low!"
    game(8) // "You're too high!"
    game(5) // "You're too low!"
    game(7) // "You got it!"
    game(1) // "You are all done playing!"

    var game2 = guessingGame(3)
    game2(5) // "You're too low!"
    game2(3) // "You're too low!"
    game2(1) // "No more guesses the answer was 0"
    game2(1) // "You are all done playing!"
*/

function guessingGame(amount) {

  var answer = Math.ceil(Math.random() * 10);

  var guesses = 0;

  return function game(guess) {
    guesses++;

    switch (true) {

      // guesses < amount
      case guess < answer && guesses < amount:
        return 'You"re too low!';
      case guess === answer && guesses < amount:
        return 'You got it!';
      case guess > answer && guesses < amount:
        return 'You"re too high!';

      //guesses == amount
      case guess === answer && guesses == amount:
        return 'You got it!';
      case guess != answer && guesses == amount:
        return 'No more guesses the answer was ' + answer;

      // guesses > amount
      default:
        return 'You are all done playing!';
    }
  };
}

var game = guessingGame(2);
game(1) // "You're too low!"
game(8) // "You're too high!"
game(5) // "You're too low!"
game(7) // "You got it!"
game(1) // "You are all done playing!"

var game2 = guessingGame(2)
game2(5) // "You're too low!"
game2(3) // "You're too low!"
game2(1) // "No more guesses the answer was 0"
game2(1) // "You are all done playing!"
