import {weatherapi} from "./fetch.js";

document.addEventListener('DOMContentLoaded', function () { // Клік на праву сторону відкриває або закриває форму міста
    document.querySelector('.right-side').onclick = () => {
        let right_side_element = document.querySelector('.city_form');
        let left_side_element = document.querySelector('.week-weather-block');

        let right_side = right_side_element.style.display;
        let left_side = left_side_element.style.display;

        // Перевірка, чи відкрите ліве вікно, щоб запобігти одночасному відкриттю обох вікон
        if (left_side === 'block') {
            alert('Ліве вікно все ще відкрите, закрийте вікно щоб відкрити інше');
            return;
        }

        // Відкриття або закриття правого вікна на основі його поточного стану
        if (right_side === 'none') {
            right_side_element.style.display = 'block';
        } else {
            right_side_element.style.display = 'none';
        }
    }

    // Клік на ліву сторону відкриває або закриває блок прогнозу погоди на тиждень
    document.querySelector('.left-side').onclick = () => {
        let left_side_element = document.querySelector('.week-weather-block');
        let right_side_element = document.querySelector('.city_form');

        let left_side = left_side_element.style.display;
        let right_side = right_side_element.style.display;

        // Перевірка, чи відкрите праве вікно, щоб запобігти одночасному відкриттю обох вікон
        if (right_side === 'block') {
            alert('Праве вікно все ще відкрите, закрийте вікно щоб відкрити інше');
            return;
        }

        // Відкриття або закриття лівого вікна на основі його поточного стану
        if (left_side === 'none') {
            left_side_element.style.display = 'block';
        } else {
            left_side_element.style.display = 'none';
        }
    }

    // Функція для оновлення інформації про погоду на основі введеного міста
    function all_change() {
        const input_value = document.getElementById('search-line');
        const rewrite_h1 = document.getElementById('city-h1');
        let cityName = input_value.value;

        rewrite_h1.textContent = cityName;

        // Виклик API для отримання даних про погоду та оновлення інтерфейсу
        weatherapi(cityName).then(data => {
            document.getElementById('temperature_celsius').innerHTML = data.current.temp_c + '°C';
            document.getElementById('humidity_value').innerHTML = data.current.humidity + '%';
            document.getElementById('wind_speed').innerHTML = data.current.wind_kph + 'km/h';
        }).catch(error => {
            alert('Місто,країна не знайдено!');
        });
    }

    const dialogWindowStyle = document.getElementById('dialog_window');
    document.querySelector('#close_form').onclick = function () { // Показ або приховання діалогового вікна форми додавання міста
        if (dialogWindowStyle.style.display === 'none') {
            dialogWindowStyle.showModal();
            dialogWindowStyle.style.display = 'flex';
        } else {
            dialogWindowStyle.style.display = 'none';
        }
    }

    let number = 0;
    const savedBlocks = JSON.parse(localStorage.getItem("blocks") || "[]");

    // Відновлення збережених блоків з інформацією про міста
    savedBlocks.forEach(block => createBlock(block));

    // Додавання нового блоку з інформацією про місто при кліку на кнопку "submit"
    document.getElementById('submit').onclick = function () {
        number++;

        let city_form_name = document.getElementById('city_form_name');
        let temperature_dialog = document.getElementById('temperature');
        let humidity_dialog = document.getElementById('humidity');
        let wind_dialog = document.getElementById('wind');

        const weather_form = {
            city_name: city_form_name.value,
            temperature: temperature_dialog.value,
            humidity: humidity_dialog.value,
            wind_speed: wind_dialog.value
        }

        // Збереження нової форми у localStorage та приховання діалогового вікна
        localStorage.setItem(`weather_${number}`, JSON.stringify(weather_form));
        dialogWindowStyle.style.display = 'none';

        createBlock(weather_form);
        savedBlocks.push(weather_form);
        localStorage.setItem("blocks", JSON.stringify(savedBlocks));
    }

    // Функція для створення блоку з інформацією про місто
    function createBlock(weather_form) {
        let city_form = document.getElementById('div_city_form');
        let create_element = document.createElement('div');
        let button_element = document.createElement('button');

        create_element.className = 'div_form';
        button_element.textContent = weather_form.city_name;
        button_element.className = 'form_city_name_button';
        city_form.style.background = 'none';
        create_element.appendChild(button_element);
        city_form.appendChild(create_element);

        // Оновлення даних про погоду при кліку на блок з містом
        button_element.onclick = (event) => {
            event.preventDefault();

            document.getElementById('temperature_celsius').innerHTML = weather_form.temperature + "°C";
            document.getElementById('humidity_value').innerHTML = weather_form.humidity + "%";
            document.getElementById('wind_speed').innerHTML = weather_form.wind_speed + "m/s";
            document.getElementById('city-h1').textContent = weather_form.city_name;
        }
    }

    // Відкриття форми додавання нового міста при кліку на відповідну іконку
    document.getElementById('add_city_img').onclick = function (event) {
        const minWidth = 320;
        const maxWidth = 768;
        const currentWidth = window.innerWidth;

        if (currentWidth >= minWidth && currentWidth <= maxWidth) {
            let coordY = event.pageY;
            let cityCharBlock = document.querySelector('.dialog_window');
            cityCharBlock.style.top = (coordY - 270) + 'px';
            console.log(coordY);
        }

        let dialogWindowStyle = document.querySelector('.dialog_window');
        if (dialogWindowStyle.style.display === 'none') {
            dialogWindowStyle.style.display = 'block';
        }

        // Очищення полів форми після додавання нового міста
        document.getElementById('submit').addEventListener('click', function () {
            document.getElementById('temperature').value = '';
            document.getElementById('city_form_name').value = '';
            document.getElementById('wind').value = '';
            document.getElementById('humidity').value = '';

        })
    }
    // Виклик функції зміни інформації про погоду при кліку на кнопку пошуку
    document.getElementById('search-button').onclick = all_change;
});
