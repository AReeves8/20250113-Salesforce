console.log('Referenced JS File');

// keep track of the current count
// and also update the UI
let count = 0;

// document object is the DOM
const button = document.getElementById('click-me-button');
const counter = document.getElementById('click-counter');

const form = document.getElementById('user-form');
const userList = document.getElementById('active-user-list');

button.addEventListener('click', handleButtonClick); // when the button is clicked, it will call handleButtonClick
form.addEventListener('submit', handleFormSubmit);
// button.innerText = 'EDITED BY JS';

// making the button do something

function handleButtonClick(e) {
    console.log('Button clicked!');
    count++;
    counter.innerText = count;
}

function handleFormSubmit(e) {
    e.preventDefault(); // Doing this line will prevent the page from refreshing

    // FormData
    const data = new FormData(e.target); // e.target is the form itself
    console.log(`Username is: ${data.get('username')}`);
    console.log(`Password is: ${data.get('password')}`);

    // add in the username as an <li> to the userList
    // document.createElement() to create new HTML elements to add to the page
    const li = document.createElement("li");
    li.innerText = data.get('username');
    console.log(li);
    userList.appendChild(li); // add the li tag to the end of all the sub elements

    console.log('FORM SUBMITTED');

    e.target.reset();
}

console.log(button);
// .getElementsByTagName
// .getElementsByClassName