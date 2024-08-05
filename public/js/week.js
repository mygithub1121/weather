import {weatherapi, ApiAdress_api, City_api} from "./fetch.js";

function updateWeather(apiData) { 
    console.log(apiData)
    document.getElementById('datatime-h1').textContent = apiData.forecast.forecastday[0].date
    // Оновлення дати для кожного дня в прогнозі
    for (let i = 1; i <= 7; i++) {
        let dateValue = apiData.forecast.forecastday[i - 1].date;
        let modify_dateValue = dateValue.slice(5)
        document.getElementById(`wd${i}`).textContent = modify_dateValue;
        document.getElementById(`tempC${i}`).textContent = apiData.forecast.forecastday[i - 1].day.avgtemp_c + '°C'
    }

    // Оновлення іконок погоди для кожного дня в прогнозі
    for (let i = 1; i <= 7; i++) {
        let path = apiData.forecast.forecastday[i - 1].day.condition.icon;
        let modify_path = path.replace(/^\/\//, 'https://');
        document.getElementById(`wi${i}`).src = modify_path;
    }

    // Оновлення іконок погоди та швидкості вітру для кожної години в поточному дні
    for (let i = 1; i <= 24; i++) {
        let imagesPath = apiData.forecast.forecastday[0].hour[i - 1].condition.icon;
        let windPath = apiData.forecast.forecastday[0].hour[i - 1].wind_kph;

        let modify_img = imagesPath.replace(/^\/\//, 'https://');
        document.getElementById(`hws${i}`).textContent = windPath + 'k/h';
        document.getElementById(`himg${i}`).src = modify_img;
    }

    // Оновлення основної іконки погоди
    let weatherIcon = document.getElementById('weather-icon');
    let replaceIcon = apiData.current.condition.icon.replace(/^\/\//, 'https://');
    weatherIcon.src = replaceIcon;

    // Оновлення назви міста
    let city_h1_name = document.getElementById('city-h1');
    city_h1_name.textContent = apiData.location.name;
}

document.querySelector('#sr-button').onclick = function () {
    let cityNam = document.getElementById('search-line').value;

    weatherapi(cityNam).then(apiData => {
        updateWeather(apiData);
       // document.querySelector('#current-city-name').textContent = apiData.location.name;
    });
}

let cityName = 'Ukraine';
weatherapi(cityName).then(apiData => {
    updateWeather(apiData);
});

window.onload = function () {
    document.getElementById('div_day').onclick = function () {
        let dialog_w = document.querySelector('.hour-dialog-window');
        if (dialog_w.style.display === 'none') {
            dialog_w.style.display = 'block';
        }
    };
};
