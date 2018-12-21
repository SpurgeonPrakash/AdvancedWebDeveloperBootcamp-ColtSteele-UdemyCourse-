
//Ricostruire il metodo array.forEach

//il forEach accetta 3 parametri nella sua callback
// valore, indice, interoArray

function forEach(array, callback) {

  for (var i = 0; i < array.length; i++) {
    callback(array[i], i , array);
  }
}

//NOTA: la funzione non ha return, ritornerà undefined alla fine
//della sua esecuzione

//test forEach, stampa i numeri in un array

var numeri = [0, 1, 2, 3, 4];

forEach(numeri, function (value, index, array) {
  console.log(value);
});


// ESERCIZI
/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValues([1,2,3]) // [2,4,6]
    doubleValues([5,1,2,3,10]) // [10,2,4,6,20]

*/

console.log(doubleValues([5, 1, 2, 3, 10]));
function doubleValues(arr) {

  var newArray = [];

  arr.forEach(function (value) {
    newArray.push(value * 2);
  });

  return newArray;

}

/*
Write a function called onlyEvenValues which accepts an array and returns a new array with only the even values in the array passed to the function

Examples:
    onlyEvenValues([1,2,3]) // [2]
    onlyEvenValues([5,1,2,3,10]) // [2,10]

*/

console.log(onlyEvenValues([5, 1, 2, 3, 10]));

function onlyEvenValues(arr) {

  var newArray = [];

  arr.forEach(function (value) {
    if (value % 2 === 0) {
      newArray.push(value);
    }
  });

  return newArray;
}

/*
Write a function called showFirstAndLast which accepts an array of strings and returns a new array with only the first and last character of each string.

Examples:
    showFirstAndLast(['colt','matt', 'tim', 'udemy']) // ["ct", "mt", "tm", "uy"]
    showFirstAndLast(['hi', 'goodbye', 'smile']) // ['hi', 'ge', 'se']

*/

showFirstAndLast(['hi', 'goodbye', 'smile']);

function showFirstAndLast(arr) {
  var newArray = [];

  arr.forEach(function (value) {
    newArray.push(value.charAt(0) + value.charAt(value.length - 1));
  });

  return newArray;

}

/*
Write a function called addKeyAndValue which accepts an array of objects, a key, and a value and returns the array passed to the function with the new key and value added for each object

Examples:
    addKeyAndValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'title', 'instructor')

    // [{name: 'Elie', title:'instructor'}, {name: 'Tim', title:'instructor'}, {name: 'Matt', title:'instructor'}, {name: 'Colt', title:'instructor'}]

*/

console.log(addKeyAndValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'title', 'instructor'));
function addKeyAndValue(arr, key, value) {

  var newArray = [];

  arr.forEach(function (arrValue) {
    arrValue[key] = value;
    newArray.push(arrValue);
  });

  return newArray;
}

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/

console.log(vowelCount('I Am awesome and so are you'));

function vowelCount(str) {

  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var word = str.split('');

  var foundVowels = {};

  word.forEach(function (letter, wordIndex, fullWord) {
    var lowerLetter = letter.toLowerCase();

    vowels.forEach(function (vowel, vowelsIndex, allVowels) {
        if (vowel === lowerLetter) {
          if (!foundVowels.hasOwnProperty(vowel)) {
            foundVowels[vowel] = 1;
          } else {
            foundVowels[vowel]++;
          }
        }
    });

  });

  return foundVowels;
}
