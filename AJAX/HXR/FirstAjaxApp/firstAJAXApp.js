
//selezioniamo il bottone per richiedere un nuovo Cane
var btn = document.querySelector('#btn');

//selezioniamo l'immagine

var img = document.querySelector('#photo');

btn.addEventListener('click', function () {
  //richiesta come da esempio precedente
  var XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function () {
    if (XHR.readyState == 4 && XHR.status == 200) {

      //responseText.restituisce una stringa
      //per convertirlo ad JSObject la affidiamo a JSON.parse
      //accediamo alla proprietà message
      //che è l'url dell'immagine
      var url = JSON.parse(XHR.responseText).message;

      //modifichiamo la src dell'immagine da mostrare
      img.src = url;

    } else {
      console.log('error');
    }
  };

  XHR.open('GET', 'https://dog.ceo/api/breeds/image/random');

  XHR.send();
});
