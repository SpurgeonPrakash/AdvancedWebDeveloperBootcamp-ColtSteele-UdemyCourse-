
//nuova istanza di richiesta

var HXR = new XMLHttpRequest();

//configurazione delle azioni da compiere
//ogni volta che cambia il readyState(lo stato di completamento della richiesta)
// GLI STATI SONO
//0.UNSENT
//1.OPENED
//2.HEADERS_RECEIVED
//3.LOADING
//4.DONE
XHR.onreadystatechange = function () {

  console.log('READY STATE IS...' + XHR.readyState);

  //se siamo giunti allo stato 4
  //e se la richiesta restituisce STATUS CODE OK 200
  if (XHR.readyState == 4 && XHR.statusCode == 200) {

    //resituiamo i dati
    console.log(XHR.responseText);
  } else {
    console.log('There Was a probem');
  }
};

//configurazione tipo Richiesta e URL
XHR.open('GET', 'https://api.github.com/zen');

//avvia la richiesta
XHR.send();
