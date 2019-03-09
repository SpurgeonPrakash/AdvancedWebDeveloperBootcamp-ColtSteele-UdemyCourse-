//mongoose -> ODM
const mongoose =require('mongoose');
//show mongo queries in the terminal
mongoose.set('debug', true);
//promises syntax enabled
mongoose.Promise = Promise;
//mongo connection + options
mongoose.connect('mongodb://localhost/warbler', {
  keepAlive: true,
  useMongoClient: true
});
