// Closures are the ability for the code to maintain reference to its "surrounding lexical environment"
// Any variables or values inside the function, it maintains a reference to

// Closures are common in functional programming languages
// In JS, functions are "first-class citizens"
// Functions can be stored as variables, passed as parameters to functions, stored in arrays, return from functions


// function that returns another function

function outer() {
    console.log('Outer called');
    function inner() {
        console.log('Inner called');
    }
    
    return inner;
}

const insideFunction = outer();
insideFunction();
insideFunction();

// using counter to see closure values

function incrementByX(x) {
    let count = 0;
    return () => {
        count += x;
        console.log(count);
    }
}

const incrementBy10 = incrementByX(10);
const incrementBy5 = incrementByX(5);

incrementBy10();
incrementBy10();
incrementBy10();
incrementBy10();

// 

incrementBy5(); // 5

incrementBy10(200); // 50; 200 is ignored because inner function doesn't expect param