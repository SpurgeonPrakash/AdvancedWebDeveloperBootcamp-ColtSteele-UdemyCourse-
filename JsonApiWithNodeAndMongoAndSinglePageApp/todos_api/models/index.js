//Creiamo la cartella models dove conserviamo
//i models

//nel file index.js della directory principale
//'todos api' faremo riferimento a questo file
//con 'require'permettendo la connessione
//a questo file che a sua volta tramite il
//require di 'mongoose' si connette a mongodb

var mongoose = require('mongoose');

//Attiviamo debug mode per avere un
//feedback dal db ad ogni operazione
mongoose.set('debug', true);

//lancia l'effettiva connessione al db
//mongodb usa la porta 27017
mongoose.connect('mongodb://localhost:27017/todo-api', { useNewUrlParser: true });

//permette l'utilizzo delle promises
//anzichè scrivere delle classiche
//callback functions
mongoose.Promise = Promise;

//con module.exports.Todo mettiamo a disposizione
//di chi importa(require) questo file il model Todo
//prodotto e restituito(sempre con module.exports)
//->'.todo' è il riferimento al file todo.js in questa
//stessa directory (non è necessario scrivere l'estensione .js)
//IN SINTESI:
//QUANDO INDEX.JS IMPORTERA'(require) QUESTO FILE
//AVRA' ACCESSO AL MODEL 'Todo'
module.exports.Todo = require('./todo');
