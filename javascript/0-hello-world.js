console.log('Hello World');

// This is a comment

/*

anything in here is a comment

*/

/**
 * This is a JSDoc comment
 * @param {*} b Used for something
 * @returns {*} Returns b times 2
 */
function a(b) {

}

function myFirstFunction() {
    
    
}

console.log(myFirstFunction());

// Variables

/*
    var: 
      - First of the keywords for variables
      - No longer really used (for serious applications)
      - You are allowed to redeclare another variable with an existing variable name (no errors)
      - 2 scopes
        1. If defined top level, it is globally scoped
        2. If defined in a FUNCTION, it is FUNCTION scoped

    let:
      - DOES NOT allow redeclaring of another variable of the same name
      - "block scoped variable" (curly braces)

    const:
      - DOES NOT allow redeclaring of another of the same name
      - "block scoped variable"
      - DOES NOT allow reassigning a new value to a variable
*/

var myFirstVariable; // variable declaration

var myFirstVariable = 10; // variable assignment

console.log(myFirstVariable);

if (false) {
    var anotherVariable;
}

console.log(anotherVariable);

function showingOffVariables() {
    var functionScopedVar;
    let xyz;
}

// console.log(functionScopedVar);

const myConstVariable = 10;
// myConstVariable = 11;

const DATABASE_PASSWORD = "";