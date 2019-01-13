//File che contiene le routes relative al model Todo

//importazione con require dei packets necessari
var express = require('express');

//express Router ci permette di:
//-> delocalizzare la creazione delle route
// per poi importarle con require nel file
// index.js principale dell'app
//-> definirle una per una
//in diversi blocchi di codice
var router = express.Router();

//per avere accesso al model e ai dati del
//database mongoDB importiamo index.js
//contenuto nella folder models
var db = require('../models');

/************ROUTES************/

//DEFINIAMO LE ROUTES
//nel file principale index.js con la riga di codice seguente
// app.use('api/todos', todoRoutes);
//abbiamo definito il prefisso delle routes

//GET: '/api/todos/'
router.get('/', function (req, res) {

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

});

//POST: '/api/todos/'
router.post('/', function (req, res) {
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
});

//GET: '/api/todos/:todoId' (recuperare un singolo todo)
router.get('/:todoId')
.then(function (req, res) {
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
})
.catch(function (error) {
  console.log(error);
});

//PUT: '/api/todos/:todoId' (recuperare un singolo todo
//e modificarlo)
router.put('/:todoId')
.then(function (req, res) {
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
})
.catch(function (error) {
  console.log(error);
});

//DELETE: '/api/todos/:todoId'
//(recuperare un singolo todo e CANCELLARLO)
router.delete('/:todoId')
.then(function (req, res) {
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
})
.catch(function (error) {
  console.log(error);
});

//Esportiamo tutte le rotte definite
//nell'istanza di express.Router ossia la
//var router rendendole leggibili al file
//principale dell'app (index.js)
module.exports = router;
