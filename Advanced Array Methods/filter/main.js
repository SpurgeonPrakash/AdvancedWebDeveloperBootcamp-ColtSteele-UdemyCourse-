//Filter

//Esempio

var arr = [1, 2, 3];

arr.map(function (value, index, array) {
  return value * 2;
});

//risultato [2, 4, 6]

//Ricostruire il metodo array.filter

//Filter esegue su tutti i valori dell'array una comparazione
//se essa restituirà vero il valore sarà inserito
//nell'array risultato altrimenti sarà saltato
//il map accetta 3 parametri nella sua callback
// valore, indice, interoArray

function filter(array, callback) {
  var newArray = [];

  for (var i = 0; i < array.length; i++) {
    if (callback(array[i], i, array) === true) {
      newArray.push(array[i]);
    }
  }

  return newArray;
}


//test filter, nuovo array con solo numeri maggiori di 3

var numeri = [1, 2, 3, 4, 5];

var maggioriDiTre = filter(numeri, function (value, index, array) {
  return value > 3;
});

console.log(numeri);
console.log(maggioriDiTre);

//esempio col metodo reale Filter

maggioriDiTre = numeri.filter(function (value) {
  return value > 3;
});

console.log(maggioriDiTre);

//inserire filter in una funzione
function numeriMaggioriDiTre(array) {
  return array.filter(function (value) {
    return value > 3;
  });
}

console.log(numeriMaggioriDiTre(numeri));

// ESERCIZI
console.log('ESERCIZI');
/*
Write a function called filterByValue which accepts an array of objects and a key and returns a new array with all the objects that contain that key.

Examples:
    filterByValue([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner') // [{first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Colt', last:"Steele", isCatOwner: true}]
*/

function filterByValue(arr, key){
  return arr.filter(function (value) {
    return value[key];
  });
}

console.log(filterByValue([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner'));
/*
Write a function called find which accepts an array and a value and returns the first element in the array that has the same value as the second parameter or undefined if the value is not found in the array.

Examples:
    find([1,2,3,4,5], 3) // 3
    find([1,2,3,4,5], 10) // undefined
*/

function find(arr, searchValue) {
  return arr.filter(function (value) {
    return value === searchValue;
  })[0];
}

console.log(find([1, 2, 3, 4, 5], 3));
console.log(find([1, 2, 4, 5], 3));
console.log(find([1, 2, 4, 5, 3, 3, 3], 3));
/*
Write a function called findInObj which accepts an array of objects, a key, and some value to search for and returns the first found value in the arrayt.

Examples:
    findInObj([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner',true) // {first: 'Tim', last:"Garcia", isCatOwner: true}
*/

function findInObj(arr, key, searchValue) {
  return arr.filter(function (value) {
    return value[key] === searchValue;
  })[0];
}

console.log(findInObj([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner',true));
/*
Write a function called removeVowels which accepts a string and returns a new string with all of the vowels (both uppercased and lowercased) removed. Every character in the new string should be lowercased.

Examples:
    removeVowels('Elie') // ('l')
    removeVowels('TIM') // ('tm')
    removeVowels('ZZZZZZ') // ('zzzzzz')
*/

function removeVowels(str) {
  var vowels = 'aeiou';
  return str.toLowerCase().split('').filter(function (letter) {
    return !vowels.split('').includes(letter);
  }).join('');
}

console.log(removeVowels('TIM'));
/*
Write a function called doubleOddNumbers which accepts an array and returns a new array with all of the odd numbers doubled (HINT - you can use map and fitler to double and then filter the odd numbers).

Examples:
    doubleOddNumbers([1,2,3,4,5]) // [2,6,10]
    doubleOddNumbers([4,4,4,4,4]) // []
*/

function doubleOddNumbers(arr) {

  var oddNumbers = arr.filter(function (value) {
    return value % 2 !== 0;
  });

  return oddNumbers.map(function (value) {
    return value * 2;
  });
}

console.log(doubleOddNumbers([1, 2, 3, 4, 5]));

//NOTA CORREZIONE è possibile concatenare filter e map per l'ultimo esercizio

function raddoppiaNumeriDispari(arr) {

  return arr.filter(function (value) {
    return value % 2 !== 0;
  }).map(function (value) {
    return value * 2;
  });

}

console.log(raddoppiaNumeriDispari([1, 2, 3, 4, 5]));
