"use strict";
// Types
// TypeScript is good at inferencing types
// let x: string = 10;
function sum(x, y) {
    return x + y;
}
function greet(people) {
    if (typeof people === 'string') {
        console.log(`Hello ${people}!`);
        return;
    }
    people.forEach(person => console.log(`Hello ${person}!`));
}
greet('Henry');
greet(['Joe', 'Justin', 'Patrick']);
