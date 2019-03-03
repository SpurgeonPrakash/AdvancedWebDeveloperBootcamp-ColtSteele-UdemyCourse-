
// link locale per test: http://127.0.0.1:3000/
//comando per lanciare l'app con nodemon in locale -> npx nodemon index.js

//Dopo aver installato express lo chiamiamo
var express = require('express');

//eseguiamo la mainFunction di express
// da cui potremo creare le routes ed
// altre operazione di express
var app = express();

//sarà eseguito sulla porta 3000
var port = process.env.PORT || 3000;

//Importiamo il package 'bodyParser' che rende leggibile
//come classico oggetto JS il body delle request
//NECESSARIO PER POST, PUT, DELETE!!!!
var bodyParser = require('body-parser');

//richiediamo le rotte relative al model Todo
//prodotte dal file todos.js nella folder routes
//NON è necessario specificare l'estensione .js
var todoRoutes = require('./routes/todos');

//Con dirname accediamo dinamicamente alla
//directory dell'app, che si eseguirà correttamente
//indipendentemente dalla directory da cui verrà lanciata
var appDirectory = __dirname;

//dichiariamo l'utilizzo di 'body-parser' nell'app
//che rende leggibile come classico oggetto JS
//il body delle request
//NECESSARIO PER POST, PUT, DELETE!!!!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Definiamo le cartelle statiche cioè quelle
//cartelle che contengono file per il cui
//raggiungimento non è necessario fornire
//il percorso ma solo il nome
//IMPORTANTE concatenare il percorso della directory
//a __dirname che è la var che contiene dinamicamente
//il percorso alla cartella dell'app
app.use(express.static(appDirectory + '/public'));
app.use(express.static(appDirectory + '/views'));

/************ROUTES************/

//GET
app.get('/', function (req, res) {
  //Per inviare una pagina all'avvio del server
  //possiamo scrivere solo il nome del file
  //avendo dichiarato staticamente la sua cartella madre
  res.sendFile('index.html');
});

//dichiariamol'uso delle routes importate
//nella var todoRoutes
//->primo parametro: anteponiamo un prefisso alle routes
//->secondo parametro: la var contenente le routes
app.use('/api/todos', todoRoutes);

//Fa partire il server sulla var port
app.listen(port, function () {
  console.log('todolist_app è attiva su porta ' + port);
});
