const username = JSON.parse(localStorage.getItem('clientUsername'));
const userID = JSON.parse(localStorage.getItem('clientId'));

const userParagraph = document.querySelector('#welcome p');

userParagraph.innerHTML = username

console.log(username);
console.log(userID);

window.onload = async () => {
    try {
        const response = await fetch(`http://localhost:8080/instruments?userID=${userID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log(data.instruments);
    } catch (err) {
        alert(err.message);
        console.log(err.message);
    }
}