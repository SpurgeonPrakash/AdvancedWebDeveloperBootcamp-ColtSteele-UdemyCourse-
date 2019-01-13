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

//richiamiamo il file todo.js nella
//cartella helpers per avere accesso
//alle funzioni da passare alle routes
var helpers = require('../helpers/todos');

/************ROUTES************/

//DEFINIAMO LE ROUTES
//nel file principale index.js con la riga di codice seguente
// app.use('api/todos', todoRoutes);
//abbiamo definito il prefisso delle routes

//GET + POST: '/api/todos/'
router.route('/')
.get(helpers.getTodos)
.post(helpers.createTodo);

//NOTA. Il precedente commit conteneva codice errato
//in quanto è necessaria solo ad esempio
//router.get('/:todoId', funzione)
//e non concatenare una promise che contiene
//le azioni del db

//GET: '/api/todos/:todoId' (recuperare un singolo todo)
//PUT: '/api/todos/:todoId' (recuperare un singolo todo
//e modificarlo)
//DELETE: '/api/todos/:todoId'
//(recuperare un singolo todo e CANCELLARLO)
router.route('/:todoId')
.get(helpers.getTodo)
.put(helpers.updateTodo)
.delete(helpers.deleteTodo);

//Esportiamo tutte le rotte definite
//nell'istanza di express.Router ossia la
//var router rendendole leggibili al file
//principale dell'app (index.js)
module.exports = router;
