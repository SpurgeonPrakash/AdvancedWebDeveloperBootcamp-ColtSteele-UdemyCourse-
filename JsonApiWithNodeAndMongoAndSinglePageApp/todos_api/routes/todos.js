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

/************ROUTES************/

//DEFINIAMO LE ROUTES
//nel file principale index.js con la riga di codice seguente
// app.use('api/todos', todoRoutes);
//abbiamo definito il prefisso delle routes

//GET: '/api/todos/'
router.get('/', function (req, res) {
  res.send('Route principale gestita da express.Router in todos.js');
});

//Esportiamo tutte le rotte definite
//nell'istanza di express.Router ossia la
//var router rendendole leggibili al file
//principale dell'app (index.js)
module.exports = router;
