// Generator functions are functions that can their execution split up into multiple segments
// This is done through the yield keyword

function* generator(data) {

    for (let datum of data) {
        console.log(datum);
        yield datum; // this line right here will return back out of the function and pause. Next time .next() is called, it resumes from here
    }
}

const myGen = generator([1, 2, 3]);

myGen.next();

// Imagine 1000 lines of code

myGen.next();
myGen.next();
myGen.next();

class Example {

    *generator(data) {
        for (let datum of data) {
            yield datum;
        }
    }
}


// ||
// For OR if the left is true, return the left.
// If the left is false, return the right.

let answer = {} || []; // used for if a value is falsy and we want to assign a default

console.log(answer); // what is this?

// &&
// For AND if the left is true, return the right.
// If the left is false, return left.

answer = {} && []; // this is ensuring if they provided a truthy value, return some other value

console.log(answer);