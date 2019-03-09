
//IMPORTING MODULES
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

//DEFAULT PORT
const PORT = 8081;

//LINKING TO EXPRESS
app.use(cors());
app.use(bodyParser.json());

//ERROR HANDLING
app.use(function(req, res, next){

  let err = new Error('Not found');
  err.status = 404;
  next(err);

});

//STARTING THE SERVER
app.listen(PORT, function(){
  
  console.log(`Server is starting on port ${PORT}`);

});
