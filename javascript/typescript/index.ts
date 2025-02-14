// Types

// TypeScript is good at inferencing types

// let x: string = 10;

function sum(x: number, y?: number): number {
    if (y == null) {
        return x + x;
    }
    return x + y;
}

sum(1);

function greet(people: string | string[]): void {
    if (typeof people === 'string') {
        console.log(`Hello ${people}!`);
        return;
    }

    people.forEach(person => console.log(`Hello ${person}!`));
}

greet('Henry');

greet(['Joe', 'Justin', 'Patrick']);

// TypeScript we can also make custom types

// interfaces in TS are mostly for custom data types
// interfaces are limited to objects
interface Person {
    name: string;
    age: number;
    // ?: is for optional
    address?: {
        street: string;
        zip: string;
        state: string;
        city: string;
    }
}

const dave: Person = {
    age: 15,
    name: 'Dave'
}

// type is also used to define custom types, but is more flexible
// types can be objects or primitives, or some inbetween

type Role = 'USER' | 'VIP_USER' | 'MOD' | 'ADMIN';

function findRole(): Role {
    return 'USER';
}

const role = findRole();

type Dog = {
    name: string;
}

type Human = {
    name: string;
}

type PetOwner = Human & {
    pet: Dog;
}

const ed: PetOwner = {
    name: 'Ed',
    pet: {
        name: 'Spot'
    }
}

// Tuple data type
// if you need return or pass a param two values in one
function tuple(): [string, (msg: string) => number ] {
    return ['Bob', (msg) => {
        return msg.length;
    }];
}

const [word, fn] = tuple();

const x = fn('ABC');

function getNotes(): [string, Role] {
    return ['First bit of notes', 'USER'];
}

const [primaryNotes, extraNotes] = getNotes();