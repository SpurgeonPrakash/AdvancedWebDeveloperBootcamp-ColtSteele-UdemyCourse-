
// link locale per test: http://127.0.0.1:3000/

//Dopo aver installato express lo chiamiamo
var express = require('express');

//eseguiamo la mainFunction di express
// da cui potremo creare le routes ed
// altre operazione di express
var app = express();

//sarà eseguito sulla porta 3000
var port = 3000;

//richiediamo le rotte relative al model Todo
//prodotte dal file todos.js nella folder routes
//NON è necessario specificare l'estensione .js
var todoRoutes = require('./routes/todos');

//Importiamo il package 'bodyParser' che rende leggibile
//come classico oggetto JS il body delle request
//NECESSARIO PER POST, PUT, DELETE!!!!
var bodyParser = require('body-parser');

/************ROUTES************/

//GET
app.get('/', function (req, res) {

  res.send('Questa è la rotta principale dell"app');

});

//dichiariamol'uso delle routes importate
//nella var todoRoutes
//->primo parametro: anteponiamo un prefisso alle routes
//->secondo parametro: la var contenente le routes
app.use('/api/todos', todoRoutes);

//dichiariamo l'utilizzo di 'body-parser' nell'app
//che rende leggibile come classico oggetto JS
//il body delle request
//NECESSARIO PER POST, PUT, DELETE!!!!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Fa partire il server sulla porta 3000
app.listen(port, function () {
  console.log('todolist_app è attiva su porta 3000');
});
