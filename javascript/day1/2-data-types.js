// "JavaScript has no data types" FALSE

// JavaScript is not strongly typed
// In JS, the type is not prevalent compile time (When writing the code)
// In JS, the type is known and used only when running the code

/**
 * 
 * Primitives (Non-Objects):
 * - string (chars are also strings)
 * - number (including integers, negatives, floats (decimal))
 * - BigInt (Humongous numbers that the number data type wouldn't support)
 * - boolean (true/false)
 * - undefined (represents the lack of a value (implicit))
 * - null (represents the lack of a value (explicit))
 * - Symbol (Things you can add to objects in JS so that the JS interpreter treats it a certain way)
 * 
 * Non-Primiatives (Objects):
 * - Object *****
 *   - Arrays
 *   - Custom objects
 *   - Maps
 *   - Sets
 */

const age = 12n; // bigint

const stringVar = `I am ${age} years old`; // template literal. SPecial type of string that makes it easier to introduce logic to it

console.log(stringVar);

// typeof gives you the data type of the variable so that you can treat it different

console.log(typeof age);



// True / False

// Truthy vs Falsy

/**
 * JS will inside of boolean contexts (if (age) {}) convert your variable to be a boolean so that it works for the if statement
 * 
 * Truthy: JS will take this variable and convert it to true
 *  - Everything that is not Falsy
 *  - {} Objects
 *  - [] Arrays
 *  - true
 *  - 'false'
 *  - '0'
 *  - ' '
 *  - Infinity
 * 
 * Falsy: JS will take the variable and convert it to false
 *  - '' (empty string)
 *  - 0n
 *  - 0 (zeroes)
 *  - -0 (negative zeroes)
 *  - false (false)
 *  - undefined
 *  - null
 *  - NaN (Not a Number)
 */

console.log(5 * 'hello world');


const arr = [];

// type coercion (take the value and change it to a variable)
const bool = Boolean(Infinity);

// using the NOT operator

console.log(!!0); // !!0 -> !true -> false

// Eqaulity operator

// ==  Equality operator
// JUST compares the two items' values

// === STRICT equality operator
// This one ALSO checks type AND value

// THERE IS ONLY ONE SCENARIO YOU SHOULD USE ==

const areEqual = 2 === '2';

console.log(`Are the two items equals? ${areEqual}`);

// if you want to treat null and undefined the same. use ==

let someVar;

if (someVar == null) {
    console.log('Variable value not provided')
} else {
    console.log(someVar)
}

// danger
let userInput = 0;

if (userInput) {
    console.log('Value provided')
} else {
    console.log('Value not provided');
}


// Truthy Falsy assignment

const examScore = 50;

const passedExam = examScore > 65; // false

// assigning defaults

// if the user didn't provide a value, use some default
// if (!userInput) {
//     userInput = 'Default';
// }


// userInput = userInput || 'Default';
userInput &&= 'Default';

console.log(userInput);

/*
 
  true || true -> true
  false || true -> true
  true || false -> true
  false || false -> false

*/

const abc = '' && 'THIS IS TRUE';

console.log(abc);


userInput = 0;
userInput ||= 500;

console.log(userInput);


// Nullish coalescing operator
// Logical assignment but ONLY for null/undefined values

userInput = null;
// userInput = userInput ?? 500;
userInput ??= 500;

console.log(`User Input for Nullish operator is: ${userInput}`);


// Ternary operator

let answer = null ?? 500 ? '2 is less than 3' : '2 is greater than 3';

console.log(answer);

// if (2 > 3) {
//     answer = '2 is less than 3';
// } else {
//     answer = '2 is greater than 3';
// }
