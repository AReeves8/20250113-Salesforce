/**
 * 
 * JavaScript as a language is managed by a committee
 * 
 * ECMAScript is the committee and they vote on what gets allowed for the latest additions to JavaScript
 * 
 * JavaScript is ALWAYS backwards compatible with itself
 */

// EcmaScript 6 (ECMAScript 2024) (ECMASCript NEXT (latest))

// Arrow functions

/**
 * You do not need a function body {} if it is one line long
 *   - If it is one line long and doesn't use function body {}, it will automatically return what you calculate 
 * Parenthesis are optional (in some cases)
 *   - If you have zero parameters - REQUIRED
 *   - If you have ONE parameter - OPTIONAL
 *   - If you have 2+ parameters - REQUIRED
 * Return keyword is forbidden UNLESS you provide a function body, then you can use it
 */

function standardFunction(params) {

}

const arrowFunction = (param1, param2, param3) => {
    // function body
}

const zeroArgFn = () => 1; // What does this return? 1

const sum = (x, y) => x + y;

function normalSum(x, y) {
    return x + y;
}

const someFn = msg => console.log(msg);

console.log('Value of return is: ' + someFn('Hello World'));

const toUpperCase = msg => msg.toUpperCase();

console.log(toUpperCase('abc'));

// Optional Chaining
// When chaining the dot notation for objects, if it would throw an NullPointer exception, instead just return undefined

const person = {
    name: 'Joe',
    age: 5,
    gender: 'Male',
    education: {
        major: 'Computer Science',
        gpa: 4.0,
        university: 'University of Minnesota'
    }
}

// get the gpa
// Multi level destructure
const { education: { gpa } } = person;
console.log(`GPA is ${gpa}`);

const person2 = {
    name: 'Ethan',
    age: 15,
    gender: 'Male'
}

console.log(person.education?.major ?? 'Undecided');
// null checks

// Object / Array destructuring
// Allows you to extract specific fields of an object/array

const { name: fullName, age, gender } = person2;

console.log(fullName);

// With arrow functions, if you want to destructure, you MUST use ()

// the equal signs are default values (ONLY WORKS FOR UNDEFINED)
const greetPerson = ({ name = 'John', age = 10 }) => {
    console.log(`Hello, ${name}! You are ${age} years old!`);
} 

greetPerson({ });

const arr = [1, '5', false, () => {}, 20];

const favoriteFoods = ['Brussel Sprouts', 'Pizza', 'Canoli', 'Tacos', 'Cilantro', 'Waffle House Menu'];

// get the top 3 foods out of this array
const [favorite, secondFavorite, , fourthFavorite] = favoriteFoods;

console.log(fourthFavorite);

const [a, b, c] = [1, 2];

console.log(c);


// looping through an array

for (let i = 0; i < favoriteFoods.length; i++) {
    console.log(favoriteFoods[i]);
}

for (let faveFood of favoriteFoods) {
    console.log(faveFood);
}

// Object equality

const obj = [];

const obj2 = obj;

obj[0] = 'Gill';

console.log(obj === obj2);

console.log(obj2[0]);

const arr2 = [1, 2, 3];

function alterArray(arr) {
    arr[0] = 'abc';
}

alterArray(arr2);

console.log(arr2[0]);

let x = 10;

let y = x;

y = 12;

console.log(x);


// Spread operator

// Takes an entity that is "iterable" and fans it out

const fruits = ['Apple', 'Banana', 'Pear', 'Coconut'];

console.log(...fruits); // console.log(fruits[0], fruits[1], fruits[2])

const copyOfFruits = [...fruits]; // [fruits[0], fruits[1], fruits[2]]

const fruitsWithGuavaAtFront = ['Guava', ...fruits, 'Plum'];

// Objects are NOT iterable, BUT JS makes an exception for spreading objects

const house = {
    address: '123 Main St',
    zip: 55445,
    beds: 2,
    baths: 2
}

const copyOfHouse = {
    beds: 1, // This value, if not provided in house, will be the default. If house has that property, it will be overrwritten
    ...house,
    baths: 5, // Enforcing it's always this value
    state: 'FL',
    color: 'blue'
}

console.log(copyOfHouse);

function createUser(data) {
    const userData = {
        username: `user-${Date.now()}`,
        ...data,
        role: 'USER'
    }

    console.log(userData);
} 

createUser({username: 'seanc', role: 'ADMIN'});

const testObj = {
    favoriteColors: ['Red', 'Blue', 'Green']
}

// Arrays and strings are iterable by default
console.log(...'THIS IS A STRING');

// Rest operator
// the same ... syntax as the spread operator, but it does opposite

function imdbTopMovies(movie1, movie2, movie3, ...otherMovies) {

    console.log(`The top movie is ${movie1}`);
    console.log(`The second movie is ${movie2}`);
    console.log(`The third movie is ${movie3}`);
    console.log(`${otherMovies}`);
}

imdbTopMovies('Dune', 'Cars', 'Batman vs Superman', 'Pulp Fiction', 'Scream', 'Shawshank Redemption');

imdbTopMovies(...fruits, 'Guava');

const print = (...msg) => console.log(msg);

print('1', '2', '3');

// use rest for destructuing OBJECTS AND ARRAYS

// object
const pet = {
    name: 'Spot',
    breed: 'Dog',
    age: 7,
    color: 'Brown'
}

const { name, breed, ...otherProperties } = pet;

console.log(otherProperties);

const [movie1, movie2, ...restOfMovies] = ['Dune', 'Cars', 'Batman vs Superman', 'Pulp Fiction', 'Scream', 'Shawshank Redemption'];

console.log(restOfMovies);


function createUser2({ username, role, ...properties }) {
    const userData = {
        username, // username: username
        rolez: role,
        ...properties
    }

    // saveOtherPropertiesToDatabase(properties);

    console.log(userData);
} 