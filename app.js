const express = require('express')
const path = require("path")
const app = express();
const port = process.env.PORT || 5000;


// Встановлення директорії статичних файлів (js,css,images)
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Запуск сервера
app.listen(port, (err) => {
    if (err) {
        console.log('Щось пішло не так :(', err);
    } else {
        console.log(`Сервер запущено на порту: ${port}`);
    }
});
