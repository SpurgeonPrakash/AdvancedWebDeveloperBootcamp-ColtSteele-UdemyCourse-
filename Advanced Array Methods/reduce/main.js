//REDUCE

//Esempio
console.log('esempio metodo Reduce');
var arr = [1, 2, 3, 4, 5];

//Reduce ha 2 parametri (callback, userAccumulator)
//La callback è obbligatoria ed ha 4 parametri (accumulator, nextValue, index, array)
//il secondo parametro prenderà il posto di accumulator nella callback(se specificato)

//Reduce può essere eseguito in 2 modi:

/*
1. SENZA accumulatore specificato dall'utente,
Nell'esempio esegue la callback al cui suo interno:
- alla prima iterazione accumulator è il primo valore
nell'array e nextValue è il secondo valore nell'array.
-nella seconda iterazione accumulator è il risultato della prima
iterazione e nextValue sarà il terzo valore nell'array
- Dalla terza iterazione in poi accumulator sarà
il risultato del return della precedente iterazione e nextValue
sarà il prossimo valore trattato nell'array
- quando nextValue non può essere riempito reduce restituisce il
valore finale dell'accumulator (il risultato dell'ultima iterazione
valida)

*/
console.log('Chiamo reduce su array senza un valore accumulatore dall"utente');
console.log(arr);

console.log(arr.reduce(function (accumulator, nextValue) {
  console.log('accumulator: ' + accumulator + ' + nextValue: ' + nextValue + ' = ' + (accumulator + nextValue));

  return accumulator + nextValue;
}));

/*
2. CON accumulatore specificato dall'utente,
Nell'esempio esegue la callback al cui suo interno:
- alla prima iterazione accumulator è il valore specificato
dall'utente (10) e nextValue è il primo valore nell'array.
- Dalla seconda iterazione in poi accumulator sarà
il risultato della precedente iterazione e nextValue
sarà il prossimo valore nell'array
- quando nextValue non può essere riempito reduce restituisce il
valore finale dell'accumulator (il risultato dell'ultima iterazione
valida)
*/
console.log('Chiamo reduce su array con accumulator 10 dall"utente');
console.log(arr);

console.log(arr.reduce(function (accumulator, nextValue) {
  console.log('accumulator: ' + accumulator + ' + nextValue: ' + nextValue + ' = ' + (accumulator + nextValue));
  return accumulator + nextValue;
}, 10));

//UTILIZZO DI REDUCE

//STRINGHE - Creare una stringa con una stringa all'inizio e la somma
//di tutte le stringhe contenute in un array

var amici = ['Matteo', 'Gianluca', 'Emanuele'];

var amiciAlParco = amici.reduce(function (accumulator, amico) {
  return accumulator += (' ' + amico);
}, 'Oggi al parco ci sono:');

console.log(amiciAlParco);


//OGGETTI - Creare un oggetto con tante chiavi quanti i diversi valori nell'array,
//alla prima creazione di una chiave il valore è 1, se un valore si ripete sommiamo 1
//al valore a quella chiave (key-> 5, valore -> 1; se troviamo un altro 5 valore ++)

var numeriPerOggetto = [1, 2, 3, 4, 5, 6, 7, 8, 4, 3, 1, 8];
console.log(numeriPerOggetto);
var emptyObject = {};

var oggetto = numeriPerOggetto.reduce(function (accumulator, nextNumber) {

    if (accumulator[nextNumber]) {
      accumulator[nextNumber]++;
    } else {
      accumulator[nextNumber] = 1;
    }
    return accumulator;
}, emptyObject);

console.log(oggetto);

//REDUCE INCORPORATO IN UNA FUNZIONE
//Calcola la somma di tutti i numeri dispari nell'array con reduce

var numeriVari = [1, 2, 3, 4, 5, 6, 7, 8, 4, 3, 1, 8];
console.log(numeriVari);

function sommaNumeriDispari(array) {
  return array.reduce(function (accumulator, nextNumber) {
    return (nextNumber % 2 !== 0) ? (accumulator + nextNumber) : accumulator;
  }, 0);
}

console.log(sommaNumeriDispari(numeriVari));

// ESERCIZI

console.log('ESERCIZI REDUCE');

