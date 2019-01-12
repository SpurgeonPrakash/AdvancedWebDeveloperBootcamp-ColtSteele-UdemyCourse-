//OOP - Intro and constructor functions

/*
DEFINIZIONE:
Un oggetto in Javascript può essere prodotto tramite:
-> una funzione costruttrice
-> la keyword new
*/

//Esempio di Funzione costruttrice
//Per convenzione il nome della funzione ha la
//prima lettera maiuscola

function Dog(name, age) {
  this.name = name;
  this.age = age;
  this.bark = function () {
    console.log(this.name + 'just barked');
  };
}

//Produzione di un oggetto DOG
var newDog = new Dog('Fido', 3);

/*
Il Ruolo della Keyword New

La funzione costruttrice manca di diversi elementi.
Queste 'falle' sono in realtà coperte dalla keyword 'new'
-> creazione di un nuovo oggetto vuoto
-> valorizzare la keyword this nella funzione, a this
    viene assegnato il nuovo oggetto
-> il return della funzione è this
-> aggiunge la proprietà '_proto_' (dunderProto) che crea
  una connessione tra la funzione costruttrice e l'oggetto creato

*/
