
//Axios permette di avere una libreria leggera per
//poter effettuare chiamate ajax senza caricare
//altre librerie più pesanti come jQuery solo
//per quello scopo

//Esempio di chiamata GET

var url = 'https://opentdb.com/api.php?amount=1';

axios.get(url)
.then(function (res) {
  console.log(res.data.results[0].question);
})
.catch(function () {
  console.log('error');
});
