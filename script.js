const container = document.querySelector('.container');
const prompt = document.getElementById('prompt');
const passwordInput = document.getElementById('password');
const body = document.querySelector('body');

const imageNames = [
    "20211016_190602",
    "20211128_183519",
    "20220226_131849",
    "20220319_151241",
    "20220611_184256",
    "20220716_210224",
    "20220903_112207",
    "20221001_070917",
    "20221002_123550",
    "20240906_193824"
];

document.addEventListener('DOMContentLoaded', () => {
    passwordInput.focus();
});

function setCookie(name, value, hours) {
    let expires = "";
    if (hours) {
        const date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
    console.log(document.cookie);
}// Reset attempts

function getCookie(name) {
    const nameEQ = name + "=";
    const splittedCookies = document.cookie.split(';');
    for (let i = 0; i < splittedCookies.length; i++) {
        let c = splittedCookies[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function renderImages() {
    body.style.height = 'auto';
    body.style.background = 'url("images/background")';
    body.style.backgroundSize = 'cover';
    container.innerHTML = '';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.background = 'none';
    const title = document.createElement('h1');
    title.textContent = 'Feliz aniversario mi amor';
    title.style.color = 'black';
    container.appendChild(title);
    imageNames.forEach((imageName) => {
        const img = document.createElement('img');
        img.src = `images/${imageName}.jpg`;
        img.alt = imageName;
        img.style.maxWidth = '80vw';
        img.style.padding = '10px';
        img.style.borderRadius = '10px';
        img.style.border = '20px solid black';
        img.style.marginBottom = '10px';
        container.appendChild(img);
    });
}

const pwd = 'Te Amo mi Chelis <3';

if (getCookie('access') === 'true') {
    renderImages();
} else if (getCookie('access') == null) {
    setCookie('access', 'false', 0);
}

if (getCookie('attempts') === null) {
    setCookie('attempts', 1, 1);
} else if (parseInt(getCookie('attempts')) >= 4) {
    prompt.style.color = 'red';
    prompt.textContent = 'Too many attempts, try again in an hour';
}

passwordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let attempts = parseInt(getCookie('attempts'));
        if (attempts >= 4){ 
            prompt.style.color = 'red';
            prompt.textContent = 'Too many attempts, try again in an hour';
            return;
        }

        if (passwordInput.value !== pwd) {
            prompt.style.color = 'red';
            prompt.textContent = 'Incorrect password>';
            setCookie('attempts', attempts + 1, 1);
            setTimeout(() => {
                prompt.style.color = 'green';
                prompt.textContent = 'Please enter the provided password>';
            }, 2000);
        } else {
            prompt.style.color = 'lightblue';
            prompt.textContent = 'Correct password';
            setTimeout(() => {
                setCookie('attempts', 1, 0); 
                setCookie('access', 'true', 2400); 
                renderImages();
            }, 2000);
        }
    }
});