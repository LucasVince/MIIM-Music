window.onload = async () => {
    try {
        const response = await fetch('http://localhost:8080/instruments', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        data.forEach(element => {
            console.log(element);
        });
    } catch (err) {
        alert(err.message);
        console.log(err.message);
    }
}