const token = JSON.parse(localStorage.getItem('token'));

const headerUser = document.querySelector('#username');

if (token) {
    const splitToken = token.split('.')[1];
    const playloadToken = JSON.parse(atob(splitToken));

    localStorage.setItem('clientId', JSON.stringify(playloadToken.id));
    localStorage.setItem('clientUsername', JSON.stringify(playloadToken.username));

    console.log(playloadToken);
    
    headerUser.innerHTML = playloadToken.username;
}