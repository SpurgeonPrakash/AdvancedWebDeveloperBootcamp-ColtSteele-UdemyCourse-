
// link locale per test: http://127.0.0.1:3000/

//Dopo aver installato express lo chiamiamo
var express = require('express');

//eseguiamo la mainFunction di express
// da cui potremo creare le routes ed
// altre operazione di express
var app = express();
//sarà eseguito sulla porta 3000
var port = 3000;

//ROUTES

//GET
app.get('/', function (req, res) {
  //res.send invia l'output,
  //se mandiamo una stringa inviamo dell'html
  res.send('test express riuscito');
  //se mandiamo un oggetto Javascript inviamo un JSON
  res.json({ messaggio: 'test invio JSON'});

  //NOTA:
  //res.send() utilizza res.json({..}) al suo interno.
  // utilizzando res.json() si è più espliciti ma non cambia nulla

});

//Fa partire il server sulla porta 3000
app.listen(port, function () {
  console.log('todolist_app è attiva su porta 3000');
});
