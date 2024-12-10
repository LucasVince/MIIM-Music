window.onload = async () => {
    const userID = JSON.parse(localStorage.getItem('clientId'));

    try {
        const response = await fetch(`http://localhost:8080/instruments?userID=${userID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        const noInstrumentsMsg = document.getElementById('no-instruments-msg');
        const inventoryList = document.getElementById('inventory-list');

        if (!response.ok) {
            throw new Error(data.message);
        }

        if (data.instruments.length === 0) {
            noInstrumentsMsg.style.display = 'block';
        } else {
            noInstrumentsMsg.style.display = 'none';
            data.instruments.forEach(element => {
                const elementDiv = document.createElement('div');
                const pId = document.createElement('p');
                const idText = document.createTextNode('ID: ' + element._id);
                const pModel = document.createElement('p');
                const modelText = document.createTextNode('Model: ' + element.model);
                const pBrand = document.createElement('p');
                const brandText = document.createTextNode('Brand: ' + element.brand);
                const pType = document.createElement('p');
                const typeText = document.createTextNode('Type: ' + element.type);
                const btnDelete = document.createElement('button');
                const deleteButtonText = document.createTextNode('Delete Instrument');

                inventoryList.appendChild(elementDiv);
                elementDiv.appendChild(pId);
                pId.appendChild(idText);
                elementDiv.appendChild(pModel);
                pModel.appendChild(modelText);
                elementDiv.appendChild(pBrand);
                pBrand.appendChild(brandText);
                elementDiv.appendChild(pType);
                pType.appendChild(typeText);
                elementDiv.appendChild(btnDelete);
                btnDelete.appendChild(deleteButtonText);

                elementDiv.classList.add('instrumentDiv');
                pId.classList.add('id');
                pModel.classList.add('modelText');
                pBrand.classList.add('brandText');
                pType.classList.add('modelText');
                btnDelete.classList.add('deleteInstrumentBtn');

                btnDelete.addEventListener('click', async () => {
                    const instrumentID = element._id;

                    try {
                        const response = await fetch('http://localhost:8080/instruments', {
                            method: 'delete',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify({ instrumentID: instrumentID })
                        });

                        const data = await response.json();

                        if (!response.ok) {
                            console.error(data.message);
                        }

                        window.location.reload();

                        console.log(data.message);
                    } catch (err) {
                        alert(err.message);
                        console.error(err.message);
                    }
                });
            });
        }
    } catch (err) {
        alert(err.message);
        console.log(err.message);
    }
}
