// async and await keywords to work with Promises easier

// async is applied to functions
// function keyword
async function myFirstAsync() {
    // values returned from async functions are automatically turned into resolved promises

    // throw 5; Throwing inside an async function automatically turns it into a returned rejected promise
    return 1;
}

function regularFunction() {
    return 2;
}

const val1 = myFirstAsync();
val1.then(data => console.log(data))
console.log(val1);

const val2 = regularFunction();
console.log(val2);

// arrow function
const arrowAsync = async num => {
    return num + 2;
}

// await
// await is a keyword telling JS to pause execution (not block) and wait for the action to finish
// await MUST be used inside an async function

async function getData(filePath) {
    if (filePath === './index.css') {
        throw "File type not supported"; // this is a rejected promise
    }
    return "ABC";
}

async function findData(filePath) {
    try {
        const data = await getData(filePath); // wait for the promise to fulfill. once fulfilled, unpack the value and assign it
        console.log(data);
    } catch (err) { // this err variable is containing the unwrapped Rejected promise value
        console.error(err);
    }   
}

async function findALotOfData(...files) {
    let dataPromises = [];
    for (let file of files) {
        dataPromises.push(getData(file));
    }
    Promise.all(dataPromises, (data => {
        // this would be better because all files would be done in parallele
    }));
    // this is probably not what I want
    // for (let file of files) {
    //     await findData(file);
    // }
}

findData('./index.css');
// promise.then(data => console.log(data)); // undefined

async function getUserData() {
    // async function so we can await
    
    // fetch is a function that makes an HTTP request to a endpoint
    const response = await fetch('https://randomuser.me/api/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json(); // turns it from JSON into a JS object
    console.log(data);

    for (let user of data.results) {
        console.log(user.name);
    }
}

getUserData();