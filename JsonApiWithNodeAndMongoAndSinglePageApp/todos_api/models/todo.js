//il file che conserva la dichiarazione
//del model 'todo'

//Ci 'connettiamo' al pacchetto 'mongoose'
var mongoose = require('mongoose');

// creiamo lo Schema
//un oggetto Schema di mongoose
//-> le proprietà obbligatore devono contenere la
//voce 'required' accompagnata dal messaggio
//da restituire all'utente che cerca di non
//inserirlo
//-> le proprietà da compilare automaticamente
//hanno la voce 'default' seguita dal valore
//da assegnare automaticamente(se non specificate
//diversamente dall'utente al momento della
//loro creazione)

var todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Il nome deve essere presente',
  },
  completed: {
    type: Boolean,
    default: false,
  }, createdDate: {
    type: Date,
    default: Date.now,
  },
});

//Definiamo il model,
//-> la sua var inizia sempre
//con una lettera maiuscola!
//->primoParametro : nomeDelModel
//->secondoParametro : lo Schema creato
var Todo = mongoose.model('Todo', todoSchema);

//Con module.exports mettiamo a disposizione
//di chi importa(require) questo file
//il model appena creato
module.exports = Todo;
