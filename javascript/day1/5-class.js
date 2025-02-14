// Classes were introduced back in ES5, but this did NOT bring OOP to JS.
// You have always been able to do OOP in JS, classes are just a wrapper on top of how they used to do it

// Constructor function
// normal function that creates objects

function Dog({ name, breed, age }) {
    // use the 'this' keyword to bind the parameters to the new object
    this.name = name;
    this.breed = breed;
    this.age = age;
}

Dog.prototype.speak = function() {
    console.log(`My name is ${this.name}`);
}

const dog = new Dog({ name: 'Spot', breed: 'Dalmatian', age: 5 }); // new keyword on the constructor function to create a new dog

console.log(dog);

// Classes are just constructor functions with a nice bow on top

class Animal {
    age; // public
    #name; // private variable. It can only be referenced inside the class

    constructor({name, age}) {
        this.#name = name;
        this.age = age;
    }

    speak() {
        console.log(`My name is ${this.#name}`);
    }

    // getters and setters for private variables

    // getter is using the get keyword
    // Called when obj.name is called in a read manner
    get name() {
        console.log('Insider getter');
        return this.#name;
    }

    // called when obj.name is called in a mutation setting
    set name(name) {
        // force the name to not be empty
        if (name != null && name.length > 0) {
            this.#name = name;
        }
    }

    get dogAge() {
        return this.age * 7;
    }

    // now a private helper method
    #getDogAge() {
        return this.age * 7;
    }
}

const polly = new Animal({age: 2, name: 'Polly'});

polly.speak();

console.log(polly.name); // calls getter

const name = polly.name; // call getter

polly.name = 'Brad'; // call setter

console.log(polly.name);

console.log(polly.dogAge);

const obj = {
    name: 'Bob'
}

// console.log(polly.getDogAge());

// Inheritance in JS

class Bird extends Animal {
    color;

    constructor({color, name, age}) {


        super({ name, age }); // this is calling the constructor of the parent class
        this.color = color;
    }

    // speak function is defined in the parent
    // if we write a speak method here, it will override the existing one
    speak() {
        // you can call the parent speak method by using super
        super.speak(); // this calls the parent
        console.log(`Tweet tweet (I am ${this.name})`); // calls parent getter
    }
}

const brad = new Bird({ name: 'Brad', age: 5, color: 'Green' });

console.log(brad.name);

brad.speak();

// function that handles a number and an array differnt


// extra class features

class Instrument {
    // you can add generator methods to classes
    *gen() {
        yield 'Trombone';
        yield 'Trumpet';
    }
}

const i = new Instrument();

const generator = i.gen();
generator.next(); // Trombone
generator.next(); // Trumpet


class Counter {
    #maxCount;

    constructor(maxCount) {
        this.#maxCount = maxCount;
    }

    // Using Symbol.iterator you can make counter objects "iterable"
    [Symbol.iterator]() {
        let maxCount = this.#maxCount;
        let currentCount = 0;
        // iterable means you return an object with a next method from the Symbol.iterator so that JS can iterate
        return {
            next() {
                currentCount++;
                if (currentCount < maxCount) {
                    return { value: currentCount, done: false }
                } else {
                    return { value: currentCount, done: true }
                }
            }
        }
    }
}

const counter = new Counter(10);

console.log(...counter);

const llamo = 'Sean';

const obj5 = {
    [llamo]: llamo
}

console.log(obj5);

// static properties for classes

class Bag {
    static a() {
        // not bound to the objects, but rather the class
        console.log('CALLING STATIC METHOD A')
    }
}

// Bag.a = () => {} // This would be the same result

Bag.a();