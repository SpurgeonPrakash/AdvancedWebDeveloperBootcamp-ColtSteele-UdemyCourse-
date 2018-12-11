
var refreshBtn = document.querySelector('#refresh');

var priceSpan = document.getElementById('price');

var currency = 'EUR';

refreshBtn.addEventListener('click', function () {

  var XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function () {

    if (XHR.readyState == 4 && XHR.status == 200) {

      var price = JSON.parse(XHR.responseText).bpi[currency].rate_float;
      console.log(price);

      priceSpan.textContent = price + ' ' + currency;
    }
  };

  XHR.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');

  XHR.send();

});

refreshBtn.click();
