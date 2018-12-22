//Some
console.log('METODO SOME');
//Esempio

var arr = [1, 2, 3];

arr.some(function (value, index, array) {
  return value < 2;
});

//risultato: true

//Ricostruire il metodo array.some

//Some esegue su tutti i valori dell'array una condizione
//fino a che un valore restituirà true, in questo caso la funzione
//restituisce true. Se invece la condizione non viene mai
//soddisfatta some restituirà false.

//il metodo some accetta 3 parametri nella sua callback
// valore, indice, interoArray

function some(array, callback) {

  for (var i = 0; i < array.length; i++) {
    if (callback(array[i], i, array) === true) {
      return true;
    }
  }

  return false;
}

//test some, restituisci true se la condizione viene soddisfatta

var numeri = [1, 2, 3, 4, 5];

var contieneMaggioreDiTre = some(numeri, function (value, index, array) {
  return value > 3;
});

console.log(numeri);
console.log(contieneMaggioreDiTre);

//esempio col metodo reale some

contieneMaggioreDiTre = numeri.some(function (value) {
  return value > 3;
});

console.log(contieneMaggioreDiTre);

//inserire some in una funzione
function contieneNumeriMaggioriDiTre(array) {
  return array.some(function (value) {
    return value > 3;
  });
}

console.log(contieneNumeriMaggioriDiTre(numeri));

/***************************************************/

//every
console.log('METODO EVERY');
//Esempio

var arr = [1, 2, 3];

arr.every(function (value, index, array) {
  return value < 2;
});

//risultato: false

//Ricostruire il metodo array.every

//Every esegue su tutti i valori dell'array una condizione
//se tutte le iterazioni restituiscono true la funzione
//restituisce true. Se invece la condizione non viene sempre
//soddisfatta every restituirà false.

//il metodo every accetta 3 parametri nella sua callback
// valore, indice, interoArray

function every(array, callback) {

  for (var i = 0; i < array.length; i++) {
    if (callback(array[i], i, array) === false) {
      return false;
    }
  }

  return true;
}

//test every, restituisci true se la condizione viene SEMPRE soddisfatta

var numeri = [1, 2, 3, 4, 5];

var tuttiMaggioriDiTre = every(numeri, function (value, index, array) {
  return value > 3;
});

console.log(numeri);
console.log(tuttiMaggioriDiTre);

//esempio col metodo reale every

tuttiMaggioriDiTre = numeri.every(function (value) {
  return value > 3;
});

console.log(tuttiMaggioriDiTre);

//inserire every in una funzione
function contieneSoloNumeriMaggioriDiTre(array) {
  return array.every(function (value) {
    return value > 3;
  });
}

console.log(contieneSoloNumeriMaggioriDiTre(numeri));

// ESERCIZI
console.log('ESERCIZI');

/*
Write a function called hasOddNumber which accepts an array and returns true if the array contains at least one odd number, otherwise it returns false.

Examples:
    hasOddNumber([1,2,2,2,2,2,4]) // true
    hasOddNumber([2,2,2,2,2,4]) // false
*/

function hasOddNumber(arr) {
  return arr.some(function (value) {
    return value % 2 !== 0;
  });
}

console.log(hasOddNumber([1, 2, 2, 2, 2, 2, 4]));
/*
Write a function called hasAZero which accepts a number and returns true if that number contains at least one zero. Otherwise, the function should return false

Examples:
    hasAZero(3332123213101232321) // true
    hasAZero(1212121) // false
*/

function hasAZero(num) {
  return num.toString().split('').some(function (number) {
    return parseInt(number) === 0;
  });
}

//NOTA CORREZIONE: RIGA 153: return number === '0'

console.log(hasAZero(3332123213101232321));
/*
Write a function called hasOnlyOddNumbers which accepts an array and returns true if every single number in the array is odd. If any of the values in the array are not odd, the function should return false.

Examples:
    hasOnlyOddNumbers([1,3,5,7]) // true
    hasOnlyOddNumbers([1,2,3,5,7]) // false
*/

function hasOnlyOddNumbers(arr) {
  return arr.every(function (number) {
    return number % 2 !== 0;
  });
}

console.log(hasOnlyOddNumbers([1, 3, 5, 7]));
/*
Write a function called hasNoDuplicates which accepts an array and returns true if there are no duplicate values (more than one element in the array that has the same value as another). If there are any duplicates, the function should return false.

Examples:
    hasNoDuplicates([1,2,3,1]) // false
    hasNoDuplicates([1,2,3]) // true
*/

function hasNoDuplicates(arr) {
  return arr.every(function (number, index, array) {
    return array.filter(function (numero) {
      return number === numero;
    }).length < 2;
  });
}

/*
NOTA CORREZIONE - Versione Corso
Compara per ogni valore dell'array se l'indice della prima occorrenza
è uguale all'indice della prima occorrenza esaminando l'array dal fondo.

function hasNoDuplicates(arr) {
  return arr.every(function(number){
    return arr.indexOf(val) === arr.lastIndexOf(val);
  });
}

*/

console.log(hasNoDuplicates([1, 2, 3, 1]));
console.log(hasNoDuplicates([1, 2, 3]));
/*
Write a function called hasCertainKey which accepts an array of objects and a key, and returns true if every single object in the array contains that key. Otherwise it should return false.

Examples:
    var arr = [
        {title: "Instructor", first: 'Elie', last:"Schoppik"},
        {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true},
        {title: "Instructor", first: 'Matt', last:"Lane"},
        {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
    ]

    hasCertainKey(arr,'first') // true
    hasCertainKey(arr,'isCatOwner') // false
*/

console.log('hasKey');
function hasCertainKey(arr, key) {
  return arr.every(function (object, index, array) {
    return object[key];
  });
}

/*
NOTA CORREZIONE - Versione Corso
Sfrutta la in keyword per controllare l'esistenza della chiave nell'oggetto

function hasCertainKey(arr, key) {
  return arr.every(function (object, index, array) {
    return key in object;
  });
}

*/

var arr = [
    { title: 'Instructor', first: 'Elie', last: 'Schoppik' },
    { title: 'Instructor', first: 'Tim', last: 'Garcia', isCatOwner: true },
    { title: 'Instructor', first: 'Matt', last: 'Lane' },
    { title: 'Instructor', first: 'Colt', last: 'Steele', isCatOwner: true },
];

console.log(hasCertainKey(arr, 'first')); //true
console.log(hasCertainKey(arr, 'isCatOwner')); // false

/*
Write a function called hasCertainValue which accepts an array of objects and a key, and a value, and returns true if every single object in the array contains that value for the specific key. Otherwise it should return false.

Examples:
    var arr = [
        {title: "Instructor", first: 'Elie', last:"Schoppik"},
        {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true},
        {title: "Instructor", first: 'Matt', last:"Lane"},
        {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
    ]

    hasCertainValue(arr,'title','Instructor') // true
    hasCertainValue(arr,'first','Elie') // false

*/
console.log('hasValue');
function hasCertainValue(arr, key, searchValue) {
  return arr.every(function (property) {
    return property[key] === searchValue;
  });
}

console.log(hasCertainValue(arr, 'title', 'Instructor')); // true
console.log(hasCertainValue(arr, 'first', 'Elie')); // false
