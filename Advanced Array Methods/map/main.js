//MAP

//Esempio

var arr = [1, 2, 3];

arr.map(function (value, index, array) {
  return value * 2;
});

//risultato [2, 4, 6]

//Ricostruire il metodo array.map

//Map esegue un task su tutti gli elementi dell'array
//il map accetta 3 parametri nella sua callback
// valore, indice, interoArray
//Restituisce un nuovo array con i risultati


function map(array, callback) {
  var newArray = [];

  for (var i = 0; i < array.length; i++) {
    newArray.push(callback(array[i], i, array));
  }

  return newArray;
}


//test map, triplica i numeri in un array

var numeri = [1, 2, 3, 4];

var numeriPerTre = map(numeri, function (value, index, array) {
  return value * 3;
});

console.log(numeri);
console.log(numeriPerTre);

//Stesso esempio col metodo reale Map

function tripleValues(array) {
  return array.map(function (value) {
    return value * 3;
  });
}

console.log(tripleValues(numeri));

// ESERCIZI

/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValues([1,2,3]) // [2,4,6]
    doubleValues([1,-2,-3]) // [2,-4,-6]
*/

function doubleValues(arr) {
  return arr.map(function (value) {
    return value * 2;
  });
}

console.log(doubleValues([1,-2,-3]));

/*
Write a function called valTimesIndex which accepts an array and returns a new array with each value multiplied by the index it is currently at in the array.

Examples:
    valTimesIndex([1,2,3]) // [0,2,6]
    valTimesIndex([1,-2,-3]) // [0,-2,-6]
*/

function valTimesIndex(arr) {

  return arr.map(function (value, index) {
    return value * index;
  });
}

console.log(valTimesIndex([1, -2, -3]));
/*
Write a function called extractKey which accepts an array of objects and some key and returns a new array with the value of that key in each object.

Examples:
    extractKey([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

function extractKey(arr, key) {
  return arr.map(function (value) {
    return value[key];
  });
}

console.log(extractKey([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'name'));

/*
Write a function called extractFullName which accepts an array of objects and returns a new array with the value of the key with a name of "first" and the value of a key with the name of  "last" in each object, concatenated together with a space.

Examples:
    extractFullName([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia"}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele"}]) // ['Elie Schoppik', 'Tim Garcia', 'Matt Lane', 'Colt Steele']
*/

function extractFullName(arr) {
  return arr.map(function (value) {
    return value.first + ' ' + value.last;
  });
}

console.log(extractFullName([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia"}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele"}]));
