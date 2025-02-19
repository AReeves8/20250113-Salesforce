function a() {
    return b();
}

function b() {
    return c();
}

function c() {
    return 1;
}

const val = a();

// wait to read from a file

// talk to an "external API" in JS

// setTimeout is a function that expects a Callback and also a delay
// it will wait for the delay specified and then call the callback

// console.log('A');

// setTimeout(() => {
//     console.log('B');
// }, 5000); // waits 2 seconds, then calls the callback

// setTimeout(() => {
//     console.log('C');
// }, 2000);

// console.log('D');

// setInterval
// you pick an interval (in ms) and each time that interval passes, it calls your callback

// setInterval(() => {
    
//     // setTimeout(() => {
//     //     console.log(new Date());
//     // }, 0);
//     console.log(new Date()); // the current time
// }, 1000);


// setInterval and setTimeout return keys
// you can call clearTimeout or clearInterval to stop that from going
// let count = 0;
// const intervalKey = setInterval(() => {
//     console.log(++count);
//     if (count >= 10) {
//         clearInterval(intervalKey);
//     }
// }, 1000);

// the evolution of async programming

// 1. Callbacks
// 2. Promises (provide a simpler interface to handle async events)

// A Promise just represents the "eventual success or failure of an operation"
// it promises to give you your answer once it's done

// Promises have two methods on them, both expect callbacks
// .then() handles the "good" outcome and calls the callback with the data once finished
// .catch() handles the "bad" outcome and call your callback with the error once an error occurs
// .finally() which runs no matter what

// creating a Promise

const promise = new Promise((resolve, reject) => {
    // provide logic to determine if the outcome is good or bad
    // if it's good, use resolve
    // if it's bad use reject
    resolve(10); // think of this as the return
});

// promise
//     .then(data => console.log(`RESOLVED VALUE: ${data}`))
//     .catch(err => console.error(`REJECTED VALUE: ${err}`))
//     .finally(() => console.log('Finally always runs'));

function checkGrade(grade) {
    return new Promise((resolve, reject) => {
        if (grade >= 65) {
            resolve('The student passed');
        } else {
            reject('The student failed');
        }
    });
}

const gradeOutcome = checkGrade(80);

// gradeOutcome
//     .then(grade => console.log(grade))
//     .catch(err => console.error(err));

// console.log('A');

// Promise.resolve('B').then(data => console.log(data));

// setTimeout(() => {
//     console.log('C');
// }, 1000);

// console.log('D');


//.then and .catches when returning return RESOLVED promises
// .then and .catches when THROWING return REJECTED promises

Promise.reject(10)
        .then(data => { throw data * 3 })
        .then(data => console.log(data))
        .catch(err => console.error(err)) // 10
        .then(data => console.log(data)); // ??


// Promise States

/**
 * 4 main states
 * 
 * Pending  (It has not finished deciding the outcome yet)
 * Resolved (Accepted/Good Outcome)
 * Rejected (Failed/Bad Outcome)
 * Settled  (You've handled the good/bad outcome, regardless of outcome)
 */

// promise methods for handling multiple promises
// .all is if any fails, they all fail
// .race is whatever promise finishes first, is the result. If the first one is fulfilled, it's fulfilled. If it rejects, it's rejected
// .allSettled just wait for them to all to finish. Doesn't matter if they succeed or not

const promise1 = Promise.reject(3);
// const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, "foo");
});

Promise.race([promise1, promise3]).then((values) => {
  console.log(values);
}).catch(err => console.error('ONE OR MORE PROMISES FAILED'));
// Expected output: Array [3, 42, "foo"]

new Promise((resolve, reject) => {
    // while this is running (THIS CODE)
    // PENDING
    resolve(1); // THIS IS NOW RESOLVED
}).then(data => data); // THIS IS NOW SETTLED