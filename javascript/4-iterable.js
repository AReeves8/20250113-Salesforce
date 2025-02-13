/**
 * Two differing keywords in JS
 * 
 * in - Deals with "enumerable" properites
 * 
 * of - Deals with "iterable" properties
 */

// for..of loop - iterable

// for..in loop - enumerable

const obj = {
    name: 'John',
    age: '18',
    favoriteColor: 'Blue'
}

for (let x in obj) {
    // console.log(obj.x); // undefined

    // bracket notation for object access for dynamic values
    console.log(obj[x]); // object['name'] -> object['age'] -> object['favoriteColor']
}

const arr = ['A', 'B', 'C'];

for (let val of arr) {
    console.log(val);
}

// Generator functions
// SPecial type of function that returns many results as an iterable
// Main purpose is to be invoked many times, and do a little bit of work each time

function* myGenerator() {
    // instead of the return keyword, you use the "yield" keyword
    yield 1; // picture these as 3 returns
    yield 2;
    yield 3;
}

const actions = myGenerator(); // returns a the full iterable (an array of actions)

// Everything that is iterable follows a protocol.

console.log(actions.next());
console.log(actions.next());
console.log(actions.next());
console.log(actions.next());

/*
Iterable protocol is an object with the Symbol.iterator on it (tells JS it can use the spread operator on it)

It has a next() function that returns an object of { value: '', done: boolean }

If it is done: false, continue spreading
If it is done: true, spreading is finished
*/

const actions2 = myGenerator();
console.log(...actions2);

function* processDocuments(documents) {
    for (let document of documents) {
        // read the contents of the document. Save to DB the results.. etc
        yield document;
    }
}

const documentIterator = processDocuments(['index.html', 'index.css', '0-hello-world.js']);

console.log(documentIterator.next());
// do something

console.log(documentIterator.next());












function* anotherGenerator() {
    console.log('1');
    console.log('2');

    yield 'A';
    console.log('3');
    yield 'B';
    yield 'C';
    console.log('4');
}

let itr = anotherGenerator();
itr.next(); // what prints (1, 2)
itr.next(); // what prints (3)
itr.next(); // what prints (nothing)
itr.next(); // what prints (4)




