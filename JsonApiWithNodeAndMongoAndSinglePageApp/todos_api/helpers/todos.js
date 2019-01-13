//Per accedere al database e i suoi model
//dobbiamo avere accesso al file index.js che
//lo gestisce che si trova in models
//andiamo una cartella indietro con ../ e
//poi entriamo in models
var db = require('../models');

exports.getTodos = function (req, res) {

  //sfruttando la var che ci connette al database(var db)
  //usiamo la funzione find relativa al Todo model
  //per farci restituire tutte le istanze del model stesso
  //contenute nel database
  //SINTASSI PROMISES
  //-> .then (caso successo otteniamo i dati)
  //-> .catch (caso errore abbiamo l'errore dal db)
  db.Todo.find().then(function (todos) {
      res.json(todos);
    }).catch(function (error) {
      res.send(error);
      console.log(error);
    });
};

exports.createTodo = function (req, res) {
  //grazie al package 'body-parser'
  //abbiamo accesso ai dati da 'postare'
  //(al contenuto del body della postRequest)
  //sotto forma di oggetto JS.
  //possiamo così trattarli ed inviarli al db

  //sfruttando la var che ci connette al database(var db)
  //usiamo la funzione create relativa al Todo model
  //per inserire nel database il dato
  //nel primo parametro (il body della
  //request)
  //NOTA: Eventuali dati non previsti nello schema
  //ma non inseriti nella request non causano errore
  //ma vengono semplicemente ignorati
  //SINTASSI PROMISES
  //-> .then (caso successo salviamo i dati)
  //-> .catch (caso errore abbiamo l'errore dal db)
  //NOTA:
  //Mongodb non mi accetta a questo stadio
  //una POST request da postman quindi popolo
  //il db con un oggetto a mano anzichè req.body
  db.Todo.create(req.body)
  .then(function (newTodo) {
    //dato salvato! feedback all'utente
    res.status(201).json(newTodo);
  }).catch(function (error) {
    console.log(error);
    res.send(error);
  });
};

exports.getTodo = function (req, res) {
  //leggiamo il contenuto dell'url /api/todos/:todoId
  //nella parte :todoId -> req.params.todoId
  //e chiediamo al db l'istanza di todo corrispondente
  //SINTASSI PROMISES
  //-> .then (caso successo restituiamo come json i dati)
  //-> .catch (caso errore abbiamo l'errore dal db)
  db.Todo.findById(req.params.todoId)
  .then(function (foundTodo) {
    console.log(foundTodo);
    res.json(foundTodo);
  })
  .catch(function (dbError) {
    console.log(dbError);
  });
};

exports.updateTodo = function (req, res) {
  //leggiamo il contenuto dell'url /api/todos/:todoId
  //nella parte :todoId -> req.params.todoId
  //e chiediamo al db l'istanza di todo corrispondente
  //-> primo parametro: un oggetto contenente la chiave _id
  //e il valore per la ricerca(id dell'istanza cercata)
  //-> secondo parametro: il dato da inviare per aggiornare
  //l'eventuale istanza trovata
  //-> terzo parametro: opzioni(new: true permette di ottenere il
  //todo aggiornato anzichè il vecchio cioè new:false (default))
  var requestedTodoId = req.params.todoId;
  db.Todo.findOneAndUpdate({ _id: requestedTodoId }, req.body, { new: true })

  //SINTASSI PROMISES
  //-> .then (caso successo restituiamo come json il todo Aggiornato)
  //-> .catch (caso errore abbiamo l'errore dal db)
  .then(function (updatedTodo) {
    console.log(updatedTodo);
    res.json(updatedTodo);
  })
  .catch(function (dbError) {
    console.log(dbError);
  });
};

exports.deleteTodo = function (req, res) {
  //leggiamo il contenuto dell'url /api/todos/:todoId
  //nella parte :todoId -> req.params.todoId
  //e chiediamo al db l'istanza di todo corrispondente
  //-> primo parametro: un oggetto contenente la chiave _id
  //e il valore per la ricerca(id dell'istanza cercata)
  var requestedTodoId = req.params.todoId;
  db.Todo.remove({ _id: requestedTodoId })

  //SINTASSI PROMISES
  //-> .then (caso successo restituiamo feedback avvenuta cancellazione)
  //-> .catch (caso errore abbiamo l'errore dal db)
  .then(function (updatedTodo) {
    console.log('deletion ok');
    res.json('deletion ok');
  })
  .catch(function (dbError) {
    console.log(dbError);
  });
};

//aggiorniamo module.exports
//sovrascrivendolo con
//tutte le nuove proprietà
//contenenti le nostre funzioni
module.exports = exports;
