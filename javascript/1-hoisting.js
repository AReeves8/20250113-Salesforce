// const abc;
/*
   Hoisting is the act JS takes of taking a variable declaration and moving it to the top of its scope

   var has 2 scopes:
     1. Global (top-level)
     2. Function
*/

// abc = 10;
const abc = 10;

console.log(someVar);

if (2 == 2) {
    let someVar = 'Some Variable';
} else {
    let someVar = 'Another value';
}