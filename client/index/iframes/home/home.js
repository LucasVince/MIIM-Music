const username = JSON.parse(localStorage.getItem('clientUsername'));
const userID = JSON.parse(localStorage.getItem('clientId'));

const userParagraph = document.querySelector('#welcome p');

userParagraph.innerHTML = username

console.log(username);
console.log(userID);