/*
Write a function called extractValue which accepts an array of objects and a key and returns a new array with the value of each object at the key.

Examples:
*/

function extractValue(arr, key) {
  return arr.reduce(function (accumulator, nextValue, index, fullArray) {
    accumulator.push(nextValue[key]);
    return accumulator;
  }, []);
}

var arr = [{ name: 'Elie' }, { name: 'Tim' }, { name: 'Matt' }, { name: 'Colt' }];
console.log(extractValue(arr, 'name')); // ['Elie', 'Tim', 'Matt', 'Colt']

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/

function vowelCount(str) {
  var vowels = 'aeiou';
  return str.toLowerCase().split('').reduce(function (accumulator, nextValue, index, fullWord) {

    if (!vowels.includes(nextValue)) {
      return accumulator;
    }

    if (nextValue in accumulator) {
      accumulator[nextValue]++;
    } else {
      accumulator[nextValue] = 1;
    }

    return accumulator;
  }, {});
}

/*
NOTA CORREZIONE: è possibile invertire la condizione includes per
scrivere return solo una volta

function vowelCount(str) {
  var vowels = 'aeiou';
  return str.toLowerCase().split('').reduce(function (accumulator, nextValue, index, fullWord) {

    if (vowels.includes(nextValue)) {
      if (nextValue in accumulator) {
        accumulator[nextValue]++;
      } else {
        accumulator[nextValue] = 1;
      }
    }
    return accumulator;
  }, {});
}
*/

console.log(vowelCount('Elie'));
console.log(vowelCount('I Am awesome and so are you'));
/*
Write a function called addKeyAndValue which accepts an array of objects and returns the array of objects passed to it with each object now including the key and value passed to the function.

Examples:
    var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];

    addKeyAndValue(arr, 'title', 'Instructor') //
      [
        {title: 'Instructor', name: 'Elie'},
        {title: 'Instructor', name: 'Tim'},
        {title: 'Instructor', name: 'Matt'},
        {title: 'Instructor', name: 'Colt'}
       ]
*/

function addKeyAndValue(arr, key, value) {
  return arr.reduce(function (accumulator, nextVal, index, fullArr) {
    accumulator[index] = nextVal;
    accumulator[index][key] = value;
    return accumulator;
  }, []);
}

/*
NOTA CORREZIONE: E' possibile dare l'array iniziale come accumulator

function addKeyAndValue(arr, key, value) {
  return arr.reduce(function (accumulator, nextVal, index, fullArr) {
    accumulator[index][key] = value;
    return accumulator;
  }, arr);
}

*/

var arr = [{ name: 'Elie' }, { name: 'Tim' }, { name: 'Matt' }, { name: 'Colt' }];

console.log(addKeyAndValue(arr, 'title', 'Instructor'));

/*
Write a function called partition which accepts an array and a callback and returns an array with two arrays inside of it. The partition function should run the callback function on each value in the array and if the result of the callback function at that specific value is true, the value should be placed in the first subarray. If the result of the callback function at that specific value is false, the value should be placed in the second subarray.

Examples:

    function isEven(val){
        return val % 2 === 0;
    }

    var arr = [1,2,3,4,5,6,7,8];

    partition(arr, isEven) // [[2,4,6,8], [1,3,5,7]];

    function isLongerThanThreeCharacters(val){
        return val.length > 3;
    }

    var names = ['Elie', 'Colt', 'Tim', 'Matt'];

    partition(names, isLongerThanThreeCharacters) // [['Elie', 'Colt', 'Matt'], ['Tim']]
*/

function partition(arr, callback) {
  return arr.reduce(function (accumulator, nextVal) {
    if (callback(nextVal)) {
      accumulator[0].push(nextVal);
    } else {
      accumulator[1].push(nextVal);
    }

    return accumulator;
  }, [[], []]);
}

function isLongerThanThreeCharacters(val) {
  return val.length > 3;
}

var names = ['Elie', 'Colt', 'Tim', 'Matt'];

console.log(partition(names, isLongerThanThreeCharacters)); // [['Elie', 'Colt', 'Matt'], ['Tim']]

function isEven(val) {
  return val % 2 === 0;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(partition(arr, isEven)); // [[2,4,6,8], [1,3,5,7]];
