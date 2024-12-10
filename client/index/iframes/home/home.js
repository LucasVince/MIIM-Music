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

        const instruments = data.instruments;
        console.log(instruments);

        const totalInstruments = document.querySelector('#totalInstruments');
        const lastInstrument = document.querySelector('#lastInstrument');
        const instrumentType = document.querySelector('#instrumentType');

        const stringInstruments = document.querySelector('#Strings');
        const percussionInstruments = document.querySelector('#Percussion');
        const brassInstruments = document.querySelector('#Brass');

        if (instruments.length < 1) {
            totalInstruments.innerHTML = 'Total of instruments: No instruments added yet';
            lastInstrument.innerHTML = 'Last instrument to be added: No instruments added yet';
            instrumentType.innerHTML = 'Instrument type: No instruments added yet';

            stringInstruments.innerHTML = ' 🎸 Strings: ' + 0;
            percussionInstruments.innerHTML = ' 🥁 Percussion: ' + 0;
            brassInstruments.innerHTML = ' 🎺 Brass: ' + 0;
        } else {
            const totalInstrumentsText = instruments.length;
            const lastInstrumentText = instruments[instruments.length - 1].brand + ' ' + instruments[instruments.length - 1].model;
            const instrumentTypeText = instruments[instruments.length - 1].type;

            console.log(totalInstrumentsText);
            console.log(lastInstrumentText);

            totalInstruments.innerHTML = 'Total of instruments: ' + totalInstrumentsText;
            lastInstrument.innerHTML = 'Last instrument to be added: ' + lastInstrumentText;
            instrumentType.innerHTML = 'Instrument type: ' + instrumentTypeText;

            let string = 0;
            let percussion = 0;
            let brass = 0;

            instruments.forEach(element => {
                if (element.type == 'String') {
                    string ++;
                }

                if (element.type == 'Percussion') {
                    percussion ++;
                }

                if (element.type == 'Brass') {
                    brass ++;
                }
            });

            stringInstruments.innerHTML = ' 🎸 Strings: ' + string;
            percussionInstruments.innerHTML = ' 🥁 Percussion: ' + percussion;
            brassInstruments.innerHTML = ' 🎺 Brass: ' + brass;
        }

    } catch (err) {
        alert(err.message);
        console.log(err.message);
    }
}