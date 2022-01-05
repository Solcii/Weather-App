const wrapper = document.querySelector('.wrapper'),
    inputPart = wrapper.querySelector('.input-part'),
    infoTxt = inputPart.querySelector('.info-txt'),
    inputField = inputPart.querySelector('input');

inputField.addEventListener('keyup', e => {
    if (e.key == 'Enter' && inputField.value != '') {
        requestApi(inputField.value);
    }
});

function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5812987bf8b1654533fc202712305685`;
    infoTxt.innerText = 'Getting weather details...';
    infoTxt.classList.add('pending');

    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    console.log(info);
}