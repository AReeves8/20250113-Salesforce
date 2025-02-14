// Higher Order Functions
// Functions that expect other functions or return other functions

function processItems(items, action) {
    for (let item of items) {
        action(item); // for each item, run the action function passed on it
    }
}

const arr = [1, 2, 3, 4, 5];

processItems(arr, num => console.log(num));

processItems(arr, num => {
    console.log(num * 2);
});

processItems(arr, num => {
    // take num and save it to a database
    // take num and send it to chatGPT for something
});


// Arrays have built in higher order functions methods

// forEach, takes a function as a parameter, does not return anything, it just applies a function you provide to each item in the array

const artists = ['Hozier', 'Demon Hunter', 'Glass Animals', 'Jim Croche', 'Stray Kids', 'Styx', 'Menzingers'];

// forEach expects a "callback function"
// a callback function is a function YOU provide that will be called at a later point in time
// Follows inversion of control


// pure function. no side effects
// don't mutate (edit) the data
artists.forEach((artist) => {
    artist = artist.toUpperCase();
    console.log(artist);

    // returns in this function are ignored
    return 0; // if you have a lot of logic, you could use return to exit the function early
});

console.log(artists);

// map
// map is very similar to forEach in that they both loop over each item in the array and perform an action to each item
// for map, we return an item and that returned result is applied to a NEW ARRAY
// the map function itself returns an updated copy of the array with the updates made to it

const nums = [1, 2, 3];
const newNums = nums.map(num => num * 2); // this will return a NEW array of numbers where the values are doubled
console.log(newNums);

console.log(nums); // this original copy remains unedited

const newArtists = artists.map((artist, index, copyOfArtists) => {
    artist = artist.substring(0, 3);
    console.log(artist);

    return artist;
});

console.log(newArtists); // ??

// forEach you use when you just want to run some funtion WITHOUT getting an updated result
// map you use when you want transform the data using some function

const upperCaseArtists = artists.map(artist => artist.toUpperCase());

// this would get updated
const objArr = [{}, {}, {}];

objArr.forEach(obj => {
    obj.name = 'Sean';
});

console.log(objArr);

// filter
// the filter HOF allows us to apply some conditional logic to our array and optionally filter it out from the new array

const songs = ['Golden Goose', 'Northern Attitude', 'Girlfriend', 'Don\'t Stop Believin\'', 'Mr. Brightside', 'Riptide', 'Gooey'];

// I only want songs that start with the letter G
// if you return true, it is kept. If you return false, it is removed
const filteredSong = songs.filter(song => song.charAt(0) === 'G');
console.log(filteredSong);

// Chaining these actions together
// think of it as a pipeline in building in your intended response
// since forEach doesn't return anything. You MUST end with that one
const updatedSongs = songs
                        .filter(song => song.charAt(0) !== 'G')
                        .map(song => song.toUpperCase());

// reduce
// Accumulate some value as you progress through the array.
// A snowaball rolling through the array. it gets bigger as you go

const moreNums = [-5, -10, -20, -18];
// sum up all the numbers

const sum = moreNums.reduce((sum, num) => {
    // what is returned will become "sum" on the next iteration of the loop
    return sum + num;
});

console.log(sum);

// find the max of the array
// think of reduce as just taking the whole array and reducing to one value

const max = moreNums.reduce((currentMax, num) => {
    // return 'ABC';
    return currentMax > num ? currentMax : num;
}, 12); // 12 is the starting value for currentMax

console.log(max);