const wrapper = document.querySelector('.wrapper'),
    inputPart = wrapper.querySelector('.input-part'),
    infoTxt = inputPart.querySelector('.info-txt'),
    inputField = inputPart.querySelector('input'),
    locationBtn = inputPart.querySelector('button');

let api;

inputField.addEventListener('keyup', e => {
    if (e.key == 'Enter' && inputField.value != '') {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert('Your browser not support geolocation api')
    }
});

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5812987bf8b1654533fc202712305685`
    fetchData();
}

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add('error');
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5812987bf8b1654533fc202712305685`;
    fetchData();
}

function fetchData() {
    infoTxt.innerText = 'Getting weather details...';
    infoTxt.classList.add('pending');
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));

}

function weatherDetails(info) {
    if (info.cod == '404') {
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
        infoTxt.classList.replace('pending', 'error');
    } else {
        infoTxt.classList.remove('pending', 'error');
        wrapper.classList.add('active');
        console.log(info);
    }

}