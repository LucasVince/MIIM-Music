const modelInput = document.querySelector('#modelInput');
const brandInput = document.querySelector('#brandInput');
const typeSelect = document.querySelector('#typeSelect');

const userID = JSON.parse(localStorage.getItem('clientId'));

const addItemForm = document.querySelector('#addItemForm');

const addItem = async event => {
    event.preventDefault();

    const model = modelInput.value;
    const brand = brandInput.value;
    const type = typeSelect.value;

    try {
        const response = await fetch('http://localhost:8080/instruments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {userID, model, brand, type} )
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert(data.message);
        console.log(data.instrument);
    } catch (err) {
        alert(err.message);
        console.log(err.message);
    }

}

addItemForm.addEventListener('submit', addItem);