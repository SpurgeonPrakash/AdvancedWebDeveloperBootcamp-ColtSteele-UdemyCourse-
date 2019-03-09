
//prende l'errore di input e ritorna una response
//con un Json che lo rappresenti
function errorHandler(error, req, res, next){

  return res.status(error.status || 5000).json({
    error: {
      message: error.message || 'OOps! Something went wrong!\n'
    }
  })

}

module.exports = errorHandler
